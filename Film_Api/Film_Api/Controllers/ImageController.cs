using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Film_Api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Film_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly IFileHandlers fileHandlers;

        public ImageController(IFileHandlers fileHandlers)
        {
            this.fileHandlers = fileHandlers;
        }

        [HttpPost]
        [Route("UploadImg")]
        public async Task<IActionResult> UploadImage(IFormFile formFile)
        {
            ObjectResult result = await fileHandlers.UploadImageAsync(formFile) as ObjectResult;
            return Ok(new { file = formFile.FileName + " -> " + result.Value });
        }

        [HttpGet]
        [Route("DownloadImg")]
        public async Task<IActionResult> DownloadImageAsync(string id)
        {
            var stream = await fileHandlers.DownloadImageAsync(id);
            return File(stream, stream.FileInfo.Metadata["contentType"].AsString);
        }
    }
}
