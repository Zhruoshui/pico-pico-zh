# 抽象层

在嵌入式 Rust 开发中，你经常会遇到 PAC、HAL 和 BSP 这样的术语。它们是与硬件交互的不同抽象层，每一层在灵活性与易用性之间做出不同的权衡。

下面从高到低介绍这些抽象层。
 
<a href ="./images/abstraction-layers.png"><img alt="abstraction layers" style="display: block; margin: auto;" src="./images/abstraction-layers.png"/></a>
 

## 板级支持包（BSP）

BSP（在 Rust 中通常称为 Board Support Crate）是针对特定开发板的封装。它将 HAL 与板级配置结合，提供对板载组件（如 LED、按键、传感器）即插即用的接口，使开发者能更多关注应用逻辑而非底层细节。由于目前没有广泛使用的专门针对 Raspberry Pi Pico 2 的 BSP，本书不会采用该方式。

---

## 硬件抽象层（HAL）

HAL 位于 BSP 之下。如果你使用 Raspberry Pi Pico 或基于 ESP32 的板子，大多数场景会直接使用 HAL 层。HAL 通常以芯片为目标（例如 RP2350 或 ESP32），因此同一个 HAL 可以在多个使用相同微控制器的开发板间复用。针对 Raspberry Pi 家族微控制器，有社区维护的 `rp-hal` 仓库可供使用（https://github.com/rp-rs/rp-hal）。

HAL 构建在 PAC 之上，提供更简单的高层接口来操作外设。与直接操控寄存器不同，HAL 提供的方法与 trait 能更方便地完成定时器配置、串口初始化或 GPIO 控制等任务。

微控制器的 HAL 通常实现 `embedded-hal` trait，这是一套平台无关的外设接口（如 GPIO、SPI、I2C、UART），有助于编写可跨平台复用的驱动与库。

### 对于 Raspberry Pi：Embassy

Embassy 在抽象层次上与 HAL 同级，但它提供了一个带异步能力的运行时环境。Embassy（在本书中特指 `embassy-rp`）基于 HAL 层构建，提供异步执行器、定时器等抽象，简化编写并发嵌入式程序的复杂度。

针对 Raspberry Pi 微控制器（RP2040 / RP235x），有专门的 `embassy-rp` crate，构建于 `rp-pac`（Raspberry Pi Peripheral Access Crate）之上。

在本书中，我们会根据练习需要同时使用 `rp-hal` 与 `embassy-rp`。
 
---
> 注意：
> 
> HAL 之下的层通常不会被直接使用。大多数情况下通过 HAL 访问 PAC 即可。除非你所使用的芯片没有可用的 HAL，否则一般无需直接与低层交互。本书重点关注 HAL 层的使用。


## 外设访问包（PAC）

PAC 是最低级别的抽象，通常由厂商的 SVD（System View Description）文件生成，提供类型安全的寄存器访问接口。PAC 为直接操作硬件寄存器提供了结构化且更安全的方式（通常通过 `svd2rust` 工具生成）。

## 原始 MMIO

原始 MMIO（memory-mapped IO）指直接按地址读写硬件寄存器。这种方式类似传统 C 语言的寄存器操作，因其潜在风险在 Rust 中需要使用 `unsafe` 块。我们不会涉及这部分内容；在社区中这种做法并不常见。
