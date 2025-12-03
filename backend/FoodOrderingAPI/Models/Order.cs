using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace FoodOrderingAPI.Models
{
    public class Order
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        
        [BsonRepresentation(BsonType.ObjectId)]
        public string UserId { get; set; } = string.Empty;
        
        public List<OrderItem> Items { get; set; } = new();
        public decimal Subtotal { get; set; }
        public decimal DeliveryFee { get; set; }
        public decimal Total { get; set; }
        public string Status { get; set; } = "Pending";
        public string PaymentMethod { get; set; } = string.Empty;
        public string DeliveryAddress { get; set; } = string.Empty;
        public string? SpecialInstructions { get; set; }
        public string EstimatedTime { get; set; } = "30-45 mins";
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;
        public DateTime? DeliveredAt { get; set; }
    }

    public class OrderItem
    {
        public string MenuItemId { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public ItemCustomization Customization { get; set; } = new();
        public decimal TotalPrice { get; set; }
    }

    public class ItemCustomization
    {
        public string? Size { get; set; }
        public List<string> Extras { get; set; } = new();
    }
}
