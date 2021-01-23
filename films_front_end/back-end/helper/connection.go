package helper

import (
	"ResearchProject-Films/films_front_end/back-end/helper"
	"ResearchProject-Films/films_front_end/back-end/models"
	"context"
	"encoding/json"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"time"

	tmdb "github.com/cyruzin/golang-tmdb"
	"github.com/google/uuid"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// ConnectDB : This is helper function to connect mongoDB
// If you want to export your function. You must to start upper case function name. Otherwise you won't see your function when you import that on other class.
func ConnectDB() *mongo.Database {

	// Set client options
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")

	// Connect to MongoDB
	client, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to MongoDB!")

	collection := client.Database("FilmsServicesDB")
	return collection
}

// ErrorResponse : This is error model.
type ErrorResponse struct {
	StatusCode   int    `json:"status"`
	ErrorMessage string `json:"message"`
}

// GetError : This is helper function to prepare error model.
// If you want to export your function. You must to start upper case function name. Otherwise you won't see your function when you import that on other class.
func GetError(err error, w http.ResponseWriter) {

	log.Fatal(err.Error())
	var response = ErrorResponse{
		ErrorMessage: err.Error(),
		StatusCode:   http.StatusInternalServerError,
	}

	message, _ := json.Marshal(response)

	w.WriteHeader(response.StatusCode)
	w.Write(message)
}

func Seeder() {

	filmNamen := []string{"Soul", "Master", "WandaVision", "The Queen's Gambit", "Tenet", "The Dissident", "Sound of Metal", "The Godfather", "The Lord of the Rings: The Fellowship of the Ring", "Interstellar", "Inception", "The Departed", "Breaking Bad", "Chernobyl", "Game of Thrones", "Game of Thrones", "Firefly", "The Office", "Seinfeld", "Peaky Blinders", "The Mandalorian ", "Dark", "Better Call Saul", "Stranger Things", "Arrested Development"}
	filmDirectors := []string{"Ardath Ganser", "Lea Marchand", "Muoi Sutcliffe", "Cyrstal Igoe", "Phoebe Gauthier", "Yadira Capasso", "Bobbye Wasielewski", "Rebbecca Fain", "Candyce Twiggs", "Charis Cuevas", "Ulrike Gillie", "Marti Hornyak", "Perla Greve", "Desire Pajak", "Audry Jaworski", "Corrie Baez", "Elsa Nez"}
	filmGenresnames := []string{"Actie", "Avontuur", "Romantiek", "Drama", "Thriller"}
	filmGenresid := []string{"d227e9ba-8061-4a2e-a06a-e79ebf5ce8d9", "0c61dcec-e9b6-46e0-834a-553e7cf71602", "d537acff-4b4e-4c50-8897-f185c82f4743", "6c1343d8-04b3-4568-9ad7-96c76a98920a", "822ff23f-0843-41c1-8b3b-b5cab9328c9b"}

	for value := range filmGenresid {

		e := models.Genres{
			GenreId:   filmGenresid[value],
			GenreName: filmGenresnames[value],
		}
		fmt.Print(e)

		collection := helper.ConnectDB().Collection("genres")
		collection.InsertOne(context.TODO(), e)
		value++
	}

	for value, s := range filmNamen {
		rand.Seed(time.Now().UnixNano())
		tmdbClient, err := tmdb.Init("54ca5c0ee715b67fdec29283a02c0648")
		if err != nil {
			fmt.Println(err)
		}
		movie, err := tmdbClient.GetSearchMulti(s, nil)
		if err != nil {
			fmt.Println(err)
		}
		var discription = movie.Results[0].Overview
		var posterId = movie.Results[0].PosterPath
		var serieType = movie.Results[0].MediaType
		var randomGenre = rand.Intn(5)

		e := models.Film{
			FilmId:       generateGUID(),
			Titel:        s,
			Director:     filmDirectors[rand.Intn(10)],
			Duur:         60 + rand.Intn(100),
			Type:         serieType,
			PosterUrl:    posterId,
			ReleaseDatum: randate(),
			Discription:  discription,
			Genres: []models.Genres{
				models.Genres{
					GenreId:   filmGenresid[randomGenre],
					GenreName: filmGenresnames[randomGenre],
				},
			},
		}

		collection := helper.ConnectDB().Collection("films")
		collection.InsertOne(context.TODO(), e)
		value++
	}
}

func randate() time.Time {
	min := time.Date(1970, 1, 0, 0, 0, 0, 0, time.UTC).Unix()
	max := time.Date(2070, 1, 0, 0, 0, 0, 0, time.UTC).Unix()
	delta := max - min

	sec := rand.Int63n(delta) + min
	return time.Unix(sec, 0)
}
func generateGUID() string {
	u := uuid.New()
	fmt.Printf("%s", u)
	return u.String()
}
