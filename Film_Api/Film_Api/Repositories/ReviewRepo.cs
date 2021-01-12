﻿using Film_Api.Data;
using Film_Api.Models;
using MongoDB.Bson;
using MongoDB.Driver;
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

        public async Task<IEnumerable<Review>> GetReviewByUserId(string id)
        {
            var objId = new Guid(id);
            var reviews = await context.Reviews.Find(b => b.UserId == objId).ToListAsync<Review>();
            return reviews;
        }
        //CREATE ------

        public async Task<Review> CreateAsync(Review review)
        {
            await context.Reviews.InsertOneAsync(review);
            return review;
        }
    }
}
