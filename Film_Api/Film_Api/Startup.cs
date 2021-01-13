using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Film_Api.Data;
using Film_Api.Repositories;
using Film_Api.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Film_Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.Configure<MongoSettings>(Configuration.GetSection(nameof(MongoSettings)));

            //MongoDB-registraties
            services.AddSingleton<IMongoSettings>(sp => sp.GetRequiredService<IOptions<MongoSettings>>().Value);

            //context en repo's 
            services.AddSingleton<FilmsServicesContext>();
            services.AddScoped(typeof(IFilmRepo), typeof(FilmRepo));
            services.AddScoped(typeof(IReviewRepo), typeof(ReviewRepo));
            services.AddScoped(typeof(IGenreRepo), typeof(GenreRepo));
            services.AddScoped(typeof(IWatchedRepo), typeof(WatchedRepo));
            services.AddScoped(typeof(IFileHandlers), typeof(FileHandlers));
            services.AddScoped<Seeder>();

            //CORS
            services.AddCors(options =>
            {
                options.AddPolicy("MyAllowOrigins", builder =>
                {
                    builder.AllowAnyMethod()
                   .AllowAnyHeader()
                   .AllowAnyOrigin();
                });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, Seeder seeder)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

           //app.UseHttpsRedirection();

            app.UseRouting();
            app.UseCors("MyAllowOrigins");
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            //seeder.initDatabase(20);
        }
    }
}
