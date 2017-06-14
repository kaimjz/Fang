using System;

namespace Models
{
    /// <summary>
    /// Sys_MechanismLog
    /// </summary>
    [Serializable]
    public class Sys_MechanismLog
    {
        /// <summary>
        /// 编号
        /// </summary>
        public Guid Id { get; set; }

        /// <summary>
        /// 操作用户ID
        /// </summary>
        public Guid UserId { get; set; }

        /// <summary>
        /// 操作类型
        /// </summary>
        public int? OperType { get; set; }

        /// <summary>
        /// 操作模块
        /// </summary>
        public string OperModel { get; set; }

        /// <summary>
        /// 操作时间
        /// </summary>
        public DateTime? CreateDate { get; set; }

        /// <summary>
        /// 操作内容
        /// </summary>
        public string OperResult { get; set; }

        /// <summary>
        /// Ip
        /// </summary>
        public string Ip { get; set; }
    }
}