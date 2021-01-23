package actions

import (
	"context"
	"encoding/json"
	"films_front_end/back-end/helper"
	"films_front_end/back-end/models"
	"fmt"
	"log"
	"net/http"

	tmdb "github.com/cyruzin/golang-tmdb"
	"github.com/gobuffalo/buffalo"
	"github.com/google/uuid"
	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
)

// HomeHandler is a default handler to serve up
// a home page.
func getAllHandler(c buffalo.Context) error {
	collection := helper.ConnectDB().Collection("films")
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
	collection := helper.ConnectDB().Collection("films")
	//http.ResponseWriter.Header().Set("Content-Type", "application/json")
	var film models.Film
	var params = mux.Vars(c.Request())

	//Get id from parameters
	id, _ := params["id"]
	// we created Book array
	// bson.M{},  we passed empty filter. So we want to get all data.
	filter := bson.M{"filmId": id}
	err := collection.FindOne(context.TODO(), filter).Decode(&film)

	if err != nil {
		return c.Render(http.StatusBadRequest, r.JSON(map[string]string{"message": "error!"}))
	}

	return c.Render(http.StatusOK, r.JSON(film))

	//json.NewEncoder(http.ResponseWriter).Encode()

}

func createFilmHandler(c buffalo.Context) error {
	collection := helper.ConnectDB().Collection("films")
	//http.ResponseWriter.Header().Set("Content-Type", "application/json")
	var film models.Film
	tmdbClient, err := tmdb.Init("54ca5c0ee715b67fdec29283a02c0648")
	if err != nil {
		fmt.Println(err)
	}

	newId := generateGUID()

	film.FilmId = newId
	// we decode our body request params
	_ = json.NewDecoder(c.Request().Body).Decode(&film)
	movie, err := tmdbClient.GetSearchMulti(film.Titel, nil)
	if err != nil {
		fmt.Println(err)
	}
	film.PosterUrl = movie.Results[0].PosterPath
	fmt.Println(film)
	// insert our book model.
	result, err := collection.InsertOne(context.TODO(), film)

	if err != nil {
		return c.Render(http.StatusBadRequest, r.JSON(map[string]string{"message": "error!"}))
	}

	return c.Render(http.StatusOK, r.JSON(result))

	//json.NewEncoder(http.ResponseWriter).Encode()

}

// func uploadFilmPictureHandler(c buffalo.Context) error {
// 	collection := helper.ConnectDBFile()

// 	file, err := collection.GridFS

// 	if err != nil {
// 		err = file.Close()
// 	}

// 	check(err)
// 	fmt.Printf("%d bytes written\n", n)
// 	// insert our book model.

// 	return c.Render(http.StatusOK, r.JSON(result))

// 	//json.NewEncoder(http.ResponseWriter).Encode()

// }
func updateFilmHandler(c buffalo.Context) error {
	collection := helper.ConnectDB().Collection("films")
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
	// update := bson.M{
	// 	"filmId":       id,
	// 	"titel":        film.Titel,
	// 	"director":     film.Director,
	// 	"type":         film.Type,
	// 	"duur":         film.Duur,
	// 	"discription":  film.Discription,
	// 	"posterUrl":    film.PosterUrl,
	// 	"releaseDatum": film.ReleaseDatum,
	// 	"genres": bson.M{
	// 		"genreId":   film.Genres[0].GenreId,
	// 		"genreName": film.Genres[0].GenreName,
	// 	},
	// }
	// addgenres := []models.Genres{models.Genres{
	// 	GenreId:   film.Genres[0].GenreId,
	// 	GenreName: film.Genres[0].GenreName,
	// },
	// }
	// update := bson.M{"$push": bson.M{"genres": bson.M{"genre": addgenres}}}

	result, err := collection.ReplaceOne(context.TODO(), filter, film)

	if err != nil {
		return c.Render(http.StatusBadRequest, r.JSON(map[string]string{"message": err.Error()}))
	}

	film.FilmId = id

	return c.Render(http.StatusOK, r.JSON(result))

	//json.NewEncoder(http.ResponseWriter).Encode()

}
func deleteFilmHandler(c buffalo.Context) error {
	collection := helper.ConnectDB().Collection("films")
	collectionReviews := helper.ConnectDB().Collection("reviews")
	collectionWatched := helper.ConnectDB().Collection("genres")
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
		fmt.Println("document not found")
	}
	collectionReviews.DeleteMany(context.TODO(), filter)
	collectionWatched.DeleteMany(context.TODO(), filter)
	return c.Render(http.StatusOK, r.JSON(result))

	//json.NewEncoder(http.ResponseWriter).Encode()

}

func generateGUID() string {
	u := uuid.New()
	fmt.Printf("%s", u)
	return u.String()
}
