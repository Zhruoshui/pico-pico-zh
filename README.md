# 《Pico Pico》中文版 - Rust 嵌入式开发指南

> 📚 一本关于如何在 Raspberry Pi Pico 2 (RP2350) 上使用 Rust 进行嵌入式开发的中文实战指南。

本项目是 [Pico Pico](https://github.com/ImplFerris/pico-pico) 的中文翻译与维护版本。在这本书中，我们将探索如何使用 Rust 语言挖掘 Raspberry Pi Pico 2 的潜力。

## 进度

- [x] 写在一开始 / 介绍
- [x] 调试器
- [x] 使用外部 LED
- [x] 从 std 到 no_std
- [ ] PWM
- [ ] 调节 LED 亮度
- [ ] 在 VS Code 中使用 Pico
- [ ] 按钮 / 分压器
- [ ] 超声波
- [ ] I2C
- [ ] OLED 显示屏
- [ ] 舵机
- [ ] 看门狗
- [ ] 蜂鸣器 (Buzzinga)
- [ ] LDR 光敏电阻
- [ ] ADC / 热敏电阻
- [ ] USB 串口
- [ ] RFID
- [ ] SD 卡
- [ ] LCD 显示屏
- [ ] 摇杆
- [ ] 调试 (GDB)

## 🛠️ 硬件平台：Pico 2

本书主要基于 **Raspberry Pi Pico 2**。它搭载了全新的 RP2350 芯片，具有双核灵活性 —— 提供 Arm Cortex-M33 内核和可选的 RISC-V Hazard3 内核。你可以在 [树莓派官网](https://www.raspberrypi.com/products/raspberry-pi-pico-2/) 了解更多详情。

<img style="display: block; margin: auto;" alt="pico2" src="./src/images/pico2.png" width="80%"/>

## 🚀 如何阅读

### 在线阅读
访问原版在线文档站：[https://pico.implrust.com/](https://pico.implrust.com/)
翻译版本文档站：[还在申请域名中]

### 本地构建与预览
如果你想在本地离线阅读或调试本书，请确保已安装 `mdbook`：

```sh
# 安装 mdbook
cargo install mdbook

# 克隆仓库并启动本地服务
git clone https://github.com/Zhruoshui/pico-pico-zh
cd pico-pico-zh
mdbook serve --open
```

## 🤝 参与贡献

欢迎提交 Issue 或 Pull Request 来改进翻译质量或补充内容！

*   **开发规范**：请参考 [Contribution.md](./Contribution.md) 了解项目结构、编写风格及提交规范。
*   **构建输出**：请勿提交 `book/` 目录下的构建产物。

## 📄 许可证 (License)

本项目遵循以下开源协议：

*   **代码示例**：同时遵循 [MIT License](./LICENSE-MIT) 和 [Apache License v2.0](./LICENSE-APACHE)。
*   **文档内容**：遵循 Creative Commons [CC-BY-SA v4.0](./LICENSE-CC-BY-SA) 协议。

---
**免责声明**：书中的实验和项目仅供学习参考，请在操作硬件时注意安全，作者不对实验过程中可能造成的硬件损坏负责。
