using DAL;
using Models;

namespace BLL
{
    public class Sys_AdminUser_BLL
    {
        private readonly Sys_AdminUser_DAL dal = new Sys_AdminUser_DAL();

        #region 用户登录 add by wk 2017-6-13

        /// <summary>
        /// 用户登录
        /// </summary>
        /// <returns></returns>
        public int UserLogin(string name, string pwd, out Sys_AdminUser userM)
        {
            string where = " Name='" + name + "'";
            userM = dal.SelectEntity<Sys_AdminUser>(where);
            if (userM == null)
            {
                return 0;
            }
            else if (userM.Password != pwd)
            {
                return -1;
            }
            else
            {
                return userM.Status ?? 0;
            }
        }

        #endregion
    }
}