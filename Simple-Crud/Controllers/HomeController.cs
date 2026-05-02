using Microsoft.AspNetCore.Mvc;
using WebApplication1.Data;
using WebApplication1.Models;
using WebApplication1.Models.entities;

namespace WebApplication1.Controllers;

[Route("api/[controller]")]
[ApiController]
public class HomeController : Controller
{
    private readonly ApplicationDbContext _context;

    public HomeController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetItems()
    {
        var items = _context.Items.ToList();
        return Ok(items);
    }

    [HttpGet("{id}")]
    public IActionResult GetItem(int id)
    {
        var item = _context.Items.Find(id);
        return Ok(item);
    }

    [HttpPost]
    public IActionResult PostItem(Item item)
    {
        _context.Items.Add(item);
        _context.SaveChanges();
        return Ok(item);
    }

    [HttpPut("{id}")]
    public IActionResult PutItem(Item item)
    {
        var itemToUpdate = _context.Items.Find(item.ItemId);
        if (itemToUpdate == null)
        {
            var notResponseFound = new
            {
                Status = "Error",
                Message = "Item not found"
            };
            return NotFound(notResponseFound);
        }
        else
        {
            itemToUpdate.Name = item.Name;
            itemToUpdate.Price = item.Price;
            itemToUpdate.Description = item.Description;
            itemToUpdate.Active = item.Active;
            itemToUpdate.Category = item.Category;
            return Ok(itemToUpdate);
        }
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteItem(int id)
    {
        var item = _context.Items.Find(id);
        if (item != null)
        {
            _context.Items.Remove(item);
            _context.SaveChanges();
            return Ok(item);
        }
        else
        {
            var notResponseFound = new
            {
                Status = "Error",
                Message = "Item not found"
            };
            return NotFound(notResponseFound);
        }
    }

}