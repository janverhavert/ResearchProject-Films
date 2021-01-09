using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Film_Api.Models
{
    public class Film
    {
        public Film() { } //ctor- serialisering

        [BsonId]
        public ObjectId Id { get; set; } = new ObjectId();

        [BsonRepresentation(BsonType.String)] //controleer type in Mongo
        [BsonElement("FilmId")]
        public Guid FilmId { get; set; } = Guid.NewGuid();

        [BsonElement]
        public string Titel { get; set; }

        [BsonElement]
        public string Director { get; set; }

        [BsonElement]
        public int Duur { get; set; }

        [BsonElement]
        public bool Serie { get; set; } = false;

        [BsonElement]
        public DateTime ReleaseDatum { get; set; }

        [BsonElement]
        public string Discription { get; set; }

        [BsonElement("Genres")]
        [BsonIgnoreIfNull]
        public IList<Genre> Genres { get; set; }

        public class Genre
        {
            [BsonId]
            public ObjectId Id { get; set; } = new ObjectId();
            [BsonRepresentation(BsonType.String)]
            [BsonElement("GenreId")]
            public Guid GenreId { get; set; }
            [BsonElement("GenreName")]
            public string GenreNaam { get; set; }
        }
    }
}
