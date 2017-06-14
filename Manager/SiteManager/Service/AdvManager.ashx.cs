using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text;
using Newtonsoft.Json;
using System.IO;
using PD.Manager.CommonCode;
using PD.Common;
using PD.Model;
using PD.BLL;
using System.Web.SessionState;
using System.Collections;

namespace PD.Manager.SiteManager.Service
{
    /// <summary>
    /// AdvManager 的摘要说明
    /// </summary>
    public class AdvManager : IHttpHandler, IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string action = context.Request["action"];
            switch (action)
            {
                case "search":
                    Search(context);//查询广告列表(分页)
                    break;
                case "edit":
                    EditAdv(context);//编辑广告
                    break;
                case "delete":
                    DeletePic(context);//删除广告
                    break;
                case "exportExcel":
                    ExportExcel(context);//导出广告列表
                    break;
                case"editabout":
                    EditAbout(context);//编辑关于我们内容
                    break;
                case "SortPreAndNext":
                    SortPreAndNext(context);//广告列表的上移下移操作
                    break;
                case "UpdateContactWe":
                    UpdateContactWe(context);
                    break;
            }
        }

        /// <summary>
        /// 导出Excel列表
        /// 时间：2015-08-16
        /// 创建人：wsy
        /// </summary>
        /// <param name="context"></param>
        public void ExportExcel(HttpContext context)
        {
            string type = context.Request["type"];
            string advid = context.Request["advid"] ?? "";
            string pageIndex = context.Request["pageIndex"] ?? "";
            string pageSize = context.Request["pageSize"] ?? "";
            string recordCount = context.Request["recordCount"] ?? "0";
            int totalCount = 0;
            string name = StringHelper.SqlSpecialConvert(context.Request["sname"] ?? "", StringConverTypeEnum.Like);
            List<Psys_VW_AdvAndUser> advlist;
            pageSize = type == "all" ? recordCount : pageSize;//判断导出当前or全部
            pageIndex = type == "all" ? "1" : pageIndex;
            Psys_Adv_BLL bll = new Psys_Adv_BLL();
            advlist = bll.GetListByPage(Convert.ToInt32(pageIndex), Convert.ToInt32(pageSize), advid, " SortNum desc ", ref totalCount, name);//查询广告列表
            Excel.ExportExcelByMyXls<Psys_VW_AdvAndUser>(advlist, "Name,PicUrl,LastEditUserName,ToDateShort", "广告位置,图片跳转链接,最后修改人,最后修改日期", "AdvList.xls", "广告列表导出");
            LogHelper.InserLog((int)EnumClass.OperateType.导出操作, PageBase.CurrentOperatName, "导出了广告列表");
        }

        /// <summary>
        ///查询广告列表
        ///创建人：wsy
        ///时间2015-07-23
        /// </summary>
        /// <param name="context"></param>
        public void Search(HttpContext context)
        {
            string pageIndex = context.Request["pageIndex"] ?? "";
            string pageSize = context.Request["pageSize"] ?? "";
            string advid = context.Request["advid"] ?? "";
            string name = StringHelper.SqlSpecialConvert(context.Request["sname"] ?? "", StringConverTypeEnum.Like);
            int totalCount = 1;
            List<Psys_VW_AdvAndUser> advlist = new Psys_Adv_BLL().GetListByPage(Convert.ToInt32(pageIndex), Convert.ToInt32(pageSize), advid, " Adv_Type, SortNum desc ", ref totalCount, name);//查询广告列表
            StringBuilder table = new StringBuilder();
            table.Append("<tr><th style='width:15px;'>序号</th><th style='width:80px;'>广告位置</th><th style='width:100px;'>图片跳转链接</th><th  style='width:40px;'>最后修改人</th><th style='width:45px;'>最后修改日期</th><th style='width:45px;'>操作</th></tr>");
            if (advlist.Count > 0)
            {
                for (int i = 0; i < advlist.Count; i++)
                {
                    table.Append("<tr>");
                    table.Append("<td>" + (i + 1) + "</td>");//序号
                    table.Append("<td ><div class='new_titleimg'><i name='titlename' onmouseover='doover(this)' onmouseout='doout(this)' >" + advlist[i].Name + "</i><div style='display:none'><img src='" + advlist[i].PicPath + "'></div></div></td>");//广告位置
                    table.Append("<td title='" + advlist[i].PicUrl + "'>" + StringHelper.SubString(advlist[i].PicUrl, 50) + "</td>");//图片跳转链接
                    table.Append("<td title='" + advlist[i].LastEditUserName + "'>" + StringHelper.SubString(advlist[i].LastEditUserName.ToString(), 10) + "</td>");//最后修改人
                    table.Append("<td >" + DateTimeHelper.ToString(advlist[i].LastEditDate, DateTimeHelper.DateFormat.SHORTDATE) + "</td>");//最后修改日期
                    table.Append("<td>");
                    table.Append("<a href='AdvEdit.aspx?advid=" + advlist[i].ID + "&type=0'>编辑</a>"); // //添加积分商城广告判断标识0：阅读网 1：积分商城 edit by fuzhenzhen 15-11-05
                    table.Append("<a href=\"javascript:SortPreAndNext('" + advlist[i].ID + "','up')\">上移</a>");//上移  lyn
                    table.Append("<a href=\"javascript:SortPreAndNext('" + advlist[i].ID + "','down')\">下移</a>");//下移  lyn
                    table.Append("</td>");
                    table.Append("</tr>");
                }
                context.Response.Write(JsonConvert.SerializeObject(new { count = totalCount, data = table.ToString() }));
            }
            else
            {
                context.Response.Write("{\"count\":\"" + totalCount + "\",\"data\":\"\"}");
            }
        }
        /// <summary>
        /// 广告列表的上移下移操作
        /// add by lyn
        /// date 2016-05-23
        /// </summary>
        /// <param name="context"></param>
        private void SortPreAndNext(HttpContext context)
        {
            string id = context.Request["Id"] ?? "";  //id
            string SortType = context.Request["SortType"] ?? "";//修改的列
            context.Response.Write(new Psys_Adv_BLL().UpdateSortByType(id, SortType));

        }

        /// <summary>
        /// 编辑广告
        /// 创建人：wsy
        /// 时间2015-07-23
        /// </summary>
        /// <param name="context"></param>
        public void EditAdv(HttpContext context)
        {
            string pic = UploadPic(context);//上传图片
            if (pic == "-1")
            {
                //格式不正确
                context.Response.Write(pic);
                return;
            }
            else if (pic == "-2")
            {
                //文件大小>5M
                context.Response.Write(pic);
                return;
            }
            else
            {
                string id = context.Request["advid"];//广告ID
                string url = context.Request["url"];//图片跳转链接
                string altname = context.Request["altname"];
                string isnofollow = context.Request["isnofollow"];
                
                string oldpic = "";
                Psys_Adv_BLL bll = new Psys_Adv_BLL();
                Psys_Adv adv = bll.SelectEntity(id);//根据ID查询广告
                if (adv != null)
                {
                    adv.PicUrl = url;
                    adv.LastEditUserID = new Guid(RequestSession.GetSessionUser().UserId);
                    adv.LastEditDate = DateTime.Now;
                    oldpic = adv.PicPath;
                    adv.IsNofollow = Convert.ToInt32(isnofollow);
                    adv.AltName = altname;
                    if (!string.IsNullOrEmpty(pic) && pic != "-3")
                    {
                        adv.PicPath = "/Upload/AdvPic/" + pic;
                    }
                    string result = bll.Update(adv).ToString();
                    if (result == "1" && !string.IsNullOrEmpty(pic) && pic != "-3")
                    {
                        //删除原来的图片
                        if (!string.IsNullOrEmpty(oldpic))
                        {
                            string pa = System.Web.HttpContext.Current.Server.MapPath(oldpic);
                            if (File.Exists(pa))
                            {
                                File.Delete(pa);
                            }
                        }
                    }
                    context.Response.Write(result);
                    LogHelper.InserLog((int)EnumClass.OperateType.编辑操作, PageBase.CurrentOperatName, "编辑了名称为" + adv.Name + "的广告");
                }
            }
        }

        /// <summary>
        /// 上传图片
        /// 创建人：wsy
        /// 时间2015-07-23
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public string UploadPic(HttpContext context)
        {
            System.Web.HttpFileCollection _file = System.Web.HttpContext.Current.Request.Files;
            string str = string.Empty;
            if (_file[0].FileName == "")
            {
                return "-3";//文件不存在
            }
            if (_file.Count > 0)
            {
                //文件大小
                long size = _file[0].ContentLength;
                size = size / (1024 * 1);
                //文件类型
                string type = _file[0].ContentType;
                //文件名
                string name = _file[0].FileName;
                //文件格式
                string _tp = System.IO.Path.GetExtension(name);

                if (_tp.ToLower() == ".jpg" || _tp.ToLower() == ".jpeg" || _tp.ToLower() == ".gif" || _tp.ToLower() == ".png" || _tp.ToLower() == ".swf")
                {
                    if (size > 5120)
                    {
                        return "-2";//文件不能超过5M
                    }
                    string picname = DateTime.Now.ToString("yyyyMMddHHmmss") + _tp;
                    //获取文件流
                    System.IO.Stream stream = _file[0].InputStream;
                    //保存文件
                    string path = context.Server.MapPath("/Upload/AdvPic");
                    if (!Directory.Exists(path))
                    {
                        Directory.CreateDirectory(path);
                    }
                    _file[0].SaveAs(path + "\\" + picname);//保存原图片
                    return picname;//插入成功

                }
                else
                {
                    return "-1";//文件格式不正确
                }
            }
            else
            {
                return "-3";//无上传文件
            }
        }

        /// <summary>
        /// 删除广告
        /// 创建人：wsy
        /// 时间2015-07-23
        /// </summary>
        /// <param name="context"></param>
        public void DeletePic(HttpContext context)
        {
            string id = context.Request["id"];
            Psys_Adv_BLL bll = new Psys_Adv_BLL();
            Psys_Adv adv = bll.SelectEntity(id);//根据ID查询广告
            adv.Status = 1;
            context.Response.Write(bll.Update(adv));//将广告状态改为已删除
            LogHelper.InserLog((int)EnumClass.OperateType.删除操作, PageBase.CurrentOperatName, "删除了名称为" + adv.Name + "的广告");
        }

        /// <summary>
        /// 编辑关于我们内容
        /// date:15-12-17
        /// add by fzz
        /// </summary>
        /// <param name="context"></param>
        public void EditAbout(HttpContext context) {
            var id = context.Request["id"];
            var content = context.Request["content"];
            Hashtable hb = new Hashtable();
            string userid=RequestSession.GetSessionUser().UserId;
            hb.Add("AboutContent", content);
            hb.Add("UpdateDate", DateTime.Now);
            hb.Add("LastEditAdminId", userid);
            if (new Psys_Adv_BLL().UpdateAbout(hb,id))
            {
                context.Response.Write(JsonConvert.SerializeObject(new { num = "1" })); 
            }
            else
            {
                context.Response.Write(JsonConvert.SerializeObject(new { num = "-1" })); 
            }
        }
        /// <summary>
        /// 编辑联系我们 or 关于我们
        /// date:16-05-27
        /// add by sdz
        /// </summary>
        public void UpdateContactWe(HttpContext context)
        {
            var id = context.Request["id"];
            var content = context.Request["content"];
            Hashtable hb = new Hashtable();
            //string userid = RequestSession.GetSessionUser().UserId;
            hb.Add("AboutContent", content);
            hb.Add("UpdateDate", DateTime.Now);
            //hb.Add("LastEditAdminId", userid);
            if (new Psys_Adv_BLL().UpdateAbout(hb, id))
            {
                context.Response.Write("1");
            }
            else
            {
                context.Response.Write("-1");
            }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}