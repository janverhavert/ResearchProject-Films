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
func AdminHandler(c buffalo.Context) error {
	value, _ := c.Cookies().Get("UserRole")
	if value == "Admin" {
		response, err := http.Get("http://127.0.0.1:3000/api/All")
		if err != nil {
			fmt.Printf("The HTTP request failed with error %s\n", err)
		}

		data, _ := ioutil.ReadAll(response.Body)
		var films []models.Film
		if err := json.Unmarshal(data, &films); err != nil {
			panic(err)
		}
		c.Set("films", films)
		return c.Render(http.StatusOK, r.HTML("admin.html"))
	} else {
		return c.Error(401, errors.New("Unauthorized!"))
	}
}
func AdminAddHandler(c buffalo.Context) error {
	value, _ := c.Cookies().Get("UserRole")

	if value == "Admin" {
		return c.Render(http.StatusOK, r.HTML("adminAdd.html"))
	} else {
		return c.Error(401, errors.New("Unauthorized!"))
	}
}
func AdminEditHandler(c buffalo.Context) error {
	value, _ := c.Cookies().Get("UserRole")
	if value == "Admin" {
		return c.Render(http.StatusOK, r.HTML("adminEdit.html"))
	} else {
		return c.Error(401, errors.New("Unauthorized!"))
	}
}
func AdminReviewsHandler(c buffalo.Context) error {
	value, _ := c.Cookies().Get("UserRole")

	if value == "Admin" {
		var urlFull = c.Request().URL.String()
		url := strings.Split(urlFull, "/")
		response, err := http.Get("http://127.0.0.1:3000/api/films/Reviews/" + url[2])
		if err != nil {
			fmt.Printf("The HTTP request failed with error %s\n", err)
		}

		data, _ := ioutil.ReadAll(response.Body)
		var reviews []models.Reviews
		if err := json.Unmarshal(data, &reviews); err != nil {
			panic(err)
		}
		c.Set("reviews", reviews)
		return c.Render(http.StatusOK, r.HTML("adminReviews.html"))
	} else {
		return c.Error(401, errors.New("Unauthorized!"))
	}
}
