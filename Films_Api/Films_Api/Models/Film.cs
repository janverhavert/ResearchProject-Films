using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Films_Api.Models
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
        public DateTime ReleaseDatum { get; set; }

        [BsonElement]
        public string Discription { get; set; }

        [BsonElement("Genres")]
        [BsonIgnoreIfNull]
        public ICollection<Genre> Genres { get; set; }

        public class Genre
        {
            [BsonElement("Id")]
            public Guid Id { get; set; }
            [BsonElement("GenreName")]
            public string GenreName { get; set; }
        }
    }
}
