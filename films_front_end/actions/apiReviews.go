package actions

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"films_front_end/back-end/helper"
	"films_front_end/back-end/models"

	"github.com/gobuffalo/buffalo"
	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
)

// HomeHandler is a default handler to serve up
// a home page.

func getFilmReviewsHandler(c buffalo.Context) error {
	collection := helper.ConnectDBReviews()
	//http.ResponseWriter.Header().Set("Content-Type", "application/json")
	var params = mux.Vars(c.Request())

	//Get id from parameters
	id, _ := params["id"]
	// we created Book array
	var films []models.Reviews
	// bson.M{},  we passed empty filter. So we want to get all data.
	cur, err := collection.Find(context.TODO(), bson.M{"filmId": id})
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
	if len(films) == 0 {
		return c.Render(http.StatusOK, r.JSON("[]"))
	} else {
		return c.Render(http.StatusOK, r.JSON(films))
	}

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
func createReviewHandler(c buffalo.Context) error {
	collection := helper.ConnectDBReviews()
	//http.ResponseWriter.Header().Set("Content-Type", "application/json")
	var review models.Reviews

	review.DateOfCreation = time.Now()
	// we decode our body request params
	_ = json.NewDecoder(c.Request().Body).Decode(&review)

	// insert our book model.
	result, err := collection.InsertOne(context.TODO(), review)

	if err != nil {
		return c.Render(http.StatusBadRequest, r.JSON(map[string]string{"message": "error!"}))
	}

	return c.Render(http.StatusOK, r.JSON(result))

	//json.NewEncoder(http.ResponseWriter).Encode()

}
func deleteReviewHandler(c buffalo.Context) error {
	collection := helper.ConnectDBReviews()
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
