@Scope

`@Scope` 注解用于定义 Spring Bean 的作用域，即控制 Bean 实例在 Spring 容器中的生命周期和访问方式。Spring 提供了多种作用域，可以根据不同的需求来选择适合的作用域。

常见的作用域类型包括：

1. Singleton（默认）：单例模式，整个容器中只存在一个 Bean 实例。
2. Prototype：原型模式，每次请求都创建一个新的 Bean 实例。
3. Request：每个 HTTP 请求都创建一个新的 Bean 实例。
4. Session：每个 HTTP 会话都创建一个新的 Bean 实例。
5. GlobalSession：全局会话作用域，用于 Portlet 应用，表示每个 Portlet 应用共享一个 Bean 实例。
6. Custom Scope：可以自定义其他作用域，以满足特定的需求。

示例：

```java
@Component
@Scope("prototype")
public class MyPrototypeComponent {
    // 原型 Bean，每次请求都创建一个新实例
}
```

```java
@Component
@Scope("request")
public class MyRequestComponent {
    // 请求作用域 Bean，每个 HTTP 请求都创建一个新实例
}
```

```java
@Component
@Scope("session")
public class MySessionComponent {
    // 会话作用域 Bean，每个 HTTP 会话都创建一个新实例
}
```

自定义作用域示例：

```java
public class MyCustomScope implements Scope {
    // 自定义作用域的实现逻辑
    // ...
}
```

```java
@Configuration
public class AppConfig {

    @Bean
    @Scope("customScope")
    public MyCustomBean myCustomBean() {
        return new MyCustomBean();
    }
}
```

自定义作用域需要实现 `org.springframework.beans.factory.config.Scope` 接口，并在配置类中通过 `@Scope` 注解指定自定义作用域的名称。

使用不同的作用域可以灵活地控制 Bean 的生命周期，选择合适的作用域有助于优化内存使用和资源管理。默认情况下，Spring Bean 是单例的，但你可以根据具体的业务需求选择其他作用域。