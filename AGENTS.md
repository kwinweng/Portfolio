<!-- BEGIN:nextjs-agent-rules -->

## 审批红绿灯（2026-11-08 本人确认；与下文冲突时以本节为准）

- **绿灯，AI 直接做、事后汇报**：技术实现；推送功能分支、开合并请求；自动检查（`gh pr checks` 全绿）和独立审阅都通过后合并主干——前提是这次合并不会自动触发上线。
- **红灯，须本人批准**：正式上线/部署（包括会自动触发上线的合并）、真实数据、删数据或未提交的文件、花钱、对外发消息、密钥、权限、改算账口径或产品方向。拿不准按红灯。红灯在哪里批，沿用本项目原来的规定。
- 问本人之前先查 `DECISIONS.md` 和 `NOT-DOING.md`；提问格式：什么事 / 我的建议 / 选项 1·2·3 / 不回复时默认（红灯默认"先不做"）。
- 部署后要做线上核实：确认线上版本包含这次提交，没核实就不算完成。

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
