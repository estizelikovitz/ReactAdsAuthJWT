using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactSimpleAdsAuthJWT.Data
{
    public class Repository
    {
        private string _connectionString;
        public Repository(string connectionString)
        {
            _connectionString = connectionString;
        }
        public void AddSimpleAd(Ad ad)
        {
            using var context = new DataContext(_connectionString);
            context.Ads.Add(ad);
            context.SaveChanges();
        }

        public List<Ad> GetAds()
        {
            using var context = new DataContext(_connectionString);
            return context.Ads.OrderByDescending(a => a.CreatedDate).Include(a => a.User).ToList();
        }

        public List<Ad> GetAdsForUser(int userId)
        {
            using var context = new DataContext(_connectionString);
            return context.Ads.Include(a => a.User).Where(a => a.UserId == userId).ToList();
        }

        public int GetUserIdForAd(int adId)
        {
            using var context = new DataContext(_connectionString);
            return context.Ads.Where(a => a.Id == adId).Select(a => a.UserId).FirstOrDefault();
        }

        public void Delete(int id)
        {
            using var context = new DataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"DELETE FROM Ads WHERE Id = {id}");
        }

        public bool IsEmailAvailable(string email)
        {
            using var context = new DataContext(_connectionString);
            return context.Users.All(u => u.Email != email);
        }

        public void AddUser(User user)
        {
            var hash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);
            user.PasswordHash = hash;
            using var context = new DataContext(_connectionString);
            context.Users.Add(user);
            context.SaveChanges();
        }

        public User Login(string email, string password)
        {
            var user = GetByEmail(email);
            if (user == null)
            {
                return null;
            }

            bool isValidPassword = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);
            if (isValidPassword)
            {
                return user; //success!!
            }

            return null;
        }

        public User GetByEmail(string email)
        {
            using var context = new DataContext(_connectionString);
            return context.Users.FirstOrDefault(u => u.Email == email);
        }


    }
}
