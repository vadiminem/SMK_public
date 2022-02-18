using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Policy;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackendAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly string defaultPath;
        private readonly IWebHostEnvironment hostingEnvironment;

        public ImagesController(IWebHostEnvironment webHostEnvironment)
        {
            hostingEnvironment = webHostEnvironment;
            defaultPath = webHostEnvironment.WebRootPath + "\\Products";
        }

        // GET: api/Images/url
        [HttpGet("{url}/{number?}")]
        public IActionResult GetFirstImage(string url, int number = 0)
        {
            string path = Path.Combine(defaultPath, url);
            var files = Directory.GetFiles(path);
            if (files.Length > 0)
            {
                if (number > files.Length - 1 || number < 0)
                {
                    return NotFound();
                }
                var file = files[number];

                var net = new WebClient();
                var data = net.DownloadData(file);
                if (data == null) return NotFound();
                var fileType = Path.GetExtension(file);
                var fileStream = new MemoryStream(data);
                string contentType = GetContentType(fileType);
                return File(fileStream, contentType);
            }
            return NotFound();
        }

        // GET: api/Images/imagesCount/url
        [HttpGet]
        [Route("imagesCount/{url}")]
        public int GetImagesCount(string url)
        {
            string path = Path.Combine(defaultPath, url);
            var files = Directory.GetFiles(path).ToList();
            return files.Count();
        }

        private string GetContentType(string fileType)
        {
            switch (fileType)
            {
                case ".png":
                    return "image/png";
                default:
                    return "image/jpeg";
            }

        }
    }
}