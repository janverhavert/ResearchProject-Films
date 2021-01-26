package helper

import (
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

	//fmt.Println("Connected to MongoDB!")

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

	filmNamen := []string{"Soul", "Master", "WandaVision", "The Queen's Gambit", "Tenet", "The Dissident", "Sound of Metal", "The Godfather", "The Lord of the Rings: The Fellowship of the Ring", "Interstellar", "Inception", "The Departed", "Breaking Bad", "Chernobyl", "Game of Thrones", "Firefly", "The Office", "Seinfeld", "Peaky Blinders", "The Mandalorian ", "Dark", "Better Call Saul", "Stranger Things", "Arrested Development","Beavis and Butt-Head", "The Good Wife", "Avatar: The Last Airbender", "Dr. Katz, Professional Therapist", "Happy Days", "Will & Grace", "Justified", "Golden Girls", "Frasier", "Good Times", "Soap", "Boardwalk Empire", "The Real World", "Oz", "Rick and Morty", "Alias", "Downton Abbey", "The Americans", "Hannibal", "ER", "I, Claudius", "The Wonder Years", "Survivor", "House of Cards (US)", "The Mary Tyler Moore Show", "The Shield", "Hill Street Blues", "The Andy Griffith Show", "The Honeymooners", "Sex and the City", "Law & Order", "The Muppet Show", "Friday Night Lights", "Mr. Show with Bob and David", "Doctor Who", "The Office", "It's Always Sunny in Philadelphia", "Roseanne", "Cowboy Bebop", "24", "Louie", "Freaks and Geeks", "Alfred Hitchcock Presents", "Curb Your Enthusiasm", "Fargo", "Better Call Saul", "Doctor Who", "Veep", "Community", "The Office (UK)", "Star Trek: Deep Space Nine", "Sanford and Son", "M*A*S*H", "Mystery Science Theater 3000", "In Living Color", "Late Show with David Letterman", "The Prisoner", "Batman: The Animated Series", "The Leftovers", "Mister Rogers' Neighborhood", "Six Feet Under", "Monty Python's Flying Circus", "The X-Files", "Star Trek: The Next Generation", "Roots", "Twin Peaks", "Futurama", "Friends", "30 Rock", "Buffy the Vampire Slayer", "NYPD Blue", "Cheers", "Deadwood", "Band of Brothers", "The Daily Show with Jon Stewart", "Black Swan", "I Saw the Devil", "Inception", "Kick-Ass", "The Social Network", "Scott Pilgrim vs. the World", "Toy Story 3", "Bridesmaids", "Chronicle", "Drive", "Fast Five", "Looper", "Mission: Impossible – Ghost Protocol", "The Tree of Life", "X-Men: First Class", "The Avengers", "The Cabin in the Woods", "Django Unchained", "Dredd", "The Master", "The Raid", "Skyfall", "Zero Dark Thirty", "12 Years a Slave", "Frozen", "Fruitvale Station", "Gravity", "Her", "Inside Llewyn Davis", "Prisoners", "Spring Breakers", "The Wolf of Wall Street", "A Girl Walks Home Alone At Night", "The Babadook", "Birdman", "Boyhood", "Captain America: The Winter Soldier", "Dawn of the Planet of the Apes", "Guardians of the Galaxy", "Gone Girl", "The Grand Budapest Hotel", "Interstellar", "John Wick", "The Lego Movie", "Nightcrawler", "Whiplash", "The Big Short", "Creed", "Ex Machina", "The Hateful Eight", "Inside Out", "It Follows", "Mad Max: Fury Road", "The Martian", "The Revenant", "Room", "Sicario", "Spotlight", "Tangerine", "Arrival", "Deadpool", "Green Room", "The Handmaiden", "Hunt for the Wilderpeople", "La La Land", "Moonlight", "Popstar: Never Stop Never Stopping", "Rogue One", "Sing Street", "Train to Busan", "The Witch", "Baby Driver", "Blade Runner 2049", "Call Me by Your Name", "Coco", "Dunkirk", "Get Out", "IT", "Lady Bird", "Logan", "Paddington 2", "The Shape of Water", "Thor: Ragnarok", "A Quiet Place", "Avengers: Infinity War", "BlacKkKlansman"}
	filmDirectors := []string{"Ardath Ganser", "Lea Marchand", "Muoi Sutcliffe", "Cyrstal Igoe", "Phoebe Gauthier", "Yadira Capasso", "Bobbye Wasielewski", "Rebbecca Fain", "Candyce Twiggs", "Charis Cuevas", "Ulrike Gillie", "Marti Hornyak", "Perla Greve", "Desire Pajak", "Audry Jaworski", "Corrie Baez", "Elsa Nez"}
	filmGenresnames := []string{"Actie", "Avontuur", "Romantiek", "Drama", "Thriller"}
	filmGenresid := []string{"d227e9ba-8061-4a2e-a06a-e79ebf5ce8d9", "0c61dcec-e9b6-46e0-834a-553e7cf71602", "d537acff-4b4e-4c50-8897-f185c82f4743", "6c1343d8-04b3-4568-9ad7-96c76a98920a", "822ff23f-0843-41c1-8b3b-b5cab9328c9b"}

	for value := range filmGenresid {

		e := models.Genres{
			GenreId:   filmGenresid[value],
			GenreName: filmGenresnames[value],
		}
		fmt.Print(e)

		collection := ConnectDB().Collection("genres")
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

		collection := ConnectDB().Collection("films")
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
