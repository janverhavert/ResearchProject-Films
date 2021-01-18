package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

//Create Struct
type Film struct {
	Id           primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	FilmId       string             `json:"FilmId,omitempty" bson:"FilmId,omitempty"`
	Titel        string             `json:"titel" bson:"titel,omitempty"`
	Director     string             `json:"director" bson:"director,omitempty"`
	Duur         int                `json:"duur" bson:"duur,omitempty"`
	Serie        bool               `json:"serie" bson:"serie,omitempty"`
	ReleaseDatum primitive.DateTime `json:"releaseDatum" bson:"releaseDatum,omitempty"`
	Discription  string             `json:"discription" bson:"discription,omitempty"`
	Genres       []Genres           `json:"genres" bson:"genres,omitempty"`
}
type Genres struct {
	Id        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	GenreId   string             `json:"genreId,omitempty" bson:"GenreId,omitempty"`
	GenreName string             `json:"genreName,omitempty" bson:"GenreName,omitempty"`
}
type Reviews struct {
	Id             primitive.ObjectID   `json:"_id,omitempty" bson:"_id,omitempty"`
	UserId         string               `json:"UserId,omitempty" bson:"UserId,omitempty"`
	FilmId         string               `json:"FilmId,omitempty" bson:"FilmId,omitempty"`
	Titel          string               `json:"titel" bson:"titel,omitempty"`
	Score          primitive.Decimal128 `json:"score" bson:"score,omitempty"`
	UserName       string               `json:"userName" bson:"UserName,omitempty"`
	DateOfCreation primitive.DateTime   `json:"dateOfCreation" bson:"DateOfCreation,omitempty"`
	Discription    string               `json:"discription" bson:"Discription,omitempty"`
}
type Watched struct {
	Id             primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	UserId         string             `json:"UserId,omitempty" bson:"UserId,omitempty"`
	FilmId         string             `json:"FilmId,omitempty" bson:"FilmId,omitempty"`
	DateOfCreation primitive.DateTime `json:"DateOfCreation" bson:"DateOfCreation,omitempty"`
}
