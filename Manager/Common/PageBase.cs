using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BLL;
using Commons;
using Models;

namespace Manager
{
    /// <summary>
    /// aspx 基类 用于记录当前权限，页面权限验证 add by zfj
    /// </summary>
    public class PageBase : System.Web.UI.Page
    {
        private SessionUser _GlobleUserInfo;

        protected static List<Sys_VW_RoleOperating> UserOperates
        {
            get { return (List<Sys_VW_RoleOperating>)RequestSession.GetSessionUser().UserOperates; }
            set { RequestSession.GetSessionUser().UserOperates = value; }
        }

        protected SessionUser GlobleUserInfo
        {
            get { return _GlobleUserInfo; }
            set { _GlobleUserInfo = RequestSession.GetSessionUser(); }
        }

        protected static string _CurrentOperatName;

        public static string CurrentOperatName
        {
            get { return RequestSession.GetSessionUser().CurrentOperate; }
        }

        protected override void OnLoad(EventArgs e)
        {
            #region 当Session过期自动跳出登录画面

            if (RequestSession.GetSessionUser() == null)
            {
                Session.Abandon();  //取消当前会话
                Session.Clear();
                if (!Request.Url.LocalPath.ToLower().Contains("login.aspx"))
                {
                    //Response.Redirect("/Login.aspx");
                    HttpContext.Current.Response.Write("<script>parent.location.href='/login.aspx'</script>");
                    HttpContext.Current.Response.End();
                    throw new Exception();
                }
            }

            #endregion

            IsUrlPermission();
            base.OnLoad(e);
            base.OnInit(e);
            SaveCurrentOperate();
            // 每次进页面重新赋值，延长seeeion过期时间 add by zfj 2015-8-31
            RequestSession.AddSessionUser(RequestSession.GetSessionUser());
        }

        #region URL权限验证,加强安全验证防止未授权匿名不合法的请求

        /// <summary>
        /// URL权限验证,加强安全验证防止未授权匿名不合法的请求
        /// </summary>
        public void IsUrlPermission()
        {
            bool IsOK = false;
            //获取当前访问页面地址
            string requestPath = RequestHelper.GetScriptName;
            if (RequestHelper.GetScriptUrl.ToString().IndexOf("action=edit") > 0)
            {
                requestPath += "?action=edit";
            }
            string[] filterUrl = { "/Index.aspx", "/login.aspx" };//过滤特别页面
            for (int i = 0; i < filterUrl.Length; i++)
            {
                if (requestPath.ToLower() == filterUrl[i].ToLower())
                {
                    IsOK = true;
                    break;
                }
            }
            if (!IsOK)
            {
                int nodeCount = PageBase.UserOperates.Where(p => p.Url != null).Where(p => p.Url.ToLower().Contains(requestPath.ToLower())).Count();
                if (nodeCount == 0)
                {
                    HttpContext.Current.Response.Write("<script type=\"text/javascript\">alert('很抱歉！您的权限不足，访问被拒绝！')</script>");
                    HttpContext.Current.Response.End();
                    throw new Exception();
                }
            }
        }

        #endregion

        /// <summary>
        /// 记录当前操作权限名称 add by zfj 2015-6-5
        /// </summary>
        /// <param name="refresh">是否强制更新缓存</param>
        protected void SaveCurrentOperate(bool refresh = false)
        {
            try
            {
                string url = Request.Url.LocalPath.ToLower();
                //跳过ashx
                if (url.IndexOf(".ashx") < 0)
                {
                    //无缓存数据 或者 强制刷新
                    if (CacheHelper.GetCache("OpList") == null || refresh)
                    {
                        var list = new Sys_Operating_BLL().GetList(" optionlevel=2 "); //记录二级菜单
                        list.Add(new Sys_Operating { Url = "/login.aspx", Name = "用户登录" });
                        CacheHelper.SetCache("OpList", list);
                    }

                    //记录当前操作权限名称
                    var listCache = CacheHelper.GetCache("OpList") as List<Sys_Operating>;
                    if (listCache.Where(p => p.Url.ToLower().Contains(url)).Count() > 0)
                    {
                        _CurrentOperatName = listCache.Where(p => p.Url.ToLower().Contains(url)).ToList()[0].Name;
                        RequestSession.GetSessionUser().CurrentOperate = _CurrentOperatName;
                    }
                }
            }
            catch (Exception ex)
            {
            }
        }
    }
}