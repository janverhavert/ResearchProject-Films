using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Film_Api.Models;
using Film_Api.Repositories;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Film_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class FilmsController : ControllerBase
    {
        private readonly IFilmRepo filmRepo;
        private readonly IWatchedRepo watchedRepo;
        private readonly IReviewRepo reviewRepo;
        private readonly IGenreRepo genreRepo;

        public FilmsController(IFilmRepo filmRepo, IWatchedRepo watchedRepo, IReviewRepo reviewRepo, IGenreRepo genreRepo)
        {
            this.filmRepo = filmRepo;
            this.watchedRepo = watchedRepo;
            this.reviewRepo = reviewRepo;
            this.genreRepo = genreRepo;
        }

        [HttpGet]
        [Route("/api/All")]
        public async Task<ActionResult<IEnumerable<Film>>> GetAll()
        {
            var films = await filmRepo.GetAll();
            return Ok(films);
        }

        [HttpGet]
        [Route("/api/Films")]
        public async Task<ActionResult<IEnumerable<Film>>> GetFilms()
        {
            var films = await filmRepo.GetAllFilms();
            return Ok(films);
        }

        [HttpGet]
        [Route("/api/Series")]
        public async Task<ActionResult<IEnumerable<Film>>> GetSeries()
        {
            var films = await filmRepo.GetAllSeries();
            return Ok(films);
        }

        [HttpGet]
        [Route("/api/Genres")]
        public async Task<ActionResult<IEnumerable<Genre>>> GetGenres()
        {
            var genres = await genreRepo.GetAllGenres();
            return Ok(genres);
        }


        [HttpGet]
        [Route("/api/Film/{id}")]
        public async Task<ActionResult<Film>> GetFilm(string id)
        {
            if (id == null || id == "")
            {
                return BadRequest();
            }

            var film = await filmRepo.GetFilmById(id);

            if (film == null)
            {
                return NotFound();
            }

            // var restoDTO = mapper.Map<FilmDTO>(resto);
            return Ok(film);
        }

        [HttpGet]
        [Route("/api/Films/{name}")]
        public async Task<ActionResult<Film>> GetFilmByName(string name)
        {
            if (name == null || name == "")
            {
                return BadRequest();
            }

            var film = await filmRepo.GetFilmByName(name);

            if (film == null)
            {
                return NotFound();
            }

            // var restoDTO = mapper.Map<FilmDTO>(resto);
            return Ok(film);
        }

        [HttpGet]
        [Route("/api/Series/{name}")]
        public async Task<ActionResult<Film>> GetSerieByName(string name)
        {
            if (name == null || name == "")
            {
                return BadRequest();
            }

            var film = await filmRepo.GetSerieByName(name);

            if (film == null)
            {
                return NotFound();
            }

            // var restoDTO = mapper.Map<FilmDTO>(resto);
            return Ok(film);
        }

        [HttpGet]
        [Route("/api/Films/Reviews/{id}")]
        public async Task<ActionResult<Film>> GetFilmReviews(string id)
        {
            if (id == null || id == "")
            {
                return BadRequest();
            }

            var film = await filmRepo.GetReviewsForFilm(id);

            if (film == null)
            {
                return NotFound();
            }

            // var restoDTO = mapper.Map<FilmDTO>(resto);
            return Ok(film);
        }
        [HttpGet]
        [Route("/api/User/Reviews/{id}")]
        public async Task<ActionResult<Review>> GetUserReviews(string id)
        {
            if (id == null || id == "")
            {
                return BadRequest();
            }

            var film = await reviewRepo.GetReviewByUserId(id);

            if (film == null)
            {
                return NotFound();
            }

            // var restoDTO = mapper.Map<FilmDTO>(resto);
            return Ok(film);
        }
        [HttpGet]
        [Route("/api/Watched/{id}")]
        public async Task<ActionResult<Watched>> GetWatchedByUserId(string id)
        {
            if (id == null || id == "")
            {
                return BadRequest();
            }

            var film = await watchedRepo.GetWatchedByUserId(id);

            if (film == null)
            {
                return NotFound();
            }

            // var restoDTO = mapper.Map<FilmDTO>(resto);
            return Ok(film);
        }
        [HttpGet]
        [Route("/api/films/genre/{id}")]
        public async Task<ActionResult<Genre>> GetGenreForFilm(string id)
        {
            if (id == null || id == "")
            {
                return BadRequest();
            }

            var film = await filmRepo.GetFilmByGenreId(id);

            if (film == null)
            {
                return NotFound();
            }

            // var restoDTO = mapper.Map<FilmDTO>(resto);
            return Ok(film);
        }
        [HttpGet]
        [Route("/api/series/genre/{id}")]
        public async Task<ActionResult<Genre>> GetGenreForSerie(string id)
        {
            if (id == null || id == "")
            {
                return BadRequest();
            }

            var film = await filmRepo.GetSerieByGenreId(id);

            if (film == null)
            {
                return NotFound();
            }

            // var restoDTO = mapper.Map<FilmDTO>(resto);
            return Ok(film);
        }
        [HttpPost()]
        [Route("/api/Add")]
        public async Task<ActionResult<Film>> PostFilm([FromBody] Film film)
        {
            if (film == null)
            {
                return BadRequest(new { Message = "Geen film input" });
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                await filmRepo.CreateAsync(film);
                return CreatedAtAction("GetFilm", new { id = film.FilmId }, film);
            }
            catch (Exception exc)
            {
                throw exc;
            }

        }
        [HttpPost()]
        [Route("/api/User/Reviews")]
        public async Task<ActionResult<Review>> PostReview([FromBody] Review review)
        {
            if (review == null)
            {
                return BadRequest(new { Message = "Geen film input" });
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                await reviewRepo.CreateAsync(review);
                return CreatedAtAction("GetReview", new { id = review.FilmId }, review);
            }
            catch (Exception exc)
            {
                throw exc;
            }

        }
        [HttpPost()]
        [Route("/api/Watched")]
        public async Task<ActionResult<Watched>> PostWatched([FromBody] Watched watched)
        {
            if (watched == null)
            {
                return BadRequest(new { Message = "Geen watched input" });
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                await watchedRepo.CreateAsync(watched);
                return CreatedAtAction("GetWatchedByUserId", new { id = watched.FilmId }, watched);
            }
            catch (Exception exc)
            {
                throw exc;
            }

        }

        [HttpPut("{filmId}")]
        [Route("/api/Edit")]
        public async Task<IActionResult> PutRestaurant([FromBody] Film film)
        {
            //1. checks : null , ids, exists, valid
            // correcte JsonPropertyNames en datatype 
            if (film == null) return BadRequest();

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //Film ophalen (op ObjecId of FilmId)
            if (filmRepo.GetFilmById(Convert.ToString(film.FilmId)) == null)
            {
                return NotFound("Film bestaat niet.");
            }

            //ObjectId verplicht in Mongo(invullen als zekerheid)
            Film filmToUpdate = await filmRepo.GetFilmById(film.FilmId.ToString());
            if (filmToUpdate != null)
            {
                film.Id = filmToUpdate.Id;  //bestaat niet -> upsert maakt het aan.
            }
            else
            {
                film.Id = ObjectId.GenerateNewId(); //vervangt 00000 empty objectId
            }

            ////Indien een mapper 
            // Film resto = mapper.Map<Film>(filmDTO);

            //2. try update
            try
            {
                var result = await filmRepo.UpsertAsync(film); //new  in repo (niet meer generic)
                if (result == null)
                {
                    return BadRequest("Onbestaande film");
                }
            }
            catch (Exception exc)
            {
                throw new Exception(exc.Message);
            }
            return NoContent();
        }


        // DELETE api/<FilmsController>/5
        [HttpDelete]
        [Route("/api/Films/{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            if (id == null || id == "")
            {
                return BadRequest();
            }

            var film = await filmRepo.RemoveAsync(id);

            if (film == null)
            {
                return NotFound();
            }
            return Ok(film);
        }
        [HttpDelete]
        [Route("/api/Watched/{id}")]
        public async Task<ActionResult> DeleteWatched(string id)
        {
            if (id == null || id == "")
            {
                return BadRequest();
            }

            var film = await watchedRepo.RemoveAsync(id);

            if (film == null)
            {
                return NotFound();
            }
            return Ok(film);
        }

        [HttpDelete]
        [Route("/api/Reviews/{id}")]
        public async Task<ActionResult> DeleteReview(string id)
        {
            if (id == null || id == "")
            {
                return BadRequest();
            }

            var film = await reviewRepo.RemoveAsync(id);

            if (film == null)
            {
                return NotFound();
            }
            return Ok(film);
        }
    }
}
