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
    public class Sys_Operating_BLL
    {
        private readonly Sys_Operating_DAL dal = new Sys_Operating_DAL();

        /// <summary>
        /// 根据条件查询集合
        /// </summary>
        public List<Sys_Operating> GetList(string where)
        {
            return dal.Select<Sys_Operating>(where);
        }
    }
}
