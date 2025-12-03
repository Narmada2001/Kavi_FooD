using Microsoft.AspNetCore.Mvc;
using FoodOrderingAPI.Models;
using FoodOrderingAPI.Services;

namespace FoodOrderingAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            var user = await _authService.RegisterAsync(request.Name, request.Email, request.Password);
            if (user == null)
                return BadRequest(new { message = "User already exists" });

            return Ok(new { userId = user.Id, name = user.Name, email = user.Email });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var user = await _authService.LoginAsync(request.Email, request.Password);
            if (user == null)
                return Unauthorized(new { message = "Invalid credentials" });

            return Ok(new { userId = user.Id, name = user.Name, email = user.Email, address = user.Address });
        }
    }

    public record RegisterRequest(string Name, string Email, string Password);
    public record LoginRequest(string Email, string Password);
}
