using Films_Api.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Films_Api.Repositories
{
    public interface IFilmRepo
    {
        
        Task<IEnumerable<Film>> GetAll();
        Task<Film> GetFilmById(string id);
        Task<IEnumerable<Film>> GetFilmByName(string name);
        Task<IEnumerable<Review>> GetReviewsForFilm(string id);
        Task<Film> CreateAsync(Film film);
        Task<string> RemoveAsync(string id);
        Task<Film> UpsertAsync(Film film);
        Task<bool> CollectionExistsAsync(string filmName);
    }
}