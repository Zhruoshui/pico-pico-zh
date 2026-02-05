# 使用 RP HAL 的 LED 灯（LED）调光程序

rp-hal 是用于 RP 系列微控制器（MCU）的嵌入式硬件抽象层（Embedded-HAL），可以作为 pico 的 Embassy 框架的替代方案。

此示例代码取自 rp235x-hal 仓库（它还包含除闪烁示例之外的更多示例）：

["https://github.com/rp-rs/rp-hal/tree/main/rp235x-hal-examples"](https://github.com/rp-rs/rp-hal/tree/main/rp235x-hal-examples)


## 主代码


```rust
#![no_std]
#![no_main]

use embedded_hal::delay::DelayNs;
use hal::block::ImageDef;
use rp235x_hal as hal;

// Traig for PWM
use embedded_hal::pwm::SetDutyCycle;

//Panic Handler
use panic_probe as _;
// Defmt Logging
use defmt_rtt as _;

/// Tell the Boot ROM about our application
#[unsafe(link_section = ".start_block")]
#[used]
pub static IMAGE_DEF: ImageDef = hal::block::ImageDef::secure_exe();
/// External high-speed crystal on the Raspberry Pi Pico 2 board is 12 MHz.
/// Adjust if your board has a different frequency
const XTAL_FREQ_HZ: u32 = 12_000_000u32;

/// The minimum PWM value (i.e. LED brightness) we want
const LOW: u16 = 0;

/// The maximum PWM value (i.e. LED brightness) we want
const HIGH: u16 = 25000;

#[hal::entry]
fn main() -> ! {
    // Grab our singleton objects
    let mut pac = hal::pac::Peripherals::take().unwrap();

    // Set up the watchdog driver - needed by the clock setup code
    let mut watchdog = hal::Watchdog::new(pac.WATCHDOG);

    // Configure the clocks
    //
    // The default is to generate a 125 MHz system clock
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

    // The single-cycle I/O block controls our GPIO pins
    let sio = hal::Sio::new(pac.SIO);

    // Set the pins up according to their function on this particular board
    let pins = hal::gpio::Pins::new(
        pac.IO_BANK0,
        pac.PADS_BANK0,
        sio.gpio_bank0,
        &mut pac.RESETS,
    );

    // Init PWMs
    let mut pwm_slices = hal::pwm::Slices::new(pac.PWM, &mut pac.RESETS);

    // Configure PWM4
    let pwm = &mut pwm_slices.pwm4;
    pwm.set_ph_correct();
    pwm.enable();

    // Output channel B on PWM4 to GPIO 25
    let channel = &mut pwm.channel_b;
    channel.output_to(pins.gpio25);

    let mut timer = hal::Timer::new_timer0(pac.TIMER0, &mut pac.RESETS, &clocks);

    loop {
        for i in LOW..=HIGH {
            timer.delay_us(8);
            let _ = channel.set_duty_cycle(i);
        }

        for i in (LOW..=HIGH).rev() {
            timer.delay_us(8);
            let _ = channel.set_duty_cycle(i);
        }

        timer.delay_ms(500);
    }
}
// Program metadata for `picotool info`.
// This isn't needed, but it's recomended to have these minimal entries.
#[unsafe(link_section = ".bi_entries")]
#[used]
pub static PICOTOOL_ENTRIES: [hal::binary_info::EntryAddr; 5] = [
    hal::binary_info::rp_cargo_bin_name!(),
    hal::binary_info::rp_cargo_version!(),
    hal::binary_info::rp_program_description!(c"your program description"),
    hal::binary_info::rp_cargo_homepage_url!(),
    hal::binary_info::rp_program_build_attribute!(),
];

// End of file
```

## 克隆现有项目

你可以克隆我创建的闪烁项目，并进入 `led-dimming` 文件夹来运行此版本的闪烁程序：

```sh
git clone https://github.com/ImplFerris/pico2-rp-projects
cd pico2-projects/led-dimming
```
