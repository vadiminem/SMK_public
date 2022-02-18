using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Models
{
    public class FormProduct : Product
    {
        public List<IFormFile> Files { get; set; }
    }
}
