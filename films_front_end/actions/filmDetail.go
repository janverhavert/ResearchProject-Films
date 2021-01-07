package actions

import (
	"net/http"

	"github.com/gobuffalo/buffalo"
)

// HomeHandler is a default handler to serve up
// a home page.
func FilmDetailHandler(c buffalo.Context) error {
	return c.Render(http.StatusOK, r.HTML("filmDetail.html"))
}
