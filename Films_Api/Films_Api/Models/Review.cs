using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Films_Api.Models
{
    public class Review
    {
        public Review() { } //ctor- serialisering

        [BsonId]
        public ObjectId Id { get; set; } = new ObjectId();

        [BsonElement]
        public string Titel { get; set; }

        [BsonElement]
        public double Score { get; set; }

        [BsonElement]
        public string Discription { get; set; }

        [BsonRepresentation(BsonType.String)]
        [BsonElement("FilmId")]
        public Guid FilmId { get; set; }

        [BsonIgnore]
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public Film film { get; set; }
    }
}
