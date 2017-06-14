using Newtonsoft.Json;
using BLL;
using Commons;
using Models;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;

namespace Manager.SiteManager.Service
{
    /// <summary>
    /// NewsManager 的摘要说明
    /// </summary>
    public class NewsManager : BaseHttpHandler
    {
        public static object obj = new object();

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string action = context.Request["action"] ?? "";
            switch (action)
            {
                case "addNews":
                    AddNews(context);//添加新闻
                    break;
                case "newsList":
                    NewsList(context);//查询新闻列表
                    break;
                case "editNews":
                    EditNews(context);//编辑新闻
                    break;
                case "deleteNews":
                    DeleteNews(context);//删除新闻
                    break;
                case "updateStatus":
                    UpdateStatus(context);//修改状态
                    break;
                case "topImgAdd":
                    TopImgAdd(context);//设置头条
                    break;
                case "imgUpload":
                    ImgUpload(context);//上传图片
                    break;
                case "repeatName":
                    RepeatName(context);//判新闻名称是否重复
                    break;
                    //case "exportExcel":
                    //    ExportExcel(context);//导出新闻列表
                    //    break;

            }
        }

        ///// <summary>
        ///// 导出Excel列表
        ///// 时间：2015-08-16
        ///// 创建人：wsy
        ///// </summary>
        ///// <param name="context"></param>
        //public void ExportExcel(HttpContext context)
        //{
        //    string type = context.Request["type"];
        //    string sname = StringHelper.SqlSpecialConvert(context.Request["sname"] ?? "", StringConverTypeEnum.Like);
        //    List<Cmt_VW_NewsAdminUser> newslist;
        //    string pageIndex = context.Request["pageIndex"] ?? "";
        //    string pageSize = context.Request["pageSize"] ?? "";
        //    pageIndex = type == "all" ? "1" : pageIndex;
        //    string status = context.Request["status"] ?? "";
        //    int pageCount = 1;
        //    newslist = new Site_News_BLL().SelectNewsUser(Convert.ToInt32(pageIndex), Convert.ToInt32(pageSize), sname, status, ref pageCount);
        //    Excel.ExportExcelByMyXls<Cmt_VW_NewsAdminUser>(newslist, "Title,ReadCount,Name,ToDateShort", "标题,阅读数量,提交人,发布时间", "NewsList.xls", "新闻列表导出");
        //    LogHelper.InserLog((int)EnumClass.OperateType.导出操作, PageBase.CurrentOperatName, "导出了新闻列表");
        //}

        /// <summary>
        /// 判断新闻标题重复
        /// 创建人：Lwj
        /// 时间：2015-7-21
        /// </summary>
        /// <param name="context"></param>
        private void RepeatName(HttpContext context)
        {
            string title = context.Request["title"] ?? "";
            string id = context.Request["id"] ?? "";
            Site_News_Pic.EditCount = context.Request["commitImg"] ?? "";

            if (new Site_News_BLL().IsExists(title, id) == Enums.TickLingEnum.Existence)
            {
                //重复
                context.Response.Write("1");
            }
            else
            {
                context.Response.Write("0");
            }
        }

        /// <summary>
        /// 上传图片
        /// 创建人：lwj
        /// 时间：2015-7-21
        /// </summary>
        /// <param name="context"></param>
        private void ImgUpload(HttpContext context)
        {
            context.Response.ContentEncoding = System.Text.Encoding.UTF8;
            if (context.Request["REQUEST_METHOD"] == "OPTIONS")
            {
                context.Response.End();
            }

            string basePath = context.Server.MapPath("~/Upload/NewsPic/");
            var name = string.Empty;
            basePath = (basePath.IndexOf("~") > -1) ? System.Web.HttpContext.Current.Server.MapPath(basePath) :
            basePath;
            HttpFileCollection files = System.Web.HttpContext.Current.Request.Files;
            //如果目录不存在，则创建目录
            if (!Directory.Exists(basePath))
            {
                Directory.CreateDirectory(basePath);
            }
            try
            {
                //判断编辑时，除去原本图片，新增的图片个数
                if (Site_News_Pic.ImgPath.Count == 10 - Convert.ToInt32(Site_News_Pic.EditCount))
                {
                    return;
                }
            }
            catch
            {

            }
            var suffix = files[0].ContentType.Split('/');
            //获取文件格式
            var _suffix = suffix[1].Equals("jpeg", StringComparison.CurrentCultureIgnoreCase) ? "" : suffix[1];
            var _temp = System.Web.HttpContext.Current.Request["name"];

            //如果不修改文件名，则创建随机文件名
            Random rand = new Random(24 * (int)DateTime.Now.Ticks);
            name = rand.Next() + "." + _temp.Substring(_temp.LastIndexOf(".") + 1);
            //文件保存
            var full = basePath + name;
            lock (obj)//阻止进程之间访问冲突
            {
                files[0].SaveAs(full);
                //保存下的图片名称添加到公共变量中
                Site_News_Pic pic = new Site_News_Pic()
                {
                    PicPath = "/Upload/NewsPic/" + name,
                    Px = Site_News_Pic.Count,
                    UseId = Guid.Parse(RequestSession.GetSessionUser().UserId),
                    ID = Guid.NewGuid(),
                    CreateDate = DateTime.Now,
                    Status = 0
                };
                Site_News_Pic.ImgPath.Add(pic);
                Site_News_Pic.Count++;//图片排序
            }
            var _result = "{\"jsonrpc\" : \"2.0\", \"result\" : null, \"id\" : \"" + name + "\"}";
            System.Web.HttpContext.Current.Response.Write(_result);
        }
        /// <summary>
        /// 添加新闻
        /// 创建人：lwj
        /// 时间：2015-6-15
        /// </summary>
        /// <param name="context"></param>
        private void AddNews(HttpContext context)
        {
            string title = context.Request["title"] ?? "";
            string content = context.Request["content"] ?? "";
            string source = context.Request["source"] ?? "";
            string subtitle = context.Request["subtitle"] ?? "";
            string draftbox = context.Request["draftbox"] ?? "0";//是否保存草稿箱  0 否 1是 add  by fuzhenzhen

            Site_News news = new Cmt_News();
            news.ID = Guid.NewGuid();
            news.N_Content = content;
            news.Title = title;
            news.UserID = new Guid(userid);
            news.CreateDate = dt;
            news.N_Source = source;
            news.CreateDate = DateTime.Now;
            news.isTop = 0;
            news.N_Type = 0;
            news.ReadCount = 0;
            if (draftbox == 1)
            {
                news.Status = 2;//草稿箱状态
            }
            else
            {
                news.Status = 1;
            }
            news.UpdateTime = DateTime.Now;
            news.SubTitle = subtitle;

            string result = new Site_News_BLL().InsertNews(title, content, RequestSession.GetSessionUser().UserId, DateTime.Now, Site_News_Pic.ImgPath, source, subtitle, Convert.ToInt32(draftbox));
            //if (result != "")
            //{
            //    //添加日志 
            //    LogHelper.InserLog((int)EnumClass.OperateType.新增操作, PageBase.CurrentOperatName, "添加了标题为" + title + "的新闻");
            //}
            //清空公共变量
            Site_News_Pic.ImgPath.Clear();
            Site_News_Pic.Count = 0;
            context.Response.Write(result);
        }

        /// <summary>
        /// 上传图片
        /// 创建人：lwj
        /// 时间：2015-7-14
        /// </summary>
        /// <param name="context"></param>
        /// <param name="_file"></param>
        /// <returns></returns>
        private string UploadImg(HttpContext context, HttpFileCollection _file)
        {
            string _tp = "";
            string path = "";
            string time = "";

            //文件格式
            _tp = System.IO.Path.GetExtension(_file[0].FileName);
            if (_tp.ToLower() == ".jpg" || _tp.ToLower() == ".jpeg" || _tp.ToLower() == ".gif" || _tp.ToLower() == ".png" || _tp.ToLower() == ".swf")
            {

                path = context.Server.MapPath("~/Upload/NewsPic");//保存路径
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }
                time = DateTime.Now.ToString("yyyyMMddHHmmss");
                _file[0].SaveAs(path + "\\" + time + _tp);//保存原图片
                return "/Upload/NewsPic/" + time + _tp;

            }
            else
            {
                //图片格式错误
                return "-3";
            }
        }
        /// <summary>
        /// 设置头条
        /// 创建人：lwj
        /// 时间：2015-7-18
        /// </summary>
        /// <param name="context"></param>
        private void TopImgAdd(HttpContext context)
        {
            string remark = context.Request["remark"] ?? "";
            string id = context.Request["id"] ?? "";
            string status = context.Request["status"] ?? "";
            string div = context.Request["div"] ?? "";
            Site_News_BLL bll = new Site_News_BLL();

            if (status == "1")
            {
                //取消头条
                string result = bll.UpdateTop(id, DateTimeHelper.GetNow(), status);
                context.Response.Write(result);
            }
            else
            {
                if (div == "none")
                {
                    context.Response.Write("-2");
                    return;
                }
                System.Web.HttpFileCollection _file = System.Web.HttpContext.Current.Request.Files;
                if (_file.Count > 0)
                {
                    string retflag = UploadImg(context, _file);
                    if (retflag != "-3" && retflag != "-1")
                    {
                        //图片保存成功
                        string result = bll.UpdateTop(id, DateTimeHelper.GetNow(), status, remark, retflag);
                        context.Response.Write(result);
                    }
                    else
                    {
                        context.Response.Write(retflag);
                    }
                }
                else
                {
                    context.Response.Write("-2");
                }
            }

        }
        /// <summary>
        /// 编辑状态
        /// 创建人：lwj
        /// 时间：2015-6-16
        /// </summary>
        /// <param name="context"></param>
        private void UpdateStatus(HttpContext context)
        {
            string status = context.Request["status"] ?? "";
            string id = context.Request["id"] ?? "";
            string result = new Site_News_BLL().UpdateNewsStatus(id, status, DateTimeHelper.GetNow());
            context.Response.Write(result);
        }
        /// <summary>
        /// 删除新闻
        /// 创建人：lwj
        /// 时间：2015-6-16
        /// </summary>
        /// <param name="context"></param>
        private void DeleteNews(HttpContext context)
        {
            string deleteids = context.Request["id"] ?? "";

            //记录要删除的新闻以及图片
            List<Cmt_VW_NewPicInfo> DeletNews = new List<Cmt_VW_NewPicInfo>();
            if (!string.IsNullOrEmpty(deleteids))
            {
                DeletNews = new Cmt_VW_NewPicInfo_BLL().GetListInfos(deleteids.Remove(deleteids.Length - 1));
            }

            string result = new Site_News_BLL().DeleteNews(deleteids);//删除后的返回值
            if (result == "1")
            {
                foreach (var item in DeletNews)
                {
                    #region 剔除文件夹中新闻内容里的图片
                    string regex = "<img.*?/>";
                    MatchCollection notu = StringHelper.GetValue(regex, item.N_Content);

                    if (notu.Count > 0)
                    {
                        for (int j = 0; j < notu.Count; j++)
                        {
                            int place = notu[j].Value.IndexOf("src=") + 5;
                            string hou = notu[j].Value.Substring(place);
                            int yin = hou.IndexOf("\"");
                            string src = hou.Substring(0, yin);//图片路径
                            if (!string.IsNullOrEmpty(src))
                            {
                                try
                                {
                                    string pa = System.Web.HttpContext.Current.Server.MapPath("~/" + src);
                                    if (File.Exists(pa))
                                    {
                                        File.Delete(pa);
                                    }
                                }
                                catch
                                {
                                    continue;
                                }
                            }
                        }
                    }
                    #endregion
                    #region 删除文件夹中的轮播图片
                    try
                    {
                        string pa = System.Web.HttpContext.Current.Server.MapPath("~/" + item.PicPath);
                        if (File.Exists(pa))
                        {
                            File.Delete(pa);
                        }
                    }
                    catch
                    {
                        continue;
                    }
                    #endregion
                    #region   删除文件夹中的头条图片
                    if (item.isTop == 1)
                    {
                        try
                        {
                            string path = System.Web.HttpContext.Current.Server.MapPath("~/" + item.BannerPic);
                            if (File.Exists(path))
                            {
                                File.Delete(path);
                            }
                        }
                        catch
                        {
                            continue;
                        }
                    }
                    #endregion
                    //添加日志
                    LogHelper.InserLog((int)EnumClass.OperateType.删除操作, PageBase.CurrentOperatName, "删除了标题为" + item.Title + "的新闻");
                }

            }
            context.Response.Write(result);
        }
        /// <summary>
        /// 编辑新闻
        /// 创建人：lwj
        /// 时间：2015-6-16
        /// </summary>
        /// <param name="context"></param>
        private void EditNews(HttpContext context)
        {
            string title = context.Request["title"] ?? "";
            string content = context.Request["content"] ?? "";
            string id = context.Request["id"] ?? "";
            string deletepic = context.Request["deletepic"] ?? "";//要删除的图片的id
            string source = context.Request["source"] ?? "";
            string subtitle = context.Request["subtitle"] ?? "";
            string draftbox = context.Request["draftbox"] ?? "0";//是否保存草稿箱  0 否 1是 add  by fuzhenzhen

            Site_News_BLL newsbll = new Site_News_BLL();
            Site_News news = newsbll.SelectNews(id);
            string oldContent = news.N_Content;
            List<Site_News_Pic> pic = new List<Site_News_Pic>();
            //记录要删除的新闻轮播图片
            if (!string.IsNullOrEmpty(deletepic))
            {
                pic = newsbll.SelectNewsPic(deletepic.Remove(deletepic.Length - 1));
            }
            //编辑新闻内容和图片 //deit by fuzhenzhen 09-15
            string result = newsbll.UpdateNews(id, title, content, Site_News_Pic.imgPath, deletepic, source, subtitle, Convert.ToInt32(draftbox));
            if (result == "1")
            {
                #region 剔除新闻内容里的文件夹图片
                string regex = "<img.*?/>";
                MatchCollection notu = StringHelper.GetValue(regex, content);
                MatchCollection oldtu = StringHelper.GetValue(regex, oldContent);
                for (int j = 0; j < oldtu.Count; j++)
                {
                    if (!content.Contains(oldtu[j].Value))
                    {
                        //现在的不包含以前的
                        int place = oldtu[j].Value.IndexOf("src=") + 5;
                        string hou = oldtu[j].Value.Substring(place);
                        int yin = hou.IndexOf("\"");
                        string src = hou.Substring(0, yin);//图片路径
                        if (!string.IsNullOrEmpty(src))
                        {
                            try
                            {
                                string pa = System.Web.HttpContext.Current.Server.MapPath("~/" + src);
                                if (File.Exists(pa))
                                {
                                    File.Delete(pa);
                                }
                            }
                            catch
                            {
                                continue;
                            }
                        }
                    }
                }

                #endregion
                #region 删除文件夹里的图片
                if (pic.Count > 0)
                {
                    foreach (var item in pic)
                    {
                        try
                        {
                            string pa = System.Web.HttpContext.Current.Server.MapPath("~/" + item.PicPath);
                            if (File.Exists(pa))
                            {
                                File.Delete(pa);
                            }
                        }
                        catch
                        {
                            continue;
                        }
                    }
                }
                #endregion
                //添加日志
                LogHelper.InserLog((int)EnumClass.OperateType.编辑操作, PageBase.CurrentOperatName, "编辑了标题为" + title + "的新闻");
            }
            //重置公共变量
            Site_News_Pic.imgPath = new List<Site_News_Pic>();
            Site_News_Pic.count = 0;
            context.Response.Write(result);
        }
        /// <summary>
        /// 查询列表
        /// 创建人：lwj
        /// 时间：2015-6-16
        /// </summary>
        /// <param name="context"></param>
        private void NewsList(HttpContext context)
        {
            string pageIndex = context.Request["pageIndex"] ?? "";
            string pageSize = context.Request["pageSize"] ?? "";
            string sname = StringHelper.SqlSpecialConvert(context.Request["sname"] ?? "", StringConverTypeEnum.Like);
            string status = context.Request["status"] ?? "";
            int pageCount = 0;
            List<Cmt_VW_NewsAdminUser> newslist = new Site_News_BLL().SelectNewsUser(Convert.ToInt32(pageIndex), Convert.ToInt32(pageSize), sname, status, ref pageCount);
            StringBuilder sb = new StringBuilder();
            string revert = string.Empty;

            string top = string.Empty;
            int topcount = 0;
            if (newslist.Count > 0)
            {
                sb.Append("<tr><th></th><th style='width:50px;'>序号</th><th style='width:250px;'>标题</th><th style='width:90px;'>阅读数量</th><th style='width:100px;'>提交人</th><th style='width:150px;'>发布时间</th><th>操作</th></tr>");
                foreach (var item in newslist)
                {
                    if (item.isTop == 1)
                    {
                        topcount++;
                    }
                }
                for (int i = 0; i < newslist.Count; i++)
                {
                    if (newslist[i].Status == 1)
                    {
                        revert = "取消发布";
                    }
                    else if (newslist[i].Status == 2)
                    {
                        revert = "草稿箱";
                    }
                    else
                    {
                        revert = "发布";
                    }
                    if (newslist[i].isTop == 1)
                    {
                        top = "取消头条";
                    }
                    else
                    {
                        top = "设置头条";
                    }

                    sb.Append("<tr>");
                    sb.Append("<td><input  name='MySelect' value='" + newslist[i].ID + "' type='checkbox'></td>");
                    sb.Append("<td>" + (i + 1) + "</td>");
                    sb.Append("<td title='" + StringHelper.SqlInsertEncode(newslist[i].Title) + "'><a href='/SiteManager/NewsPreview.aspx?id=" + newslist[i].ID + "'>" + StringHelper.SubString(newslist[i].Title, 35).Replace(" ", "&nbsp;").Replace("　", "&nbsp;") + "</a></td>");
                    sb.Append("<td>" + newslist[i].ReadCount.ToString() + "</td>");
                    sb.Append("<td>" + newslist[i].Name + "</td>");
                    sb.Append("<td>" + newslist[i].CreateDate.Value.ToString("yyyy-MM-dd HH:mm:ss") + "</td>");
                    sb.Append("<td class='level'>");
                    //sb.Append("<a href='/SiteManager/NewsEdit.aspx?id=" + newslist[i].ID + "'>编辑</a>");
                    //sb.Append("<a href=\"javascript:Delete('" + newslist[i].ID + "')\">删除</a>");
                    if (newslist[i].Status == 2)
                    {

                        sb.Append("<a href='/SiteManager/NewsEdit.aspx?action=edit&id=" + newslist[i].ID + "'>编辑草稿箱</a>");
                        sb.Append("<a href=\"javascript:Delete('" + newslist[i].ID + "')\">删除</a>");
                    }
                    else
                    {

                        sb.Append("<a href='/SiteManager/NewsEdit.aspx?action=edit&id=" + newslist[i].ID + "'>编辑</a>");
                        sb.Append("<a href=\"javascript:Delete('" + newslist[i].ID + "')\">删除</a>");
                        sb.Append("<a href=\"javascript:EditState('" + newslist[i].ID + "','" + newslist[i].Status + "')\">" + revert + "</a>");
                        if (newslist[i].Status == 1)
                        {
                            sb.Append("<a href=\"javascript:Top('" + newslist[i].ID + "','" + newslist[i].isTop + "','" + topcount + "')\">" + top + "</a>");
                        }
                        else
                        {
                            sb.Append("<a href=\"#\" style=\"color:#A6a6a6;\">" + top + "</a>");
                        }
                    }

                    sb.Append("</td>");
                    sb.Append("</tr>");
                }
                context.Response.Write(JsonConvert.SerializeObject(new { count = pageCount, data = sb.ToString() }));
            }
            else
            {
                context.Response.Write(JsonConvert.SerializeObject(new { count = pageCount, data = "" }));
            }

        }



        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}