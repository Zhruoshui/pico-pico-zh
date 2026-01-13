# Repository Guidelines

## 项目结构与模块组织
- 主要内容位于 `src/`，章节按主题拆分子目录（如 `led/`、`servo/`），导航由 `src/SUMMARY.md` 管理。
- 图片等静态资产放在 `src/images/`，章节相关的示例代码或附图随章节目录存放，保持相对链接。
- 构建输出在 `book/`，属于生成产物；日常开发无需提交。
- 样式与前端资源在 `theme/`，站点与打包配置集中于 `book.toml`；根目录 `README.md` 提供快速预览指引。

## 构建、测试与本地开发命令
- `mdbook serve --open`：本地启动预览并热重载，默认监听 3000 端口。
- `mdbook build`：生成静态站点到 `book/`，用于发布或离线查看。
- `mdbook test`：执行可运行代码块，验证文档中的示例能通过编译或测试。
- 首次开发需安装 mdBook：`cargo install mdbook`；若已有旧版本，建议 `mdbook --version` 确认可用。

## 编写风格与命名约定
- 文档使用简洁中文，标题层级与 `SUMMARY.md` 对齐；每个章节开头简述目标与前置条件。
- 文件与目录名使用小写 kebab-case（例：`quick-start.md`、`pico-in-vscode/`），图片以功能命名（例：`images/led-wiring.png`）。
- 代码块标明语言（`rust`、`bash` 等）；需要硬件的示例若不可自动测试，标记为 `ignore` 并在正文解释运行环境。
- 避免超长行（建议 ≤120 字符），保持链接、图片使用相对路径，更新目录时同步 `SUMMARY.md`。

## 测试与校对指南
- 提交前至少运行 `mdbook test`；针对新增命令行示例，可在 Pico 2 开发环境手动复现。
- 检查引脚编号、接线图与文字描述一致；新增图片请压缩到合适大小并在相关章节内引用。
- 若修改已有章节，确认前后文引用和交叉链接仍然有效。

## 提交与 Pull Request 规范
- Commit 信息保持简短、描述本次变更范围，如 `i2c: 校正初始化顺序` 或 `翻译：更新 quick-start`，与仓库历史风格一致。
- PR 描述需包含：变更摘要、影响章节/文件列表、预览截图（若涉及 UI/图片更新）、验证步骤（运行的命令）。
- 确认无多余构建产物提交（尤其是 `book/`）；引用外部资源或示例时注明来源并符合仓库许可证（MIT/Apache 2.0/CC-BY-SA）。

## 自动化部署 (CI/CD)
本项目采用 GitHub Actions 进行自动化构建与部署，分为两个独立阶段：

1.  **构建 (Build)** - `.github/workflows/build.yml`
    - 触发条件：推送到 `main` 分支。
    - 任务：安装 mdBook 环境，构建电子书，并将 `book/` 目录打包为 Artifact 上传。如需添加插件（如 Mermaid），请在此文件修改。

2.  **发布 (Deploy)** - `.github/workflows/pages.yml`
    - 触发条件：`Build` 工作流成功完成后自动触发。
    - 任务：下载构建产物，使用 GitHub 官方推荐的 `actions/deploy-pages` 发布到 GitHub Pages。
    - 线上地址：[rrpbook.aruoshui.fun](https://rrpbook.aruoshui.fun/)

**提示**：提交代码时请勿包含 `book/` 目录，CI/CD 系统会每次自动重新构建并发布。
