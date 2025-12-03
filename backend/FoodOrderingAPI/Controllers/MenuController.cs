using Microsoft.AspNetCore.Mvc;
using FoodOrderingAPI.Models;
using FoodOrderingAPI.Services;
using MongoDB.Driver;

namespace FoodOrderingAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MenuController : ControllerBase
    {
        private readonly MongoDBService _mongoDBService;

        public MenuController(MongoDBService mongoDBService)
        {
            _mongoDBService = mongoDBService;
        }

        [HttpGet]
        public async Task<ActionResult<List<MenuItem>>> GetAllMenuItems()
        {
            var items = await _mongoDBService.MenuItems.Find(_ => true).ToListAsync();
            return Ok(items);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MenuItem>> GetMenuItem(string id)
        {
            var item = await _mongoDBService.MenuItems.Find(m => m.Id == id).FirstOrDefaultAsync();
            if (item == null)
                return NotFound();

            return Ok(item);
        }

        [HttpGet("category/{category}")]
        public async Task<ActionResult<List<MenuItem>>> GetMenuItemsByCategory(string category)
        {
            var items = await _mongoDBService.MenuItems.Find(m => m.Category == category).ToListAsync();
            return Ok(items);
        }

        [HttpPost]
        public async Task<ActionResult<MenuItem>> CreateMenuItem([FromBody] MenuItem menuItem)
        {
            await _mongoDBService.MenuItems.InsertOneAsync(menuItem);
            return CreatedAtAction(nameof(GetMenuItem), new { id = menuItem.Id }, menuItem);
        }
    }
}
