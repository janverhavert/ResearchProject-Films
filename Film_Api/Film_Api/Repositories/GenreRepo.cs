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
    public class GenreRepo : IGenreRepo
    {
        private readonly FilmsServicesContext context;

        public GenreRepo(FilmsServicesContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Genre>> GetAllGenres()
        {
            try
            {

                //1. docs ophalen  (case sensitive!!!) 
                IMongoCollection<Genre> collection =
                 context.Database.GetCollection<Genre>("Genres");
                //context.Restaurants

                //2. docs bevragen (Mongo query) en returnen
                //noot: alle mongo methodes bestaan synchroon en asynchroon
                IEnumerable<Genre> result = await
                 collection.Find(FilterDefinition<Genre>.Empty).SortBy(r => r.GenreNaam).ToListAsync<Genre>();
                //var result = await context.Restaurants.Find(_ => true).ToListAsync<Restaurant>();

                //3. Return query resultaat
                return result;
            }
            catch (Exception exc)
            {
                throw exc;
            }
        }

        public async Task<Genre> GetGenreById(string id)
        {
            //zoek zowel op het BsonId als het RestaurantId (case sensitive)
            ObjectId bsonId = (!ObjectId.TryParse(id, out bsonId)) ? ObjectId.Empty : ObjectId.Parse(id);
            //guid convertie returnt lower chars!!! Guids met hoofdletters worden hierdoor niet gevonden.      
            Guid genreId = (!Guid.TryParse(id, out genreId)) ? Guid.Empty : Guid.Parse(id);

            var query = context.Genres.Find(r => r.GenreId == genreId || r.Id == bsonId); //cursor
            Genre restoEntity = await query.FirstOrDefaultAsync<Genre>();
            return restoEntity;
        }

        //CREATE -----------------------------
        public async Task<Genre> CreateAsync(Genre genre)
        {
            //Gebruik van context acties op de IMongoCollecties
            await context.Genres.InsertOneAsync(genre);
            return genre;
        }
    }
}
