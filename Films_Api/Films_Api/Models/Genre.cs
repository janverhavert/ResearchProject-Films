using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Films_Api.Models
{
    public class Genre
    {
        public Genre() { } //ctor- serialisering

        [BsonId]
        public ObjectId Id { get; set; } = new ObjectId();

        [BsonElement]
        public string GenreNaam { get; set; }

    }
}
