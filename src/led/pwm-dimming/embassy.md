# 在 Raspberry Pi Pico 上使用 Embassy 的 LED 灯（LED）调光

让我们在 Raspberry Pi Pico 上使用 Embassy，通过脉宽调制（PWM）实现 LED 灯（LED）的调光效果。

## 使用 cargo-generate 生成项目

到现在你应该已经熟悉这些步骤了。我们使用 cargo-generate 命令配合自定义模板，并在提示时选择 Embassy 作为硬件抽象层（HAL）。

```sh
cargo generate --git https://github.com/ImplFerris/pico2-template.git --tag v0.3.1
```

## 更新导入

添加下面的导入，将 PWM 类型引入作用域：

```rust
use embassy_rp::pwm::{Pwm, SetDutyCycle};
```

## 初始化 PWM

让我们为 LED 灯配置 PWM。使用第一行来驱动板载 LED 灯；如果你想在通用输入输出（GPIO）16 上使用外接 LED 灯，请取消第二行的注释。

```rust
// For Onboard LED
let mut pwm = Pwm::new_output_b(p.PWM_SLICE4, p.PIN_25, Default::default());

// For external LED connected on GPIO 16
// let mut pwm = Pwm::new_output_a(p.PWM_SLICE0, p.PIN_16, Default::default());
```

## 主逻辑

在主循环中，我们通过将占空比从 0 增加到 100% 再降回去来实现淡入淡出的效果。每一步之间的小延时会让调光更平滑。你可以调整延时，观察淡入淡出的速度如何变化。

```rust
loop {
    for i in 0..=100 {
        Timer::after_millis(8).await;
        let _ = pwm.set_duty_cycle_percent(i);
    }
    
    for i in (0..=100).rev() {
        Timer::after_millis(8).await;
        let _ = pwm.set_duty_cycle_percent(i);
    }

    Timer::after_millis(500).await;
}
```

## 完整代码

```rust
#![no_std]
#![no_main]

use embassy_executor::Spawner;
use embassy_rp as hal;
use embassy_rp::block::ImageDef;
use embassy_rp::pwm::{Pwm, SetDutyCycle};
use embassy_time::Timer;

//Panic Handler
use panic_probe as _;
// Defmt Logging
use defmt_rtt as _;

/// Tell the Boot ROM about our application
#[unsafe(link_section = ".start_block")]
#[used]
pub static IMAGE_DEF: ImageDef = hal::block::ImageDef::secure_exe();

#[embassy_executor::main]
async fn main(_spawner: Spawner) {
    let p = embassy_rp::init(Default::default());

    // For Onboard LED
    let mut pwm = Pwm::new_output_b(p.PWM_SLICE4, p.PIN_25, Default::default());

    // For external LED connected on GPIO 16
    // let mut pwm = Pwm::new_output_a(p.PWM_SLICE0, p.PIN_16, Default::default());

    loop {
        for i in 0..=100 {
            Timer::after_millis(8).await;
            let _ = pwm.set_duty_cycle_percent(i);
        }
        for i in (0..=100).rev() {
            Timer::after_millis(8).await;
            let _ = pwm.set_duty_cycle_percent(i);
        }
        Timer::after_millis(500).await;
    }
}

// Program metadata for `picotool info`.
// This isn't needed, but it's recomended to have these minimal entries.
#[unsafe(link_section = ".bi_entries")]
#[used]
pub static PICOTOOL_ENTRIES: [embassy_rp::binary_info::EntryAddr; 4] = [
    embassy_rp::binary_info::rp_program_name!(c"led-dimming"),
    embassy_rp::binary_info::rp_program_description!(c"your program description"),
    embassy_rp::binary_info::rp_cargo_version!(),
    embassy_rp::binary_info::rp_program_build_attribute!(),
];

// End of file
```


## 克隆现有项目

你可以克隆我创建的项目，并进入 `external-led` 文件夹：

```sh
git clone https://github.com/ImplFerris/pico2-embassy-projects
cd pico2-embassy-projects/led-dimming
```
