# 一切的开始—cargo

## Cargo简介 
**Cargo：Rust的包管理工具** Cargo 是 Rust 语言的官方包管理器。它负责下载你的 Rust 项目的依赖库，编译你的代码，生成可执行的包，并将这些包上传到 [crates.io](https://crates.io/)——Rust 社区的官方包仓库。

<div class="image-with-caption" style="text-align:center;">
    <img src="./images/Cargo-Logo-Small.png" alt="cargo" style="width:400px; height:auto; display:block; margin:auto;"/>
    <div class="caption" style="font-size:0.9em; color:#555; margin-top:6px;">Cargo</div>
</div>

在“快速上手”章节中，我们使用 cargo 指令将示例刷写到 Pico 2 中：

1. 克隆示例仓库并进入目录。
2. 将 Pico 2 按住 BOOTSEL 后通过 USB 连接电脑，松开按键让设备进入可写模式。
3. 执行 `cargo run`，cargo 会根据项目配置完成编译，并通过预设的 runner 将生成的镜像写入 Pico 2。
4. 烧录完成后，板载 LED 会按固定频率闪烁。

这个流程展示了 cargo 在嵌入式项目中的常见用法：一条命令同时完成构建与烧录，便于快速迭代。[这里补充C语言中是怎么进行的？]

!后续再慢慢进行优化吧，现在体会还不算太深入，一定要边进行C开发，一遍进行Rust开发，两者结合着来进行学习

## Cargo run都干啥了
cargo 在 `pico2-quick` 项目中串起了从编译到烧录的完整链路：

- 目标与运行器：
- 构建脚本：`build.rs` 在编译前把 `memory.x` 复制到输出目录，并追加 `--nmagic`、`-Tlink.x`、`-Tdefmt.x` 等链接参数，保证内存布局和 defmt 支持符合嵌入式需求。
- 依赖与特性：`Cargo.toml` 启用 `embassy-rp` 的 `rp235xa`、`time-driver`、`binary-info` 等特性，以及 `defmt`、`panic-probe`，cargo 会按这些选项拉取并构建出能在 RP2350 上运行的固件。
- 环境变量：同一配置设定 `DEFMT_LOG=debug`，编译时写入日志等级，便于用 RTT 查看输出。

### 目标与运行器
`.cargo/config.toml` 设定交叉编译目标 `thumbv8m.main-none-eabihf`，runner 为 `sudo picotool load -u -v -x -t elf`，因此 `cargo run` 会编译后自动调用 picotool 把 ELF(可链接文件) 写入 Pico 2。

```toml
[target.'cfg(all(target_arch = "arm", target_os = "none"))']
#runner = "probe-rs run --chip RP2040"
#runner = "elf2uf2-rs -d"
runner = "sudo picotool load -u -v -x -t elf"

[build]
target = "thumbv8m.main-none-eabihf"

[env]
DEFMT_LOG = "debug"
```

### 构建脚本
运行 `build.rs`，同步 `memory.x` 并注入链接参数。
`build.rs` 保障了裸机固件的内存脚本可用、链接参数正确，且只在相关文件变化时重跑，减少不必要的构建成本。

该构建脚本一般是官方模板/社区随模板提供的，基本不用自己修改

### 依赖与特性

`pico2-quick`项目中的`Cargo.toml`，定义嵌入式异步运行时（Embassy）、Pico 2 芯片支持（embassy-rp 及特性）、调试与 panic 输出（defmt/ panic-probe），并通过 Cortex-M 运行时完成裸机启动。

```toml
[package]
name = "pico2-quick"
version = "0.2.0"
edition = "2024"

[dependencies]

# Embassy 的异步执行器，启用 Cortex-M 架构支持、线程化执行器和 defmt 日志集成。
embassy-executor = { version = "0.9", features = [
"arch-cortex-m",
"executor-thread",
"defmt",
] }

# panic 处理器，将崩溃信息通过 defmt 输出，便于 RTT 调试。
panic-probe = { version = "1.0", features = ["print-defmt"] }

# 异步定时器/计时工具。
embassy-time = { version = "0.5.0" }

# RP2 系列 HAL，启用 defmt 日志、时间驱动、临界区实现、RP235x A 版芯片支持，以及 picotool 用的 binary info 段。
embassy-rp = { version = "0.8.0", features = [
"defmt",
"time-driver",
"critical-section-impl",
"rp235xa",
"binary-info",
] }

# ARM Cortex-M 底层支持与运行时启动代码（向量表、reset handler）
cortex-m = { version = "0.7.6" }
cortex-m-rt = "0.7.5"

# 轻量日志框架及 RTT 后端，用于在调试器或 picotool 环境下输出日志。
defmt = "1.0.1"
defmt-rtt = "1.0"
```

### 烧录和调试
调用 runner：`sudo picotool load -u -v -x -t elf <生成的ELF>`，向 BOOTSEL 模式的 Pico 2 烧录固件。烧录完成后设备复位运行，LED 开始闪烁；需要调试时可通过 RTT 读取 defmt 日志。


