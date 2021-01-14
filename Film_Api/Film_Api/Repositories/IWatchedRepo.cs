using Film_Api.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Film_Api.Repositories
{
    public interface IWatchedRepo
    {
        Task<IEnumerable<Watched>> GetWatchedByUserId(string id);
        Task<Watched> CreateAsync(Watched watched);
        Task<string> RemoveAsync(string id);
    }
}