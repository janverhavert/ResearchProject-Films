using Film_Api.Data;
using Film_Api.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Film_Api.Repositories
{
    public class WatchedRepo : IWatchedRepo
    {
        private readonly FilmsServicesContext context;

        public WatchedRepo(FilmsServicesContext context)
        {
            this.context = context;
        }
        public async Task<IEnumerable<Watched>> GetWatchedByUserId(string id)
        {
            var objId = new Guid(id);
            var watched = await context.Watched.Find(b => b.UserId == objId).ToListAsync<Watched>();
            return watched;
        }
        //CREATE ------

        public async Task<Watched> CreateAsync(Watched watched)
        {
            await context.Watched.InsertOneAsync(watched);
            return watched;
        }
        public async Task<string> RemoveAsync(string id)
        {
            ObjectId bsonId = (!ObjectId.TryParse(id, out bsonId)) ? ObjectId.Empty : ObjectId.Parse(id);
            Guid userId = (!Guid.TryParse(id, out userId)) ? Guid.Empty : Guid.Parse(id);

            await context.Watched.DeleteOneAsync(r => r.UserId == userId || r.Id == bsonId);
            return id;
        }
    }
}
