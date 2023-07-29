---
slug: charp-db-context-out-of-controller
title: 在Controller返回之后，如何继续使用DBContext
authors: carrgan
tags: [csharp]
---



在 .NET 中，可能会出现需要异步执行一些代码的情况，在 Controller 返回之后，尝试使用注入的 DbContext 会出错。这通常是因为 DbContext 的生命周期与 Controller 不同，导致 DbContext 已经失效或已被销毁。

在 ASP.NET Core 中，可以使用依赖注入来管理 DbContext 的生命周期。默认情况下，ASP.NET Core 使用 Scoped 生命周期来注册 DbContext，这意味着每个请求将获得一个独立的 DbContext 实例。这通常是很好的，因为这种生命周期的 DbContext 可以在请求处理期间持久化跨越多个操作的状态。

如果你在 Controller 返回之后仍需要使用已注入的 DbContext，则可以尝试以下方法之一：

1. 将 DbContext 注册为 Singleton 生命周期。

   如果你明确了解你应用中 DbContext 的生命周期，并且你需要在 Controller 结束时后继续使用 DbContext 实例，则可以将其注册为 Singleton 生命周期。但是这通常不是一个好的解决方案，因为 DbContext 是不是一个线程安全的对象。

    ```csharp
    services.AddSingleton<MyDbContext>();
    ```

2. 使用 DbContextPool

   ASP.NET Core 中的 DbContext 池化提供了一种 DbContext 的重新利用机制，可以在 DbContext 实例不再使用时自动销毁 DbContext，以提高性能。若要使用 DbContextPool，需要执行以下操作：

   首先，需要将 DbContext 注册为 Scoped 生命周期，然后在 Startup 类的 ConfigureServices 方法中启用 context 池:

    ```csharp
    services.AddDbContextPool<MyDbContext>(options =>
        options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"))
             .UseLoggerFactory(loggerFactory) // 选填日志工厂
             .EnableSensitiveDataLogging(true)); // 启用敏感数据记录
    ```

   接下来，在需要使用 DbContext 的地方，需要在 IServiceScopeFactory 接口中使用 scoped 服务对象。

    ```csharp
    public class MyController : ControllerBase
    {
        private readonly IServiceScopeFactory _scopeFactory;
   
    public MyController(IServiceScopeFactory scopeFactory)
    {
         _scopeFactory = scopeFactory;
    }
   
    private async Task<MyEntity> GetMyEntityAsync(int id)
    {
        using (var scope = _scopeFactory.CreateScope())
      {
          var dbContext = scope.ServiceProvider.GetRequiredService<MyDbContext>();
          return await dbContext.MyEntities.FindAsync(id);
      }
    }
    }
    ```

   在上述示例中，我们创建了一个使用 scoped 生命周期的 DbContext 的作用域，然后使用该作用域中的 DbContext 来到查询 MyEntity 实体的记录。之所以要使用作用域，是因为在 Controller 返回之后，作用域将被销毁，由此产生的 DbContext 实例也将被销毁或重新放入 DbContext 池中，以便将来的请求使用。