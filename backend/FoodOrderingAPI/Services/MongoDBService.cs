using MongoDB.Driver;
using Microsoft.Extensions.Options;
using FoodOrderingAPI.Models;

namespace FoodOrderingAPI.Services
{
    public class MongoDBService
    {
        private readonly IMongoDatabase _database;

        public MongoDBService(IOptions<MongoDBSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            _database = client.GetDatabase(settings.Value.DatabaseName);
        }

        public IMongoCollection<User> Users => 
            _database.GetCollection<User>("Users");

        public IMongoCollection<MenuItem> MenuItems => 
            _database.GetCollection<MenuItem>("MenuItems");

        public IMongoCollection<Order> Orders => 
            _database.GetCollection<Order>("Orders");

        public IMongoCollection<Review> Reviews => 
            _database.GetCollection<Review>("Reviews");
    }
}
