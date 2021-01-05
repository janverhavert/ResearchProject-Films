using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Film_Api.Models
{
    public class Genre
    {
        public Genre() { } //ctor- serialisering
        [BsonId]
       public ObjectId Id { get; set; } = new ObjectId();

        [BsonRepresentation(BsonType.String)] //controleer type in Mongo
        [BsonElement("GenreId")]
        public Guid GenreId { get; set; } = Guid.NewGuid();

        [BsonElement]
        public string GenreNaam { get; set; }

    }
}
