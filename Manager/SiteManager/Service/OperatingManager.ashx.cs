using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PD.BLL;
using PD.Model;
using Newtonsoft.Json;
using System.Text;
using PD.Common;
using PD.Manager.CommonCode;

namespace PD.Manager.SiteManager.Service
{
    /// <summary>
    /// OperatingManager 的摘要说明
    /// </summary>
    public class OperatingManager : BaseHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string action = context.Request["action"] ?? "";
            switch (action)
            {
                case "OperatingAdd":
                    OperatingAdd(context);//添加权限
                    break;
                case "OperatingEdit":
                    OperatingEdit(context);//编辑权限
                    break;
                case "OperatingList":
                    OperatingList(context);//权限列表
                    break;
                case "exportExcel":
                    ExportExcel(context);//导出权限列表
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
            string name = StringHelper.SqlSpecialConvert(context.Request["sname"] ?? "", StringConverTypeEnum.Like);
            List<Sys_VW_Operating> oplist;
            Sys_Operating_BLL bll = new Sys_Operating_BLL();
            string pageIndex = context.Request["pageIndex"] ?? "";
            string pageSize = context.Request["pageSize"] ?? "";
            pageIndex = type == "all" ? "1" : pageIndex;
            int pageCount = 1;
            oplist = bll.GetListByPage(Convert.ToInt32(pageIndex), Convert.ToInt32(pageSize), name, ref pageCount);//权限列表
            Excel.ExportExcelByMyXls<Sys_VW_Operating>(oplist, "Name,ParentName,Code,OptionLevel,Url,Description,SortOrder,IsPublicName,ToDateShort", "权限名称,父级权限,编号,操作级别,链接地址,权限描述,权限排序,是否公共操作,创建日期", "OperatingList.xls", "权限列表导出");
            LogHelper.InserLog((int)EnumClass.OperateType.导出操作, PageBase.CurrentOperatName, "导出了权限列表");
        }

        /// <summary>
        /// 获取菜单列表
        /// 创建人：yxy
        /// 时间：2015-06-02
        /// </summary>
        /// <param name="context"></param>
        public void OperatingList(HttpContext context)
        {
            Sys_Operating_BLL bll = new Sys_Operating_BLL();
            string pageIndex = context.Request["pageIndex"] ?? "";
            string pageSize = context.Request["pageSize"] ?? "";
            string name = StringHelper.SqlSpecialConvert(context.Request["sname"] ?? "", StringConverTypeEnum.Like);
            int pageCount = 1;
            StringBuilder sb = new StringBuilder();
            List<Sys_VW_Operating> list = bll.GetListByPage(Convert.ToInt32(pageIndex), Convert.ToInt32(pageSize), name, ref pageCount);
            if (list.Count > 0)
            {
                sb.Append("<tr><th>权限名称</th><th>父级权限</th><th>编号</th><th>操作级别</th><th>链接地址</th><th>权限描述</th><th>权限排序</th><th>是否公共操作</th><th>创建日期</th><th>基本操作</th></tr>");
                foreach (var item in list)
                {
                    string isPublic = "";
                    if (item.IsPublicOperating.Value)
                        isPublic = "公开";
                    else
                        isPublic = "不公开";

                    sb.Append("<tr>");
                    //sb.Append("<td><input type='checkbox' value='" + item.ID + "' name='MySelect'/></td>");
                    sb.Append("<td>" + item.Name + "</td>");
                    sb.Append("<td>" + item.ParentName + "</td>");
                    sb.Append("<td>" + item.Code + "</td>");
                    sb.Append("<td>" + item.OptionLevel + "</td>");
                    sb.Append("<td>" + item.Url + "</td>");
                    sb.Append("<td>" + item.Description + "</td>");
                    sb.Append("<td>" + item.SortOrder + "</td>");
                    sb.Append("<td>" + isPublic + "</td>");
                    sb.Append("<td>" + DateTimeHelper.ToString(item.CreateDate.Value, PD.Common.DateTimeHelper.DateFormat.SHORTDATE) + "</td>");
                    sb.Append("<td>");
                    sb.Append("<a href='OperatingAdd.aspx?action=edit&ID=" + item.ID + "'>编辑</a>");
                    //sb.Append("<a href=''>删除</a>");
                    sb.Append("</td>");
                    sb.Append("</tr>");
                }

                context.Response.Write("{\"count\":\"" + pageCount + "\",\"data\":\"" + sb.ToString().Replace("\r", "").Replace("\n", "").Replace("\t", "") + "\"}");
            }
            else
            {
                context.Response.Write("{\"count\":\"0\",\"data\":\"\"}");
            }
        }

        /// <summary>
        /// 添加菜单
        /// 创建人：yxy
        /// 时间：2015-06-2
        /// </summary>
        public void OperatingAdd(HttpContext context)
        {
            PD.BLL.Sys_Operating_BLL bll = new Sys_Operating_BLL();
            Sys_Operating model = new Sys_Operating();
            model.ID = Guid.NewGuid();
            model.Name = context.Request["name"];
            if (context.Request["parentid"] == "" || context.Request["parentid"] == null)
            { model.ParentId = null; }
            else
            {
                model.ParentId = new Guid(context.Request["parentid"]);
            }
            model.Code = context.Request["code"];
            if (context.Request["level"] == "")
            { model.OptionLevel = null; }
            else { model.OptionLevel = Convert.ToInt32(context.Request["level"]); }
            model.Url = context.Request["url"];
            if (context.Request["order"] == "")
            { model.SortOrder = null; }
            else { model.SortOrder = Convert.ToInt32(context.Request["order"]); }
            if (context.Request["isPublic2"] == "" || context.Request["isPublic2"] == null)
            {
                model.IsPublicOperating = null;
            }
            else if (context.Request["isPublic2"] == "1")
            { model.IsPublicOperating = true; }
            else if (context.Request["isPublic2"] == "0")
            { model.IsPublicOperating = false; }
            model.Description = context.Request["description"];
            //model.CreateDate = DateTime.Now;

            if (bll.Insert(model))
            {
                context.Response.Write("1");
            }
            else { context.Response.Write("0"); }
        }

        /// <summary>
        /// 编辑权限
        /// 创建人：yxy
        /// 创建时间：2015-06-02
        /// </summary>
        /// <param name="context"></param>
        public void OperatingEdit(HttpContext context)
        {
            PD.BLL.Sys_Operating_BLL bll = new Sys_Operating_BLL();
            Sys_Operating model = new Sys_Operating();
            model.ID = new Guid(context.Request["HidID"] ?? "");
            model.Name = context.Request["name"];
            if (context.Request["parentid"] == "" || context.Request["parentid"] == null)
            { model.ParentId = null; }
            else
            {
                model.ParentId = new Guid(context.Request["parentid"]);
            }
            model.Code = context.Request["code"];
            if (context.Request["level"] == "")
            { model.OptionLevel = null; }
            else { model.OptionLevel = Convert.ToInt32(context.Request["level"]); }
            model.Url = context.Request["url"];
            if (context.Request["order"] == "")
            { model.SortOrder = null; }
            else { model.SortOrder = Convert.ToInt32(context.Request["order"]); }
            if (context.Request["isPublic2"] == "" || context.Request["isPublic2"] == null)
            {
                model.IsPublicOperating = null;
            }
            else if (context.Request["isPublic2"] == "1")
            { model.IsPublicOperating = true; }
            else if (context.Request["isPublic2"] == "0")
            { model.IsPublicOperating = false; }
            model.Description = context.Request["description"];
            if (context.Request["CreateDate"] == "")
                model.CreateDate = DateTime.Now;
            else
                model.CreateDate = Convert.ToDateTime(context.Request["CreateDate"]);

            if (bll.Update(model))
            {
                context.Response.Write("1");
            }
            else
            {
                context.Response.Write("0");
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