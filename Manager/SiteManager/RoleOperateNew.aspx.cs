using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace PD.Manager.SiteManager
{
    public partial class RoleOperateNew : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                 string roleid = Request["id"] ?? "";
                 hid_id.Value = roleid;
            }
        }
    }
}