
# 使用嵌入式 Rust 在 Raspberry Pi Pico 上闪烁外部 LED

让我们从创建项目开始。我们将使用 cargo-generate 并使用我们为本书准备的模板。

在你的终端中，输入：

```sh
cargo generate --git https://github.com/ImplFerris/pico2-template.git --tag v0.3.1
```

你会被问到几个问题：

1. 对于项目名称，你可以随意命名。我们将使用 external-led。

2. 接下来，它会要求我们选择硬件抽象层（HAL）。我们应该选择 "Embassy"。

3. 然后，它会询问我们是否要启用 defmt 日志记录。这仅在我们使用调试探针时有效，因此你可以根据你的设置进行选择。无论如何，在本次练习中我们不会编写任何日志。

## 导入

项目模板中已经包含了大部分所需的导入。对于本次练习，我们只需要从 gpio 中添加 `Output` 结构体和 `Level` 枚举：

```rust
use embassy_rp::gpio::{Level, Output};
```

在编写主代码时，你的编辑器通常会建议缺失的导入。如果没有建议或者你看到了错误，请检查完整代码部分并从那里添加缺失的导入。

## 主要逻辑

代码与快速开始示例几乎相同。唯一的区别是我们现在使用 GPIO 13 而不是 GPIO 25。GPIO 13 是我们连接 LED（通过电阻）的地方。

让我们将这些代码添加到主函数中：

```rust
let mut led = Output::new(p.PIN_13, Level::Low);

loop {
    led.set_high(); // 打开 LED
    Timer::after_millis(500).await;

    led.set_low(); // 关闭 LED
    Timer::after_millis(500).await;
}
```

我们在这里使用 Output 结构体，因为我们想从 Pico 向 LED 发送信号。我们将 GPIO 13 设置为输出引脚，并使其初始状态为低电平（关闭）。

> 注意：如果你想从组件（如按钮或传感器）读取信号，则需要将 GPIO 引脚配置为输入（Input）。

然后我们在引脚上调用 set_high 和 set_low，并在它们之间设置延迟。这会在高电平和低电平之间切换引脚，从而打开和关闭 LED。

## 完整代码

这里是完整的代码供参考：

```rust
#![no_std]
#![no_main]

use embassy_executor::Spawner;
use embassy_rp as hal;
use embassy_rp::block::ImageDef;
use embassy_rp::gpio::{Level, Output};
use embassy_time::Timer;

// Panic处理程序（Panic Handler）
use panic_probe as _;
// Defmt 日志记录
use defmt_rtt as _;

/// 告知引导 ROM（Boot ROM）关于我们的应用程序
#[unsafe(link_section = ".start_block")]
#[used]
pub static IMAGE_DEF: ImageDef = hal::block::ImageDef::secure_exe();

#[embassy_executor::main]
async fn main(_spawner: Spawner) {
    let p = embassy_rp::init(Default::default());

    let mut led = Output::new(p.PIN_13, Level::Low);

    loop {
        led.set_high(); // 打开 LED
        Timer::after_millis(500).await;

        led.set_low(); // 关闭 LED
        Timer::after_millis(500).await;
    }
}

// 用于 `picotool info` 的程序元数据。
// 这不是必需的，但建议保留这些最基本的条目。
#[unsafe(link_section = ".bi_entries")]
#[used]
pub static PICOTOOL_ENTRIES: [embassy_rp::binary_info::EntryAddr; 4] = [
    embassy_rp::binary_info::rp_program_name!(c"external-led"),
    embassy_rp::binary_info::rp_program_description!(c"your program description"),
    embassy_rp::binary_info::rp_cargo_version!(),
    embassy_rp::binary_info::rp_program_build_attribute!(),
];

// 文件结束
```

## 克隆现有项目

你可以克隆我创建的项目并导航到 `external-led` 文件夹：

```sh
git clone https://github.com/ImplFerris/pico2-embassy-projects
cd pico2-embassy-projects/external-led
```

## 如何运行？

你可以参考 [“运行程序”](../running.md) 章节
