namespace FoodOrderingAPI.Models
{
    public class MongoDBSettings
    {
        public string ConnectionString { get; set; } = string.Empty;
        public string DatabaseName { get; set; } = string.Empty;
        public string UsersCollectionName { get; set; } = "Users";
        public string MenuItemsCollectionName { get; set; } = "MenuItems";
        public string OrdersCollectionName { get; set; } = "Orders";
        public string ReviewsCollectionName { get; set; } = "Reviews";
    }
}
