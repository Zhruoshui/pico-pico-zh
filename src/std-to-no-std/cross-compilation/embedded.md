# 为微控制器编译

现在让我们谈谈嵌入式系统。当涉及到为微控制器编译 Rust 代码时，情况与普通桌面系统略有不同。微控制器通常不运行像 Linux 或 Windows 这样的完整操作系统。相反，它们在一个最小的环境中运行，通常根本没有操作系统。这被称为裸机（bare-metal）环境。

Rust 通过其 **no_std** 模式支持这种设置。在普通的 Rust 程序中，标准库（`std`）处理文件系统、线程、堆分配和 I/O 等事务。但在裸机微控制器上，这些都不存在。因此，我们不使用 std，而是使用一个小得多的 `core` 库，它只提供基本的构建块。

## Pico 2 的目标三元组

Raspberry Pi Pico 2（RP2350 芯片），正如你已经知道的那样，它是独特的；它包含可选择的 ARM Cortex-M33 和 Hazard3 RISC-V 核心。你可以选择使用哪种处理器架构。

### ARM Cortex-M33 目标

对于 ARM 模式，我们必须使用目标 `[thumbv8m.main-none-eabi](https://doc.rust-lang.org/nightly/rustc/platform-support/thumbv8m.main-none-eabi.html)`：

让我们分解一下：

- **架构（Architecture）(thumbv8m.main)**：Cortex-M33 使用用于 ARMv8-M 架构的 ARM Thumb-2 指令集。
- **供应商（Vendor）(none)**：没有特定的供应商指定。
- **操作系统（OS）(none)**：没有操作系统 - 它是裸机的。
- **二进制接口（ABI）(eabi)**：嵌入式应用二进制接口（Embedded Application Binary Interface），嵌入式 ARM 系统的标准调用约定。

要安装并使用此目标：
```bash
rustup target add thumbv8m.main-none-eabi
cargo build --target thumbv8m.main-none-eabi
```

### RISC-V Hazard3 目标

对于 RISC-V 模式，使用目标:
[riscv32imac-unknown-none-elf](https://doc.rust-lang.org/nightly/rustc/platform-support/riscv32-unknown-none-elf.html) 

让我们分解一下：

- **架构（Architecture）(riscv32imac)**：具有 I（整数）、M（乘法/除法）、A（原子）和 C（压缩）指令集的 32 位 RISC-V。
- **供应商（Vendor）(unknown)**：没有特定的供应商。
- **操作系统（OS）(none)**：没有操作系统 - 它是裸机的。
- **格式（Format）(elf)**：ELF（可执行和可链接格式），嵌入式系统中常用的对象文件格式。

要安装并使用此目标：
```bash
rustup target add riscv32imac-unknown-none-elf
cargo build --target riscv32imac-unknown-none-elf
```

在我们的练习中，我们将主要使用 ARM 模式。像 `panic-probe` 这样的一些 crate 在 RISC-V 模式下无法工作。

## Cargo 配置

在快速开始中，你可能已经注意到我们在运行 cargo 命令时从未手动传递 --target 标志。那么它是如何知道要为哪个目标构建的呢？这是因为目标已经在 .cargo/config.toml 文件中配置好了。

这个文件允许你存储与 cargo 相关的设置，包括默认使用哪个目标。要为 ARM 模式下的 Pico 2 设置它，请在你的项目根目录中创建一个 .cargo 文件夹，并添加一个包含以下内容的 config.toml 文件：

```toml
[build]
target = "thumbv8m.main-none-eabihf"
```

现在你不必每次都传递 --target。Cargo 将自动使用此设置。
