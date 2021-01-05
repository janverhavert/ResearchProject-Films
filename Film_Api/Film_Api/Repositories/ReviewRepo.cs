using Film_Api.Data;
using Film_Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Film_Api.Repositories
{
    public class ReviewRepo : IReviewRepo
    {
        private readonly FilmsServicesContext context;

        public ReviewRepo(FilmsServicesContext context)
        {
            this.context = context;
        }


        //CREATE ------

        public async Task<Review> CreateAsync(Review review)
        {
            await context.Reviews.InsertOneAsync(review);
            return review;
        }
    }
}
