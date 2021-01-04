using Films_Api.Data;
using Films_Api.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Films_Api.Repositories
{
    public class FilmRepo : IFilmRepo
    {
        private readonly FilmsServicesContext context;

        public FilmRepo(FilmsServicesContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Film>> GetAll()
        {
            try
            {

                //1. docs ophalen  (case sensitive!!!) 
                IMongoCollection<Film> collection =
                 context.Database.GetCollection<Film>("films");
                //context.Restaurants

                //2. docs bevragen (Mongo query) en returnen
                //noot: alle mongo methodes bestaan synchroon en asynchroon
                IEnumerable<Film> result = await
                 collection.Find(FilterDefinition<Film>.Empty).SortBy(r => r.Titel).ToListAsync<Film>();
                //var result = await context.Restaurants.Find(_ => true).ToListAsync<Restaurant>();

                //3. Return query resultaat
                return result;
            }
            catch (Exception exc)
            {
                throw exc;
            }
        }

        public async Task<Film> GetFilmById(string id)
        {
            //zoek zowel op het BsonId als het RestaurantId (case sensitive)
            ObjectId bsonId = (!ObjectId.TryParse(id, out bsonId)) ? ObjectId.Empty : ObjectId.Parse(id);
            //guid convertie returnt lower chars!!! Guids met hoofdletters worden hierdoor niet gevonden.      
            Guid filmId = (!Guid.TryParse(id, out filmId)) ? Guid.Empty : Guid.Parse(id);

            var query = context.Films.Find(r => r.FilmId == filmId || r.Id == bsonId); //cursor
            Film restoEntity = await query.FirstOrDefaultAsync<Film>();
            return restoEntity;
        }

        public async Task<IEnumerable<Review>> GetReviewsForFilm(string id)
        {
            var objId = new Guid(id);
            var reviews = await context.Reviews.Find(b => b.FilmId == objId).ToListAsync<Review>();
            return reviews;
        }

        public async Task<IEnumerable<Film>> GetFilmByName(string name)
        {
            var query = context.Films.Find(r => r.Titel.ToLower().Contains(name.ToLower()));
            IEnumerable<Film> filmEntities = await query.ToListAsync<Film>();
            return filmEntities;
        }

        //CREATE -----------------------------
        public async Task<Film> CreateAsync(Film film)
        {
            //Gebruik van context acties op de IMongoCollecties
            await context.Films.InsertOneAsync(film);
            return film;
        }

        //UPDATE -------------------------------------------------------------
        public async Task<Film> UpsertAsync(Film film)
        {
            //upsert = aanmaken indien onbestaand.
            //bijna alle lambda methodes hebben als arg een "options" parameter.
            ReplaceOptions options = new ReplaceOptions { IsUpsert = true }; //upsert
            await context.Films.ReplaceOneAsync<Film>(r => r.FilmId == film.FilmId, film, options);
            //var restaurantConfirmed = Get(restaurant.RestaurantId.ToString()).Result;
            return film;
        }

        //HARD DELETE----------------------------
        public async Task<string> RemoveAsync(string id)
        {
            ObjectId bsonId = (!ObjectId.TryParse(id, out bsonId)) ? ObjectId.Empty : ObjectId.Parse(id);
            Guid filmId = (!Guid.TryParse(id, out filmId)) ? Guid.Empty : Guid.Parse(id);

            await context.Films.DeleteOneAsync(r => r.FilmId == filmId || r.Id == bsonId);
            return id;
        }

        //Helpers ------------------------------------------- 

        public async Task<bool> CollectionExistsAsync(string filmName)
        {
            var restaurant = await context.Films.Find(r => r.Titel == filmName).FirstOrDefaultAsync<Film>();
            return restaurant != null;

        }

    }
}
