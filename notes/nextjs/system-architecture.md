# Next-js 之系统架构

使用 App Router + Server Actions + React 19 并结合 **Prisma**的“系统架构模式”清单。

---

## RSC-MVC（RSC 版 MVC：Action 即 Controller）

**适合：** 中小型到中型项目，需要清晰分层但不想过度工程化。
**思想：** 用 **Server Action 充当 Controller**，页面/组件是 View，Prisma + Repository 是 Model。

* **View（Client/Server Components）**

    * 职责：渲染 UI、收集用户输入；Client 侧负责交互、乐观 UI 等。
    * 作用域：`app/segment/page.tsx`、`components/*`。
    * 交互：通过 `<form action={actionFn}>` 或事件处理器触发 **Server Action**（可配合 `useActionState` 获取返回状态与 pending）。

* **Controller（Server Action）**

    * 职责：**只做用例编排**：鉴权、校验、调用业务服务、处理错误/返回结果。
    * 作用域：`app/segment/actions.ts` 或与页面同目录 colocate 的 `actions.ts`。
    * 关键点：Server Action **只在服务端执行**，可以在 Server/Client 组件内被调用；可与表单直接集成。([Next.js][1])

* **Model（Repository + Prisma）**

    * 职责：数据访问；隐藏 ORM 细节；事务边界。
    * 作用域：`/repositories/*`、`/lib/db.ts`（Prisma Client 单例）。
    * 注意：数据库只在服务器端使用（Action/Server Component），**不要在 Client Component 中直接触达**。

* **配套 Hook：`useActionState`（ViewModel 味道）**

    * 职责：把 **Action 的结果状态**（成功/失败/错误消息/返回数据）“绑定”到本地 UI 状态；天然支持 pending。([React][2])

**优点**：学习成本低；和 Next 原生范式贴合（表单 + Action）。
**局限**：Controller 与 View 仍较紧耦合（colocation）；复杂领域逻辑时需要再抽 Service 层。

---

## CQS/CQRS-for-Next（命令与查询分离）

**适合：** 读多写少的业务、需要缓存/增量静态化。
**思想：** **查询（Query）** 走 Server Component 的 `fetch`/缓存/`revalidate`；**命令（Command**走 **Server Actions**。

* **Query（读）**

    * 职责：数据查询、可缓存（RSC 层的 `fetch`、`revalidate`）。
    * 作用域：Server Components / `getXxx` data 函数。
    * 好处：天然利用 RSC 的缓存、流式渲染、ISR/再验证。

* **Command（写）**

    * 职责：变更数据的入口全部集中在 **Server Actions**；**权限、输入校验、side-effects** 在这里完成。([Next.js][1])
    * 结合 `useActionState` 与 `<form>`，做回传错误与乐观 UI。

* **Repository（Prisma）**

    * 职责：被 Query & Command 双方调用；对外暴露只读查询与写入接口。

**优点**：读/写清晰分割，读取可高度缓存、写入有明确入口；便于审计与限流。
**局限**：团队需遵守“所有写入都必须经由 Action”的约束。

---

## Transaction Script（事务脚本，按路由就地编排）

**适合：** 功能小而独立、敏捷迭代、快速交付。
**思想：** **每个路由段**维护一组紧凑的 **Action 脚本**，就地处理该页面的业务用例，调用 Prisma 完成一次事务。

* **Action**：单文件内完成校验 → 调用 Prisma → 返回结果/错误。
* **Transaction Script**：负责数据结构的转换，数据库查询 → 前端渲染需要的格式。
* **View**：直接调用同目录 Action；尽量又server component调用 action 初始化页面骨架，需要交互的地方用client component进行客户端交互，同时如果需要数据持久化用 `useActionState` 管 pending 和错误提示。
* **Repository**：可选；也可在脚本中直接使用 Prisma（小项目时能更快产出）。（不过如果有一段查询重复出现在多个action中 ，建议抽离放到repository层。）

**优点**：最快、最直观；最贴合 Server Actions 的“就地使用”。
**局限**：业务膨胀后脚本散落、重复增多；跨页面复用差，需要重构为 Service/Repository。

---

## 4) Clean/Use-Case-First（整洁架构/用例优先）

**适合：** 中大型项目、复杂领域规则、多团队协作。
**思想：** **Action 只做 I/O 接边**，真正的业务都在 **Use Case（Service）**；底层经由 **Ports/Repository** 访问 Prisma。

* **Presenter/View（RSC + Client）**：纯显示与交互。
* **Action（Interface Adapter）**：收参数、鉴权、调用 **UseCase**，处理异常，返回“可渲染”的结构。
* **UseCase（Application Service）**：**纯业务编排**，聚合多个 Repository；可单测。
* **Repository（Port/Adapter + Prisma）**：定义接口（Port）+ Prisma 实现（Adapter）。
* **Entities/Value Objects**：业务对象与不变式。

**优点**：高度解耦、可测试性强、可替换数据源；跨运行时（Node/Edge）切换容易。
**局限**：初期样板代码较多，学习曲线更陡。

---

## 5) Hexagonal（端口/适配器）× Server Actions（行动驱动）

**适合：** 需要把 Next.js 当作“驱动边界”的企业级项目，后端或第三方系统复杂。
**思想：** **Action/Route Handler** 视为**驱动适配器（Driving Adapter）**；Prisma、外部 API 是**次级适配器（Driven Adapter）**。

* **Driving Adapters**：Server Actions、API Routes、Webhooks（都只做入站/出站协议转换）。
* **Domain + Application**：不依赖 Next/Prisma；纯 TS。
* **Driven Adapters**：Prisma Repository、消息队列、外部 REST/GraphQL。

**优点**：框架可替换、集成外部系统简单；非常利于测试与领域建模。
**局限**：比 Clean 更“抽象”，对团队工程纪律要求高。

---

## 6) Hybrid BFF（Server Actions + API Routes 共存）

**适合：** 既服务页面，也需要给移动端/外部系统提供 API。
**思想：** **页面内写 Server Actions（低延迟、表单友好）**，对外仍暴露 **API Routes**（鉴权/签名/速率限制/机器消费）。

* **页面内的变更**：走 Action（可直返 UI 状态，配 `useActionState`）。
* **跨端复用**：把 Use Case 下沉到 Service；**Action 与 API Route** 都调用同一用例。
* **安全**：API Routes 统一走机器鉴权；Actions 走会话鉴权 + Next 的 **同源校验/allowedOrigins**。([Next.js][3])

**优点**：兼顾开发体验与对外能力；渐进式迁移现有 API。
**局限**：入站通道变多，网关/鉴权策略要统一管理。

---

# 各层含义与作用域（通用定义）

| 层                                         | 主要内容                        | 只在 Server？             | 放哪儿                                         | 与谁交互                                |
| ----------------------------------------- | --------------------------- | ---------------------- | ------------------------------------------- | ----------------------------------- |
| **View（RSC + Client）**                    | 渲染与交互、表单、loading/错误提示、乐观 UI | RSC 是 Server；Client 不是 | `app/*`、`components/*`                      | 调用 **Server Actions** 或读取 Server 数据 |
| **Server Action（Controller/Use-Case 入口）** | 鉴权、校验、调用业务、处理错误、回传结果        | ✅ 仅 Server 执行          | `app/segment/actions.ts` 或 `app/actions.ts` | 调用 Service/Repository；被 View 触发     |
| **Service / Use Case**                    | 业务编排、事务边界、与多个资源交互           | ✅                      | `services/*`                                | 调用 Repos / 外部适配器                    |
| **Repository（Prisma 实现）**                 | 数据访问封装、读写接口、事务              | ✅                      | `repositories/*`、`lib/db.ts`                | 调用 Prisma Client；被 Service 使用       |
| **Domain / Entities**                     | 领域对象、规则、不变式                 | ✅（可纯 TS，无 I/O）         | `domain/*`                                  | 被 Service 使用                        |
| **API Routes（可选）**                        | 机器消费的 HTTP API              | ✅                      | `app/api/*/route.ts`                        | 与前端或外部系统交互，复用 Service               |

> 备注：**`useActionState`** 位于 View 层，负责把 **Action 的返回值/错误/加载态**映射为本地 UI 状态；非常适合表单提交流程与用户反馈。([React][2], [Next.js][4])

---

# 模式之间怎么选？

* **追求 DX/速度** → 先上 **Transaction Script**（3）。长大以后把重复逻辑沉到 Service/Repository，即可平滑演进到 **RSC-MVC**（1）或 **Clean**（4）。
* **读多写少、强缓存** → **CQS/CQRS-for-Next**（2）：读走 RSC 缓存 + ISR，写走 Actions。
* **复杂领域、多人协作、强调可测性** → **Clean**（4）或 **Hexagonal**（5）。
* **既要页面内的丝滑交互，又要对外 API** → **Hybrid BFF**（6）。

---

# 实战注意点（与这些模式强相关）

1. **安全与可见性**

* 导出的 Server Action 可能暴露为可访问的端点，应视作公共入口并做鉴权与校验；可通过 `serverActions.allowedOrigins` 配置同源/白名单，防 CSRF。([Next.js][3])

2. **表单与状态**

* 表单提交流畅方式：`<form action={action}>` + `useActionState`/`useFormStatus`，天然 pending/错误处理；也支持事件处理器而非 `<form>`。([Next.js][4], [React][2])

3. **数据更新与缓存**

* “写”走 Actions，“读”走 RSC 的 `fetch` + 缓存/`revalidate`（或 SWR/React Query 仅用于 Client 交互细节）。([Next.js][5])

4. **Prisma 与分层**

* 按**Repository 模式**封装 ORM，暴露读/写接口，事务边界由 Service/Use Case 控制；Prisma 在 Next.js 中是常见组合。([Prisma][6])

---

# 快速对比表

| 模式                      |    复杂度 |   可测试性 |   演进成本 |       性能/缓存 | 典型规模 |
| ----------------------- | -----: | -----: | -----: | ----------: | ---- |
| RSC-MVC（1）              |      中 |      中 |  低 → 中 |           中 | 中    |
| CQS/CQRS-for-Next（2）    |      中 |      中 |      中 | **高（读缓存强）** | 中-大  |
| Transaction Script（3）   |  **低** |      低 | 向上迁移容易 |           中 | 小-中  |
| Clean/Use-Case-First（4） |  **高** |  **高** |    初期高 |           高 | 中-大  |
| Hexagonal（5）            | **最高** | **最高** |      高 |           高 | 大/企业 |
| Hybrid BFF（6）           |    中-高 |      高 |      中 |           高 | 中-大  |

---

## 参考与延伸

* **Server Actions 概念/用途/表单集成/数据更新**（Next.js 官方）([Next.js][1])
* **Server Actions 安全与 allowedOrigins**（Next 配置）([Next.js][3])
* **`useActionState` 官方文档**（React 19）([React][2])
* **Next.js × Prisma 指南/最佳实践**（Prisma 官方集合页）([Prisma][6])

---

[1]: https://nextjs.org/docs/14/app/building-your-application/data-fetching/server-actions-and-mutations?utm_source=chatgpt.com "Server Actions and Mutations - Data Fetching - Next.js"
[2]: https://react.dev/reference/react/useActionState?utm_source=chatgpt.com "useActionState - React"
[3]: https://nextjs.org/docs/app/api-reference/config/next-config-js/serverActions?utm_source=chatgpt.com "next.config.js: serverActions"
[4]: https://nextjs.org/docs/app/guides/forms?utm_source=chatgpt.com "How to create forms with Server Actions - Next.js"
[5]: https://nextjs.org/docs/app/getting-started/updating-data?utm_source=chatgpt.com "Getting Started: Updating Data - Next.js"
[6]: https://www.prisma.io/nextjs?utm_source=chatgpt.com "Next.js Database with Prisma | Next-Generation ORM for SQL ..."
