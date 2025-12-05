using FoodOrderingAPI.Models;
using FoodOrderingAPI.Services;
using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);

// MongoDB Connection Test
var mongoSettings = builder.Configuration.GetSection("MongoDB");
var client = new MongoClient(mongoSettings["ConnectionString"]);

try
{
    client.ListDatabaseNames().ToList();
    Console.WriteLine("MongoDB Connected Successfully!");
}
catch (Exception ex)
{
    Console.WriteLine("MongoDB Connection Failed: " + ex.Message);
}

// Configure MongoDB
builder.Services.Configure<MongoDBSettings>(
    builder.Configuration.GetSection("MongoDB"));

builder.Services.AddSingleton<MongoDBService>();
builder.Services.AddScoped<AuthService>();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
