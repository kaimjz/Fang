using System;

namespace Models
{
    /// <summary>
    ///Sys_VW_RoleOperating
    /// </summary>
    [Serializable]
    public class Sys_VW_RoleOperating
    {
        public Guid ID { get; set; }

        public string Name { get; set; }

        public Guid ParentId { get; set; }

        public string Code { get; set; }

        public int? OptionLevel { get; set; }

        public string Url { get; set; }

        public string Description { get; set; }

        public int? SortOrder { get; set; }

        public bool IsPublicOperating { get; set; }

        public Guid RoleId { get; set; }

        public DateTime CreateDate { get; set; }
    }
}