# Raspberry Pi Pico 2 板载 LED 闪烁

当你开始进行嵌入式编程时，通用输入输出（GPIO）是你首先会接触的外设。“通用输入输出”顾名思义：我们可以将其用于输入和输出。作为输出，Pico 可以发送信号来控制 LED 等组件。作为输入，按钮等组件可以向 Pico 发送信号。

在本练习中，我们将通过向板载 LED 发送信号来控制它。如果你查看 [Pico 2 数据手册](https://datasheets.raspberrypi.com/pico/pico-2-datasheet.pdf#page=9)的第 8 页，你会看到板载 LED 连接在 GPIO 引脚 25 上。

我们将 GPIO 引脚 25 配置为输出引脚，并将其初始状态设置为低电平（关闭）：

```rust
let mut led = Output::new(peripherals.PIN_25, Level::Low);
```

大多数代码编辑器（如 VS Code）都有快捷键可以自动为你添加导入。如果你的编辑器没有此功能或者你遇到了问题，可以手动添加这些导入：

```rust
use embassy_rp::gpio::{Level, Output};
```

## 闪烁逻辑

现在，我们将创建一个简单的循环让 LED 闪烁。首先，我们通过在 GPIO 实例上调用 `set_high()` 函数来打开 LED。然后我们使用 `Timer` 添加一个短暂的延迟。接下来，我们使用 `set_low()` 关闭 LED。然后我们再添加一个延迟。这就产生了闪烁效果。

让我们将 `Timer` 导入到我们的项目中：

```rust
use embassy_time::Timer;
```

这是闪烁循环代码：

```rust
loop {
    led.set_high();
    Timer::after_millis(250).await;

    led.set_low();
    Timer::after_millis(250).await;
}
```
