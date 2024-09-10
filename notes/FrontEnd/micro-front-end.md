---
slug: micro-front-end
title: Micro Front End
authors: carrgan
tags: [Front end]
---

## 引言

当一个项目，它其中的模块增长的越来越大后，该如何管理呢？
想象一下一个公司的内部操作系统，有人事管理模块，公司权限管理模块，公司各式各样的工具模块和管理模块。

对于传统架构来说，每一个不同的模块，都是一个独立的项目，都应该需要有一个自己的仓库。
而对于项目用到的公共模块，可能会维护多个副本在不同的仓库中，做的好一些的话，会把模块封装成独立的依赖。

接下来让我们从两个方面来讨论这个问题：

1. 在相同资源加载的角度：我们假设，如果我们有 10 个模块，都是使用 react 来开发的，那么是不是意味着，用户访问模块 A 的时候需要加载一次 react，用户访问模块 B 的时候需要再加载一次 react，
   用户在访问其中任何一个模块的时候，相同的资源都会被重复加载。

2. 在项目管理的角度：如果我们把项目公共的功能在每一个模块中都复制一遍，显而易见，这不是一种聪明的方式，当有改动时，我们需要对每一个副本做同样的改动。
   但是如果我们把项目构建成公共依赖包，如果就传统模式而言，维护公共包的成本，显而易见的会很高。任何的改动即使非常的小，都要在公共包仓库中改动 ->
   提交代码 -> 单元测试 -> CI/CD -> 发布新公共包版本 -> 所有项目里面安装新的版本依赖。

可见传统模式存在一些显而易见的缺陷。

## 该如何解决呢？

### 1. 在相同资源的加载问题上

使用微前端架构，相同的依赖，相同的版本，永远只加载一次。如何做到呢？

Webpack 5 相信大家都不陌生，在 webpack5 中，官方自带一个功能: "Module Federation"。

#### 什么是 Module Federation？

Module Federation 是一种 JavaScript 应用分治的架构模式（类似于服务端的微服务），它允许你在多个 JavaScript
应用程序（或微前端）之间共享代码和资源。

简单来说，Module Federation 就像是给多个 Web 应用打开了一扇窗户，让它们可以通过这扇窗互相分享代码。想象一下：有两个独立的
Web 应用 A 和 B，以往你需要分别为 A 和 B 打包所有的依赖库，但现在，你可以让 A 使用 B 的某些代码模块，无需重复打包，省时省力省带宽。

#### 如何构建 Module Federation 项目

Module Federation 的项目一般情况会由一个 host 主项目，和若干个 remote 项目组成。

```javascript title="Host project webpack.config.js"
module.exports = {
  name: "host",
  remotes: {
    remote: "remote@http://localhost:3001/remoteEntry.js" // 指向 remote 应用的入口
  },
  shared: ["react", "react-dom"] // 共享依赖
};
```

```javascript title="Remote project webpack.config.js"
module.exports = {
  name: "remote",
  filename: "remoteEntry.js", // 入口文件
  exposes: {
    // 暴露给外界的模块
    "./RemoteViewA": "./src/remote-view-a"
  },
  shared: ["react", "react-dom"] // 共享依赖
};
```

接下来主项目就可以动态的加载子项目的模块了:

```javascript
// 动态加载 remote 中的模块
const RemoteButton = React.lazy(() => import("remote/Button"));

function App() {
  return (
    <Routers>
      <Suspense fallback="Loading Button...">
        <Route path="remote-a" element={RemoteButton} />
      </Suspense>
    </Routers>
  );
}

export default App;
```

这样 `remote` 项目中的 view 就被加载进来了

#### Module Federation 的深层原理

Module Federation 依赖 Webpack 的内部机制，它通过 remotes 和 exposes 的配置，将不同应用中的模块共享出来并进行动态加载。具体来说，Webpack
会在构建时生成一个特殊的 动态链接库 (Dynamic Linker)，在运行时根据请求的模块路径，从指定的远程地址获取模块。

Webpack 利用了浏览器自带的 import() 语法，这种语法本身就是动态模块加载的基础。每当主应用需要某个远程模块时，它会通过
import() 语句发送网络请求，获取并加载对应的模块，而这个过程是完全 异步 且 按需 的。

Webpack 5 的 Module Federation 是一种允许多个独立构建的应用程序共享代码的机制，特别是可以动态加载和共享模块。为了深入理解
Module Federation 的打包机制，我们可以从 **项目构建时** 和 **项目运行时** 两个角度来分析它的工作原理。

##### 项目构建时的打包机制

当 Webpack 构建包含 Module Federation 的项目时，会根据定义的 `remote` 和 `shared` 配置，生成多个特殊的文件和资源，确保远程模块可以在运行时被正确加载。

###### **配置 `exposes` 和 `remotes`**：

在构建时，Webpack 会根据两个核心配置来决定如何打包项目：

- **`exposes`**：决定哪些模块将被暴露给其他项目（即允许其他项目动态加载这些模块）。
- **`remotes`**：定义当前项目依赖的远程模块，指向其他项目暴露的模块。

###### **生成 remoteEntry 文件**：

在构建 `remote` 项目时，Webpack 会生成一个 `remoteEntry.js`
文件。这个文件是一个运行时加载入口，包含所有暴露模块的元信息（包括模块的路径、版本等），它负责在运行时处理模块加载的协商和依赖。

**remoteEntry.js** 的作用：

- 提供模块定义和动态加载逻辑。
- 包含模块的映射关系。
- 在运行时，它会告知 `host` 项目如何加载这些模块。

###### **打包共享模块**：

在构建过程中，Webpack 会根据 `shared` 配置决定哪些模块是共享的（如 `react`、`react-dom` 等）。Webpack
会打包这些模块，并在运行时尝试与远程模块协商是否需要加载新的版本或使用现有版本。

**共享模块配置示例**：

```javascript
shared: {
   react: { singleton: true, eager: false, requiredVersion: '^17.0.0' }
}
```

- **`singleton: true`**：确保在整个应用中只有一个 `react` 实例。
- **`eager: false`**：使模块在运行时按需加载，而不是在构建时就立即打包进来。

###### **元信息与依赖树生成**：

在构建阶段，Webpack
会创建一个包含模块依赖关系的元数据结构，记录哪些模块需要从远程加载，哪些模块是本地提供的。这些元信息会在运行时通过 `remoteEntry.js`
文件进行动态解析。

##### 项目运行时的加载机制

在应用启动和运行时，Module Federation 的打包机制开始发挥作用。这时，Webpack 会根据运行时的配置和协商机制来决定如何加载模块和共享依赖。

###### **加载 `remoteEntry` 文件**：

当 `host` 项目启动时，它会根据 `remotes` 配置向远程 `remote` 项目请求 `remoteEntry.js` 文件：

- `host` 会发起网络请求，获取远程项目的 `remoteEntry.js` 文件。
- `remoteEntry.js` 包含了模块定义和加载逻辑，包括模块的依赖、路径和版本信息。

```javascript
import Button from "remote/Button";
```

当应用执行上述代码时，`host` 会向 `remote` 发起请求，加载 `Button` 组件。

###### **模块协商机制**：

一旦 `remoteEntry.js` 文件被加载，Webpack 会通过 `shared` 配置与远程模块进行依赖协商。这个过程涉及以下步骤：

- `host` 项目会检查自己是否有已经加载的模块（如 `react`）。
- 如果 `host` 项目已经加载了符合版本要求的 `react`，它会告诉 `remote` 使用现有的 `react` 实例。
- 如果 `host` 没有合适的 `react` 版本，或者版本不满足 `remote` 的要求，`remote` 就会加载并使用自己的 `react` 实例。

Webpack 使用一种运行时决策的方式，根据每个模块的 `requiredVersion` 和 `singleton` 等配置项，动态选择合适的依赖，避免模块冲突或重复加载。

###### **模块缓存与实例共享**：

为了优化性能，Webpack 会在运行时缓存共享模块，避免重复加载。当模块被加载后，它会被存储在一个全局的缓存中：

- 当 `host` 项目加载 `remote` 的模块时，如果该模块已经存在于缓存中，Webpack 会直接从缓存中获取模块，而不是重新请求远程项目。
- 同样地，如果多个远程模块共享相同的依赖，如 `react`，则 `react` 实例也会在全局缓存中共享。

###### **动态加载与异步模块**：

当 `host` 项目需要加载远程模块时，Webpack 使用动态导入的方式。Webpack 的模块加载是基于 `Promise`
的，因此它能够异步地从 `remote` 加载模块。

例如，当 `host` 需要 `Button` 组件时，它会发起网络请求，异步加载 `Button`，并在加载完成后将其动态插入到运行时上下文中。

```javascript
// 异步加载 Button 组件
import("remote/Button").then(ButtonModule => {
  const Button = ButtonModule.default;
  // 使用 Button 组件
});
```

###### **版本匹配与降级机制**：

Webpack 还支持版本匹配与降级机制。如果 `host` 和 `remote` 项目要求的共享模块版本不一致，Webpack 会尝试找到最合适的版本，并动态调整依赖。

- **优先使用高版本的模块**：如果 `remote` 需要 `react@17.0.1` 而 `host` 提供的是 `react@17.0.0`，Webpack
  会尽量选择更高版本的模块来满足要求。
- **降级机制**：如果无法找到满足要求的模块版本，Webpack 会回退到一个兼容版本，或者报错提醒。

### 2. 在项目管理的角度

首先，如果我们的项目代码没有严格的权限控制的情况下，推荐使用 [Monorepo](https://monorepo.tools/) 来管理为前端应用。
即把所有代码都维护在一个仓库里面，至于什么是 monorepo 和其利弊这里就不再赘述了。

对于一个monorepo项目，当然传统的 npm 就不好用了，推荐使用 [pnpm](https://pnpm.io/) 来作为包管理工具。

对于monorepo项目的管理，有很多工具，例如比较重型的 [bit](https://bit.dev)。

在这里推荐一个相对轻量级的 [nx](https://nx.dev/)

nx 有现成的命令来让我们生成一个 module federation 的前端项目。