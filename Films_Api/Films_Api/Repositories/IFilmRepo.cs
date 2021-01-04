using Films_Api.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Films_Api.Repositories
{
    public interface IFilmRepo
    {
        Task<Film> CreateAsync(Film film);
        Task<IEnumerable<Film>> GetAll();
        Task<IEnumerable<Review>> GetReviewsForRestaurant(string id);
    }
}