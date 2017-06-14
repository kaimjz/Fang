using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PD.BLL;
using PD.Model;
using Newtonsoft.Json;
using System.Text;
using System.Web.SessionState;
using PD.Manager.CommonCode;
using PD.Common;

namespace PD.Manager.SiteManager.Service
{
    /// <summary>
    /// RoleManager 的摘要说明
    /// </summary>
    public class RoleManager : BaseHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string action = context.Request["action"] ?? "";
            switch (action)
            {
                case "RoleAdd":
                    RoleAdd(context);//添加角色
                    break;
                case "SelectRoleList":
                    SelectRoleList(context);//查询角色列表
                    break;
                case "EditState":
                    EditState(context);//编辑角色状态
                    break;
                case "RoleEdit":
                    RoleEdit(context);//编辑角色
                    break;
                case "AddRoleOperate":
                    AddRoleOperate(context);//添加角色权限
                    break;
                case "exportExcel":
                    ExportExcel(context);//导出角色列表
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
            string sname = StringHelper.SqlSpecialConvert(context.Request["sname"] ?? "", StringConverTypeEnum.Like);
            List<Sys_Role> roleList;
            string pageindex = context.Request["pageIndex"] ?? "";
            string pageSize = context.Request["pageSize"] ?? "";
            pageindex = type == "all" ? "1" : pageindex;
            int pageCount = 1;
            roleList = new Sys_Role_BLL().SelectEntitys(Convert.ToInt32(pageindex), Convert.ToInt32(pageSize), ref pageCount, sname);

            Excel.ExportExcelByMyXls<Sys_Role>(roleList, "Name,ToDateShort", "角色名,创建日期", "RoleList.xls", "角色列表导出");
            LogHelper.InserLog((int)EnumClass.OperateType.导出操作, PageBase.CurrentOperatName, "导出了角色列表");
        }

        /// <summary>
        /// 添加角色权限
        /// 创建人：lwj
        /// 时间：2015-6-2
        /// </summary>
        /// <param name="context"></param>
        public void AddRoleOperate(HttpContext context)
        {
            string id = context.Request["id"] ?? "";
            string roleid = context.Request["roleid"] ?? "";
            Sys_Role_BLL roleBll = new Sys_Role_BLL();
            string result = roleBll.InsertOperate(id, roleid);
            if (result == "1")
            {
                string name = "";
                Sys_Role roles = roleBll.SelectBywhere(roleid);
                if (roles != null)
                {
                    name = roles.Name;
                }
                LogHelper.InserLog((int)EnumClass.OperateType.编辑操作, PageBase.CurrentOperatName, "编辑了角色为" + name + "的权限");
            }
            context.Response.Write(result);
        }

        /// <summary>
        /// 编辑角色
        /// 创建人：lwj
        /// 时间：2015-6-2
        /// </summary>
        /// <param name="context"></param>
        public void RoleEdit(HttpContext context)
        {
            string rolename = context.Request["role"] ?? "";
            string remark = context.Request["roleRemark"] ?? "";
            string state = context.Request["state"] ?? "";
            string id = context.Request["id"] ?? "";

            Sys_Role_BLL roleBll = new Sys_Role_BLL();

            string result = roleBll.UpdateRole(id, rolename, remark, state);
            if (result == "1")
            {
                LogHelper.InserLog((int)EnumClass.OperateType.编辑操作, PageBase.CurrentOperatName, "编辑了名称为" + rolename + "的角色");
            }
            context.Response.Write(result);
        }

        /// <summary>
        /// 编辑角色状态
        /// 创建人：lwj
        /// 时间：2015-6-2
        /// </summary>
        /// <param name="context"></param>
        public void EditState(HttpContext context)
        {
            string id = context.Request["id"] ?? "";
            string satus = context.Request["state"] ?? "";
            string name = context.Request["name"] ?? "";
            Sys_Role_BLL bll = new Sys_Role_BLL();

            string result = bll.UpdateStatus("State", satus, id);
            if (result == "1")
            {
                string rolename = "";
                Sys_Role role = bll.SelectBywhere(id);
                if (role != null)
                {
                    rolename = role.Name;
                }
                if (satus == "1")
                {
                    //添加日志
                    LogHelper.InserLog((int)EnumClass.OperateType.停用操作, PageBase.CurrentOperatName, "停用了名称为" + rolename + "的角色");
                }
                else
                {
                    //添加日志
                    LogHelper.InserLog((int)EnumClass.OperateType.启用操作, PageBase.CurrentOperatName, "启用了名称为" + rolename + "的角色");
                }
            }
            context.Response.Write(result);
        }

        /// <summary>
        /// 查询角色列表
        /// 创建人：lwj
        /// 时间：2015-6-2
        /// </summary>
        /// <param name="context"></param>
        public void SelectRoleList(HttpContext context)
        {
            string pageindex = context.Request["pageIndex"] ?? "";
            string pageSize = context.Request["pageSize"] ?? "";
            string sname = StringHelper.SqlSpecialConvert(context.Request["sname"] ?? "", StringConverTypeEnum.Like);
            int pageCount = 1;
            Sys_Role_BLL rolebll = new Sys_Role_BLL();
            List<Sys_Role> roleList = rolebll.SelectEntitys(Convert.ToInt32(pageindex), Convert.ToInt32(pageSize), ref pageCount, sname);
            StringBuilder sb = new StringBuilder();
            sb.Append("<tr><th style='width:35px'>序号</th><th style='width:200px'>角色名</th><th style='width:150px'>创建日期</th><th style='width:220px'>操作</th></tr>");
            if (roleList.Count > 0)
            {
                for (int key = 0; key < roleList.Count; key++)
                {
                    var state = roleList[key].State;
                    var operate = "";
                    if (state == 1)
                    {
                        operate = "停用";
                    }
                    else
                    {
                        operate = "启用";
                    }
                    sb.Append("<tr>");
                    sb.Append("<td>" + (Convert.ToInt32(key) + 1).ToString() + "</td>");
                    sb.Append("<td>" + roleList[key].Name + "</td>");
                    sb.Append("<td>" + DateTimeHelper.ToString(roleList[key].CreateDate, DateTimeHelper.DateFormat.SHORTDATE) + "</td>");
                    sb.Append("<td>");
                    
                    //sb.Append("<a href='RoleOperateNew.aspx?id=" + roleList[key].ID + "'>角色授权</a>");
                    sb.Append("<a href=\"javascript:weboxshow('"+roleList[key].ID+"','"+roleList[key].Name+"')\">角色授权</a>");
                    sb.Append("<a href='RoleEdit.aspx?action=edit&id=" + roleList[key].ID + "'>编辑</a>");
                    sb.Append("<a href=\"javascript:OperateEdit('" + roleList[key].ID + "','" + roleList[key].State + "')\">" + operate + "</a>");

                    sb.Append("</td>");
                    sb.Append("</tr>");
                }
                context.Response.Write(JsonConvert.SerializeObject(new { count = pageCount, data = sb.ToString() }));
            }
            else
            {
                context.Response.Write(JsonConvert.SerializeObject(new { count = pageCount, data = "" }));
            }

        }


        /// <summary>
        /// 添加角色
        /// 创建人：lwj
        /// 时间：2015-6-2
        /// </summary>
        /// <param name="context"></param>
        public void RoleAdd(HttpContext context)
        {
            string rolename = context.Request["role"] ?? "";
            string remark = context.Request["roleRemark"] ?? "";
            string state = context.Request["state"] ?? "";
            Sys_Role_BLL roleBll = new Sys_Role_BLL();

            string result = roleBll.InsertEntity(rolename, remark, state);
            if (result == "1")
            {
                LogHelper.InserLog((int)EnumClass.OperateType.新增操作, PageBase.CurrentOperatName, "添加了名称为" + rolename + "的角色");
            }
            context.Response.Write(result);
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