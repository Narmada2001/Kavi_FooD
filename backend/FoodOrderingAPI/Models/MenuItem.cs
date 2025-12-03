using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace FoodOrderingAPI.Models
{
    public class MenuItem
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        
        public string Name { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string Description { get; set; } = string.Empty;
        public string? ImageUrl { get; set; }
        public double Rating { get; set; } = 0;
        public int ReviewCount { get; set; } = 0;
        public bool InStock { get; set; } = true;
        public MenuItemOptions Options { get; set; } = new();
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class MenuItemOptions
    {
        public List<string> Sizes { get; set; } = new();
        public List<string> Extras { get; set; } = new();
    }
}