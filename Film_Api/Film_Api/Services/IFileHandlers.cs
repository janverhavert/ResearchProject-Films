﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver.GridFS;
using System.Threading.Tasks;

namespace Film_Api.Services
{
    public interface IFileHandlers
    {
        Task<GridFSDownloadStream> DownloadImageAsync(string id);
        Task<ObjectResult> UploadImageAsync(IFormFile formFile);
    }
}