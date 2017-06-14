using System;

namespace Models
{
    /// <summary>
    /// Sys_Log
    /// </summary>
    [Serializable]
    public class Sys_Log
    {
        /// <summary>
        /// Id
        /// </summary>
        public Guid Id { get; set; }

        /// <summary>
        /// Date
        /// </summary>
        public DateTime? Date { get; set; }

        /// <summary>
        /// Thread
        /// </summary>
        public string Thread { get; set; }

        /// <summary>
        /// Level
        /// </summary>
        public string Level { get; set; }

        /// <summary>
        /// Logger
        /// </summary>
        public string Logger { get; set; }

        /// <summary>
        /// Message
        /// </summary>
        public string Message { get; set; }

        /// <summary>
        /// Exception
        /// </summary>
        public string Exception { get; set; }
    }
}