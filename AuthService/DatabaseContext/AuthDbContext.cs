using AuthService.Models;
using Microsoft.EntityFrameworkCore;

namespace AuthService.DatabaseContext
{
    public class AuthDbContext : DbContext
    {
        public AuthDbContext(DbContextOptions<AuthDbContext> options) 
            : base(options) { }

        public DbSet<User> Users { get; set; }
    }
}
