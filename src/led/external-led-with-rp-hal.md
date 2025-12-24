# 使用 rp-hal 的闪烁示例

在上一节中，我们使用了 Embassy。我们保持相同的电路和接线。对于这个示例，我们切换到 rp-hal 以展示这两种方法的样子。如果你想要异步支持，可以选择 Embassy；如果你更喜欢阻塞风格，可以选择 rp-hal。在本书中，我们将主要使用 Embassy。

我们将再次使用 cargo-generate 和相同的模板创建一个新项目。

在你的终端中，输入：

```sh
cargo generate --git https://github.com/ImplFerris/pico2-template.git --tag v0.3.1
```

当它要求你选择硬件抽象层（HAL）时，这次选择 "rp-hal"。

## 导入

模板已经包含了大部分导入。对于这个示例，我们需要从 embedded-hal 中添加 OutputPin 特性（trait）：

```rust
// 用于输出引脚的嵌入式 HAL 特性
use embedded_hal::digital::OutputPin;
```

这个特性提供了我们将用来控制 LED 灯（LED）的 set_high() 和 set_low() 方法。

## 主要逻辑

如果你将此与 Embassy 版本进行比较，LED 切换的方式没有太大区别。主要区别在于延迟的工作方式。Embassy 使用 async 和 await，这允许程序在不阻塞的情况下暂停，并允许其他任务在后台运行。rp-hal 使用阻塞延迟，这会停止程序直到时间过去。

```rust
let mut led_pin = pins.gpio13.into_push_pull_output();

loop {
    led_pin.set_high().unwrap();
    timer.delay_ms(200);

    led_pin.set_low().unwrap();
    timer.delay_ms(200);
}
```

## 完整代码

```rust
#![no_std]
#![no_main]

use embedded_hal::delay::DelayNs;
use hal::block::ImageDef;
use rp235x_hal as hal;

// 恐慌处理程序（Panic Handler）
use panic_probe as _;
// Defmt 日志记录
use defmt_rtt as _;

// 用于输出引脚的嵌入式 HAL 特性
use embedded_hal::digital::OutputPin;

/// 告知引导 ROM（Boot ROM）关于我们的应用程序
#[unsafe(link_section = ".start_block")]
#[used]
pub static IMAGE_DEF: ImageDef = hal::block::ImageDef::secure_exe();
/// Raspberry Pi Pico 2 开发板上的外部高速晶振为 12 MHz。
/// 如果你的开发板频率不同，请进行调整
const XTAL_FREQ_HZ: u32 = 12_000_000u32;

#[hal::entry]
fn main() -> ! {
    // 获取我们的单例对象
    let mut pac = hal::pac::Peripherals::take().unwrap();

    // 设置看门狗（watchdog）驱动程序 - 时钟设置代码需要它
    let mut watchdog = hal::Watchdog::new(pac.WATCHDOG);

    // 配置时钟
    //
    // 默认是生成 125 MHz 的系统时钟
    let clocks = hal::clocks::init_clocks_and_plls(
        XTAL_FREQ_HZ,
        pac.XOSC,
        pac.CLOCKS,
        pac.PLL_SYS,
        pac.PLL_USB,
        &mut pac.RESETS,
        &mut watchdog,
    )
    .ok()
    .unwrap();

    // 单周期 I/O 块控制我们的通用输入输出（GPIO）引脚
    let sio = hal::Sio::new(pac.SIO);

    // 根据它们在此特定开发板上的功能设置引脚
    let pins = hal::gpio::Pins::new(
        pac.IO_BANK0,
        pac.PADS_BANK0,
        sio.gpio_bank0,
        &mut pac.RESETS,
    );

    let mut timer = hal::Timer::new_timer0(pac.TIMER0, &mut pac.RESETS, &clocks);

    let mut led_pin = pins.gpio13.into_push_pull_output();

    loop {
        led_pin.set_high().unwrap();
        timer.delay_ms(200);

        led_pin.set_low().unwrap();
        timer.delay_ms(200);
    }
}

// 用于 `picotool info` 的程序元数据。
// 这不是必需的，但建议保留这些最基本的条目。
#[unsafe(link_section = ".bi_entries")]
#[used]
pub static PICOTOOL_ENTRIES: [hal::binary_info::EntryAddr; 5] = [
    hal::binary_info::rp_cargo_bin_name!(),
    hal::binary_info::rp_cargo_version!(),
    hal::binary_info::rp_program_description!(c"your program description"),
    hal::binary_info::rp_cargo_homepage_url!(),
    hal::binary_info::rp_program_build_attribute!(),
];
```

## 克隆现有项目

你可以克隆我创建的项目并导航到 `external-led` 文件夹：

```sh
git clone https://github.com/ImplFerris/pico2-rp-projects
cd pico2-rp-projects/external-led
```
