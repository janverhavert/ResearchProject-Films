package actions

import (
	"encoding/json"
	"errors"
	"films_front_end/back-end/models"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"

	"github.com/gobuffalo/buffalo"
)

// HomeHandler is a default handler to serve up
// a home page.
func HomeHandler(c buffalo.Context) error {
	response, err := http.Get("http://127.0.0.1:3000/api/Films")
	if err != nil {
		fmt.Printf("The HTTP request failed with error %s\n", err)
	}

	data, _ := ioutil.ReadAll(response.Body)
	var films []models.Film
	if err := json.Unmarshal(data, &films); err != nil {
		panic(err)
	}
	if len(films) <= 0 {
		c.Set("empty", "films")
	}
	c.Set("films", films)
	return c.Render(http.StatusOK, r.HTML("main.html"))
}

func WatchedHandler(c buffalo.Context) error {
	role, _ := c.Cookies().Get("UserRole")
	if role == "Admin" || role == "Costumer" {
		value, _ := c.Cookies().Get("UserId")
		response, err := http.Get("http://127.0.0.1:3000/api/Watched/" + value)
		if err != nil {
			fmt.Printf("The HTTP request failed with error %s\n", err)
		}

		data, _ := ioutil.ReadAll(response.Body)
		var watched []models.Watched
		if err := json.Unmarshal(data, &watched); err != nil {
			panic(err)
		}
		var films []models.Film
		for _, s := range watched {
			response, err := http.Get("http://127.0.0.1:3000/api/Film/" + s.FilmId)
			if err != nil {
				fmt.Printf("The HTTP request failed with error %s\n", err)
			}

			data, _ := ioutil.ReadAll(response.Body)
			var film models.Film
			if err := json.Unmarshal(data, &film); err != nil {
				panic(err)
			}
			films = append(films, film)
		}

		c.Set("type", "Watched")
		c.Set("films", films)
		fmt.Println(films)
		if len(films) <= 0 {
			c.Set("empty", "films")
		}
		return c.Render(http.StatusOK, r.HTML("main.html"))
	} else {
		return c.Error(401, errors.New("Unauthorized!"))
	}

}

func SeriesHandler(c buffalo.Context) error {
	response, err := http.Get("http://127.0.0.1:3000/api/Series")
	if err != nil {
		fmt.Printf("The HTTP request failed with error %s\n", err)
	}

	data, _ := ioutil.ReadAll(response.Body)
	var films []models.Film
	if err := json.Unmarshal(data, &films); err != nil {
		panic(err)
	}
	if len(films) <= 0 {
		c.Set("empty", "series")
	}
	c.Set("films", films)
	return c.Render(http.StatusOK, r.HTML("main.html"))
}

func FilmDetailHandler(c buffalo.Context) error {
	var urlFull = c.Request().URL.String()
	url := strings.Split(urlFull, "/")
	response, err := http.Get("http://127.0.0.1:3000/api/Film/" + url[2])
	if err != nil {
		fmt.Printf("The HTTP request failed with error %s\n", err)
	}

	data, _ := ioutil.ReadAll(response.Body)
	var film models.Film
	if err := json.Unmarshal(data, &film); err != nil {
		panic(err)
	}

	c.Set("film", film)
	return c.Render(http.StatusOK, r.HTML("filmDetail.html"))
}
