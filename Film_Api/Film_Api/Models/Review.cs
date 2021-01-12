using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Film_Api.Models
{
    public class Review
    {
        public Review() { } //ctor- serialisering

        [BsonId]
        public ObjectId Id { get; set; } = new ObjectId();

        [BsonElement]
        public string Titel { get; set; }

        [BsonElement]
        [BsonRepresentation(BsonType.Decimal128)]
        [Range(typeof(decimal), "0", "10")]
        public decimal Score { get; set; }

        [BsonElement]
        public string Discription { get; set; }

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
