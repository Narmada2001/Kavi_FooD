using Microsoft.AspNetCore.Mvc;
using FoodOrderingAPI.Models;
using FoodOrderingAPI.Services;
using MongoDB.Driver;

namespace FoodOrderingAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReviewController : ControllerBase
    {
        private readonly MongoDBService _mongoDBService;

        public ReviewController(MongoDBService mongoDBService)
        {
            _mongoDBService = mongoDBService;
        }

        [HttpGet("menu-item/{menuItemId}")]
        public async Task<ActionResult<List<Review>>> GetMenuItemReviews(string menuItemId)
        {
            var reviews = await _mongoDBService.Reviews
                .Find(r => r.MenuItemId == menuItemId)
                .SortByDescending(r => r.CreatedAt)
                .ToListAsync();

            return Ok(reviews);
        }

        [HttpPost]
        public async Task<ActionResult<Review>> CreateReview([FromBody] Review review)
        {
            await _mongoDBService.Reviews.InsertOneAsync(review);
            return CreatedAtAction(nameof(GetMenuItemReviews), new { menuItemId = review.MenuItemId }, review);
        }
    }
}
