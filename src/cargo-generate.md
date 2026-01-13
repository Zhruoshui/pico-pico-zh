# 项目模板 - 使用 `cargo-generate`

`cargo-generate` 是一个便捷工具，能通过使用已有的 Git 仓库作为模板，快速创建新的 Rust 项目。

更多信息请参见：https://github.com/cargo-generate/cargo-generate
 
## 前置要求

开始之前，请确保已安装以下工具：

- [Rust](https://www.rust-lang.org/tools/install)
- [cargo-generate](https://github.com/cargo-generate/cargo-generate)（用于生成项目模板）

先安装 OpenSSL 开发包，因为 `cargo-generate` 依赖它：
```sh
sudo apt install libssl-dev
```

你可以通过下面的命令安装 `cargo-generate`：

```sh
cargo install cargo-generate
```

## 第 1 步：生成项目
运行下面命令，从模板生成项目：

```sh
cargo generate --git https://github.com/ImplFerris/pico2-template.git
```

执行后会提示你回答几个问题：
- Project name：为项目命名。
- HAL choice：可在 `embassy` 或 `rp-hal` 之间选择。

## 第 2 步：默认的 LED 闪烁示例
默认生成的项目中包含一个简单的 LED 闪烁示例。项目结构可能类似：

`src/main.rs`：包含默认的闪烁逻辑。

`Cargo.toml`：包含为所选 HAL 添加的依赖项。

## 第 3 步：选择 HAL 并修改代码
项目生成后，你可以保留默认的 LED 示例，也可以将其删除并根据所选 HAL 替换为自己的代码。

## 移除不需要的代码
可以从 `src/main.rs` 中删掉示例的闪烁逻辑，并按需替换。根据项目需要修改 `Cargo.toml` 的依赖与项目结构。

