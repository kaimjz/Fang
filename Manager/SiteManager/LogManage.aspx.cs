using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using PD.BLL;
using PD.Model;

namespace PD.Manager.SiteManager
{
    public partial class LogManage : PageBase
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            this.logid.Value = Request["id"] ?? "";
        }
    }
}