using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Models
{
    public class ProductImage
    {
        [Key]
        public int Id { get; set; }
        public string Hash { get; set; }
        public string Location { get; set; }
    }
}
