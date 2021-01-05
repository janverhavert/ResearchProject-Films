using System;
using System.Collections.Generic;
using System.Text;
using IdentityServices.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace IdentityServices.Data
{
    public class ApplicationDbContext : IdentityDbContext<User, Role, string, IdentityUserClaim<string>, UserRole, IdentityUserLogin<string>, IdentityRoleClaim<string>, IdentityUserToken<string>>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder); modelBuilder.Entity<UserRole>(entity =>
            {
                //Samengestelde keys aanmaken kan allen hier. //Als het framework ze aanmakkt -> dubbele items in de tabel de aangepaste
                entity.HasKey(e => new { e.UserId, e.RoleId });
            });
        }
    }
}
