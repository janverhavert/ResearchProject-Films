package seeder

import (
	"films_front_end/back-end/models"
	"fmt"
	"math/rand"
	"time"

	"github.com/google/uuid"
)

func seeder() {

	filmNamen := []string{"Soul", "Master", "WandaVision", "The Queen's Gambit", "Tenet", "The Dissident", "Sound of Metal", "The Godfather", "The Lord of the Rings: The Fellowship of the Ring", "Interstellar", "Inception", "The Departed"}
	filmDirectors := []string{"Ardath Ganser", "Lea Marchand", "Muoi Sutcliffe", "Cyrstal Igoe", "Phoebe Gauthier", "Yadira Capasso", "Bobbye Wasielewski", "Rebbecca Fain", "Candyce Twiggs", "Charis Cuevas", "Ulrike Gillie", "Marti Hornyak", "Perla Greve", "Desire Pajak", "Audry Jaworski", "Corrie Baez", "Elsa Nez"}
	//filmGenres := []string{"d227e9ba-8061-4a2e-a06a-e79ebf5ce8d9": "Actie", "0c61dcec-e9b6-46e0-834a-553e7cf71602": "Avontuur", "d537acff-4b4e-4c50-8897-f185c82f4743": "Romantiek", "6c1343d8-04b3-4568-9ad7-96c76a98920a": "Drama", "822ff23f-0843-41c1-8b3b-b5cab9328c9b": "Thriller"}
	var i = 0
	for value, s := range filmNamen {
		rand.Seed(time.Now().UnixNano())
		var film models.Film
		film.FilmId = generateGUID()
		film.Titel = s
		film.Director = filmDirectors[i]
		film.Duur = 60 + rand.Intn(100)
		film.Serie = rand.Intn(2) == 1
		film.ReleaseDatum = randate()
		film.Discription = "A musician who has lost his passion for music is transported out of his body and must find his way back with the help of an infant soul learning about herself."
		value++
		fmt.Println(film)
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
