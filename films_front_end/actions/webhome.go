package actions

import (
	"net/http"

	"github.com/gobuffalo/buffalo"
)

// HomeHandler is a default handler to serve up
// a home page.
func HomeHandler(c buffalo.Context) error {
	return c.Render(http.StatusOK, r.HTML("main.html"))
}
func WatchedHandler(c buffalo.Context) error {
	return c.Render(http.StatusOK, r.HTML("watched.html"))
}
func SeriesHandler(c buffalo.Context) error {
	return c.Render(http.StatusOK, r.HTML("series.html"))
}
func FilmDetailHandler(c buffalo.Context) error {
	return c.Render(http.StatusOK, r.HTML("filmDetail.html"))
}
