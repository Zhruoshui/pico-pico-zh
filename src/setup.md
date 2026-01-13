# 环境配置

## 安装 Rust
本书示例基于 Rust 工具链开发，推荐使用官方的 rustup 安装器完成配置。

- **Windows**：访问 <https://win.rustup.rs/> 下载并运行 `rustup-init.exe`，按提示选择默认安装。
  如提示缺少构建工具，可先安装 [Visual Studio Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/)。
- **Linux**：使用官方脚本安装：
  ```bash
  curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
  ```
- **macOS**：可以同样使用官方脚本，或先通过 Homebrew 安装基础依赖后再运行 rustup：
  ```bash
  /bin/bash -c "$(curl -fsSL https://sh.rustup.rs)"
  ```

安装完成后，重启终端并确认版本：
```bash
rustc --version
cargo --version
```
如果之前安装过旧版本，可执行 `rustup update` 升级。

之后，你还可以使用 `rustup` 命令来安装 Rust 和 Cargo 的测试版`（beta）`或 `nightly` 版本。

## Picotool
`picotool` 是一个用于操作 RP2040/RP2350 二进制文件的工具，在设备进入 BOOTSEL 模式时可与其交互。

[Picotool 仓库](https://github.com/raspberrypi/picotool)

<div class="alert-box alert-box-info">
    <span class="icon"><i class="fa-solid fa-info"></i></span>
    <div class="alert-content">
        <b class="alert-title">预编译二进制</b>
        <p>你也可以直接从 <a href="https://github.com/raspberrypi/pico-sdk-tools">这里</a> 下载 SDK 工具的预编译版本，这通常比按步骤构建更为简单。</p>
    </div>
</div>


下面是我采用的快速安装步骤摘要：
```sh
# 安装依赖
sudo apt install build-essential pkg-config libusb-1.0-0-dev cmake

mkdir embedded && cd embedded

# 克隆 Pico SDK
git clone https://github.com/raspberrypi/pico-sdk
cd pico-sdk
git submodule update --init lib/mbedtls
cd ../

# 设置 Pico SDK 的环境变量
PICO_SDK_PATH=/MY_PATH/embedded/pico-sdk

# 克隆 Picotool 仓库
git clone https://github.com/raspberrypi/picotool
```

编译并安装 Picotool：
```sh
cd picotool
mkdir build && cd build
# cmake ../
cmake -DPICO_SDK_PATH=/MY_PATH/embedded/pico-sdk/ ../
make -j8
sudo make install
```

在 Linux 上，你可以添加 udev 规则以便无需 sudo 即可运行 picotool：
```sh
cd ../
# 在 picotool 克隆目录下
sudo cp udev/60-picotool.rules /etc/udev/rules.d/
```


## Rust 目标三元组
要为 RP2350 芯片构建并部署 Rust 代码，需要添加相应的目标：

```sh
rustup target add thumbv8m.main-none-eabihf
rustup target add riscv32imac-unknown-none-elf
```

## probe-rs —— 烧录与调试工具

`probe-rs` 是一套现代的、原生 Rust 的嵌入式烧录与调试工具链，它同时支持 ARM 与 RISC-V 平台，并可以直接与硬件调试器配合使用。对于使用 Debug Probe 的 Pico 2，`probe-rs` 是进行烧录和调试的常用工具。

使用官方安装脚本安装 probe-rs：

```bash
curl -LsSf https://github.com/probe-rs/probe-rs/releases/latest/download/probe-rs-tools-installer.sh | sh
```

有关最新安装说明，请参考 [probe-rs 官方文档](https://probe.rs/)。

默认情况下，Linux 上的调试器只能由 root 访问。为了避免每次都使用 sudo，建议安装相应的 udev 规则，使普通用户也能访问调试器。请按照[此处](https://probe.rs/docs/getting-started/probe-setup/)的步骤进行配置。

**快速摘要：**
1. 从 probe-rs 仓库下载 udev 规则文件（[69-probe-rs.rules](https://probe.rs/files/69-probe-rs.rules)）
2. 将其复制到 `/etc/udev/rules.d/`
3. 使用 `sudo udevadm control --reload` 重新加载规则
4. 拔掉并重新插入 Debug Probe

完成上述配置后，你就可以在无需 root 权限的情况下使用 `probe-rs` 了。
