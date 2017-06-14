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
    public partial class UserEdit : PageBase
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string id = Context.Request["id"] ?? "";
                string roleid = Context.Request["roleid"] ?? "";
                string action = Request.QueryString["action"];
                if (!string.IsNullOrEmpty(action) && action == "edit")
                {
                    //编辑
                    location.InnerHtml = "系统管理";
                    title.InnerHtml = htmlname.Text = "编辑用户";
                    back.InnerHtml = "返回";
                    this.userid.Value = id;
                    this.roleid.Value = roleid;

                    Sys_AdminUser user = new Sys_AdminUser_BLL().SelectUser(id);//根据ID查询后台用户
                    this.username.Value = user.Name;
                    realName.Value = user.RealName;
                    email.Value = user.Email;
                    tel.Value = user.Telephone;
                    if (user.Status.ToString() == "0")
                    {
                        statusFalse.Checked = true;
                    }
                    else
                    {
                        statusTrue.Checked = true;
                    }
                    remark.Value = user.Remark;
                }
                else
                {
                    //添加
                    location.InnerHtml = "系统管理";
                    title.InnerHtml = htmlname.Text = "添加用户";
                    back.InnerHtml = "重置";
                }
            }
        }
    }
}