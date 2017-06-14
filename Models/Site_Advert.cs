using System;

namespace Models
{
    /// <summary>
    /// Site_Advert
    /// </summary>
    [Serializable]
    public class Site_Advert
    {
        /// <summary>
        /// ID
        /// </summary>
        public Guid ID { get; set; }

        /// <summary>
        /// 图片路径
        /// </summary>
        public string PicPath { get; set; }

        /// <summary>
        /// 图片备注信息
        /// </summary>
        public string PicRemark { get; set; }

        /// <summary>
        /// 图片链接
        /// </summary>
        public string PicUrl { get; set; }

        /// <summary>
        /// 最后修改人
        /// </summary>
        public Guid LastEditUserID { get; set; }

        /// <summary>
        /// 类型0:首页广告1:亲子馆广告2少儿馆广告3青少年馆广告4登陆广告
        /// </summary>
        public int Adv_Type { get; set; }

        /// <summary>
        /// </summary>
        public int Status { get; set; }

        /// <summary>
        /// 备注
        /// </summary>
        public string Remarks { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime CreateDate { get; set; }

        /// <summary>
        /// 最后修改日期
        /// </summary>
        public DateTime LastEditDate { get; set; }

        /// <summary>
        /// 名称
        /// </summary>
        public string Name { get; set; }
    }
}