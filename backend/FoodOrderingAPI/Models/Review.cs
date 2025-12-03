using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace FoodOrderingAPI.Models
{
    public class Review
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        
        [BsonRepresentation(BsonType.ObjectId)]
        public string UserId { get; set; } = string.Empty;
        
        [BsonRepresentation(BsonType.ObjectId)]
        public string OrderId { get; set; } = string.Empty;
        
        [BsonRepresentation(BsonType.ObjectId)]
        public string MenuItemId { get; set; } = string.Empty;
        
        public int Rating { get; set; }
        public string Comment { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
