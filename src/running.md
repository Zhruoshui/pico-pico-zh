# 运行程序
在深入其他示例之前，我们先覆盖在 Raspberry Pi Pico 2 上构建并运行任意程序的一般步骤。Pico 2 包含 ARM Cortex-M33 与 Hazard3 RISC-V 两类处理器，这里会给出两种架构的构建说明。

注意：下列命令应在你的项目目录中执行。若尚未创建项目，请先参阅“快速上手”或“Blink LED”章节。

## 在 ARM 模式下构建与运行
使用下面的命令为 Pico 2 的 ARM 模式（Cortex-M33）构建程序：

```sh
# 构建程序
cargo build --target=thumbv8m.main-none-eabihf
```

要将应用刷入 Pico 2，请按住 BOOTSEL 按钮，同时用 Micro USB 将设备连接到电脑。USB 插入后即可松开按钮。

<img style="display: block; margin: auto;" alt="bootsel" src="./images/bootsel.png"/>

```sh
# 运行程序
cargo run --target=thumbv8m.main-none-eabihf
```

**说明：** 示例工程中在 `.cargo/config.toml` 中配置了 runner，例如：  
`runner = "picotool load -u -v -x -t elf"`。这意味着执行 `cargo run` 时会调用 `picotool load` 子命令来刷写程序。


## 在 RISC-V 模式下构建与运行
使用下面的命令为 Pico 2 的 RISC‑V 模式（Hazard3）构建程序。

> 注意：本书以 ARM 示例为主；部分示例在 RISC‑V 下可能需作调整。若想简化学习流程，建议优先按照 ARM 工作流进行操作。

```sh
# 构建程序
cargo build --target=riscv32imac-unknown-none-elf
```

按照前述 BOOTSEL 步骤把设备置于刷写模式，然后执行：
```sh
# 运行程序
cargo run --target=riscv32imac-unknown-none-elf
```

## 使用 Debug Probe

使用 Debug Probe 时，可以直接将程序刷入 Pico 2：

```sh
# cargo flash --chip RP2350
# cargo flash --chip RP2350 --release
cargo flash --release
```

若希望在刷写的同时查看实时输出，可使用：

```sh
# cargo embed --chip RP2350
# cargo embed --chip RP2350 --release
cargo embed --release
```

[cargo-embed](https://probe.rs/docs/tools/cargo-embed/) 是比 `cargo-flash` 更强大的工具，既能刷写程序，也能打开 RTT 终端与 GDB 服务。
