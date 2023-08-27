@Configration

在 Java 中，`@Configuration` 注解用于标记一个类作为 Spring 的配置类。Spring 配置类主要用于定义 Spring Bean 的创建和配置，以及执行其他配置相关的任务。

当你在一个类上添加 `@Configuration` 注解时，它表明这个类将包含一个或多个 `@Bean` 注解的方法，这些方法用于声明和定义 Spring Bean。`@Bean` 注解告诉 Spring 容器如何创建和管理这些 Bean。

一个简单的配置类可能如下所示：

```java
@Configuration
public class AppConfig {

    @Bean
    public MyService myService() {
        return new MyService();
    }

    // 可以添加更多 @Bean 注解的方法

}
```

在上面的例子中，`AppConfig` 类被标记为配置类，并且声明了一个名为 `myService` 的 Bean。Spring 容器将调用 `myService()` 方法，创建一个 `MyService` 类的实例，并将其纳入到容器的管理中。

除了定义 Bean，配置类还可以包含其他配置相关的任务，例如：

- 使用 `@ComponentScan` 注解指定要扫描的包，以自动注册其他组件，包括 `@Service`、`@Component` 等。
- 使用 `@PropertySource` 注解指定外部属性文件，以便在应用程序中使用。
- 使用 `@Import` 注解引入其他配置类，以组合多个配置类的功能。

配置类在 Spring 应用程序中扮演着重要的角色，它使得开发者可以通过 Java 代码而不是 XML 文件来定义和组织 Spring Bean，使配置更加灵活和方便。

需要注意的是，配置类需要和其他组件一样，被 Spring 容器扫描和加载。一般来说，你需要将配置类和其他主要组件放在 Spring 容器能够扫描到的包中，或者通过 `@ComponentScan` 注解指定要扫描的包。

同样可以是通过`@Scope`来改变`@Bean`的生命周期