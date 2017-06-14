using System;

namespace Models
{
    /// <summary>
    /// Sys_Operating
    /// </summary>
    [Serializable]
    public class Sys_Operating
    {
        /// <summary>
        /// 编号
        /// </summary>
        public Guid Id { get; set; }

        /// <summary>
        /// 名称
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 父级操作编号
        /// </summary>
        public Guid ParentId { get; set; }

        /// <summary>
        /// 操作权限编码
        /// </summary>
        public string Code { get; set; }

        /// <summary>
        /// 操作级别
        /// </summary>
        public int? OptionLevel { get; set; }

        /// <summary>
        /// 链接地址
        /// </summary>
        public string Url { get; set; }

        /// <summary>
        /// 操作描述
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// 操作菜单排序
        /// </summary>
        public int? SortOrder { get; set; }

        /// <summary>
        /// 是否公共操作
        /// </summary>
        public bool IsPublicOperating { get; set; }

        /// <summary>
        /// CreateDate
        /// </summary>
        public DateTime CreateDate { get; set; }
    }
}