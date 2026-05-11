# kwinweng.com

KWIN WENG / 阿欢 个人主页。B2 Personal Console 风格，单页锚点导航 + 独立子页面。

- 站点: https://kwinweng.com
- 风格: B2 Personal Console / Digital Garden
- 框架: Next.js 16.2.6 + TypeScript + Tailwind CSS v4
- 渲染: SSG 静态生成

## 本地开发

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
npm start        # 生产模式预览
```

## 项目结构

```
src/
├── app/                 路由（App Router）
├── components/          可复用组件
├── data/                项目 + 内容数据（无数据库）
├── lib/data.ts          数据层 + visibility 过滤
└── types/               TypeScript 类型
public/                  静态资源
```

数据修改：`src/data/projects.ts` 和 `src/data/content.ts`。

## 部署

部署 SOP、服务器配置、nginx 模板、SSL 证书申请步骤详见 `HANDOFF.md`。
