package actions

import (
	"net/http"

	"github.com/gobuffalo/buffalo"
)

// HomeHandler is a default handler to serve up
// a home page.
func AdminHandler(c buffalo.Context) error {
	return c.Render(http.StatusOK, r.HTML("admin.html"))
}
func AdminAddHandler(c buffalo.Context) error {
	return c.Render(http.StatusOK, r.HTML("adminAdd.html"))
}
func AdminEditHandler(c buffalo.Context) error {
	return c.Render(http.StatusOK, r.HTML("adminEdit.html"))
}
func AdminReviewsHandler(c buffalo.Context) error {
	return c.Render(http.StatusOK, r.HTML("adminReviews.html"))
}
