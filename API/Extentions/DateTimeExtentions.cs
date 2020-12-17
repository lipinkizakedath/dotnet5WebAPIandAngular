using System;

namespace API.Extentions
{
    public static class DateTimeExtentions
    {
        // This extention method allow to call with DateTime type
        // this key word allow this to make as a custom extention method of DateTime type
        public static int CalculateAge(this DateTime dob)
        {
            var today = DateTime.Today;
            var age = today.Year - dob.Year;
            if(dob.Date > today.AddYears(-age)) age--;
            return age;
        }

        
    }
}