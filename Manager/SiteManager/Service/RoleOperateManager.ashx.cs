using Newtonsoft.Json;
using PD.BLL;
using PD.Manager.CommonCode;
using PD.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

namespace PD.Manager.SiteManager.Service
{
    /// <summary>
    /// RoleOperateManager 的摘要说明
    /// </summary>
    public class RoleOperateManager : BaseHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            string action = context.Request["action"] ?? "";
            context.Response.ContentType = "text/plain";
            switch (action)
            {
                case "zTree":
                    getZTree(context);
                    break;
                case "AddRoleOperateNew":
                    AddRoleOperateNew(context);
                    break;
                case "OperateLevel":
                    OperateLevel(context);
                    break;
                case "GetOpidByUrl": //add by zfj 根据url 查询权限id 2016-3-18
                    GetOpidByUrl(context); break;
            }
        }

        public void GetOpidByUrl(HttpContext context)
        {
            string opUrl = context.Request["opUrl"] ?? "";
            if (string.IsNullOrEmpty(opUrl))
            {
                context.Response.Write("0");
            }
            else
            {
                Sys_Operating_BLL bll = new Sys_Operating_BLL();
                Sys_Operating op = bll.SelectModel(" url like '%" + opUrl + "%' ");
                if (op != null)
                {
                    context.Response.Write(op.ID);
                }
                else
                {
                    context.Response.Write("0");
                }
            }

        }

        /// <summary>
        /// 绑定tree列表
        /// add by fzz
        /// 16-03-02
        /// </summary>
        /// <param name="context"></param>
        public void getZTree(HttpContext context)
        {
            string id = context.Request["id"] ?? "";
            if (string.IsNullOrEmpty(id))
            {
                return;
            }
            Sys_Operating_BLL bll = new Sys_Operating_BLL();
            List<Sys_RoleOperating> roleList = new Sys_Role_BLL().GetListOperate(id);
            string[] allIDs = roleList.Select(p => p.OperatingId.ToString()).ToArray();//该角色授权过的所有权限
            List<Sys_Operating> oList = bll.GetList("");
            StringBuilder sstr = new StringBuilder();
            if (oList != null && oList.Count > 0)
            {
                foreach (var item in oList)
                {
                    sstr.Append("{ \"id\": \"" + item.ID + "\", \"pId\": \"" + item.ParentId + "\", \"name\": \"" + item.Name + "\"" + (item.ParentId == null ? ",\"open\":true" : "") + (allIDs.Contains(item.ID + "") ? ",\"checked\": true}," : "},"));
                }
            }
            //context.Response.Write(JsonConvert.SerializeObject(oList));
            context.Response.Write("[" + sstr.ToString().TrimEnd(',') + "]");
        }

        /// <summary>
        /// 角色授权
        /// add by fzz
        /// 16-03-02
        /// </summary>
        /// <param name="context"></param>
        public void AddRoleOperateNew(HttpContext context)
        {
            string id = context.Request["id"] ?? "";
            string roleid = context.Request["roleid"] ?? "";
            Sys_Role_BLL roleBll = new Sys_Role_BLL();
            string result = roleBll.InsertOperateNew(id, roleid);
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
        /// 获取三级权限
        /// add by fzz
        /// 16-03-02
        /// </summary>
        /// <param name="context"></param>
        public void OperateLevel(HttpContext context)
        {
            string id = context.Request["id"] ?? "";
            string roleid = context.Request["roleid"] ?? "";
            StringBuilder sb = new StringBuilder();
            List<Sys_Operating> rolelist = new Sys_Role_BLL().OperateLevel(roleid, id);
            context.Response.Write(JsonConvert.SerializeObject(rolelist));
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