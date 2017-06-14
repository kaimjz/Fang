using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;

namespace Manager
{
    /// <summary>
    /// 一般处理程序基类 （session接口 ） 
    /// add by zfj 
    /// </summary>
    interface BaseHttpHandler : IHttpHandler, IRequiresSessionState
    {
       
    }
}