# Panic 处理器

此时，当你尝试构建项目时，你会得到这个错误：

```sh
error: `#[panic_handler]` function required, but not found
```

当 Rust 程序发生 panic 时，通常由标准库提供的内置 panic 处理器来处理。但在上一步中，我们添加了 `#![no_std]`，这告诉 Rust 不要使用标准库。所以现在，默认情况下没有可用的 panic 处理器。

在 `no_std` 环境中，你需要定义自己的 panic 行为，因为当出错时没有操作系统或运行时来接管。

我们可以通过添加自己的 panic 处理器来修复这个问题。只需创建一个带有 `#[panic_handler]` 属性的函数。该函数必须接受一个 `PanicInfo` 的引用，并且其返回类型必须是 `!`，这意味着该函数永不返回。

将此添加到你的 `src/main.rs`：

```rust
#[panic_handler]
fn panic(_: &core::panic::PanicInfo) -> ! {
    loop {}
}
```

## Panic Crates

有一些现成的 crate 为 `no_std` 项目提供了 panic 处理器函数。一个简单且常用的 crate 是 "panic_halt"，它在发生 panic 时只是停止执行。

```rust
use panic_halt as _;
```
这行代码从该 crate 中引入了 panic 处理器。现在，如果发生 panic，程序就会停止并停留在无限循环中。

实际上，[panic_halt crate 的代码](https://github.com/korken89/panic-halt/blob/master/src/lib.rs)实现了一个简单的 panic 处理器，如下所示：
```rust
use core::panic::PanicInfo;
use core::sync::atomic::{self, Ordering};

#[inline(never)]
#[panic_handler]
fn panic(_info: &PanicInfo) -> ! {
    loop {
        atomic::compiler_fence(Ordering::SeqCst);
    }
}
``` 

你可以使用像这样的外部 crate，也可以手动编写你自己的 panic 处理器函数。这取决于你。

<div class="translator-note">

### 译者注：panic-probe 的深度机制

对于使用 **Embassy** 或 **probe-rs** 工具链的开发者，推荐使用 `panic-probe` 替代 `panic-halt`。
`panic-probe`的源码在：https://github.com/knurling-rs/defmt/blob/main/firmware/panic-probe/src/lib.rs

#### 差异

**panic-halt** 通过无限循环停止程序：
```rust
loop { atomic::compiler_fence(Ordering::SeqCst); }
```

**panic-probe** 通过硬件陷阱触发调试器：
```rust
cortex_m::asm::udf();  // 执行未定义指令
```

#### panic-probe的原理

`panic-probe` 的执行流程：

1. **禁用中断**：`cortex_m::interrupt::disable()` 确保 panic 处理的原子性
2. **递归防护**：使用 `AtomicBool` 避免嵌套 panic 时的无限递归
3. **可选日志输出**：
   - `print-defmt` feature：通过 defmt 输出格式化消息
   - `print-rtt` feature：通过 RTT 实时传输错误信息
4. **禁用 UsageFault**：清除 SHCSR 寄存器的第 18 位（仅 ARMv7-M 及以上）
5. **触发 UDF 指令**：执行 `0xDEFF`（UDF #255）指令

#### UDF 指令的魔法

```assembly
udf #255  ; 未定义指令
```

当 CPU 执行 UDF 后：
- 触发 **HardFault** 异常（最高优先级）
- 自动保存寄存器上下文到栈：`R0-R3, R12, LR, PC, xPSR`
- `probe-rs` 识别特定的 UDF 编码，捕获断点
- 通过 DWARF 调试信息回溯完整调用栈

#### 使用方式

```toml
# Cargo.toml
[dependencies]
panic-probe = { version = "1.0", features = ["print-defmt"] }
defmt = "1.0.1"
defmt-rtt = "1.0"
```

```rust
// src/main.rs
use {defmt_rtt as _, panic_probe as _};
```

当程序 panic 时，`probe-rs` 会自动输出：
```
ERROR panicked at src/main.rs:42:17
index out of bounds: the len is 3 but the index is 5

Stack backtrace:
  0: rust_begin_unwind (panic-probe)
  1: core::panicking::panic_fmt
  2: your_app::buggy_function
```

</div>

**参考资源：**
- [Rust 官方文档](https://doc.rust-lang.org/nomicon/panic-handler.html)
- [嵌入式 Rust 书籍](https://docs.rust-embedded.org/book/start/panicking.html)
