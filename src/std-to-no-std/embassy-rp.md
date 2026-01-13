# 适用于 Raspberry Pi Pico 的 Embassy

我们在介绍章节中已经介绍了硬件抽象层（HAL）的概念。对于 Pico，我们将使用 Embassy RP HAL。Embassy RP HAL 旨在支持 Raspberry Pi RP2040 以及 RP235x 微控制器。

该 HAL 支持阻塞和异步外设 API。使用异步 API 更好，因为 HAL 会自动处理在低功耗模式下等待外设完成操作的时间，并管理中断，让你能专注于核心功能。

让我们将 `embassy-rp` crate 添加到我们的项目中。

```toml
embassy-rp = { version = "0.8.0", features = [
  "rp235xa",
] }
```

我们启用了 `rp235xa` 特性，因为我们的芯片是 RP2350。如果我们使用旧款 Pico，则应改为启用 `rp2040` 特性。

## 初始化 embassy-rp HAL

让我们初始化 HAL。如果需要，我们可以将自定义配置传递给初始化函数。目前的配置允许我们修改时钟设置，但现在我们将坚持使用默认值：

```rust
let peripherals = embassy_rp::init(Default::default());
```

这会给我们提供所需的外设单例。请记住，我们应该只在启动时调用这一次；再次调用会导致 panic。

## 计时器

我们将通过让板载 LED 闪烁来复刻快速开始示例。为了制作闪烁效果，我们需要一个计时器在 LED 开关之间添加延迟。如果没有延迟，闪烁速度会太快导致肉眼无法察觉。

为了处理计时，我们将使用 "embassy-time" crate，它提供了必要的计时功能：

```rust
embassy-time = { version = "0.5.0" }
```

我们还需要在 `embassy-rp` crate 中启用 `time-driver` 特性。这将把 `TIMER` 外设配置为 `embassy-time` 的全局时间驱动，以 1MHz 的频率运行：

```toml
embassy-rp = { version = "0.8.0", features = [
  "rp235xa",
  "time-driver",
  "critical-section-impl",
] }
```

我们几乎已经添加了所有核心 crate。现在让我们编写实现闪烁效果的代码。
