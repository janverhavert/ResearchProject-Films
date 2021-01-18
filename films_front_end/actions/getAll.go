package actions

import (
	"context"
	"fmt"
	"log"
	"net/http"

	"films_front_end/back-end/helper"
	"films_front_end/back-end/models"

	"github.com/gobuffalo/buffalo"
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
		return c.Render(http.StatusBadRequest, r.JSON(map[string]string{"message": "error!"}))
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
	var params = mux.Vars(c.Request())

	//Get id from parameters
	id, _ := params["id"]
	// we created Book array
	var films []models.Film
	fmt.Println(id)
	// bson.M{},  we passed empty filter. So we want to get all data.
	cur, err := collection.Find(context.TODO(), bson.M{"FilmId": id})

	if err != nil {
		return c.Render(http.StatusBadRequest, r.JSON(map[string]string{"message": "error!"}))
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
	fmt.Println(films)
	if len(films) == 0 {
		return c.Render(http.StatusBadRequest, r.JSON(map[string]string{"message": "empty"}))
	} else {
		return c.Render(http.StatusOK, r.JSON(films[0]))
	}

	//json.NewEncoder(http.ResponseWriter).Encode()

}
func getFilmbyNameHandler(c buffalo.Context) error {
	collection := helper.ConnectDBFilms()
	//http.ResponseWriter.Header().Set("Content-Type", "application/json")
	var params = mux.Vars(c.Request())

	//Get id from parameters
	name, _ := params["name"]
	// we created Book array
	var films []models.Film
	fmt.Println(name)
	// bson.M{},  we passed empty filter. So we want to get all data.
	cur, err := collection.Find(context.TODO(), bson.M{"titel": name})
	if err != nil {
		return c.Render(http.StatusBadRequest, r.JSON(map[string]string{"message": "error!"}))
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
	fmt.Println(films)
	return c.Render(http.StatusOK, r.JSON(films))
	//json.NewEncoder(http.ResponseWriter).Encode()

}
func getFilmReviewsHandler(c buffalo.Context) error {
	collection := helper.ConnectDBReviews()
	//http.ResponseWriter.Header().Set("Content-Type", "application/json")
	var params = mux.Vars(c.Request())

	//Get id from parameters
	id, _ := params["id"]
	// we created Book array
	var films []models.Reviews
	// bson.M{},  we passed empty filter. So we want to get all data.
	cur, err := collection.Find(context.TODO(), bson.M{"FilmId": id})
	if err != nil {
		return c.Render(http.StatusBadRequest, r.JSON(map[string]string{"message": "error!"}))
	}

	// Close the cursor once finished
	/*A defer statement defers the execution of a function until the surrounding function returns.
	simply, run cur.Close() process but after cur.Next() finished.*/
	defer cur.Close(context.TODO())

	for cur.Next(context.TODO()) {

		// create a value into which the single document can be decoded
		var film models.Reviews
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
	fmt.Println(films)
	return c.Render(http.StatusOK, r.JSON(films))
	//json.NewEncoder(http.ResponseWriter).Encode()

}
func getUserReviewsHandler(c buffalo.Context) error {
	collection := helper.ConnectDBReviews()
	//http.ResponseWriter.Header().Set("Content-Type", "application/json")
	var params = mux.Vars(c.Request())

	//Get id from parameters
	id, _ := params["id"]
	// we created Book array
	var films []models.Reviews
	// bson.M{},  we passed empty filter. So we want to get all data.
	cur, err := collection.Find(context.TODO(), bson.M{"UserId": id})
	if err != nil {
		return c.Render(http.StatusBadRequest, r.JSON(map[string]string{"message": "error!"}))
	}

	// Close the cursor once finished
	/*A defer statement defers the execution of a function until the surrounding function returns.
	simply, run cur.Close() process but after cur.Next() finished.*/
	defer cur.Close(context.TODO())

	for cur.Next(context.TODO()) {

		// create a value into which the single document can be decoded
		var film models.Reviews
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
	fmt.Println(films)
	return c.Render(http.StatusOK, r.JSON(films))
	//json.NewEncoder(http.ResponseWriter).Encode()

}
func getWatchedHandler(c buffalo.Context) error {
	collection := helper.ConnectDBWatched()
	//http.ResponseWriter.Header().Set("Content-Type", "application/json")
	var params = mux.Vars(c.Request())

	//Get id from parameters
	id, _ := params["id"]
	// we created Book array
	var films []models.Watched
	// bson.M{},  we passed empty filter. So we want to get all data.
	cur, err := collection.Find(context.TODO(), bson.M{"UserId": id})
	if err != nil {
		return c.Render(http.StatusBadRequest, r.JSON(map[string]string{"message": "error!"}))
	}

	// Close the cursor once finished
	/*A defer statement defers the execution of a function until the surrounding function returns.
	simply, run cur.Close() process but after cur.Next() finished.*/
	defer cur.Close(context.TODO())

	for cur.Next(context.TODO()) {

		// create a value into which the single document can be decoded
		var film models.Watched
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
func getGenreByFilmHandler(c buffalo.Context) error {
	collection := helper.ConnectDBFilms()
	//http.ResponseWriter.Header().Set("Content-Type", "application/json")
	var params = mux.Vars(c.Request())

	//Get id from parameters
	id, _ := params["id"]
	// we created Book array
	var films []models.Watched
	// bson.M{},  we passed empty filter. So we want to get all data.
	cur, err := collection.Find(context.TODO(), bson.M{"genres": bson.M{"GenreId": id}})
	if err != nil {
		return c.Render(http.StatusBadRequest, r.JSON(map[string]string{"message": "error!"}))
	}

	// Close the cursor once finished
	/*A defer statement defers the execution of a function until the surrounding function returns.
	simply, run cur.Close() process but after cur.Next() finished.*/
	defer cur.Close(context.TODO())

	for cur.Next(context.TODO()) {

		// create a value into which the single document can be decoded
		var film models.Watched
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
