using System.Security.Cryptography;
using System.Text;
using FoodOrderingAPI.Models;
using MongoDB.Driver;

namespace FoodOrderingAPI.Services
{
    public class AuthService
    {
        private readonly MongoDBService _mongoDBService;

        public AuthService(MongoDBService mongoDBService)
        {
            _mongoDBService = mongoDBService;
        }

        public async Task<User?> RegisterAsync(string name, string email, string password)
        {
            var existingUser = await _mongoDBService.Users
                .Find(u => u.Email == email)
                .FirstOrDefaultAsync();

            if (existingUser != null)
                return null;

            var user = new User
            {
                Name = name,
                Email = email,
                PasswordHash = HashPassword(password)
            };

            await _mongoDBService.Users.InsertOneAsync(user);
            return user;
        }

        public async Task<User?> LoginAsync(string email, string password)
        {
            var user = await _mongoDBService.Users
                .Find(u => u.Email == email)
                .FirstOrDefaultAsync();

            if (user == null || user.PasswordHash != HashPassword(password))
                return null;

            return user;
        }

        private string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(bytes);
        }
    }
}