using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace WebApplication1.Models.entities;
[Table("ItemMaster")]
public class Item
{
    public Guid ItemId { get; set; }
    [Required, MaxLength(50)]
    public string Name { get; set; }
    [Required]
    public string Description { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public bool Active { get; set; } = false;
    
}