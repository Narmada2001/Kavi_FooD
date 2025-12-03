using Microsoft.AspNetCore.Mvc;
using FoodOrderingAPI.Models;
using FoodOrderingAPI.Services;
using MongoDB.Driver;

namespace FoodOrderingAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly MongoDBService _mongoDBService;

        public OrderController(MongoDBService mongoDBService)
        {
            _mongoDBService = mongoDBService;
        }

        [HttpGet("user/{userId}")]
        public async Task<ActionResult<List<Order>>> GetUserOrders(string userId)
        {
            var orders = await _mongoDBService.Orders
                .Find(o => o.UserId == userId)
                .SortByDescending(o => o.OrderDate)
                .ToListAsync();
            
            return Ok(orders);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(string id)
        {
            var order = await _mongoDBService.Orders.Find(o => o.Id == id).FirstOrDefaultAsync();
            if (order == null)
                return NotFound();

            return Ok(order);
        }

        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder([FromBody] Order order)
        {
            await _mongoDBService.Orders.InsertOneAsync(order);
            return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order);
        }

        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateOrderStatus(string id, [FromBody] UpdateStatusRequest request)
        {
            var update = Builders<Order>.Update.Set(o => o.Status, request.Status);
            var result = await _mongoDBService.Orders.UpdateOneAsync(o => o.Id == id, update);

            if (result.MatchedCount == 0)
                return NotFound();

            return NoContent();
        }
    }

    public record UpdateStatusRequest(string Status);
}
