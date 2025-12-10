# 帮助与故障排查

在完成练习时如果遇到任何 bug、错误或其他问题，可以参考以下方法进行排查和解决。

## 1. 与可运行代码对比

查看完整的代码示例，或克隆参考项目进行比对。仔细检查你的代码和 `Cargo.toml` 中的依赖版本。留意任何语法或逻辑错误。如果需要的 feature 未启用或存在 feature 不匹配，务必按练习所示启用正确的 feature。

如果发现版本不匹配，可以选择调整你的代码（查阅资料找到解决方案；这是学习和深入理解的好方法）以适配较新版本，或将依赖更新为教程中使用的版本。

## 2. 搜索或提交 GitHub Issue

访问 GitHub issues 页面，查看是否有人遇到相同问题：
[https://github.com/ImplFerris/pico-pico/issues?q=is%3Aissue](https://github.com/ImplFerris/pico-pico/issues?q=is%3Aissue)

如果没有，你可以新建一个 issue，并清晰描述你的问题。

## 3. 向社区求助

Rust Embedded 社区在 Matrix 聊天中非常活跃。Matrix 是一个开放网络，用于安全、去中心化的通信。

以下是与本书涵盖主题相关的一些有用 Matrix 频道：

- **Embedded Devices Working Group**  
  [`#rust-embedded:matrix.org`](https://matrix.to/#/#rust-embedded:matrix.org)  
  关于在嵌入式开发中使用 Rust 的通用讨论。

- **RP Series Development**  
  [`#rp-rs:matrix.org`](https://matrix.to/#/#rp-rs:matrix.org)  
  面向 Raspberry Pi RP 系列芯片的 Rust 开发与讨论。

- **Debugging with Probe-rs**  
  [`#probe-rs:matrix.org`](https://matrix.to/#/#probe-rs:matrix.org)  
  围绕 [probe-rs](https://probe.rs) 调试工具包的支持与讨论。

- **Embedded Graphics**  
  [`#rust-embedded-graphics:matrix.org`](https://matrix.to/#/#rust-embedded-graphics:matrix.org)  
  使用 [`embedded-graphics`](https://docs.rs/embedded-graphics)（面向嵌入式系统的绘图库）相关的交流。

你可以创建 Matrix 账号并加入这些频道，从经验丰富的开发者那里获得帮助。

更多社区聊天室可在 [Awesome Embedded Rust - Community Chat Rooms 部分](https://github.com/rust-embedded/awesome-embedded-rust?tab=readme-ov-file#community-chat-rooms)找到。
