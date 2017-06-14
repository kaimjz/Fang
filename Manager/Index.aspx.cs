using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Commons;
using BLL;

namespace Manager
{

    public partial class Index : PageBase
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                SessionUser user = RequestSession.GetSessionUser();
                if (user != null)
                {
                    roleid.Value = user.RoleId.ToString();
                }
                base.SaveCurrentOperate(true);//进入首页强制更新缓存
                string action = Request["action"] ?? "";
                if (action == "GetUserOperating")
                {
                    GetUserOperating();
                }
            }
        }
        /// <summary>
        /// 获取用户菜单
        /// </summary>
        public void GetUserOperating()
        {
            var userOperating = new Sys_VW_RoleOperating_BLL().GetUserOperatingList(RequestSession.GetSessionUser().RoleId).ToList();
            PageBase.UserOperates = userOperating; //记录用户权限
            Response.Write(JsonConvert.SerializeObject(userOperating));
            Response.End();
        }
    }
}