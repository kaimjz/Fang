<%@ WebHandler Language="C#" Class="controller" %>

using System;
using System.Web;

public class controller : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {
        Handler action = null;
        String newFileName = DateTime.Now.ToString("yyyyMMddHHmmss_ffff", System.Globalization.DateTimeFormatInfo.InvariantInfo);
        //定义允许上传的文件扩展名
        System.Collections.Hashtable extTable = new System.Collections.Hashtable();
        extTable.Add("image", "gif,jpg,jpeg,png,bmp");
        extTable.Add("flash", "swf,flv");
        extTable.Add("media", "swf,flv,mp3,wav,wma,wmv,mid,avi,mpg,asf,rm,rmvb");
        extTable.Add("file", "doc,docx,xls,xlsx,ppt,htm,html,txt,zip,rar,gz,bz2");

        switch (context.Request["action"])
        {
            case "config":
                action = new ConfigHandler(context);
                break;
            case "uploadimage":
                action = new UploadHandler(context, new UploadConfig()
                {
                    AllowExtensions = ConfigUE.GetStringList("imageAllowFiles"),
                    PathFormat = "upload/age",
                    SizeLimit = ConfigUE.GetInt("imageMaxSize"),
                    UploadFieldName = ConfigUE.GetString("imageFieldName")
                });
                break;
            case "readguide"://阅读指导
                action = new UploadHandler(context, new UploadConfig()
                {
                    AllowExtensions = ConfigUE.GetStringList("imageAllowFiles"),
                    PathFormat = "/Upload/ReadGuidePic/" + newFileName,
                    SizeLimit = ConfigUE.GetInt("imageMaxSize"),
                    UploadFieldName = ConfigUE.GetString("imageFieldName")
                });
                break;
            case "activity"://活动
                action = new UploadHandler(context, new UploadConfig()
                {
                    AllowExtensions = ConfigUE.GetStringList("imageAllowFiles"),
                    PathFormat = "/Upload/Activity/ActivityImg/" + newFileName,
                    SizeLimit = ConfigUE.GetInt("imageMaxSize"),
                    UploadFieldName = ConfigUE.GetString("imageFieldName")
                });
                break;
            case "news"://新闻
                action = new UploadHandler(context, new UploadConfig()
                {
                    AllowExtensions = ConfigUE.GetStringList("imageAllowFiles"),
                    PathFormat = "/Upload/NewsPic/" + newFileName,
                    SizeLimit = ConfigUE.GetInt("imageMaxSize"),
                    UploadFieldName = ConfigUE.GetString("imageFieldName")
                });
                break;
            case "resource"://商品
                action = new UploadHandler(context, new UploadConfig()
                {
                    AllowExtensions = ConfigUE.GetStringList("imageAllowFiles"),
                    PathFormat = "/Upload/MallManager/ResourceImg/" + newFileName,
                    SizeLimit = ConfigUE.GetInt("imageMaxSize"),
                    UploadFieldName = ConfigUE.GetString("imageFieldName")
                });
                break;
            case "uploadscrawl":
                action = new UploadHandler(context, new UploadConfig()
                {
                    AllowExtensions = new string[] { ".png" },
                    PathFormat = ConfigUE.GetString("scrawlPathFormat"),
                    SizeLimit = ConfigUE.GetInt("scrawlMaxSize"),
                    UploadFieldName = ConfigUE.GetString("scrawlFieldName"),
                    Base64 = true,
                    Base64Filename = "scrawl.png"
                });
                break;
            case "uploadvideo":
                action = new UploadHandler(context, new UploadConfig()
                {
                    AllowExtensions = ConfigUE.GetStringList("videoAllowFiles"),
                    PathFormat = ConfigUE.GetString("videoPathFormat"),
                    SizeLimit = ConfigUE.GetInt("videoMaxSize"),
                    UploadFieldName = ConfigUE.GetString("videoFieldName")
                });
                break;
            case "uploadfile":
                action = new UploadHandler(context, new UploadConfig()
                {

                    AllowExtensions = ConfigUE.GetStringList("fileAllowFiles"),
                    PathFormat = ConfigUE.GetString("filePathFormat"),
                    SizeLimit = ConfigUE.GetInt("fileMaxSize"),
                    UploadFieldName = ConfigUE.GetString("fileFieldName")
                });
                break;
            case "listimage":
                action = new ListFileManager(context, ConfigUE.GetString("imageManagerListPath"), ConfigUE.GetStringList("imageManagerAllowFiles"));
                break;
            case "listfile":
                action = new ListFileManager(context, ConfigUE.GetString("fileManagerListPath"), ConfigUE.GetStringList("fileManagerAllowFiles"));
                break;
            case "catchimage":
                action = new CrawlerHandler(context);
                break;
            case "sendEmail":
                action = new UploadHandler(context, new UploadConfig()
                {
                    AllowExtensions = ConfigUE.GetStringList("imageAllowFiles"),
                    PathFormat = "/Upload/UserEmail/" + newFileName,
                    SizeLimit = ConfigUE.GetInt("imageMaxSize"),
                    UploadFieldName = ConfigUE.GetString("imageFieldName")
                });
                break;
            case "specialEditor":
                action = new UploadHandler(context, new UploadConfig()
                {
                    AllowExtensions = ConfigUE.GetStringList("imageAllowFiles"),
                    PathFormat = "/Upload/Special/Special_Images/ControlDataImg/" + newFileName,
                    SizeLimit = ConfigUE.GetInt("imageMaxSize"),
                    UploadFieldName = ConfigUE.GetString("imageFieldName")
                });
                break;
            default:
                action = new NotSupportedHandler(context);
                break;

        }
        action.Process();
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }
}