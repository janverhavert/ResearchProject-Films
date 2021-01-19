package actions

import (
	"github.com/gobuffalo/buffalo"
	"github.com/gobuffalo/envy"
	csrf "github.com/gobuffalo/mw-csrf"
	forcessl "github.com/gobuffalo/mw-forcessl"
	i18n "github.com/gobuffalo/mw-i18n"
	paramlogger "github.com/gobuffalo/mw-paramlogger"
	"github.com/gobuffalo/packr/v2"
	"github.com/unrolled/secure"
)

// ENV is used to help switch settings based on where the
// application is being run. Default is "development".
var ENV = envy.Get("GO_ENV", "development")
var app *buffalo.App
var T *i18n.Translator

// App is where all routes and middleware for buffalo
// should be defined. This is the nerve center of your
// application.
//
// Routing, middleware, groups, etc... are declared TOP -> DOWN.
// This means if you add a middleware to `app` *after* declaring a
// group, that group will NOT have that new middleware. The same
// is true of resource declarations as well.
//
// It also means that routes are checked in the order they are declared.
// `ServeFiles` is a CATCH-ALL route, so it should always be
// placed last in the route declarations, as it will prevent routes
// declared after it to never be called.
func App() *buffalo.App {
	if app == nil {
		app = buffalo.New(buffalo.Options{
			Env:         ENV,
			SessionName: "_films_front_end_session",
		})

		// Automatically redirect to SSL
		app.Use(forceSSL())
		// Log request parameters (filters apply).
		app.Use(paramlogger.ParameterLogger)

		// Protect against CSRF attacks. https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)
		// Remove to disable this.
		app.Use(csrf.New)

		// Setup and use translations:
		app.Use(translations())

		app.GET("/", HomeHandler)
		app.GET("/series", SeriesHandler)
		app.GET("/watched", WatchedHandler)
		app.GET("/registreren", RegistrerenHandler)
		app.GET("/login", LoginHandler)
		app.GET("/film/{id}", FilmDetailHandler)
		app.GET("/profiel", ProfielHandler)
		app.GET("/admin", AdminHandler)
		app.GET("/adminAdd", AdminAddHandler)
		app.GET("/adminEdit/{id}", AdminEditHandler)
		app.GET("/adminReviews/{id}", AdminReviewsHandler)

		//api
		app.GET("/api/All", getAllHandler)
		app.GET("/api/Films", getFilmsHandler)
		app.DELETE("/api/Films/{id}", deleteFilmHandler)
		app.POST("/api/Film", createFilmHandler)
		app.PUT("/api/Film", updateFilmHandler)
		app.GET("/api/Film/{id}", getFilmbyIdHandler)
		app.GET("/api/Films/genre/{id}", getGenreByFilmHandler)
		app.GET("/api/Films/{name}", getFilmbyNameHandler)
		app.GET("/api/films/Reviews/{id}", getFilmReviewsHandler)
		app.GET("/api/user/reviews/{id}", getUserReviewsHandler)
		app.DELETE("/api/Reviews/{id}", deleteReviewHandler)
		app.POST("/api/User/Reviews", createReviewHandler)
		app.GET("/api/Watched/{id}", getWatchedHandler)
		app.GET("/api/Series", getSeriesHandler)
		app.GET("/api/Genres", getGenresHandler)

		app.ServeFiles("/", assetsBox) // serve files from the public directory
	}

	return app
}

// translations will load locale files, set up the translator `actions.T`,
// and will return a middleware to use to load the correct locale for each
// request.
// for more information: https://gobuffalo.io/en/docs/localization
func translations() buffalo.MiddlewareFunc {
	var err error
	if T, err = i18n.New(packr.New("app:locales", "../locales"), "en-US"); err != nil {
		app.Stop(err)
	}
	return T.Middleware()
}

// forceSSL will return a middleware that will redirect an incoming request
// if it is not HTTPS. "http://example.com" => "https://example.com".
// This middleware does **not** enable SSL. for your application. To do that
// we recommend using a proxy: https://gobuffalo.io/en/docs/proxy
// for more information: https://github.com/unrolled/secure/
func forceSSL() buffalo.MiddlewareFunc {
	return forcessl.Middleware(secure.Options{
		SSLRedirect:     ENV == "production",
		SSLProxyHeaders: map[string]string{"X-Forwarded-Proto": "https"},
	})
}
