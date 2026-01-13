# 实时传输（Real-Time Transfer, RTT）

在开发嵌入式系统时，你需要一种方式来观察程序内部的运行情况。在普通计算机上，你可以使用 `println!` 将消息打印到终端。但在微控制器上，并没有连接屏幕或终端。实时传输（Real-Time Transfer, RTT）通过允许你将调试信息和日志从微控制器发送到电脑，解决了这一问题。

## 什么是 RTT？

RTT 是一种通信方法，可让你的微控制器通过已用于烧录程序的调试器（debug probe）向电脑发送消息。

当你将 Raspberry Pi 调试器连接到 Pico 时，就建立了一个具备以下两种功能的连接：

- 向芯片烧录新程序  
- 读写芯片内存  

RTT 利用了这种内存访问能力。它在微控制器上创建特殊的内存缓冲区，调试器则读取这些缓冲区，并将消息显示在你的电脑上。这一切都在后台进行，不会影响程序的正常运行。

## 使用 Defmt 进行日志记录

[Defmt](https://github.com/knurling-rs/defmt)（“deferred formatting”，即“延迟格式化”的缩写）是一个专为资源受限设备（如微控制器）设计的日志框架。在你的 Rust 嵌入式项目中，你将使用 defmt 来打印消息并调试程序。

Defmt 通过延迟格式化和字符串压缩实现高性能。所谓延迟格式化，是指格式化操作并非在记录日志的设备上完成，而是在另一台设备（如你的电脑）上进行。

你的 Pico 发送的是小型代码，而非完整的文本消息。你的电脑接收这些代码并将其还原为可读的文本。这种方式使固件体积更小，并避免了在微控制器上执行缓慢的字符串格式化操作。

你可以在项目中添加 defmt 依赖：

```toml
defmt = "1.0.1"
```

然后像这样使用它：

```rust
use defmt::{info, warn, error};

...
info!("Starting program");
warn!("You shall not pass!");
error!("Something went wrong!");
```

### Defmt RTT

Defmt 本身并不知道如何将消息从 Pico 发送到电脑，它需要一个传输层。这就是 `defmt-rtt` 的作用所在。

`defmt-rtt` crate 将 defmt 与 RTT 连接起来，使你的日志消息能通过调试器传输到电脑。

你可以在项目中添加 `defmt-rtt` 依赖：

```toml
defmt-rtt = "1.0"
```

> 注意：要查看 RTT 和 defmt 日志，你需要使用 `probe-rs` 工具（例如 `cargo embed` 命令）运行程序。这些工具会自动开启 RTT 会话，并在终端中显示日志。

然后在代码中引入它：

```rust
use defmt_rtt as _;
```

这行代码建立了 defmt 与 RTT 之间的连接。你无需直接调用其中的任何函数，但必须导入该 crate 才能使其生效。

### 使用 Panic-Probe 显示 Panic 信息

当程序崩溃（panic）时，你希望看到具体出错的原因。`panic-probe` crate 可以让 panic 信息通过 defmt 和 RTT 显示出来。

你可以在项目中添加 `panic-probe` 依赖：

```toml
# print-defmt 特性：告诉 panic-probe 使用 defmt 输出信息。
panic-probe = { version = "1.0", features = ["print-defmt"] }
```

然后在代码中引入它：

```rust
use panic_probe as _;
```

你可以手动触发一次 panic 来测试 panic 信息的显示效果。尝试在代码中加入以下内容：

```rust
panic!("something went wrong");
```