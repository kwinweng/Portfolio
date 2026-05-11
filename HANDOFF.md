# kwinweng.com 交接文档

> 给接手部署或后续开发的 AI / 开发者阅读。

## 1. 项目概述

KWIN WENG / 阿欢 个人主页。B2 Personal Console 风格，单页锚点导航 + 独立子页面。纯前端静态站，无数据库。

## 2. 项目路径

```
/Users/kwin/Work/projects/homepage/
```

原始开发路径：`~/github/kwinweng.com/`（已迁移）

## 3. 技术栈

| 项 | 值 |
|---|---|
| 框架 | Next.js 16.2.6 |
| 语言 | TypeScript |
| 样式 | Tailwind CSS v4 |
| 渲染 | SSG（静态生成，19 个页面） |
| 数据库 | 无 |
| CMS | 无（项目数据在 `src/data/projects.ts`） |
| 字体 | 系统 monospace（SF Mono / Fira Code stack） |

## 4. 设计风格

**B2 Personal Console / Digital Garden**

- 浅灰网格背景 `#f5f5f0`
- 粗黑外框容器 `3px solid #1a1a1a`
- 细灰线内部面板 `1px solid #d0d0cb`
- 红橙强调色 `#e8530a`
- 等宽字体标题，系统无衬线正文
- 像素头像身份卡（`image-rendering: pixelated`）

设计参考文档：
- MRD: `MRD-personal-homepage.md`（kwin 提供）
- 交互流程: `design-interaction-flow.md`（kwin 提供）
- 桌面稿: `version-b2-desktop.png`
- 移动稿: `version-b2-mobile.png`

## 5. Git 状态

```
分支: main
最新 commit: 4d0d037 — feat: redesign to B2 Personal Console style
```

完整 log:
```
4d0d037 feat: redesign to B2 Personal Console style
d4f9553 feat: redesign homepage to match Dimension reference style
e0fb3a0 feat: v0.1 personal homepage — Dimension design system
a547520 Initial commit from Create Next App
```

## 6. 路由结构

| 路由 | 说明 | 状态 |
|---|---|---|
| `/` | 首页（单页 8 模块 + 锚点导航） | 完成 |
| `/projects` | 项目总览（按能力分组） | 完成 |
| `/projects/[slug]` | 项目详情（8 个项目） | 完成 |
| `/writing` | 文章列表 | 完成（占位内容） |
| `/reading` | 阅读收藏 | 完成（占位） |
| `/lab` | 实验室 | 完成（占位） |
| `/log` | Build Log | 完成（占位内容） |
| `/about` | 关于 | 完成 |
| `/admin` | 后台占位（noindex） | 完成（占位） |

## 7. 项目结构

```
src/
├── app/
│   ├── layout.tsx          # 根布局（无全局 nav/footer，首页自包含）
│   ├── globals.css         # B2 设计 tokens + grid background
│   ├── page.tsx            # 首页（client component，含 sidebar + 8 模块）
│   ├── about/page.tsx
│   ├── admin/page.tsx
│   ├── lab/page.tsx
│   ├── log/page.tsx
│   ├── reading/page.tsx
│   ├── writing/page.tsx
│   └── projects/
│       ├── page.tsx
│       └── [slug]/page.tsx
├── components/
│   ├── page-shell.tsx      # 子页面通用 shell
│   ├── footer.tsx          # 旧版遗留，首页未使用
│   ├── navigation.tsx      # 旧版遗留，首页未使用
│   ├── project-card.tsx    # 旧版遗留
│   ├── section.tsx         # 旧版遗留
│   └── status-badge.tsx    # 子页面使用
├── data/
│   ├── projects.ts         # 项目数据（含 visibility/priority/featured）
│   └── content.ts          # 文章 + Build Log 数据
├── lib/
│   └── data.ts             # 统一数据层 + visibility 过滤
└── types/
    └── project.ts          # 完整类型定义
public/
└── kwin-pixel-avatar.png   # 像素头像（846KB）
```

## 8. 数据层

所有数据读取走 `src/lib/data.ts`，内置 visibility 过滤：

- `public`: 前台展示，进 SEO
- `unlisted`: 直链可访问，不进列表
- `private`: 只有登录后台可见（v0.3）

项目数据在 `src/data/projects.ts`，typed TypeScript constants。

## 9. 本地开发

```bash
cd /Users/kwin/Work/projects/homepage
npm run dev     # http://localhost:3000
npm run lint    # ESLint
npm run build   # 生产构建
```

## 10. 部署参数

| 项 | 值 |
|---|---|
| 项目名 | `kwinweng-com` |
| 域名 | `kwinweng.com`（主域名，非子域名） |
| 数据库 | 不需要 |
| 构建命令 | `npm run build` |
| 启动命令 | `npm start` |
| 建议端口 | `3001` |
| 环境变量 | `PORT=3001`（仅此一个） |
| 健康检查 | `/`（期望 HTTP 200） |
| 定时任务 | 无 |

### 目标服务器

- IP: `159.65.11.18`（DigitalOcean 新加坡）
- OS: Ubuntu 22.04
- Node: v20.20.2
- PM2 + nginx + certbot 已安装
- 已有项目 `ai-quant-copilot` 跑在 `:3000`
- 完整部署 SOP 见 `SERVER-DEPLOY-SOP.md`

### nginx 配置（主域名）

```nginx
server {
    server_name kwinweng.com www.kwinweng.com;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    listen 80;
}
```

### 部署步骤摘要

```bash
# 1. 确保 DNS: kwinweng.com A → 159.65.11.18
# 2. 推送到 GitHub 后:
ssh root@159.65.11.18 "cd ~ && git clone <REPO_URL> kwinweng-com"
ssh root@159.65.11.18 "cd ~/kwinweng-com && npm install"
ssh root@159.65.11.18 "echo 'PORT=3001' > ~/kwinweng-com/.env && chmod 600 ~/kwinweng-com/.env"
ssh root@159.65.11.18 "cd ~/kwinweng-com && npm run build"
ssh root@159.65.11.18 "cd ~/kwinweng-com && pm2 start npm --name kwinweng-com -- start --max-memory-restart 400M && pm2 save"
# 3. nginx 配置 + certbot SSL
ssh root@159.65.11.18 "certbot --nginx -d kwinweng.com -d www.kwinweng.com --non-interactive --agree-tos -m kwinweng@gmail.com --redirect"
# 4. 验证
curl https://kwinweng.com
```

### 后续更新

```bash
ssh root@159.65.11.18 "cd ~/kwinweng-com && git pull && npm install && npm run build && pm2 reload kwinweng-com"
```

## 11. 已知问题和注意事项

1. **Email CTA**: `✓ COPIED!` 复制反馈在 dev server 未完全验证（hydration 时序），但 `<a href="mailto:">` fallback 可靠。生产 build 预计正常。

2. **Google Fonts 被墙**: 已移除 `next/font/google` 依赖，使用系统等宽字体 stack。部署到海外服务器后如需恢复 Geist Mono，在 `layout.tsx` 加回 `Geist_Mono` import。

3. **服务器内存**: 只有 ~1GB RAM。`npm run build` 可能 OOM。建议先检查/添加 swap：
   ```bash
   ssh root@159.65.11.18 "free -h"  # 检查 swap
   # 如果没有 swap:
   ssh root@159.65.11.18 "fallocate -l 2G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile && echo '/swapfile none swap sw 0 0' >> /etc/fstab"
   ```

4. **占位内容待替换**:
   - `hello@kwinweng.com` — 确认是否为真实邮箱
   - GitHub / X 链接 — 确认真实用户名
   - Writing / Reading / Lab 条目 — 当前为示例内容

5. **旧版组件遗留**: `src/components/` 下的 `navigation.tsx`、`footer.tsx`、`project-card.tsx`、`section.tsx` 是 Dimension 暗色版遗留，首页未使用但子页面仍引用 `status-badge.tsx`。后续可清理。

## 12. 版本规划

| 版本 | 内容 | 状态 |
|---|---|---|
| v0.1 | 首页 + 项目页 + B2 视觉 | ✅ 完成 |
| v0.2 | Writing MDX + Build Log MDX + 真实内容 | 待做 |
| v0.3 | Admin 后台 + OAuth + 项目 CRUD | 待做 |
| v1.0 | 动态数据 + 动画打磨 + SEO 优化 | 待做 |
