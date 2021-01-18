package actions

import (
	"context"
	"log"
	"net/http"

	"films_front_end/back-end/helper"
	"films_front_end/back-end/models"

	"github.com/gobuffalo/buffalo"
	"go.mongodb.org/mongo-driver/bson"
)

// HomeHandler is a default handler to serve up
// a home page.
func getGenresHandler(c buffalo.Context) error {
	collection := helper.ConnectDBGenres()
	//http.ResponseWriter.Header().Set("Content-Type", "application/json")

	// we created Book array
	var films []models.Genres

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
		var film models.Genres
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
