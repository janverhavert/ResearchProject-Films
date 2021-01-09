using Film_Api.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver.GridFS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Film_Api.Services
{
    public class FileHandlers : IFileHandlers
    {
        private readonly FilmsServicesContext context;

        public FileHandlers(FilmsServicesContext context)
        {
            this.context = context;
        }

        public async Task<ObjectResult> UploadImageAsync(IFormFile formFile)
        {
            var imageId = ObjectId.GenerateNewId();

            var bucket = new GridFSBucket(context.Database);
            GridFSUploadOptions options = new GridFSUploadOptions
            {
                Metadata = new BsonDocument("contentType", formFile.ContentType)
            };

            var imgId = await bucket.UploadFromStreamAsync(formFile.FileName,
                                             formFile.OpenReadStream(), options);

            return new ObjectResult(imgId);
        }

        public async Task<GridFSDownloadStream> DownloadImageAsync(string id)
        {
            var stream = context.ImagesBucket.OpenDownloadStreamAsync(new ObjectId(id));
            var image = stream.Result.FileInfo;
            var contentType = image.Metadata["contentType"].AsString; //jpg, png. ..
            return await stream;
        }
    }
}
