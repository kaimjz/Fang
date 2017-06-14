using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;

namespace Commons
{
    /// <summary>
    /// 创建人：yxy
    /// 创建时间：2015-03-04
    /// </summary>
    public class StringHelper
    {
        private const string CHAR = "14ABC9JKLMD5EFGXHI2NP6UV78QRST3WYZ";
        /// <summary>
        /// 获取文件扩展名
        /// </summary>
        /// <param name="filename">文件名</param>
        /// <returns></returns>
        public static string GetFileExtendName(string filename)
        {
            return filename.Substring(filename.LastIndexOf(".") + 1, (filename.Length - filename.LastIndexOf(".") - 1));
        }
        /// <summary>
        /// 创建文件名  时间+随机数
        /// </summary>
        /// <returns></returns>
        public static string MakeFileRndName()
        {
            return (DateTime.Now.ToString("ddHHmmss") + MakeRandomString("0123456789", 4));
        }
        /// <summary>
        /// 创建文件名  时间+随机数
        /// </summary>
        /// <returns></returns>
        public static string MakeFileRndNames()
        {
            return (DateTime.Now.ToString("fffffff") + MakeRandomString("0123456789", 5));
        }



        /// <summary>
        /// 创建密码  时间+随机数
        /// </summary>
        /// <returns></returns>
        public static string MakeFileRndPassword()
        {
            return (MakeRandomString("abcdefghigklmnopqrstuvwxyz0123456789", 8));
        }

        /// <summary>
        /// 创建目录名称  按月份
        /// </summary>
        /// <returns></returns>
        public static string MakeFolderName()
        {
            return DateTime.Now.ToString("yyyyMM");
        }

        /// <summary>
        /// 获取随机字符串
        /// </summary>
        /// <param name="pwdchars">随机字符范围</param>
        /// <param name="pwdlen">随机字符长度</param>
        /// <returns></returns>
        public static string MakeRandomString(string pwdchars, int pwdlen)
        {
            StringBuilder builder = new StringBuilder();
            Random random = new Random();
            for (int i = 0; i < pwdlen; i++)
            {
                int num = random.Next(pwdchars.Length);
                builder.Append(pwdchars[num]);
            }
            return builder.ToString();
        }

        /// <summary>
        /// 时间转成Unix时间戳
        /// </summary>
        /// <param name="dateTime"></param>
        /// <returns></returns>
        public static long UNIX_TIMESTAMP(DateTime dateTime)
        {
            return (dateTime.Ticks - DateTime.Parse("1970-01-01 00:00:00").Ticks) / 10000000;
        }
        ///<summary>
        /// MD5加密字符串处理
        /// </summary>
        /// <param name="Half">加密是16位还是32位；如果为true为16位</param>
        public static string MD5(string Input, bool Half)
        {
            string output = System.Web.Security.FormsAuthentication.HashPasswordForStoringInConfigFile(Input, "MD5").ToLower();
            if (Half) output = output.Substring(8, 16);
            return output;
        }
        /// <summary>
        /// 获取验证码
        /// </summary>
        /// <param name="length"></param>
        /// <returns></returns>
        public static string CreateRandomCode(int length)
        {
            string randomcode = String.Empty;
            StringBuilder txt = new StringBuilder();
            System.Random random = new Random();
            int charCount = CHAR.Length - 1;
            for (int i = 0; i < length; i++)
            {
                int rand = random.Next(0, charCount);
                txt.Append(CHAR[rand]);
            }
            return txt.ToString();
        }

        /// <summary>
        /// 去除HTML标记
        /// </summary>
        /// <param name="Htmlstring"></param>
        /// <returns></returns>
        public static string NoHTML(string Htmlstring)
        {
            #region
            ////删除脚本
            //Htmlstring = Regex.Replace(Htmlstring, @"<script[^>]*?>.*?</script>", "", RegexOptions.IgnoreCase);

            ////删除HTML

            //Htmlstring = Regex.Replace(Htmlstring, @"<(.[^>]*)>", "", RegexOptions.IgnoreCase);

            //Htmlstring = Regex.Replace(Htmlstring, @"([\r\n])[\s]+", "", RegexOptions.IgnoreCase);

            //Htmlstring = Regex.Replace(Htmlstring, @"-->", "", RegexOptions.IgnoreCase);

            //Htmlstring = Regex.Replace(Htmlstring, @"<!--.*", "", RegexOptions.IgnoreCase);

            //Htmlstring = Regex.Replace(Htmlstring, @"&(quot|#34);", "\"", RegexOptions.IgnoreCase);

            //Htmlstring = Regex.Replace(Htmlstring, @"&(amp|#38);", "&", RegexOptions.IgnoreCase);

            //Htmlstring = Regex.Replace(Htmlstring, @"&(lt|#60);", "<", RegexOptions.IgnoreCase);

            //Htmlstring = Regex.Replace(Htmlstring, @"&(gt|#62);", ">", RegexOptions.IgnoreCase);

            //Htmlstring = Regex.Replace(Htmlstring, @"&(nbsp|#160);", " ", RegexOptions.IgnoreCase);

            //Htmlstring = Regex.Replace(Htmlstring, @"&(iexcl|#161);", "\xa1", RegexOptions.IgnoreCase);

            //Htmlstring = Regex.Replace(Htmlstring, @"&(cent|#162);", "\xa2", RegexOptions.IgnoreCase);

            //Htmlstring = Regex.Replace(Htmlstring, @"&(pound|#163);", "\xa3", RegexOptions.IgnoreCase);

            //Htmlstring = Regex.Replace(Htmlstring, @"&(copy|#169);", "\xa9", RegexOptions.IgnoreCase);

            //Htmlstring = Regex.Replace(Htmlstring, @"&#(\d+);", "", RegexOptions.IgnoreCase);

            //Htmlstring = Regex.Replace(Htmlstring, @"&rdquo;", "\"", RegexOptions.IgnoreCase);

            //Htmlstring = Regex.Replace(Htmlstring, @"&ldquo;", "\"", RegexOptions.IgnoreCase);

            //Htmlstring.Replace("<", "");

            //Htmlstring.Replace(">", "");

            //Htmlstring.Replace("\r\n", "");

            //Htmlstring = HttpContext.Current.Server.HtmlEncode(Htmlstring).Trim();

            //return Htmlstring;
            #endregion

            string regex_str = "(?is)<script[^>]*>.*?</script>";//替换<script>内容</script>为空格
            Htmlstring = Regex.Replace(Htmlstring, regex_str, "");

            //regex_str="<script type=\\s*[^>]*>[^<]*?</script>";//替换<style>内容</style>为空格
            regex_str = "(?is)<style[^>]*>.*?</style>";//替换<style>内容</style>为空格
            Htmlstring = Regex.Replace(Htmlstring, regex_str, "");

            //regex_str = "(&nbsp;)+";//替换&nbsp;为空格
            regex_str = "(?i)&nbsp;";//替换&nbsp;为空格
            Htmlstring = Regex.Replace(Htmlstring, regex_str, " ");

            //regex_str = "(\r\n)*";//替换\r\n为空
            regex_str = @"[\r\n]*";//替换\r\n为空
            Htmlstring = Regex.Replace(Htmlstring, regex_str, "", RegexOptions.IgnoreCase);

            //regex_str = "<[^<]*>";//替换Html标签为空
            regex_str = "<[^<>]*>";//替换Html标签为空
            Htmlstring = Regex.Replace(Htmlstring, regex_str, "");

            //regex_str = "\n*";//替换\n为空
            regex_str = @"\n*";//替换\n为空
            Htmlstring = Regex.Replace(Htmlstring, regex_str, "", RegexOptions.IgnoreCase);

            //可以这样
            regex_str = "\t*";//替换\t为空
            Htmlstring = Regex.Replace(Htmlstring, regex_str, "", RegexOptions.IgnoreCase);

            //可以
            regex_str = "'";//替换'为’
            Htmlstring = Regex.Replace(Htmlstring, regex_str, "’", RegexOptions.IgnoreCase);

            //可以
            regex_str = " +";//替换若干个空格为一个空格
            Htmlstring = Regex.Replace(Htmlstring, regex_str, "  ", RegexOptions.IgnoreCase);

            Regex regex = new Regex("<.+?>", RegexOptions.IgnoreCase);

            string strOutput = regex.Replace(Htmlstring, "");//替换掉"<"和">"之间的内容
            strOutput = strOutput.Replace("<", "");
            strOutput = strOutput.Replace(">", "");
            strOutput = strOutput.Replace("&nbsp;", "");


            return strOutput;


        }


        /// <summary>
        /// 获取字符串从头开始的指定长度的字符串，支持汉字英文混合 汉字为2字节计数  
        /// </summary>
        /// <param name="strSub">输入中英混合字符串</param>
        /// <param name="start">开始截取的起始位置</param>
        /// <param name="length">要截取的字符串长度</param>
        /// <returns>输入字符大于截取长度，自动追加...</returns>
        public static string SubString(string strSub, int length)
        {
            if (!string.IsNullOrEmpty(strSub))
            {
                if (GetLength(ConvertSqlHtml(strSub)) > length)
                {

                    return GetSubString(ConvertSqlHtml(strSub), 0, length - 2) + "...";
                }
                else
                {
                    return strSub;
                }
            }
            else
            {
                return strSub;
            }
            //int strLength = 0;
            //StringBuilder strb = new StringBuilder();
            //char[] Temp = strSub.ToCharArray();
            //for (int i = 0; i != Temp.Length; i++)
            //{
            //    if (strLength >= length) //
            //    {
            //        strb.Append("……");
            //        break;
            //    }
            //    else
            //    {
            //        if (((int)Temp[i]) < 255) //大于255的都是汉字或者特殊字符
            //        {
            //            strLength++;
            //        }
            //        else
            //        {
            //            strLength = strLength + 2;
            //        }
            //        strb.Append(Temp[i]);
            //    }
            //}
            //return strb.ToString();
        }
        #region 省略字符串
        /// <summary>
        /// 省略字符串
        /// </summary>
        /// <param name="RawString">字符</param>
        /// <param name="Length">字节</param>
        /// <param name="status">是否开启省略字符串 0：否，1：是</param>
        /// <returns>字符串</returns>
        /// 创建人：王斌
        /// 2015年3月20日 09:02:27
        public static string GetOmitString(string str, int length, string status)
        {
            string temp = str;
            if (status == "1")
            {
                int j = 0;
                int k = 0;
                for (int i = 0; i < temp.Length; i++)
                {
                    if (Regex.IsMatch(temp.Substring(i, 1), @"[\u4e00-\u9fa5]+"))
                    {
                        j += 2;
                    }
                    else
                    {
                        j += 1;
                    }
                    if (j <= length)
                    {
                        k += 1;
                    }
                    if (j >= length)
                    {
                        return temp.Substring(0, k) + "...";
                    }
                }
            }
            return temp;
        }
        #endregion
        /// <summary>
        /// 获取字符串中指定位置开始的指定长度的字符串，支持汉字英文混合 汉字为2字节计数
        /// </summary>
        /// <param name="strSub">输入中英混合字符串</param>
        /// <param name="start">开始截取的起始位置</param>
        /// <param name="length">要截取的字符串长度</param>
        /// <returns></returns>
        public static string GetSubString(string strSub, int start, int length)
        {
            string temp = strSub;
            int j = 0, k = 0, p = 0;

            CharEnumerator ce = temp.GetEnumerator();
            while (ce.MoveNext())
            {
                j += (ce.Current > 0 && ce.Current < 255) ? 1 : 2;

                if (j <= start)
                {
                    p++;
                }
                else
                {
                    if (j == GetLength(temp))
                    {
                        temp = temp.Substring(p, k + 1);
                        break;
                    }
                    if (j <= length + start)
                    {
                        k++;
                    }
                    else
                    {
                        temp = temp.Substring(p, k);
                        break;
                    }
                }
            }
            return temp;
        }
        /// <summary>
        /// 获取指定字符串长度(中英混合)，汉字以2字节计算
        /// </summary>
        /// <param name="aOrgStr">要统计的字符串</param>
        /// <returns></returns>
        public static int GetLength(String aOrgStr)
        {
            int intLen = aOrgStr.Length;
            int i;
            char[] chars = aOrgStr.ToCharArray();
            for (i = 0; i < chars.Length; i++)
            {
                if (System.Convert.ToInt32(chars[i]) > 255)
                {
                    intLen++;
                }
            }
            return intLen;
        }

        /// <summary>
        /// 对输入框的特殊字串进行过滤，防止SQL注入:去掉特殊字符
        /// </summary>
        /// <param name="strFromText">要被过滤的字符串</param>
        /// <returns>过滤后的字符串</returns>
        public static string SqlInsertEncode(string strFromText)
        {
            if (!System.String.IsNullOrEmpty(strFromText) && strFromText != "")
            {
                strFromText = strFromText.Trim();
                strFromText = strFromText.Replace(";", "&#59;");
                strFromText = strFromText.Replace("!", "&#33;");
                strFromText = strFromText.Replace("@", "&#64;");
                strFromText = strFromText.Replace("$", "&#36;");
                strFromText = strFromText.Replace("*", "&#42;");
                strFromText = strFromText.Replace("(", "&#40;");
                strFromText = strFromText.Replace(")", "&#41;");
                strFromText = strFromText.Replace("-", "&#45;");
                //strFromText = strFromText.Replace("+", "&#43;");
                strFromText = strFromText.Replace("=", "&#61;");
                strFromText = strFromText.Replace("|", "&#124;");
                strFromText = strFromText.Replace("\\", "&#92;");
                strFromText = strFromText.Replace("/", "&#47;");
                strFromText = strFromText.Replace(":", "&#58;");
                strFromText = strFromText.Replace("\"", "&#34;");
                strFromText = strFromText.Replace("'", "&#39;");
                strFromText = strFromText.Replace("<", "&#60;");
                strFromText = strFromText.Replace(">", "&#62;");
                //strFromText = strFromText.Replace(" ", "&nbsp;");
                //strFromText = strFromText.Replace("　", "&nbsp;");
            }
            return strFromText;
        }


        public static string SqlInsertEncodeBak(string strFromText)
        {
            if (!System.String.IsNullOrEmpty(strFromText) && strFromText != "")
            {
                strFromText = strFromText.Replace(";", "&#59;");
                strFromText = strFromText.Replace("!", "&#33;");
                strFromText = strFromText.Replace("@", "&#64;");
                strFromText = strFromText.Replace("$", "&#36;");
                strFromText = strFromText.Replace("*", "&#42;");
                strFromText = strFromText.Replace("(", "&#40;");
                strFromText = strFromText.Replace(")", "&#41;");
                strFromText = strFromText.Replace("-", "&#45;");
                strFromText = strFromText.Replace("+", "&#43;");
                strFromText = strFromText.Replace("=", "&#61;");
                strFromText = strFromText.Replace("|", "&#124;");
                strFromText = strFromText.Replace("\\", "&#92;");
                strFromText = strFromText.Replace("/", "&#47;");
                strFromText = strFromText.Replace(":", "&#58;");
                strFromText = strFromText.Replace("\"", "&#34;");
                strFromText = strFromText.Replace("'", "&#39;");
                strFromText = strFromText.Replace("<", "&#60;");
                strFromText = strFromText.Replace(">", "&#62;");
                //strFromText = strFromText.Replace(" ", "&nbsp;");
                //strFromText = strFromText.Replace("　", "&nbsp;");
            }
            return strFromText;
        }

        /// <summary>
        /// 对输入框的特殊字串进行过滤，防止SQL注入：还原特殊字符
        /// </summary>
        /// <param name="strFromText">要被过滤的字符串</param>
        /// <returns>过滤后的字符串</returns>
        public static string ConvertSqlHtml(string strFromText)
        {
            if (!System.String.IsNullOrEmpty(strFromText) && strFromText != "")
            {
                strFromText = strFromText.Trim();
                strFromText = strFromText.Replace("&#59;", ";");
                strFromText = strFromText.Replace("&#33;", "!");
                strFromText = strFromText.Replace("&#64;", "@");
                strFromText = strFromText.Replace("&#36;", "$");
                strFromText = strFromText.Replace("&#42;", "*");
                strFromText = strFromText.Replace("&#40;", "(");
                strFromText = strFromText.Replace("&#41;", ")");
                strFromText = strFromText.Replace("&#45;", "-");
                strFromText = strFromText.Replace("&#43;", "+");
                strFromText = strFromText.Replace("&#61;", "=");
                strFromText = strFromText.Replace("&#124;", "|");
                strFromText = strFromText.Replace("&#92;", "\\");
                strFromText = strFromText.Replace("&#47;", "/");
                strFromText = strFromText.Replace("&#58;", ":");
                strFromText = strFromText.Replace("&#34;", "\"");
                strFromText = strFromText.Replace("&#39;", "'");
                strFromText = strFromText.Replace("&#60;", "<");
                strFromText = strFromText.Replace("&#62;", ">");
                strFromText = strFromText.Replace("&nbsp;", " ");
            }
            return strFromText;
        }
        /// <summary>
        /// 对sql查询中的特殊字符进行替换 防止sql注入
        /// add by zfj 
        /// 2015-3-11
        /// </summary>
        /// <param name="strFromText"></param>
        /// <param name="ConvertType">like  or  =</param>
        /// <returns></returns>
        public static string SqlSpecialConvert(string strFromText, StringConverTypeEnum ConvertType)
        {
            strFromText = strFromText.Trim();
            if (!System.String.IsNullOrEmpty(strFromText) && strFromText != "")
            {
                strFromText = strFromText.Replace("'", "''");  //等于

                if (ConvertType == StringConverTypeEnum.Like)
                {
                    strFromText = strFromText.Replace("[", "[[]");
                    strFromText = strFromText.Replace("%", "[%]");
                    strFromText = strFromText.Replace("_", "[_]");
                    // strFromText = strFromText.Replace("^", "[^]"); 暂时注释，[^] 查询会显示全部 待解决 
                }
            }
            return strFromText;
        }


        /// <summary>
        /// 根据正则得到相应内容
        /// </summary>
        /// <param name="RegularInfo">正则</param>
        /// <param name="Content">内容</param>
        /// <returns></returns>
        public static MatchCollection GetValue(string RegularInfo, string Content)
        {
            try
            {
                Regex regx = new Regex(RegularInfo);
                MatchCollection matchs = regx.Matches(Content);
                return matchs;
            }
            catch
            {
                return null;
            }
        }

        /// <summary>
        /// 站内消息名称
        /// 
        /// </summary>
        /// <param name="type"></param> 
        /// <returns></returns>
        public static string GetNoticeName(string type)
        {
            string Name = "";
            switch (type)
            {
                case "0":
                    Name = "资源审核驳回通知";
                    break;
                case "1":
                    Name = "合同审核驳回通知";
                    break;
            }
            return Name;
        }


        /// <summary>
        /// 时间增减
        /// </summary>
        /// <param name="date">时间</param>
        /// <param name="type">类型 ：0 加 1：减</param>
        /// <returns></returns>
        public static string ConverToDate(string date, int type)
        {
            DateTime converDate = DateTime.Now;
            if (!string.IsNullOrEmpty(date))
            {
                DateTime.TryParse(date, out converDate);
                if (type == 0)
                {
                    converDate = converDate.AddDays(1).AddSeconds(-1);
                    return converDate.ToString();
                }
                if (type == 1)
                {
                    converDate = converDate.AddSeconds(-1);
                    return converDate.ToString();
                }
                else
                {
                    return null;
                }
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// 转换时间格式（16/05/19 19:34）
        /// add by wsy
        /// 2016-5-19
        /// </summary>
        /// <param name="dateTime"></param>
        /// <returns></returns>
        public static string ConvertDateTimeForCircle(DateTime? dateTime)
        {
            if (dateTime == null)
            {
                return "";
            }
            string convertStr = dateTime.Value.Year.ToString().Substring(2, 2) + "/"
                 + dateTime.Value.Month.ToString().PadLeft(2, '0') + "/"
                 + dateTime.Value.Day.ToString().PadLeft(2, '0') + " "
                 + dateTime.Value.Hour.ToString().PadLeft(2, '0') + ":"
                 + dateTime.Value.Minute.ToString().PadLeft(2, '0');
            return convertStr;
        }

        #region 根据正则返回值的集合
        public static MatchCollection GetValue(string RegexValue, string Content, RegexOptions regexOption = RegexOptions.None)
        {
            Regex regex = new Regex(RegexValue, regexOption);
            MatchCollection matchs = regex.Matches(Content);
            return matchs;
        }
        #endregion


        #region 读取文件（文件流）
        /// <summary>
        /// 读取文件TXT（文件流）
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public static string LoginReader(string path)
        {
            try
            {
                using (StreamReader sr = new StreamReader(path, System.Text.Encoding.Default))
                {
                    string s = sr.ReadToEnd();
                    sr.Close();
                    return s;
                }
            }
            catch (Exception)
            {

                throw;
            }

        }
        #endregion

        #region 创建文件路径保存转换文件
        /// <summary>
        /// 创建txt文件
        /// </summary>
        /// <param name="strContent">文本内容</param>
        /// <param name="filePath">保存路径</param>
        public static void CreateTxt(string strContent, string filePath)
        {
            if (File.Exists(filePath))
            {
                File.Delete(filePath);
            }
            FileStream fs = new FileStream(filePath, FileMode.Append);
            StreamWriter sw = new StreamWriter(fs, System.Text.Encoding.UTF8);
            try
            {
                sw.WriteLine(strContent);
                sw.Flush();
                sw.Close();
                fs.Close();
            }
            catch (Exception)
            {
                sw.Flush();
                sw.Close();
                fs.Close();
            }
        }
        #endregion


    }
}
public enum StringConverTypeEnum
{
    /// <summary>
    /// 模糊
    /// </summary>
    Like,
    /// <summary>
    /// =精确
    /// </summary>
    Equal

}