using PD.BLL;
using PD.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace PD.Manager.SiteManager
{
    public partial class NewsEdit : PageBase
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string id = Context.Request["id"] ?? "";
                string flag = Context.Request["flag"] ?? "";
                string action = Request.QueryString["action"];
                if (!string.IsNullOrEmpty(action) && action == "edit")
                {
                    //编辑
                    Newid.Value = id;
                    Cmt_VW_NewPicInfo_BLL bll = new Cmt_VW_NewPicInfo_BLL();
                    List<Cmt_VW_NewPicInfo> news = bll.GetList(id);

                    StringBuilder sb = new StringBuilder();
                    if (news.Count > 0)
                    {
                        title.Value = news[0].Title;
                        subtitle.Value = news[0].SubTitle;
                        content1.Value = news[0].N_Content;
                        source.Value = news[0].N_Source;//新闻来源
                        for (int i = 0; i < news.Count; i++)
                        {
                            //图片个数
                            if (!string.IsNullOrEmpty(news[i].PicPath) && news[i].PicPath != null)
                            {
                                string path = Server.MapPath("~/" + news[i].PicPath);

                                if (!string.IsNullOrEmpty(path))
                                {
                                    string str = "<div class='cp_img' id='" + i + "' name='" + news[i].picid + "' style='position:relative;width:121px;height:81px;margin-bottom:10px;'><img style='width:121px;height:81px;' src='../" + news[i].PicPath + "'></img><div class='cp_img_jian' style='display:none; width:121px;height:81px;'></div><div class='int_1' id='div_nameWU_FILE_" + i + "' style='left:0px;width:100%;height:20px;text-align:center;bottom:0px;color:rgb(255,255,255);line-height:20px;display:none;position:absolute;'>" + news[i].PicPath.Substring(news[i].PicPath.LastIndexOf("/") + 1) + "</div><div class='iht' id='div_WU_FILE_" + i + "' style='right:5px;bottom:5px;display:none;position:absolute;width:121px;height:81px;'></div></div>";
                                    sb.Append(str);
                                }
                            }
                        }
                        if (sb.ToString().Contains("img"))
                        {
                            fileList.InnerHtml = sb.ToString();
                            count.Value = news.Count.ToString();
                            countmore.Value = news.Count.ToString();
                        }
                        else
                        {
                            count.Value = "0";
                            countmore.Value = "0";
                        }

                    }
                    if (flag != "1")
                    {
                        back.InnerHtml = "返回";
                        htmltitile.InnerHtml = "编辑新闻";
                    }
                    else
                    {
                        back.InnerHtml = "重置";
                        htmltitile.InnerHtml = "添加新闻";
                        previewflag.Value = "1";
                    }  
                }
                else
                {
                    //添加
                    back.InnerHtml = "重置";
                    htmltitile.InnerHtml = "添加新闻";

                }
            }
        }
    }
}