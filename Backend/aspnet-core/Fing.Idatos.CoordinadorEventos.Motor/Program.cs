using Fing.Idatos.CoordinadorEventos.Domain.Interfaces;
using Fing.Idatos.CoordinadorEventos.Domain.Services;
using Fing.Idatos.CoordinadorEventos.Infrastructure;
using Fing.Idatos.CoordinadorEventos.Motor;
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
            { "service.name", "CoordinadorEventosMotor" }
        };

        config.Endpoint = "http://logging/ingest/otlp";
        config.Protocol = Serilog.Sinks.OpenTelemetry.OtlpProtocol.HttpProtobuf;
    })
    .CreateLogger();

builder.Services.AddSerilog();

// Add services to the container.
builder.Services.AddScoped<IEventManager, EventManager>();
builder.Services.AddScoped<IEventRepository, EventRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<ICategoryService, CategoryService>();

builder.Services.AddEntityFrameworkNpgsql().AddDbContext<CoordinadorEventosDbContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("CoordinadorEventosConnectionString")));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

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
