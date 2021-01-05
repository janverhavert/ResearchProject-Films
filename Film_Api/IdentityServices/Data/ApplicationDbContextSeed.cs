﻿using IdentityServices.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityServices.Data
{
    public class ApplicationDbContextSeed
    {
        public async static Task SeedAsync(ApplicationDbContext context, IWebHostEnvironment env, RoleManager<Role> roleManager, UserManager<User> userManager)
        {
            try
            {
                //inlezen vanop Setup
                var contentRoot = env.ContentRootPath;
                var webroot = env.WebRootPath;

                await SeedRoles(roleManager);
                await context.SaveChangesAsync();

                await SeedAdmins(userManager, roleManager);
                await context.SaveChangesAsync();

                await SeedUsers(userManager, roleManager);
                await context.SaveChangesAsync();

                //TODO: await SeedUsersFromFile();

            }
            catch
            {



            }

        }

        private async static Task SeedUsers(UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            if (userManager.FindByNameAsync("Customer@1").Result == null)
            {
                User customer1 = new User
                {
                    Id = Guid.NewGuid().ToString(),
                    UserName = "Customer@1",
                    Email = "customer1@howest.be",
                };

                var userResult = await userManager.CreateAsync(customer1, "Customer@1");
                await userManager.AddToRoleAsync(customer1, "Customer");

                if (!userResult.Succeeded)
                {
                    throw new Exception($"{customer1.Email} not logged in");
                }
            }
        }


        private async static Task SeedAdmins(UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            var nmbrAdmins = 2;
            for (var i = 1; i <= nmbrAdmins; i++)
            {

                if (userManager.FindByNameAsync("Admin@" + i).Result == null)
                {
                    User admin = new User
                    {
                        Id = Guid.NewGuid().ToString(),
                        UserName = "Admin@" + i,
                        Email = "emailAdmin" + i + "@howest.be",
                    };

                    var userResult = await userManager.CreateAsync(admin, "Admin@" + i);
                    var role = roleManager.Roles.Where(r => r.Name.StartsWith("Admin")).FirstAsync().Result;
                    await userManager.AddToRoleAsync(admin, role.Name);

                    if (!userResult.Succeeded)
                    {
                        throw new Exception($"{admin.Email} not logged in");
                    }
                }
            }
        }

        private static async Task SeedRoles(RoleManager<Role> roleManager)
        {
            string[] roleNames = { "Admin", "Customer", "Visitor" };
            foreach (var roleName in roleNames)
            {
                var roleExist = await roleManager.RoleExistsAsync(roleName);
                if (!roleExist)
                {
                    var result = await roleManager.CreateAsync(new Role(roleName));
                }
            }

        }
    }
}

