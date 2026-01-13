# 将 Rust 固件烧录到 Raspberry Pi Pico 2

在构建我们的程序后，我们将得到一个可以烧录的 ELF 二进制文件。

对于调试构建（`cargo build`），你可以在这里找到文件：

```sh
./target/thumbv8m.main-none-eabihf/debug/pico-from-scratch
```

对于发布构建（`cargo build --release`），你可以在这里找到它：

```sh
./target/thumbv8m.main-none-eabihf/release/pico-from-scratch
```

要将我们的程序加载到 Pico 上，我们将使用一个名为 [Picotool](https://github.com/raspberrypi/picotool) 的工具。这是烧录我们程序的命令：

```rust
picotool load -u -v -x -t elf ./target/thumbv8m.main-none-eabihf/debug/pico-from-scratch
```

以下是每个标志的作用：
- `-u` 用于更新模式（仅写入更改的内容）
- `-v` 用于验证所有内容是否正确写入
- `-x` 用于在加载后立即运行程序
- `-t elf` 告诉 `picotool` 我们正在使用 ELF 文件

## cargo run 命令

每次都输入那个长命令很令人厌烦。让我们通过更新 `.cargo/config.toml` 文件来简化它。我们可以将 Cargo 配置为在运行 `cargo run` 时自动使用 `picotool`：

```toml
[target.thumbv8m.main-none-eabihf]
runner = "picotool load -u -v -x -t elf"
```
现在，你只需要输入：

```sh
cargo run --release

#or

cargo run
```

你的程序就会被烧录并在 Pico 上执行。

但在此刻，它实际上还不能烧录。我们遗漏了一个重要的步骤。


