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
        public async Task<Watched> GetWachtedByUserId(string id)
        {
            //zoek zowel op het BsonId als het RestaurantId (case sensitive)
            ObjectId bsonId = (!ObjectId.TryParse(id, out bsonId)) ? ObjectId.Empty : ObjectId.Parse(id);
            //guid convertie returnt lower chars!!! Guids met hoofdletters worden hierdoor niet gevonden.      
            Guid UserId = (!Guid.TryParse(id, out UserId)) ? Guid.Empty : Guid.Parse(id);

            var query = context.Watched.Find(r => r.UserId == UserId || r.Id == bsonId); //cursor
            Watched restoEntity = await query.FirstOrDefaultAsync<Watched>();
            return restoEntity;
        }
        //CREATE ------

        public async Task<Watched> CreateAsync(Watched watched)
        {
            await context.Watched.InsertOneAsync(watched);
            return watched;
        }
    }
}
