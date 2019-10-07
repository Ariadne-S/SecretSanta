using System;
using Autofac;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Autofac.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Serilog;
using ILogger = Serilog.ILogger;

namespace SecretSantaApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var log = new LoggerConfiguration()
                .WriteTo.Console()
                .CreateLogger();
            
            try
            {
                log.Information("Hello");
                CreateWebHostBuilder(args, log).Build().Run();
                log.Information("Goodbye");
            }
            finally
            {
                log.Dispose();
            }
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args, ILogger log) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .ConfigureServices(services =>
                {
                    services.AddAutofac(c => { c.RegisterInstance(log); });
                })
                .UseSerilog(log);
    }
}
