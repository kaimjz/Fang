using System;
using System.Drawing;
using System.Web;
using BLL;
using Commons;
using Manager;
using Models;

namespace PD.Manager.SiteManager.Service
{
    /// <summary>
    /// UserManager 的摘要说明
    /// </summary>
    public class UserManager : BaseHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string action = context.Request["action"] ?? "";
            switch (action)
            {
                case "login"://登录
                    UserLogin(context);//用户登录
                    break;

                case "CheckCode"://获取随机数
                    CheckCode(context);
                    break;
            }
        }

        /// <summary>
        /// 用户登录
        /// </summary>
        /// <param name="context"></param>
        private void UserLogin(HttpContext context)
        {
            string name = context.Request["name"] ?? "";
            string password = context.Request["password"] ?? "";
            Sys_AdminUser userM;
            var result = new Sys_AdminUser_BLL().UserLogin(name, password, out userM);
            if (result == 1)
            {
                #region 登录人信息

                SessionUser sessionUser = new SessionUser()
                {
                    UserId = userM.Id.ToString(),
                    UserName = userM.Name,
                    RoleId = userM.RoleId.ToString()
                };
                RequestSession.AddSessionUser(sessionUser);

                #endregion

                //LogHelper.InserLog((int)EnumClass.OperateType.登录系统, PageBase.CurrentOperatName, "登录");
            }
            context.Response.Write(result);
        }

        /// <summary>
        /// 获取随机数 创建人：yxy 创建时间：2015-06-01
        /// </summary>
        /// <param name="context"></param>
        private void CheckCode(HttpContext context)
        {
            string checkCode = GetCode(4);  // 产生5位随机字符
            Bitmap image = new Bitmap(133, 36);
            Graphics g = Graphics.FromImage(image);

            HttpCookie cookie = new HttpCookie("backcode");
            cookie.Value = checkCode;
            context.Response.Cookies.Add(cookie);

            try
            {
                Random random = new Random();
                g.Clear(Color.White);
                int i;
                for (i = 0; i < 25; i++)
                {
                    int x1 = random.Next(image.Width);
                    int x2 = random.Next(image.Width);
                    int y1 = random.Next(image.Height);
                    int y2 = random.Next(image.Height);
                    g.DrawLine(new Pen(Color.Silver), x1, y1, x2, y2);
                }

                Font font = new System.Drawing.Font("Arial Black", 18, (System.Drawing.FontStyle.Italic));
                System.Drawing.Drawing2D.LinearGradientBrush brush = new System.Drawing.Drawing2D.LinearGradientBrush(new Rectangle(0, 0, image.Width, image.Height), Color.Gray, Color.Gray, 1.2F, true);

                g.DrawString(checkCode, font, brush, 27, 4);

                //画图片的前景噪音点
                g.DrawRectangle(new Pen(Color.Silver), 0, 0, image.Width - 1, image.Height - 1);
                System.IO.MemoryStream ms = new System.IO.MemoryStream();
                image.Save(ms, System.Drawing.Imaging.ImageFormat.Gif);
                context.Response.ClearContent();
                context.Response.ContentType = "image/Gif";
                context.Response.BinaryWrite(ms.ToArray());
            }
            finally
            {
                g.Dispose();
                image.Dispose();
            }
        }

        /// <summary>
        /// 产生随机字符串
        /// </summary>
        /// <param name="num">随机出几个字符</param>
        /// <returns>随机出的字符串</returns>
        public string GetCode(int num)
        {
            string str = "0123456789";
            char[] chastr = str.ToCharArray();
            string code = "";
            Random rd = new Random();
            int i;
            for (i = 0; i < num; i++)
            {
                code += str.Substring(rd.Next(0, str.Length), 1);
            }
            return code;
        }

        /// <summary>
        /// 退出 创建人：yxy 创建时间：2015-06-08
        /// </summary>
        /// <param name="context"></param>
        public void Exitlogin(HttpContext context)
        {
            try
            {
                RequestSession.ClearSessionUser();//清空session
                context.Response.Write("1");
            }
            catch
            {
                context.Response.Write("0");
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