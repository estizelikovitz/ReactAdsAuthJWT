using System;
using System.Text.Json.Serialization;

namespace ReactSimpleAdsAuthJWT.Data
{
    public class Ad
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string PhoneNumber { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedDate { get; set; }
        [JsonIgnore]
        public User User { get; set; }


    }



}
