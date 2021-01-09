using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Film_Api.Models
{
    public class Watched
    {
        public Watched() { } //ctor- serialisering

        [BsonId]
        public ObjectId Id { get; set; } = new ObjectId();
        [BsonRepresentation(BsonType.DateTime)]
        public DateTime DateOfCreation { get; set; } = DateTime.Now;

        [BsonRepresentation(BsonType.String)]
        [BsonElement("UserId")]
        public Guid UserId { get; set; }

        [BsonRepresentation(BsonType.String)]
        [BsonElement("FilmId")]
        public Guid FilmId { get; set; }

        [BsonIgnore]
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public Film film { get; set; }
    }
}
