using Film_Api.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Film_Api.Repositories
{
    public interface IFilmRepo
    {
        Task<bool> CollectionExistsAsync(string filmName);
        Task<Film> CreateAsync(Film film);
        Task<IEnumerable<Film>> GetAll();
        Task<IEnumerable<Film>> GetAllFilms();
        Task<IEnumerable<Film>> GetAllSeries();
        Task<Film> GetFilmById(string id);
        Task<IEnumerable<Film>> GetFilmByName(string name);
        Task<IEnumerable<Review>> GetReviewsForFilm(string id);
        Task<string> RemoveAsync(string id);
        Task<Film> UpsertAsync(Film film);
    }
}