using Fing.Idatos.CoordinadorEventos.Application;
using Fing.Idatos.CoordinadorEventos.Application.Contracts;
using Fing.Idatos.CoordinadorEventos.Domain.Interfaces;
using Fing.Idatos.CoordinadorEventos.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Verbose()
    .Enrich.FromLogContext()
    .WriteTo.Console()
    .WriteTo.OpenTelemetry(config =>
    {
        config.ResourceAttributes = new Dictionary<string, object>
        {
            { "service.name", "CoordinadorEventosAPI" }
        };

        config.Endpoint = "http://logging/ingest/otlp";
        config.Protocol = Serilog.Sinks.OpenTelemetry.OtlpProtocol.HttpProtobuf;
    })
    .CreateLogger();

builder.Services.AddSerilog();

// Add services to the container.
builder.Services.AddScoped<IEventService, EventService>();
builder.Services.AddScoped<IEventRepository, EventRepository>();

builder.Services.AddEntityFrameworkNpgsql().AddDbContext<CoordinadorEventosDbContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("CoordinadorEventosConnectionString")));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure CORS to allow any origin
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

var app = builder.Build();

// Use CORS policy
app.UseCors("AllowAllOrigins");

app.Services.CreateScope().ServiceProvider.GetRequiredService<CoordinadorEventosDbContext>().Database.EnsureCreated();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
