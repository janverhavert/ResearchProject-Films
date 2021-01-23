package actions

import (
	"errors"
	"net/http"

	"github.com/gobuffalo/buffalo"
)

// HomeHandler is a default handler to serve up
// a home page.
func LoginHandler(c buffalo.Context) error {
	return c.Render(http.StatusOK, r.HTML("login.html"))
}
func RegistrerenHandler(c buffalo.Context) error {
	return c.Render(http.StatusOK, r.HTML("registreren.html"))
}
func ProfielHandler(c buffalo.Context) error {
	role, _ := c.Cookies().Get("UserRole")
	if role == "Admin" || role == "Costumer" {
		return c.Render(http.StatusOK, r.HTML("profiel.html"))
	} else {
		return c.Error(401, errors.New("Unauthorized!"))
	}

}
