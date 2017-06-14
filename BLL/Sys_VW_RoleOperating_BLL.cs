using System.Collections.Generic;
using DAL;
using Models;

namespace BLL
{
    public class Sys_VW_RoleOperating_BLL
    {
        /// <summary>
        /// 获得用户权限数据列表
        /// </summary>
        /// <param name="roleId"></param>
        /// <returns></returns>
        public List<Sys_VW_RoleOperating> GetUserOperatingList(string roleId)
        {
            using (var dal = new Sys_VW_RoleOperating_DAL())
            {
                string where = " RoleId='" + roleId + "' Order by OptionLevel,SortOrder ";
                return dal.Select<Sys_VW_RoleOperating>(where);
            }
        }
    }
}