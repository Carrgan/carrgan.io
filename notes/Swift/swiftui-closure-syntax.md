---
sidebar_label: SwiftUI 闭包语法
title: SwiftUI 各种闭包语法详解
sidebar_position: 1
---

## 概述

SwiftUI 大量使用 Swift 的闭包（Closure）特性来构建声明式 UI。理解各种闭包语法是掌握 SwiftUI 的关键。本文梳理 SwiftUI 中常见的闭包写法及其演变关系。

---

## Swift 闭包基础语法

### 1. 完整闭包表达式

```swift
{ (参数名: 参数类型) -> 返回类型 in
    语句
}
```

示例：

```swift
let greet = { (name: String) -> String in
    return "Hello, \(name)"
}
```

### 2. 尾随闭包（Trailing Closure）

当闭包作为函数的最后一个参数时，可以将其写在函数调用的括号外面：

```swift
// 常规写法
someFunction(closure: { /* ... */ })

// 尾随闭包写法
someFunction() { /* ... */ }

// 如果闭包是唯一参数，可省略括号
someFunction { /* ... */ }
```

### 3. 省略类型声明

Swift 可通过上下文推断闭包的参数类型和返回类型：

```swift
// 完整写法
let sorted = names.sorted(by: { (a: String, b: String) -> Bool in
    return a < b
})

// 省略类型
let sorted = names.sorted(by: { a, b in
    return a < b
})
```

### 4. 隐式返回（Implicit Return）

单表达式闭包可省略 `return`：

```swift
let sorted = names.sorted(by: { a, b in a < b })
```

### 5. 简写参数名（Shorthand Argument Names）

使用 `$0`, `$1`, `$2` 等代替命名参数，同时可省略 `in` 关键字：

```swift
let sorted = names.sorted(by: { $0 < $1 })
```

### 6. 运算符方法（Operator Method）

当闭包仅包含一个运算符表达式时，可直接传入运算符：

```swift
let sorted = names.sorted(by: <)
```

---

## SwiftUI 中的闭包模式

### @ViewBuilder 闭包

SwiftUI 中最核心的闭包模式是 `@ViewBuilder`，它使得我们可以在闭包中放置多个视图而无需用 `return` 或将它们包裹在容器中。

```swift
// ViewBuilder 让我们可以这样写：
VStack {
    Text("Hello")
    Text("World")
}

// 实际上等价于：
VStack(content: {
    Text("Hello")
    Text("World")
})
```

`@ViewBuilder` 是一个结果构建器（Result Builder），它隐式地将闭包中的多个语句合并为一个视图。

---

## SwiftUI 常见闭包写法对比

### 1. 无参数、无返回值闭包

最常见的 `Button` action 或 `onTapGesture`：

```swift
// 方式 A：尾随闭包 + 空括号
Button(action: {
    print("Tapped")
}, label: {
    Text("Tap me")
})

// 方式 B：利用 ViewBuilder 的尾随闭包
Button {
    print("Tapped")
} label: {
    Text("Tap me")
}
```

### 2. 带参数的闭包

`List` 的 `ForEach`、`onDelete` 等：

```swift
// ForEach 的 content 闭包接收一个元素
ForEach(items, id: \.self) { item in
    Text(item)
}

// onDelete 接收 IndexSet
List {
    ForEach(items, id: \.self) { item in
        Text(item)
    }
    .onDelete { indexSet in
        items.remove(atOffsets: indexSet)
    }
}
```

### 3. 带返回值的内容闭包

需要返回具体视图值而非使用 ViewBuilder 时：

```swift
// 完整闭包
NavigationLink {
    DetailView()
} label: {
    Label("Detail", systemImage: "arrow.right")
}
```

### 4. ViewBuilder 参数风格对比

SwiftUI 的许多容器提供了两种写法：

```swift
// 旧式 API 写法（参数标签明确）
VStack(alignment: .leading, spacing: 8, content: {
    Text("Line 1")
    Text("Line 2")
})

// 新式 API 写法（尾随闭包 + ViewBuilder）
VStack(alignment: .leading, spacing: 8) {
    Text("Line 1")
    Text("Line 2")
}
```

---

## 闭包捕获与 @escaping

### @escaping 闭包

SwiftUI 中异步任务或存储的回调通常是 `@escaping`：

```swift
struct MyView: View {
    @State private var data: String = ""

    var body: some View {
        Text(data)
            .task {
                // task 的闭包是 @escaping 的
                data = await fetchData()
            }
    }
}
```

`.task {}`、`.onAppear {}` 等修饰符中的闭包经常是逃逸的，因为它们可能在视图生命周期中被异步调用。

### 闭包中的 self 捕获

在逃逸闭包中引用 `self` 需要注意循环引用：

```swift
// 在 struct 中，self 是值类型，无需担心
struct MyView: View {
    var body: some View {
        Text("Hi")
            .task {
                // self 是 struct，不会造成循环引用
                await someAsyncWork()
            }
    }
}

// 在 class（ObservableObject）中需要注意
class ViewModel: ObservableObject {
    func load() {
        Task { [weak self] in
            guard let self = self else { return }
            // 使用 self
        }
    }
}
```

---

## 常见 UI 组件的闭包实例

### Button

```swift
Button {
    // action 闭包
    handleTap()
} label: {
    // label 闭包（@ViewBuilder）
    HStack {
        Image(systemName: "star")
        Text("Favorite")
    }
}
```

### List / ForEach

```swift
List {
    ForEach(users) { user in
        // content 闭包： (User) -> some View
        UserRow(user: user)
    }
}

// 使用 KeyPath 简写 id
ForEach(users, id: \.id) { user in
    UserRow(user: user)
}

// 使用简写参数
ForEach(users) { user in
    Text($0.name) // 无效！$0 只属于最内层闭包
}
```

:::warning 注意
嵌套闭包中，`$0` 始终指向最内层闭包的参数。多层闭包时应使用命名参数以提高可读性。
:::

### alert / sheet / popover

```swift
// sheet 使用 item 绑定 + 内容闭包
.sheet(item: $selectedUser) { user in
    UserDetailView(user: user)
}

// alert 的 actions 和 message 都是 @ViewBuilder
.alert("Title", isPresented: $showAlert) {
    Button("OK") { }
    Button("Cancel", role: .cancel) { }
} message: {
    Text("This is a message")
}
```

### animation

```swift
// withAnimation 闭包
withAnimation(.easeInOut(duration: 0.3)) {
    isExpanded.toggle()
}
```

---

## 闭包语法速查表

| 写法 | 示例 | 适用场景 |
|------|------|---------|
| 完整闭包 | `{ (x: Int) -> String in return "\(x)" }` | 教学/需要明确类型时 |
| 省略类型 | `{ x in return "\(x)" }` | 上下文可推断类型时 |
| 隐式返回 | `{ x in "\(x)" }` | 单表达式闭包 |
| 简写参数 | `{ "\($0)" }` | 单一清晰操作的闭包 |
| 运算符方法 | `sorted(by: <)` | 仅运算符表达式 |
| 尾随闭包 | `Button { ... } label: { ... }` | SwiftUI 最常用 |

---

## 最佳实践

1. **SwiftUI 中优先使用尾随闭包**，这是 Apple 推荐的风格。
2. **嵌套闭包时使用命名参数**，避免 `$0`/`$1` 混淆。
3. **单行内容使用隐式返回**，保持代码简洁。
4. **逃逸闭包中检查循环引用**——在 `ObservableObject` 的 class 中使用 `[weak self]`。
5. **利用 `@ViewBuilder` 的特性**写出自然的声明式 UI，而不是手动构建视图树。

---

## 总结

SwiftUI 的闭包语法看似繁多，但遵循一个从**完整 → 省略 → 简化**的自然演进路径。核心理解以下几点即可游刃有余：

- **尾随闭包**是 SwiftUI 构建 DSL 的基石
- **@ViewBuilder** 让多语句闭包成为可能
- **简写参数 `$0`** 适合极简场景但不宜滥用
- 理解 **@escaping** 与**值类型/引用类型**的捕获差异
