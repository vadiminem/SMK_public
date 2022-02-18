using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackendAPI.Models;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using Microsoft.EntityFrameworkCore.Internal;
using System.Net.Http;

namespace BackendAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly string defaultPath;
        private readonly ProductsDbContext _context;
        private readonly IWebHostEnvironment hostingEnvironment;

        public ProductsController(ProductsDbContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            hostingEnvironment = webHostEnvironment;
            defaultPath = webHostEnvironment.WebRootPath + "/Products";
        }

        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return await _context.Products.OrderByDescending(x => x.Id).ToListAsync();
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        // PUT: api/Products/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, Product product)
        {
            if (id != product.Id)
            {
                return BadRequest();
            }

            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Products
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        // public async Task<ActionResult<Product>> PostProduct(List<IFormFile> files, Product product)
        public async Task<ActionResult<Product>> PostProduct()
        {
            IFormFileCollection files;
            Product product;
            product = new Product();
            product.Title = Request.Form["Title"];
            product.Description = Request.Form["Description"];
            product.Price = double.Parse(Request.Form["Price"]);
            product.Category = Request.Form["Category"];
            files = Request.Form.Files;

            if (files.Count() > 0)
            {
                var path = Path.GetRandomFileName();
                var newPath = Path.Combine(defaultPath, path);
                product.ImagesPath = path;

                if (!Directory.Exists(newPath))
                {
                    Directory.CreateDirectory(newPath);
                }

                foreach (var file in files)
                {
                    var fileName = files.IndexOf(file).ToString() + '.' + file.FileName.Split('.')[^1];
                    var fullPath = Path.Combine(newPath, fileName);

                    using var stream = new FileStream(fullPath, FileMode.Create);
                    await file.CopyToAsync(stream);
                }
            }

            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetProduct", new { id = product.Id }, product);
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Product>> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            Directory.Delete(Path.Combine(defaultPath, product.ImagesPath), true);
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return product;
        }

        private bool ProductExists(int id)
        {
            return _context.Products.Any(e => e.Id == id);
        }
    }
}
