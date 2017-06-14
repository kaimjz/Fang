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
    /// LogManager 的摘要说明
    /// </summary>
    public class LogManager : BaseHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string action = context.Request["action"];
            switch (action)
            {
                case "Select":
                    SelectLog(context);//查询日志(分页)
                    break;
                case "selectOperate":
                    SelectOperate(context);//绑定操作模块
                    break;
                case "exportExcel":
                    ExportExcel(context);//导出日志列表
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
            string modelid = context.Request["model"] ?? "";
            string userid = context.Request["id"] ?? "";
            List<Sys_VW_GetLogInfo> loglist;
            int totalcount = 1;
            string pageindex = context.Request["pageIndex"] ?? "";
            string pageSize = context.Request["pageSize"] ?? "";
            pageindex = type == "all" ? "1" : pageindex;
            loglist = new Sys_VW_GetLogInfo_BLL().GetLogListByPage(Convert.ToInt32(pageindex), Convert.ToInt32(pageSize), ref totalcount, userid, modelid);
            Excel.ExportExcelByMyXls<Sys_VW_GetLogInfo>(loglist, "Name,OperModel,TypeName,ToDateShort,OperResult", "操作人,操作模块,操作类型,操作日期,操作结果", "LogList.xls", "日志列表导出");
            LogHelper.InserLog((int)EnumClass.OperateType.导出操作, PageBase.CurrentOperatName, "导出了用户日志列表");
        }

        /// <summary>
        /// 查询日志列表
        /// 创建人：wsy
        /// 时间：2015-06-04
        /// </summary>
        /// <param name="context"></param>
        private void SelectLog(HttpContext context)
        {
            int totalcount = 1;
            string pageindex = context.Request["pageIndex"] ?? "";
            string pageSize = context.Request["pageSize"] ?? "";
            string modelid = context.Request["model"] ?? "";
            string userid = context.Request["id"] ?? "";

            StringBuilder table = new StringBuilder();
            table.Append("<tr><th style='width:45px;'>序号</th><th style='width:120px'>操作人</th><th style='width:150px'>操作模块</th><th style='width:150px'>操作类型</th><th style='width:140px'>操作日期</th><th style='width:260px'>操作结果</th></tr>");
            Sys_VW_GetLogInfo_BLL bll = new Sys_VW_GetLogInfo_BLL();
            List<Sys_VW_GetLogInfo> list = new List<Sys_VW_GetLogInfo>();
            list = bll.GetLogListByPage(Convert.ToInt32(pageindex), Convert.ToInt32(pageSize), ref totalcount, userid, modelid);
            if (list.Count > 0)
            {
                for (int i = 0; i < list.Count; i++)
                {
                    string datetime = list[i].CreateDate.ToString() ?? "";
                    if (datetime != "")
                    {
                        datetime = DateTimeHelper.ToString(list[i].CreateDate, DateTimeHelper.DateFormat.SHORTDATE);
                    }

                    table.Append("<tr>");
                    table.Append("<td>" + (i + 1) + "</td>");
                    table.Append("<td>" + list[i].Name + "</td>");
                    table.Append("<td>" + list[i].OperModel + "</td>");
                    table.Append("<td>" + (EnumClass.OperateType)list[i].OperType + "</td>");
                    table.Append("<td>" + datetime + "</td>");
                    table.Append("<td title='" + list[i].OperResult + "'>" + PD.Common.StringHelper.SubString(list[i].OperResult, 40) + "</td>");
                    table.Append("</tr>");
                }
                context.Response.Write(JsonConvert.SerializeObject(new { count = totalcount, data = table.ToString() }));
            }
            else
            {
                context.Response.Write("{\"count\":\"" + totalcount + "\",\"data\":\"\"}");
            }

        }

        /// <summary>
        /// 绑定操作模块
        /// 创建人：wsy
        /// 时间：2015-06-02
        /// </summary>
        /// <param name="context"></param>
        private void SelectOperate(HttpContext context)
        {
            Sys_Operating_BLL opbll = new Sys_Operating_BLL();
            List<Sys_Operating> operating = opbll.GetList(" OptionLevel=2 and Name!='用户日志'");//只查询二级页面
            operating = operating.OrderBy(p => p.Name).ToList();
            StringBuilder oper = new StringBuilder();
            oper.Append("<option value=\"\">全部</option>");
            if (operating.Count > 0)
            {
                for (int i = 0; i < operating.Count; i++)
                {
                    if (Convert.ToBoolean(operating[i].IsPublicOperating))
                    {
                        oper.Append("<option value=\"" + operating[i].ID + "\">" + operating[i].Name + "</option>");
                    }
                }
            }
            context.Response.Write(oper);
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