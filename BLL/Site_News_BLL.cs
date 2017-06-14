using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using Models;
using Commons;

namespace BLL
{
    public class Site_News_BLL
    {
        private readonly Site_News_DAL dal = new Site_News_DAL();

        /// <summary>
        /// 是否存在同标题新闻 add by wk 2017-6-14
        /// </summary>
        /// <param name="title"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        public Enums.TickLingEnum IsExists(string title, string id)
        {
            string where = " title='" + title + "'";
            return dal.IsExists<Site_News>(where, id);
        }
        /// <summary>
        /// 添加新闻包括图片
        /// 创建人：lwj
        /// 时间：2015-6-16
        /// </summary>
        /// <param name="title"></param>
        /// <param name="content"></param>
        /// <param name="userid"></param>
        /// <param name="dt"></param>
        /// <returns></returns>
        public string InsertEntity(Site_News newsM, List<Site_News_Pic> picList)
        {
            return dal.InsertNewsPic(newsM, picList);
        }
    }
}
