using Fing.Idatos.CoordinadorEventos.Domain.Interfaces;
using Fing.Idatos.CoordinadorEventos.Infrastructure;
using Fing.Idatos.CoordinadorEventos.Motor;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddScoped<IEventManager, EventManager>();
builder.Services.AddScoped<IEventRepository, EventRepository>();

builder.Services.AddEntityFrameworkNpgsql().AddDbContext<CoordinadorEventosDbContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("CoordinadorEventosDbContext")));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.Services.CreateScope().ServiceProvider.GetRequiredService<CoordinadorEventosDbContext>().Database.EnsureCreated();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
