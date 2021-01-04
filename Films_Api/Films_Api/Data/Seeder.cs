using Films_Api.Models;
using Films_Api.Repositories;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Films_Api.Data
{
    public class Seeder
    {
        private readonly IFilmRepo filmRepo;
        private readonly FilmsServicesContext context;

        //Instantie oproepen vanuit Startup>> configure , met registratie in ConfigureServices.

        public List<Guid> Lst_FilmGuids { get; set; } = new List<Guid>();

        public Seeder(IFilmRepo filmRepo, FilmsServicesContext context)
        {
            this.filmRepo = filmRepo;
            this.context = context;
        }

        public void initDatabase(int nmbrfilms = 2)
        {
            //geen data blijven toevoegen (MongoDB.Driver)
            try
            {
                //2. testRestaurants aanmaken
                for (var i = 0; i < nmbrfilms; i++)
                {

                    if (!filmRepo.CollectionExistsAsync("TestResto" + i).Result)
                    {

                        Guid currentId = Guid.NewGuid();
                        Lst_FilmGuids.Add(currentId);

                        filmRepo.CreateAsync(new Film
                        {
                            FilmId = currentId,
                            Titel = "TestFilm" + i,
                            Director = "Director" + i,
                            Duur = 51 + new Random().Next(10),
                            ReleaseDatum = DateTime.Now,
                            Discription = "FilmDiscription 1" + i
                        });
                    }
                }


                //3.Reviews toevoegen (enkel indien ook restaurants worden toegevoegd)
                //if (Lst_FilmGuids.Count != 0)
                //{
                //    reviewRepo.CreateAsync(new Review
                //    {
                //        Id = new MongoDB.Bson.ObjectId(),
                //        RestaurantID = Lst_RestaurantGuids[new Random().Next(Lst_RestaurantGuids.Count)],
                //        Subject = "Pricing",
                //        Comment = "Too expensive",
                //        Quotation = 4.5M

                //    });
                //    reviewRepo.CreateAsync(new Review
                //    {
                //        Id = new MongoDB.Bson.ObjectId(),
                //        RestaurantID = Lst_RestaurantGuids[new Random().Next(Lst_RestaurantGuids.Count)],
                //        Subject = "Location",
                //        Comment = "Nice location in beautiful city.",
                //        Quotation = 7.2M

                //    });

                //    reviewRepo.CreateAsync(new Review
                //    {
                //        Id = new MongoDB.Bson.ObjectId(),
                //        RestaurantID = Lst_RestaurantGuids[new Random().Next(Lst_RestaurantGuids.Count)],
                //        Subject = "Service",
                //        Comment = "Excellent",
                //        Quotation = 8.0M
                //    });


                //    reviewRepo.CreateAsync(new Review
                //    {
                //        Id = new MongoDB.Bson.ObjectId(),
                //        RestaurantID = Lst_RestaurantGuids[new Random().Next(Lst_RestaurantGuids.Count)],
                //        Subject = "Location",
                //        Comment = "Difficult to find.",
                //        Quotation = 5

                //    });

                //    reviewRepo.CreateAsync(new Review
                //    {
                //        Id = new MongoDB.Bson.ObjectId(),
                //        RestaurantID = Lst_RestaurantGuids[new Random().Next(Lst_RestaurantGuids.Count)],
                //        Subject = "Location",
                //        Comment = "Beautiful garden and sunny terrace.",
                //        Quotation = 6

                //    });

                //    reviewRepo.CreateAsync(new Review
                //    {
                //        Id = new MongoDB.Bson.ObjectId(),
                //        RestaurantID = Lst_RestaurantGuids[new Random().Next(Lst_RestaurantGuids.Count)],
                //        Subject = "Food",
                //        Comment = "Excellent BBQ.",
                //        Quotation = 8

                //    });

                    //zoekindexen aanmaken op Mongo
                    //IndexKeysDefinition<Review> keys = "{ RestaurantID: 1 }";
                    //var indexModel = new CreateIndexModel<Review>(keys);
                    //context.Reviews.Indexes.CreateOneAsync(indexModel);

                    IndexKeysDefinition<Film> Filmkeys = "{ FilmId: 1 }";
                    var indexModelComment = new CreateIndexModel<Film>(Filmkeys);
                    context.Films.Indexes.CreateOneAsync(indexModelComment);
                //}
            }
            catch (Exception exc)
            {
                Console.WriteLine("fout bij het seeden:", exc);
            }
        }
    }
}

