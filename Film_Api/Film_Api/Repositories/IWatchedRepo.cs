using Film_Api.Models;
using System.Threading.Tasks;

namespace Film_Api.Repositories
{
    public interface IWatchedRepo
    {
        Task<Watched> GetWachtedByUserId(string id);
        Task<Watched> CreateAsync(Watched watched);
    }
}