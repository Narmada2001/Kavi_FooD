using MongoDB.Driver;
using Microsoft.Extensions.Options;
using FoodOrderingAPI.Models;

namespace FoodOrderingAPI.Services
{
    public class MongoDBService
    {
        public IMongoCollection<User> Users { get; }
        public IMongoCollection<MenuItem> MenuItems { get; }
        public IMongoCollection<Order> Orders { get; }
        public IMongoCollection<Review> Reviews { get; }

        public MongoDBService(IOptions<MongoDBSettings> settings)
        {
            var mongoSettings = settings.Value;

            var client = new MongoClient(mongoSettings.ConnectionString);
            var database = client.GetDatabase(mongoSettings.DatabaseName);

            // Use names from appsettings.json
            Users = database.GetCollection<User>(mongoSettings.UsersCollectionName);
            MenuItems = database.GetCollection<MenuItem>(mongoSettings.MenuItemsCollectionName);
            Orders = database.GetCollection<Order>(mongoSettings.OrdersCollectionName);
            Reviews = database.GetCollection<Review>(mongoSettings.ReviewsCollectionName);
        }
    }
}

