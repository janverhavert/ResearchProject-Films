﻿using Films_Api.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Films_Api.Data
{
    public class FilmsServicesContext
    {
        public IMongoDatabase Database;

        public FilmsServicesContext(IMongoSettings settings)
        {
            MongoClient client = new MongoClient(settings.ConnectionStringHost);
            Database = client.GetDatabase(settings.DatabaseName);
        }

        //namen van collecties zijn casesensitive !!!
        public IMongoCollection<Film> Films =>
                       Database.GetCollection<Film>("films");

        public IMongoCollection<Review> Reviews =>
                        Database.GetCollection<Review>("reviews");


        //public GridFSBucket ImagesBucket => new GridFSBucket(Database);

    }
}
