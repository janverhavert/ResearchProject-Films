package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

//Create Struct
type Film struct {
	Id           primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	FilmId       string             `json:"filmId,omitempty" bson:"filmId,omitempty"`
	Titel        string             `json:"titel" bson:"titel,omitempty"`
	Director     string             `json:"director" bson:"director,omitempty"`
	Duur         int                `json:"duur" bson:"duur,omitempty"`
	Serie        bool               `json:"serie" bson:"serie,omitempty"`
	ReleaseDatum time.Time          `json:"releaseDatum" bson:"releaseDatum,omitempty"`
	Discription  string             `json:"discription" bson:"discription,omitempty"`
	Genres       []Genres           `json:"genres" bson:"genres,omitempty"`
}

type Genres struct {
	Id        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	GenreId   string             `json:"genreId,omitempty" bson:"genreId,omitempty"`
	GenreName string             `json:"genreName,omitempty" bson:"genreName,omitempty"`
}
type Reviews struct {
	Id             primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	UserId         string             `json:"userId,omitempty" bson:"userId,omitempty"`
	FilmId         string             `json:"filmId,omitempty" bson:"filmId,omitempty"`
	Titel          string             `json:"titel" bson:"titel,omitempty"`
	Score          float32            `json:"score" bson:"score,omitempty"`
	UserName       string             `json:"userName" bson:"userName,omitempty"`
	DateOfCreation time.Time          `json:"dateOfCreation" bson:"dateOfCreation,omitempty"`
	Discription    string             `json:"discription" bson:"discription,omitempty"`
}
type Watched struct {
	Id             primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	UserId         string             `json:"userId,omitempty" bson:"userId,omitempty"`
	FilmId         string             `json:"filmId,omitempty" bson:"filmId,omitempty"`
	DateOfCreation time.Time          `json:"dateOfCreation" bson:"dateOfCreation,omitempty"`
}
