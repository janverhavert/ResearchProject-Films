using Film_Api.Models;
using System.Threading.Tasks;

namespace Film_Api.Repositories
{
    public interface IReviewRepo
    {
        Task<Review> CreateAsync(Review review);
    }
}