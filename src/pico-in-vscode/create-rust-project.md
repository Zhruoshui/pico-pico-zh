# 在 VS Code 中为 Raspberry Pi Pico 创建 Rust 项目（使用扩展）

我们已经手动以及通过模板为 Pico 创建了 Rust 项目。现在我们将尝试另一种方法：使用 VS Code 的 Raspberry Pi Pico 扩展。

## 使用 Pico 扩展

在 Visual Studio Code 中，搜索扩展 "Raspberry Pi Pico" 并确保你安装的是官方版本；它应该有一个带有官方 Raspberry Pi 网站的已验证发布者徽章。安装该扩展。

<div class="image-with-caption" style="text-align:center; display:inline-block;">
    <img src="./images/Raspberry Pi Pico Vscode extension.png" alt="Raspberry Pi Pico 的 VSCode 扩展" style="max-width:100%; height:auto; display:block; margin:0 auto;"/>
    <div class="caption" style="font-size:0.9em; color:#555; margin-top:6px;">Raspberry Pi Pico 的 VSCode 扩展</div>
</div>

仅仅安装扩展可能还不够，这取决于你机器上已经安装了什么。在 Linux 上，你可能需要一些基本的依赖项：

```sh
sudo apt install build-essential libudev-dev
```

## 创建项目

让我们在 VS Code 中使用 Pico 扩展创建 Rust 项目。打开左侧的活动栏并点击 Pico 图标。然后选择 “New Rust Project”。

<div class="image-with-caption" style="text-align:center; display:inline-block;">
    <img src="./images/Create Project Raspberry Pi Pico Vscode extension.png" alt="创建 Raspberry Pi Pico VSCode 扩展项目" style="max-width:100%; height:auto; display:block; margin:0 auto;"/>
    <div class="caption" style="font-size:0.9em; color:#555; margin-top:6px;">创建项目</div>
</div>

由于这是第一次设置，扩展将下载并安装必要的工具，包括 Pico SDK、picotool、OpenOCD 以及用于调试的 ARM 和 RISC-V 工具链。

## 项目结构

如果项目创建成功，你应该会看到如下所示的文件夹和文件：

<div class="image-with-caption" style="text-align:center; display:inline-block;">
    <img src="./images/Raspberry Pi Pico Rust Project Created With VS Code Extension.png" alt="使用 VS Code 扩展创建的 Raspberry Pi Pico Rust 项目" style="max-width:100%; height:auto; display:block; margin:0 auto;"/>
    <div class="caption" style="font-size:0.9em; color:#555; margin-top:6px;">项目文件夹</div>
</div>

## 运行程序

现在你可以简单地点击 "Run Project (USB)" 将程序烧录到你的 Pico 上并运行它。别忘了在将 Pico 连接到计算机时按下 BOOTSEL 按钮。否则，此选项将处于禁用状态。

<div class="image-with-caption" style="text-align:center; display:inline-block;">
    <img src="./images/Running Rust Project with Vscode for Raspberry Pi Pico 2 (RP2350).png" alt="使用 VSCode 为 Raspberry Pi Pico 2 (RP2350) 运行 Rust 项目" style="max-width:100%; height:auto; display:block; margin:0 auto;"/>
    <div class="caption" style="font-size:0.9em; color:#555; margin-top:6px;">将 Rust 固件烧录到 Raspberry Pi Pico</div>
</div>

烧录完成后，程序将立即在你的 Pico 上开始运行。你应该会看到板载 LED 灯闪烁。
