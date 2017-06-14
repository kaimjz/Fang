using System;
using System.Collections.Generic;

namespace Models
{
    /// <summary>
    /// Site_News_Pic
    /// </summary>
    [Serializable]
    public class Site_News_Pic
    {
        public static List<Site_News_Pic> ImgPath = new List<Site_News_Pic>();//记录新闻图片路径
        public static int Count = 0;//记录上传的图片数量，对应新闻图片表中图片排序字段
        public static string EditCount = "";//记录，编辑的时候，编辑图片个数

        /// <summary>
        /// 编号
        /// </summary>
        public Guid ID { get; set; }

        /// <summary>
        /// 新闻ID
        /// </summary>
        public Guid NewsId { get; set; }

        /// <summary>
        /// 用户ID
        /// </summary>
        public Guid UseId { get; set; }

        /// <summary>
        /// 图片路径
        /// </summary>
        public string PicPath { get; set; }

        /// <summary>
        /// 图片顺序
        /// </summary>
        public int? Px { get; set; }

        /// <summary>
        /// 备注
        /// </summary>
        public string Remarks { get; set; }

        /// <summary>
        /// 预留，页面做展示
        /// </summary>
        public int? Status { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime? CreateDate { get; set; }
    }
}