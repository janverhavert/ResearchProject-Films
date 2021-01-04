using Films_Api.Data;
using Films_Api.Models;
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

        public async Task<IEnumerable<Review>> GetReviewsForRestaurant(string id)
        {
            var objId = new Guid(id);
            var reviews = await context.Reviews.Find(b => b.FilmId == objId).ToListAsync<Review>();
            return reviews;
        }

        //CREATE -----------------------------
        public async Task<Film> CreateAsync(Film film)
        {
            //Gebruik van context acties op de IMongoCollecties
            await context.Films.InsertOneAsync(film);
            return film;
        }

    }
}
