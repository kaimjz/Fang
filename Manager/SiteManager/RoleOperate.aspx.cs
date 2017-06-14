using PD.BLL;
using PD.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace PD.Manager.SiteManager
{
    public partial class RoleOperate : PageBase
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if(!IsPostBack)
            {
                
                string id = Context.Request["id"] ?? "";
                //string name=Context.Request["name"]??"";
                if(string.IsNullOrEmpty(id))
                {
                    return;
                }
                this.id.Value = id;
               // this.name.Value = name;
                int totalCount = 0;
                Sys_Operating_BLL bll=new Sys_Operating_BLL();
                List<Sys_RoleOperating> roleList =new Sys_Role_BLL().GetListOperate(id);
                string[] allIDs = roleList.Select(p=>p.OperatingId.ToString()).ToArray();//该角色授权过的所有权限
                List<Sys_Operating> operList= bll.GetList("",false);//父级
                totalCount += operList.Count;
                foreach(var key in operList)
                {
                    //查询子级
                    List<Sys_Operating> childList = bll.GetList(key.ID.ToString(), true);
                    totalCount += childList.Count;
                }
                StringBuilder html =new StringBuilder();
                foreach (var key in operList)
                {
                    //查询子级
                    List<Sys_Operating> childList = bll.GetList(key.ID.ToString(),true);
                    
                    html.Append("<div class='user_jur_h1'><span><input type='checkbox'  newname='MySelect' count='" + childList.Count + "' value='" + key.ID + "' id='" + key.ID + "' onclick='CheckBoxP(this,"+totalCount+")' " + (allIDs.Contains(key.ID.ToString()) ? "checked=checked" : "") + "/><em>" + key.Name + "</em></span></div>");
                    if(childList.Count>0)
                    {
                        html.Append("<div class='user_jur_h2'>");
                         foreach (var item in childList)
                         {
                             html.Append("  <span><input type='checkbox' name='" + item.ParentId + "' count='" + childList.Count + "' id='" + item.ID + "' value='" + item.ID + "' onclick='CheckBoxC(this,"+totalCount+")'  newname='MySelect' " + (allIDs.Contains(item.ID.ToString()) ? "checked=checked" : "") + " /><em>" + item.Name + "</em></span>");
                         }
                         html.Append("</div>");
                    }
                }
                
                html.Append(" <div class='user_jur_h3'><span><input type='checkbox' id='selectAll' " + (Regex.Matches(html.ToString(), @"checked").Count / 2 == totalCount ? "checked=checked" : "") + "  onclick='selectAlls()'/><em>全选</em></span></div>");
                this.operates.InnerHtml=html.ToString();
            }
        }
    }
}