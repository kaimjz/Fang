using System;

namespace Models
{
    /// <summary>
    /// Sys_RoleOperating
    /// </summary>
    [Serializable]
    public class Sys_RoleOperating
    {
        /// <summary>
        /// 编号
        /// </summary>
        public Guid Id { get; set; }

        /// <summary>
        /// 角色id
        /// </summary>
        public Guid RoleId { get; set; }

        /// <summary>
        /// 权限id
        /// </summary>
        public Guid OperatingId { get; set; }
    }
}