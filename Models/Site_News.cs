using System;

namespace Models
{
    /// <summary>
    /// Site_News
    /// </summary>
    [Serializable]
    public class Site_News
    {
        /// <summary>
        /// 编号
        /// </summary>
        public Guid Id { get; set; }

        /// <summary>
        /// 标题
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// 副标题
        /// </summary>
        public string SubTitle { get; set; }

        /// <summary>
        /// 阅读数量
        /// </summary>
        public int ReadCount { get; set; }

        /// <summary>
        /// 内容
        /// </summary>
        public string N_Content { get; set; }

        /// <summary>
        /// 发布人ID（后台）
        /// </summary>
        public Guid UserId { get; set; }

        /// <summary>
        /// 新闻类型
        /// </summary>
        public int? N_Type { get; set; }

        /// <summary>
        /// 内容简介
        /// </summary>
        public string N_Introduction { get; set; }

        /// <summary>
        /// Banner图片
        /// </summary>
        public string BannerPic { get; set; }

        /// <summary>
        /// 是否头条：0否，1是
        /// </summary>
        public int IsTop { get; set; }

        /// <summary>
        /// 修改时间
        /// </summary>
        public DateTime? UpdateTime { get; set; }

        /// <summary>
        /// 新闻来源
        /// </summary>
        public string N_Source { get; set; }

        /// <summary>
        /// 状态 0：取消发布，1：发布
        /// </summary>
        public int? Status { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime? CreateDate { get; set; }
    }
}