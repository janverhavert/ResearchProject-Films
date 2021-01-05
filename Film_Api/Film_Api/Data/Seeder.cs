using Film_Api.Models;
using Film_Api.Repositories;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Film_Api.Data
{
    public class Seeder
    {
        private readonly IFilmRepo filmRepo;
        private readonly IReviewRepo reviewRepo;
        private readonly IGenreRepo genreRepo;
        private readonly FilmsServicesContext context;

        //Instantie oproepen vanuit Startup>> configure , met registratie in ConfigureServices.

        public List<Guid> Lst_FilmGuids { get; set; } = new List<Guid>();

        public Seeder(IFilmRepo filmRepo, IReviewRepo reviewRepo, IGenreRepo genreRepo, FilmsServicesContext context)
        {
            this.filmRepo = filmRepo;
            this.reviewRepo = reviewRepo;
            this.genreRepo = genreRepo;
            this.context = context;
        }

        public void initDatabase(int nmbrfilms = 2)
        {
            //geen data blijven toevoegen (MongoDB.Driver)
            try
            {
                //genreRepo.CreateAsync(new Genre
                //{
                //    GenreId = Guid.Parse("d227e9ba-8061-4a2e-a06a-e79ebf5ce8d9"),
                //    GenreNaam = "Actie"
                //});
                //genreRepo.CreateAsync(new Genre
                //{
                //    GenreId = Guid.Parse("0c61dcec-e9b6-46e0-834a-553e7cf71602"),
                //    GenreNaam = "Avontuur"
                //});
                //genreRepo.CreateAsync(new Genre
                //{
                //    GenreId = Guid.Parse("d537acff-4b4e-4c50-8897-f185c82f4743"),
                //    GenreNaam = "Romantiek"
                //});
                //genreRepo.CreateAsync(new Genre
                //{
                //    GenreId = Guid.Parse("822ff23f-0843-41c1-8b3b-b5cab9328c9b"),
                //    GenreNaam = "Thriller"
                //});
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
                            Duur = 60 + new Random().Next(80),
                            ReleaseDatum = DateTime.Now,
                            Discription = "FilmDiscription 1" + i,
                            Genres = new List<Film.Genre>()
                            {
                                new Film.Genre()
                                {
                                    GenreId = Guid.Parse("822ff23f-0843-41c1-8b3b-b5cab9328c9b"),
                                    GenreNaam = "Thriller"
                                }
                            }
                        });
                    }
                }


                //3.Reviews toevoegen (enkel indien ook restaurants worden toegevoegd)
                if (Lst_FilmGuids.Count != 0)
                {
                    reviewRepo.CreateAsync(new Review
                    {
                        Id = new MongoDB.Bson.ObjectId(),
                        FilmId = Lst_FilmGuids[new Random().Next(Lst_FilmGuids.Count)],
                        Titel = "Pricing",
                        Discription = "Too expensive",
                        Score = 4.5M,


                    });

                    //zoekindexen aanmaken op Mongo
                    IndexKeysDefinition<Review> keys = "{ FilmId: 1 }";
                    var indexModel = new CreateIndexModel<Review>(keys);
                    context.Reviews.Indexes.CreateOneAsync(indexModel);

                    IndexKeysDefinition<Film> Filmkeys = "{ FilmId: 1 }";
                    var indexModelComment = new CreateIndexModel<Film>(Filmkeys);
                    context.Films.Indexes.CreateOneAsync(indexModelComment);
                }
            }
            catch (Exception exc)
            {
                Console.WriteLine("fout bij het seeden:", exc);
            }
        }
    }
}
