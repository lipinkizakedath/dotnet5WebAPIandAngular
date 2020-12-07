using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required(ErrorMessage = "Username cannot be empty!")]
        public string Username { get; set; }

        [Required(ErrorMessage = "Password field cannot be empty!")]
        public string Password { get; set; }

    }
}