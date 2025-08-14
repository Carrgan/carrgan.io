# Transaction Script 架构

## 总结

**适合：** 功能小而独立、敏捷迭代、快速交付。
**思想：** **每个路由段**维护一组紧凑的 **Action 脚本**，就地处理该页面的业务用例，调用 Prisma 完成一次事务。

* **Action**：单文件内完成校验 → 调用 Prisma → 返回结果/错误。
* **Transaction Script**：负责数据结构的转换，数据库查询 → 前端渲染需要的格式。
* **View**：直接调用同目录 Action；尽量又server component调用 action 初始化页面骨架，需要交互的地方用client component进行客户端交互，同时如果需要数据持久化用 `useActionState` 管 pending 和错误提示。
* **Repository**：可选；也可在脚本中直接使用 Prisma（小项目时能更快产出）。（不过如果有一段查询重复出现在多个action中 ，建议抽离放到repository层。）

**优点**：最快、最直观；最贴合 Server Actions 的“就地使用”。（业务增加后迁移到 MVC 或者 Clean 架构）
**局限**：业务膨胀后脚本散落、重复增多；跨页面复用差，需要重构为 Service/Repository。

## 目录结构

```bash
app/
  dashboard/
    orders/
      page.tsx              # Server Component 页面
      OrderList.tsx         # Client Component（交互用）
features/
  orders/                   # 对应 dashboard/orders
    actions/
      getOrders.ts
      createOrder.ts
    transforms/
      orderToUI.ts
lib/
  db.ts                     # Prisma client
```

## Server Component / Client Component 的角色分工

### Server Component

默认选项（page.tsx、layout.tsx、绝大部分 UI）。

直接调用 Server Action 或 Prisma 查询（通过 actions）。

自动享受 Next.js 的数据缓存（静态/动态渲染）。

用于“数据准备 + 初步渲染”。

适合列表、详情页等以数据为中心的内容。

### Client Component

只放在确实需要浏览器状态/事件的地方（表单、按钮、交互组件）。

通过 useActionState 调用 Server Action（提交表单、发起事务）。

不直接访问 Prisma，只调 Action。

### 示例数据流：

Server Component 页面加载时调用 getOrders()（Server Action），渲染初始订单列表。

Client Component 内表单提交时调用 createOrder()（Server Action），触发后端写操作，并用 useActionState 管理 pending/error 状态。

提交成功后，可以通过：

router.refresh() 重新触发 Server Component 渲染（命中缓存策略)，或者用 revalidatePath() 手动失效某路由缓存，同时 useServerAction 使客户端状态同步。

代码示意

**`getOrders.ts`**

```ts
"use server";

import prisma from "@/lib/db";
import { orderToUI } from "../transforms/orderToUI";

export async function getOrders() {
  const orders = await prisma.order.findMany({
    include: { customer: true, items: true }
  });
  return orders.map(orderToUI);
}
```

**`orderToUI.ts`**

```ts
export function orderToUI(order) {
  return {
    id: order.id,
    customerName: order.customer.name,
    totalPrice: order.items.reduce((sum, i) => sum + i.price * i.qty, 0),
    statusLabel: getStatusLabel(order.status)
  };
}

function getStatusLabel(status) {
  switch (status) {
    case "pending": return "待处理";
    case "shipped": return "已发货";
    default: return "未知状态";
  }
}
```

**`page.tsx`**

```tsx
import { getOrders } from "./actions/getOrders";

export default async function OrdersPage() {
  const orders = await getOrders();
  return (
    <div>
      {orders.map(o => <div key={o.id}>{o.customerName} - {o.statusLabel}</div>)}
    </div>
  );
}
```