using Film_Api.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Film_Api.Repositories
{
    public interface IReviewRepo
    {
        Task<Review> CreateAsync(Review review);

        Task<IEnumerable<Review>> GetReviewByUserId(string id);
    }
}