# no_std

Rust 有两个主要的 crate：`std` 和 `core`。

- `std` crate 是标准库。它为你提供了诸如堆分配、文件系统访问、线程和 `println!` 等功能。

- `core` crate 是一个最小子集。它仅包含最基本的 Rust 功能，例如基本类型（`Option`、`Result` 等）、trait 以及少数其他操作。它不依赖于操作系统或运行时。

当你尝试在这个阶段构建项目时，你会得到一堆错误。如下所示：

```sh
error[E0463]: can't find crate for `std`
  |
  = note: the `thumbv8m.main-none-eabihf` target may not support the standard library
  = note: `std` is required by `pico_from_scratch` because it does not declare `#![no_std]`

error: cannot find macro `println` in this scope
 --> src/main.rs:2:5
  |
2 |     println!("Hello, world!");
  |     ^^^^^^^

error: `#[panic_handler]` function required, but not found

For more information about this error, try `rustc --explain E0463`.
error: could not compile `pico-from-scratch` (bin "pico-from-scratch") due to 3 previous errors
```

这里有很多错误。让我们逐一修复。第一个错误说目标平台可能不支持标准库。这是真的。我们已经知道了。问题在于，我们没有告诉 Rust 我们不想使用 `std`。这就是 `no_std` 属性发挥作用的地方。

## #![no_std]

`#![no_std]` 属性禁用了标准库（`std`）的使用。这对于嵌入式系统开发通常是必要的，因为这种环境通常缺乏标准库所假设可用的许多资源（如操作系统、文件系统或堆分配）。

在你的 `src/main.rs` 文件顶部，添加这行代码：

```rs
#![no_std]
```

就是这样。现在 Rust 知道这个项目将只会使用 `core` 库，而不是 `std`。

## Println

`println!` 宏来自 [std crate](https://doc.rust-lang.org/std/macro.println.html)。由于我们在项目中不使用 `std`，我们也不能使用 `println!`。让我们继续并将其从代码中移除。

现在代码应该像这样：

```rust
#![no_std]


fn main() {
    
}
```

通过这个修复，我们已经处理了两个错误并减少了错误列表。还有一个问题依然存在，我们将在下一节中修复它。


**参考资源：**
- [Rust 官方文档](https://doc.rust-lang.org/reference/names/preludes.html#the-no_std-attribute)
- [嵌入式 Rust 书籍](https://docs.rust-embedded.org/book/intro/no-std.html)
- [使用 Rust 编写操作系统](https://os.phil-opp.com/freestanding-rust-binary/#the-no-std-attribute)
