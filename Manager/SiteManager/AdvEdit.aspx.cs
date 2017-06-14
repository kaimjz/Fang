using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using BLL;
using Model;

namespace Manager.SiteManager
{
    public partial class AdvEdit : PageBase
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string id = Request["advid"] ?? "";
                string type = Request["type"] ?? ""; //添加积分商城广告判断标识0：阅读网 1：积分商城 edit by fuzhenzhen 15-11-05
                advid.Value = id;
                pictype.Value = type;
                if (type=="1")
                {
                    advcation.InnerHtml = "您当前的位置：天鹅商城管理";
                }
                if (!string.IsNullOrEmpty(id))
                {
                    Psys_Adv adv = new Psys_Adv_BLL().SelectEntity(id);//根据ID查询广告信息
                    if (adv != null)
                    {
                        name.Value = adv.Name;
                        pic.Value = "../" + adv.PicPath;
                        pic_url.Value = adv.PicUrl;
                        sp.InnerHtml = "(" + adv.PicRemark + ")";
                        hid_isnofollow.Value = adv.IsNofollow.ToString();
                        altname.Value = adv.AltName;
                    }
                }
            }
        }
    }
}