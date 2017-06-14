using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Commons
{
    /// <summary>
    /// 存 Session对象
    /// </summary>
    public class SessionUser
    {
        /// <summary>
        /// 登录用户主键
        /// </summary>
        public string UserId { get; set; }
        /// <summary>
        /// 编号
        /// </summary>
        public string Code { get; set; }
        /// <summary>
        /// 登陆密码
        /// </summary>
        public string Password { get; set; }
        /// <summary>
        /// 密钥
        /// </summary>
        public string Secretkey { get; set; }
        /// <summary>
        /// 用户姓名
        /// </summary>
        public string UserName { get; set; }
        /// <summary>
        /// 性别
        /// </summary>
        public string Gender { get; set; }
        /// <summary>
        /// 部门ID
        /// </summary>
        public string DepartmentId { get; set; }
        /// <summary>
        /// 部门名称
        /// </summary>
        public string DepartmentName { get; set; }
        /// <summary>
        /// 角色ID
        /// </summary>
        public string RoleId { get; set; }

        /// <summary>
        /// 当前用户权限
        /// </summary>
        public string CurrentOperate { get; set; }

        /// <summary>
        /// 记录用户所有权限
        /// </summary>
        public object UserOperates { get; set; }
    }
}

