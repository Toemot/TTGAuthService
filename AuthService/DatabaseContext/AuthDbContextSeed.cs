using AuthService.Models;

namespace AuthService.DatabaseContext
{
    public static class AuthDbContextSeed
    {
        public static void Seed(AuthDbContext context)
        {
            if (!context.Users.Any())
            {
                context.Users.AddRange(
                    new User { Username = "admin", PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin123"), Role = "Admin" },
                    new User { Username = "user", PasswordHash = BCrypt.Net.BCrypt.HashPassword("user123"), Role = "User" }
                );
                context.SaveChanges();
            }
        }
    }
}
