using PD.BLL;
using PD.Model;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace PD.Manager.SiteManager
{
    public partial class NewsPreview : PageBase
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string id = Context.Request["id"] ?? "";
                string flag = Context.Request["flag"] ?? "";
                if (string.IsNullOrEmpty(id))
                {
                    return;
                }

                newid.Value = id;//add by wsy
                if (flag == "1")
                {
                    //预览
                    newid.Value = id;
                    hid_preview.Value = "1";
                }
                Cmt_VW_NewPicInfo_BLL bll = new Cmt_VW_NewPicInfo_BLL();
                List<Cmt_VW_NewPicInfo> news = bll.GetList(id, false);

                if (news.Count > 0)
                {
                    title.InnerHtml = news[0].Title;
                    content.InnerHtml = news[0].N_Content;
                    subtitle.InnerHtml = news[0].SubTitle;
                    StringBuilder sb = new StringBuilder();
                    StringBuilder sb1 = new StringBuilder();
                    sb1.Append("<ul class='filmstrip'>");
                    for (int i = 0; i < news.Count; i++)
                    {
                        if (news[i].PicPath != "" && news[i].PicPath != null)
                        {
                            sb.Append("<div class='panel' style='margin:0 auto;'>");
                            sb.Append("<img src=../" + news[i].PicPath + " style='width:600px;height:300px;'></img>");
                            sb.Append("</div>");
                            sb1.Append("<li>");

                            sb1.Append("<img src=../" + news[i].PicPath + " style='width:80px;height:80px;'></img>");
                            sb1.Append("</li>");
                        }
                    }
                    sb1.Append("</ul>");
                    if (sb.ToString().Contains("img"))
                    {
                        img.Value = sb.ToString() + sb1.ToString();
                    }
                }
            }
        }
    }
}