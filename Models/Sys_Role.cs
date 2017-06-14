using System;

namespace Models
{
    /// <summary>
    /// Sys_Role
    /// </summary>
    [Serializable]
    public class Sys_Role
    {
        /// <summary>
        /// 角色编号
        /// </summary>
        public Guid Id { get; set; }

        /// <summary>
        /// 角色名称
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Description
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// 状态 1启用,0停用
        /// </summary>
        public int? State { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime CreateDate { get; set; }
    }
}