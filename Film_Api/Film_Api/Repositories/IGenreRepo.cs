using Film_Api.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Film_Api.Repositories
{
    public interface IGenreRepo
    {
        Task<Genre> CreateAsync(Genre genre);
        Task<IEnumerable<Genre>> GetAllGenres();
        Task<Genre> GetGenreById(string id);
    }
}