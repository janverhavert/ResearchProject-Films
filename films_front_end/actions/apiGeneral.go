package actions

import (
	"context"
	"encoding/json"
	"films_front_end/back-end/helper"
	"films_front_end/back-end/models"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gobuffalo/buffalo"
	"github.com/google/uuid"
	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
)

// HomeHandler is a default handler to serve up
// a home page.
func getAllHandler(c buffalo.Context) error {
	collection := helper.ConnectDBFilms()
	//http.ResponseWriter.Header().Set("Content-Type", "application/json")

	// we created Book array
	var films []models.Film

	// bson.M{},  we passed empty filter. So we want to get all data.
	cur, err := collection.Find(context.TODO(), bson.M{})

	if err != nil {
		return c.Render(http.StatusBadRequest, r.JSON(map[string]string{"message": "Geen films gevonden"}))
	}

	// Close the cursor once finished
	/*A defer statement defers the execution of a function until the surrounding function returns.
	simply, run cur.Close() process but after cur.Next() finished.*/
	defer cur.Close(context.TODO())

	for cur.Next(context.TODO()) {

		// create a value into which the single document can be decoded
		var film models.Film
		// & character returns the memory address of the following variable.
		err := cur.Decode(&film) // decode similar to deserialize process.
		if err != nil {
			log.Fatal(err)
		}

		// add item our array

		films = append(films, film)

	}

	if err := cur.Err(); err != nil {
		log.Fatal(err)
	}
	return c.Render(http.StatusOK, r.JSON(films))
	//json.NewEncoder(http.ResponseWriter).Encode()

}

func getFilmbyIdHandler(c buffalo.Context) error {
	collection := helper.ConnectDBFilms()
	//http.ResponseWriter.Header().Set("Content-Type", "application/json")
	var film models.Film
	var params = mux.Vars(c.Request())

	//Get id from parameters
	id, _ := params["id"]
	// we created Book array

	fmt.Println(id)
	// bson.M{},  we passed empty filter. So we want to get all data.
	filter := bson.M{"filmId": id}
	err := collection.FindOne(context.TODO(), filter).Decode(&film)

	if err != nil {
		return c.Render(http.StatusBadRequest, r.JSON(map[string]string{"message": "error!"}))
	}

	return c.Render(http.StatusOK, r.JSON(film))

	//json.NewEncoder(http.ResponseWriter).Encode()

}

func getGenreByFilmHandler(c buffalo.Context) error {
	collection := helper.ConnectDBFilms()
	//http.ResponseWriter.Header().Set("Content-Type", "application/json")
	var params = mux.Vars(c.Request())

	//Get id from parameters
	id, _ := params["id"]
	fmt.Println(id)
	// we created Book array
	var films []models.Film
	fmt.Println(films)
	// bson.M{},  we passed empty filter. So we want to get all data.
	cur, err := collection.Aggregate(context.TODO(), bson.M{"genres": bson.M{"genreId": id}})
	if err != nil {
		return c.Render(http.StatusBadRequest, r.JSON(map[string]string{"message": err.Error()}))
	}

	// Close the cursor once finished
	/*A defer statement defers the execution of a function until the surrounding function returns.
	simply, run cur.Close() process but after cur.Next() finished.*/
	defer cur.Close(context.TODO())

	for cur.Next(context.TODO()) {

		// create a value into which the single document can be decoded
		var film models.Film
		// & character returns the memory address of the following variable.
		err := cur.Decode(&film) // decode similar to deserialize process.
		if err != nil {
			log.Fatal(err)
		}

		// add item our array

		films = append(films, film)

	}

	if err := cur.Err(); err != nil {
		log.Fatal(err)
	}
	if len(films) == 0 {
		return c.Render(http.StatusOK, r.JSON("[]"))
	} else {
		return c.Render(http.StatusOK, r.JSON(films))
	}
	//json.NewEncoder(http.ResponseWriter).Encode()

}
func createFilmHandler(c buffalo.Context) error {
	collection := helper.ConnectDBFilms()
	//http.ResponseWriter.Header().Set("Content-Type", "application/json")
	var film models.Film
	newId := generateGUID()
	film.FilmId = newId
	film.Serie = false
	film.ReleaseDatum = time.Now()
	// we decode our body request params
	_ = json.NewDecoder(c.Request().Body).Decode(&film)

	// insert our book model.
	result, err := collection.InsertOne(context.TODO(), film)

	if err != nil {
		return c.Render(http.StatusBadRequest, r.JSON(map[string]string{"message": "error!"}))
	}

	return c.Render(http.StatusOK, r.JSON(result))

	//json.NewEncoder(http.ResponseWriter).Encode()

}
func updateFilmHandler(c buffalo.Context) error {
	collection := helper.ConnectDBFilms()
	//http.ResponseWriter.Header().Set("Content-Type", "application/json")
	var params = mux.Vars(c.Request())

	//Get id from parameters
	id, _ := params["id"]

	var film models.Film

	// Create filter
	filter := bson.M{"filmId": id}

	// Read update model from body request
	_ = json.NewDecoder(c.Request().Body).Decode(&film)

	// prepare update model.
	update := bson.D{
		{"$set", bson.D{
			{"filmId", film.FilmId},
			{"titel", film.Titel},
			{"director", film.Director},
			{"serie", film.Serie},
			{"duur", film.Duur},
			{"discription", film.Discription},
			//{"releaseDatum", film.ReleaseDatum},
			{"genres", bson.D{
				{"genreId", film.Genres[0].GenreId},
				{"genreName", film.Genres[0].GenreName},
			}},
		}},
	}

	err := collection.FindOneAndUpdate(context.TODO(), filter, update).Decode(&film)

	if err != nil {
		return c.Render(http.StatusBadRequest, r.JSON(map[string]string{"message": "error!"}))
	}

	film.FilmId = id

	return c.Render(http.StatusOK, r.JSON(film))

	//json.NewEncoder(http.ResponseWriter).Encode()

}
func deleteFilmHandler(c buffalo.Context) error {
	collection := helper.ConnectDBFilms()
	//http.ResponseWriter.Header().Set("Content-Type", "application/json")
	var params = mux.Vars(c.Request())

	//Get id from parameters
	id, _ := params["id"]
	fmt.Println(id)
	// insert our book model.
	filter := bson.M{"filmId": id}
	result, err := collection.DeleteOne(context.TODO(), filter)
	fmt.Println("DeleteOne Result TYPE:", result)
	if err != nil {
		return c.Render(http.StatusBadRequest, r.JSON(map[string]string{"message": err.Error()}))
	}
	if result.DeletedCount == 0 {
		fmt.Println("DeleteOne() document not found")
	}
	return c.Render(http.StatusOK, r.JSON(result))

	//json.NewEncoder(http.ResponseWriter).Encode()

}

func generateGUID() string {
	u := uuid.New()
	fmt.Printf("%s", u)
	return u.String()
}
