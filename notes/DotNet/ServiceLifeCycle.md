# 服务生存期

在.NET Core和ASP.NET Core中，依赖注入容器通常支持以下三种常见的服务生命周期：

1. **Singleton（单例）生命周期**：
    - 在整个应用程序生命周期内只创建一个服务实例。
    - 所有请求和组件都共享相同的服务实例。
    - 适用于需要在整个应用程序中共享状态或资源的服务，通常在全局配置或共享数据的情况下使用。


2. **Scoped（作用域）生命周期**：
    - 在每个请求处理期间创建一个新的服务实例。
    - 同一次HTTP请求内的多个动作方法调用共享相同的服务实例，但不同HTTP请求之间有不同的服务实例。
    - 适用于需要在请求范围内共享状态或资源的服务，通常用于跟踪请求状态或数据。


3. **Transient（瞬时）生命周期**：
    - 每次请求都创建一个新的服务实例。
    - 每个请求都拥有自己的服务实例，不共享状态。
    - 适用于无状态的轻量级服务，通常用于短暂操作或无需共享状态的服务。


在ASP.NET Core中，您可以使用以下方式配置不同生命周期的服务：

```csharp
// 配置Singleton生命周期的服务
services.AddSingleton<ISingletonService, SingletonService>();

// 配置Scoped生命周期的服务
services.AddScoped<IScopedService, ScopedService>();

// 配置Transient生命周期的服务
services.AddTransient<ITransientService, TransientService>();
```

根据应用程序的需求，您可以选择适当的生命周期来管理和共享依赖注入的服务。不同的生命周期对于应用程序的性能和行为有重要影响，因此在选择生命周期时需要慎重考虑。