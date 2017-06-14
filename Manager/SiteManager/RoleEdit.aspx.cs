using PD.BLL;
using PD.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace PD.Manager.SiteManager
{
    public partial class RoleEdit : PageBase
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if(!IsPostBack)
            {
                string action = Request.QueryString["action"];
                string id = Context.Request["id"] ?? "";
                if (!string.IsNullOrEmpty(action) && action == "edit")
                {
                    //编辑
                    this.id.Value = id;
                    this.Reset.InnerHtml = "返回";
                    Sys_Role_BLL roleBll = new Sys_Role_BLL();
                    Sys_Role role = roleBll.SelectBywhere(id);
                    this.role.Value = role.Name;
                    this.roleRemark.Value = role.Description;
                    if(role.State==1)
                    {
                        this.operate.Checked = true;
                    }
                    else
                    {
                        this.operate1.Checked = true;
                    }
                    this.tou.InnerHtml = "编辑角色";
                }
                else
                {
                    //添加
                    this.Reset.InnerHtml = "重置";
                    this.tou.InnerHtml = "添加角色";
                }
            }
        }
    }
}