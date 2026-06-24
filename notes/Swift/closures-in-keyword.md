---
sidebar_label: Swift 闭包中的 in 关键字
title: Swift 闭包中 in 关键字详解
sidebar_position: 2
---

## 概述

`in` 是 Swift 闭包语法中最独特的关键字之一。它出现在闭包的**参数/返回值声明**与**执行体**之间，起到分隔作用。对初学者来说，这个 `in` 往往令人困惑——本文彻底解释它的含义、用法以及背后的设计逻辑。

---

## `in` 的位置与作用

### 基本结构

```swift
{ (参数) -> 返回类型 in
    执行语句
}
```

`in` 左边是「**签名**」（有什么输入、输出什么），右边是「**实现**」（具体做什么）。

类比普通函数：

```swift
// 普通函数：签名和实现由大括号自然分隔
func add(_ a: Int, _ b: Int) -> Int {
    return a + b
}

// 闭包：需要一个关键字来宣告"签名结束，实现开始"
let add = { (_ a: Int, _ b: Int) -> Int in
    return a + b
}
```

:::info 一句话总结
**`in` = "好了，参数和返回类型说完了，下面开始写逻辑"**
:::

---

## 为什么需要 `in`

Swift 的闭包参数和返回值写在 `{}` 内部而非外部，这与大多数语言的 lambda 不同：

| 语言 | 语法 | 分隔方式 |
|------|------|---------|
| Swift | `{ (x: Int) -> Int in return x }` | 用 `in` 分隔 |
| Kotlin | `{ x: Int -> x }` | 用 `->` 同时表达返回类型 |
| TypeScript | `(x: number) => x` | 用 `=>`（箭头）分隔 |
| Rust | <code>\|x: i32\| x</code> | 用管道符 `\|\|` 包裹参数 |

Swift 选择将签名写在 `{}` 内部，是因为闭包本身就是大括号包裹的代码块。但编译器需要明确知道签名从哪里结束、代码体从哪里开始——`in` 就是这条分界线。

### 没有 `in` 会怎样？

```swift
// 假设没有 in，编译器无法判断：
{ (a: Int, b: Int) -> Bool
    return a < b
}
// 编译器困惑：Bool 是返回类型，还是你接下来要写 if Bool { ... }？
```

---

## 何时出现 `in`

### 情况 1：有显式参数和返回类型

```swift
let multiply = { (x: Int, y: Int) -> Int in
    return x * y
}
```

### 情况 2：有显式参数，省略返回类型

```swift
let greet = { (name: String) in
    print("Hello, \(name)")
}
```

只要有命名参数就需要 `in`。

### 情况 3：使用参数名 + 显式指明类型

```swift
let handler: (Int, Int) -> Bool = { a, b in
    return a == b
}
```

---

## 何时可以省略 `in`

`in` 的省略**不是独立决定的**——当你不写命名参数时，`in` 自然就不需要了：

### 省略模式 1：简写参数 `$0`, `$1`...

```swift
// 完整（有 in）
let sorted = names.sorted(by: { a, b in a < b })

// 简写参数（无 in）
let sorted = names.sorted(by: { $0 < $1 })
```

`$0`/`$1` 使得参数声明被省略，`in` 也随之消失。

### 省略模式 2：单表达式隐式返回

隐式返回只是省略了 `return`，参数仍在，所以 `in` 依然需要：

```swift
// ✅ 有 in（只是没写 return）
let sorted = names.sorted(by: { a, b in a < b })

// ❌ 不能省略 in
// let sorted = names.sorted(by: { a, b a < b })  // 编译错误
```

:::warning 常见误解
有人以为省略 `return` 就能省略 `in`——这是两件独立的事。隐式返回省的是 `return`，简写参数 `$0` 才能真正省掉 `in`。
:::

---

## `in` 的演变路径

从最完整到最简化的语法演变，观察 `in` 何时消失：

```swift
// 1. 最完整：有参数、有类型、有返回类型、有 return、有 in
names.sorted(by: { (a: String, b: String) -> Bool in
    return a < b
})

// 2. 省略类型：有 in
names.sorted(by: { a, b in
    return a < b
})

// 3. 隐式返回：有 in
names.sorted(by: { a, b in a < b })

// 4. 简写参数：无 in
names.sorted(by: { $0 < $1 })

// 5. 运算符方法：连大括号都没了
names.sorted(by: <)
```

**规律**：只要闭包 `{}` 内还存在「参数声明」，就需要 `in`。参数声明一消失，`in` 随之消失。

---

## 典型场景对比

| 场景 | 写法 | 有无 `in` | 原因 |
|------|------|:---:|------|
| `Button` action | `Button { print("tap") }` | ❌ | 无参数声明 |
| `ForEach` content | `ForEach(items) { item in ... }` | ✅ | 有命名参数 `item` |
| `sorted` 简写 | `sorted { $0 < $1 }` | ❌ | 用 `$0`/`$1`，无命名参数 |
| `onDelete` | `.onDelete { offsets in ... }` | ✅ | 有命名参数 `offsets` |
| `task` 无参数 | `.task { await load() }` | ❌ | 无参数声明 |
| 存储闭包变量 | `let f: (Int) -> Void = { x in print(x) }` | ✅ | 有命名参数 `x` |

---

## 与其他语言对比

### Kotlin

```kotlin
// Kotlin 用 -> 完成两件事：分隔参数和体，且前面的不是返回类型
val sum: (Int, Int) -> Int = { a, b -> a + b }
```

Kotlin 的 `->` 相当于 Swift 的 `in`，但 Swift 的 `->` 已被占用（用于声明返回类型），所以另用 `in`。

### JavaScript / TypeScript

```typescript
// 箭头函数：=> 分隔参数和体
const sum = (a: number, b: number): number => a + b;
```

JS 的 `=>` 天然充当分隔符，不需要额外关键字。

Swift 需要 `in` 的根本原因是：**闭包体写在 `{}` 内，签名的结束位置无法通过大括号自然表达**。

---

## 总结

| 要点 | 说明 |
|------|------|
| `in` 的位置 | 参数/返回类型声明 **之后**，执行体 **之前** |
| `in` 的作用 | 分隔「签名」和「实现」 |
| 为什么叫 `in` | 表示「在闭包体内，执行以下逻辑」 |
| 何时出现 | 闭包内存在命名参数声明时 |
| 何时省略 | 使用简写参数 `$0`/`$1` 或完全无参数时 |
| 与 `return` 的关系 | 隐式返回省 `return`，不省 `in`；简写参数才省 `in` |

记住一条核心规则：**只要你在 `{}` 里写了参数名，就需要 `in`**。这是 Swift 闭包语法中唯一需要刻意记忆的点，其余都可以从这条规则推导出来。
