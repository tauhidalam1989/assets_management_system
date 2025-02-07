using AMS.ConHelper;
using AMS.Data;
using AMS.Helpers;
using AMS.Models;
using AMS.Models.CommonViewModel;
using AMS.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json.Serialization;
using Microsoft.AspNetCore.Server.IISIntegration;
using Microsoft.AspNetCore.Localization; // Add this for localization
using System.Globalization; // Add this for CultureInfo

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews()
    .AddViewLocalization(Microsoft.AspNetCore.Mvc.Razor.LanguageViewLocationExpanderFormat.Suffix) // Add view localization
    .AddDataAnnotationsLocalization(); // Add data annotations localization

builder.Services.AddRazorPages().AddRazorRuntimeCompilation();
builder.Services.AddLocalization(options => options.ResourcesPath = "Resources");

var supportedCultures = new[] { "en-US", "ar-SA" };
var localizationOptions = new RequestLocalizationOptions()
    .SetDefaultCulture("en-US")
    .AddSupportedCultures(supportedCultures)
    .AddSupportedUICultures(supportedCultures);
builder.Services.AddLocalization(options => {
    options.ResourcesPath = "Resources";
    Console.WriteLine($"ResourcesPath: {options.ResourcesPath}");
});
builder.Services.AddScoped<ApplicationDbContext>();
var _ApplicationInfo = builder.Configuration.GetSection("ApplicationInfo").Get<ApplicationInfo>();
string _GetConnStringName = ControllerExtensions.GetConnectionString(builder.Configuration);
if (_ApplicationInfo.DBConnectionStringName == ConnectionStrings.connMySQL)
{
    builder.Services.AddDbContextPool<ApplicationDbContext>(options => options.UseMySql(_GetConnStringName, ServerVersion.AutoDetect(_GetConnStringName)));
}
else if (_ApplicationInfo.DBConnectionStringName == ConnectionStrings.connPostgreSQL)
{
    builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseNpgsql(_GetConnStringName));
}
else
{
    builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(_GetConnStringName));
}

builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(60);
});

builder.Services.AddAuthentication(IISDefaults.AuthenticationScheme);

// Set Identity Options
var _context = ProgramTaskExtension.GetDBContextInstance(builder.Services);
bool IsDBCanConnect = _context.Database.CanConnect();
if (IsDBCanConnect && _context.DefaultIdentityOptions.Count() > 0)
{
    var _DefaultIdentityOptions = _context.DefaultIdentityOptions.Where(x => x.Id == 1).SingleOrDefault();
    AddIdentityOptions.SetOptions(builder.Services, _DefaultIdentityOptions);
}
else
{
    IConfigurationSection _IConfigurationSection = builder.Configuration.GetSection("IdentityDefaultOptions");
    builder.Services.Configure<DefaultIdentityOptions>(_IConfigurationSection);
    var _DefaultIdentityOptions = _IConfigurationSection.Get<DefaultIdentityOptions>();
    AddIdentityOptions.SetOptions(builder.Services, _DefaultIdentityOptions);
}

// Get Super Admin Default options
builder.Services.Configure<SuperAdminDefaultOptions>(builder.Configuration.GetSection("SuperAdminDefaultOptions"));
builder.Services.Configure<ApplicationInfo>(builder.Configuration.GetSection("ApplicationInfo"));

builder.Services.AddTransient<IAssetService, AssetService>();
builder.Services.AddTransient<ICommon, Common>();
builder.Services.AddTransient<IAccount, Account>();
builder.Services.AddTransient<IEmailSender, EmailSender>();
builder.Services.AddTransient<IRoles, Roles>();
builder.Services.AddTransient<IFunctional, Functional>();

builder.Services.AddControllers().AddNewtonsoftJson(options =>
{
    options.SerializerSettings.ContractResolver = new DefaultContractResolver();
});

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Asset M@nagement Sys", Version = "v1" });
    c.AddSecurityDefinition("BearerAuth", new OpenApiSecurityScheme
    {
        Type = SecuritySchemeType.Http,
        Scheme = JwtBearerDefaults.AuthenticationScheme.ToLowerInvariant(),
        In = ParameterLocation.Header,
        Name = "Authorization",
        BearerFormat = "JWT",
        Description = "JWT Authorization header using the Bearer scheme."
    });
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("Open", builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "AMS v1"));
}
else
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRequestLocalization(localizationOptions); // Enable request localization

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.UseSession();

app.UseCors("Open");

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Dashboard}/{action=Index}/{id?}");

ProgramTaskExtension.SeedingData(app);
app.Run();