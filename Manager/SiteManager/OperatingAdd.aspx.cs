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
    public partial class OperatingAdd : PageBase
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string strAction = Request.QueryString["action"];

                if (!string.IsNullOrEmpty(strAction) && strAction == "edit")
                {
                    string ID = Request["ID"] ?? "";
                    nav.InnerHtml = "您当前的位置：系统管理";
                    title.InnerHtml = "编辑权限";
                    reset.InnerHtml = "返回";
                    BindInfo(ID);
                }
                else
                {
                    nav.InnerHtml = "您当前的位置：系统管理";
                    title.InnerHtml = "添加权限";
                    reset.InnerHtml = "重置";
                    action.Value = "add";
                }
            }
        }

        /// <summary>
        /// 绑定权限信息
        /// 创建人：yxy
        /// 创建时间：2015-06-02
        /// </summary>
        /// <param name="ID"></param>
        public void BindInfo(string ID)
        {
            if (ID != "")
            {
                Sys_Operating_BLL OperatBll=new Sys_Operating_BLL();
                Sys_VW_Operating operatM = OperatBll.SelectVWModel(" ID='"+ID+"'");
                if (operatM != null)
                {
                    HidID.Value = ID;
                    name.Value = operatM.Name;
                    parentid.Value = operatM.ParentId.ToString();
                    code.Value = operatM.Code;
                    level.Value = operatM.OptionLevel.ToString();
                    url.Value = operatM.Url;
                    order.Value = operatM.SortOrder.ToString();
                    if (operatM.IsPublicOperating.Value)
                    {
                        isPublic.Value = "1";
                        isPublic2.Value = "1";
                    }
                    else
                    {
                        isPublic.Value = "0";
                        isPublic2.Value ="0";
                    }
                    description.Value = operatM.Description;
                    CreateDate.Value = operatM.CreateDate.ToString();
                }
            }
        }
    }
}