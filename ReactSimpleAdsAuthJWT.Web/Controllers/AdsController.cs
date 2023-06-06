using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using ReactSimpleAdsAuthJWT.Data;
using ReactSimpleAdsAuthJWT.Web.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace ReactSimpleAdsAuthJWT.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdsController : ControllerBase
    {

        private string _connectionString;
        private IConfiguration _configuration;

        public AdsController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
            _configuration = configuration;
        }

        [HttpPost]
        [Route("signup")]
        public void Signup(User user)
        {
            var repo = new Repository(_connectionString);
            repo.AddUser(user);
        }

        [HttpPost]
        [Route("login")]
        public IActionResult Login(LoginVM viewModel)
        {
            var repo = new Repository(_connectionString);
            var user = repo.Login(viewModel.Email, viewModel.Password);
            if (user == null)
            {
                return Unauthorized();
            }

            var claims = new List<Claim>()
            {
                new Claim("user", viewModel.Email)
            };

            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetValue<string>("JWTSecret")));
            var credentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokenOptions = new JwtSecurityToken(signingCredentials: credentials,
                claims: claims);
            string tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
            return Ok(new { token = tokenString });
        }

        [HttpGet]
        [Route("getcurrentuser")]
        public User GetCurrentUser()
        {
            string email = User.FindFirst("user")?.Value; //get currently logged in users email - this is in place of User.Identity.Name
            if (String.IsNullOrEmpty(email))
            {
                return null;
            }

            var repo = new Repository(_connectionString);
            return repo.GetByEmail(email);
        }


        [Authorize]
        [HttpPost]
        [Route("addad")]
        public void AddAd(Ad ad)
        {
            string email = User.FindFirst("user")?.Value; //get currently logged in users email - this is in place of User.Identity.Name
            var repo = new Repository(_connectionString);
            ad.UserId = repo.GetByEmail(email).Id;
            repo.AddSimpleAd(ad);
        }

        [HttpGet]
        [Route("getads")]
        public List<Ad> GetAds(int id)
        {
            var repo = new Repository(_connectionString);
            return repo.GetAdsForUser(id);
        }

        //[HttpGet]
        //[Route("getallbookmarks")]
        //public List<Bookmark> GetAllBookmarks()
        //{
        //    var repo = new Repository(_connectionString);
        //    return repo.GetBookmarks();
        //}



        [HttpPost]
        [Route("deletead")]
        public void DeleteAd(Ad ad)
        {
            var repo = new Repository(_connectionString);
            repo.Delete(ad.Id);
        }


    }
}
