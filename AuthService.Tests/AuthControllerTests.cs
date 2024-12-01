using AuthService.Controllers;
using AuthService.DatabaseContext;
using AuthService.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace AuthService.Tests
{
    public class AuthControllerTests
    {
        private readonly AuthController _controller;
        private readonly AuthDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthControllerTests()
        {
            var options = new DbContextOptionsBuilder<AuthDbContext>()
                .UseInMemoryDatabase(databaseName: "TestDatabase")
                .Options;
            _context = new AuthDbContext(options);

            var inMemorySettings = new Dictionary<string, string> {
            {"Jwt:Key", "your_secret_key"},
            {"Jwt:Issuer", "your_issuer"}
        };

            _configuration = new ConfigurationBuilder()
                .AddInMemoryCollection(inMemorySettings)
                .Build();

            _controller = new AuthController(_context, _configuration);
        }

        [Fact]
        public async Task SignUp_ShouldRegisterUser()
        {
            var userDto = new UserDto { Username = "testuser", Password = "password", Role = "User" };
            var result = await _controller.SignUp(userDto);
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async Task LogIn_ShouldAuthenticateUser()
        {
            var user = new User { Username = "testuser", PasswordHash = BCrypt.Net.BCrypt.HashPassword("password"), Role = "User" };
            _context.Users.Add(user);
            _context.SaveChanges();

            var userDto = new UserDto { Username = "testuser", Password = "password" };
            var result = await _controller.LogIn(userDto);
            Assert.IsType<OkObjectResult>(result);
        }
    }
}
