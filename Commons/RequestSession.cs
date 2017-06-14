using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Commons
{
    /// <summary>
    /// Session 帮助类
    /// </summary>
    public class RequestSession
    {
        public RequestSession()
        {

        }
        private static string SESSION_USER = "SESSION_USER";
        public static void AddSessionUser(SessionUser user)
        {
            HttpContext rq = HttpContext.Current;
            rq.Session[SESSION_USER] = user;
        }
        public static SessionUser GetSessionUser()
        {
            HttpContext rq = HttpContext.Current;
            var sessionUser=(SessionUser)rq.Session[SESSION_USER];
            return sessionUser;
        }

        /// <summary>
        /// 清空session
        /// </summary>
        public static void ClearSessionUser()
        {
            HttpContext rq = HttpContext.Current;
            rq.Session[SESSION_USER] = null;
        }
    }
}

