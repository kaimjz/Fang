using System;

namespace Models
{
    /// <summary>
    /// Sys_LogDict
    /// </summary>
    [Serializable]
    public class Sys_LogDict
    {
        /// <summary>
        /// Id
        /// </summary>
        public Guid Id { get; set; }

        /// <summary>
        /// Code
        /// </summary>
        public int Code { get; set; }

        /// <summary>
        /// Value
        /// </summary>
        public string Value { get; set; }
    }
}