using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Commons;

namespace Manager.UserControls
{
    public partial class UC_Top : System.Web.UI.UserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            userName.InnerText = RequestSession.GetSessionUser().UserName;
        }
    }
}