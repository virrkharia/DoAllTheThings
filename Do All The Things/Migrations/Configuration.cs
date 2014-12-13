namespace Do_All_The_Things.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<Do_All_The_Things.Models.TodoContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(Do_All_The_Things.Models.TodoContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //
			var r = new Random();
			var items = Enumerable.Range(1, 50).Select(o => new TodoItem
			{
				DueDate = new DateTime(2014, r.Next(1, 12), r.Next(1, 28)),
				Priority = (byte)r.Next(10),
				Todo = o.ToString()
			}).ToArray();
			context.TodoItems.AddOrUpdate(item => new { item.Todo }, items);
        }
    }
}
