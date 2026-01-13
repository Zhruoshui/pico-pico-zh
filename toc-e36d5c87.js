// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="intro/preface.html"><strong aria-hidden="true">1.</strong> 写在一开始</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="index.html"><strong aria-hidden="true">2.</strong> 介绍</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="pico2-pinout.html"><strong aria-hidden="true">2.1.</strong> 引脚</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="additional-hardware.html"><strong aria-hidden="true">2.2.</strong> 额外的硬件</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="rusted_silicon.html"><strong aria-hidden="true">2.3.</strong> 锈入芯界</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="setup.html"><strong aria-hidden="true">2.4.</strong> 开发环境</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="quick-start.html"><strong aria-hidden="true">2.5.</strong> 快速开始</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="excellent-cargo.html"><strong aria-hidden="true">2.6.</strong> 优秀的cargo</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="abstraction-layers.html"><strong aria-hidden="true">2.7.</strong> 抽象层</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="cargo-generate.html"><strong aria-hidden="true">2.8.</strong> 项目模板</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="running.html"><strong aria-hidden="true">2.9.</strong> 跑起来</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="help.html"><strong aria-hidden="true">2.10.</strong> 帮助 &amp; 故障排除</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="debugging/pico-debug-probe.html"><strong aria-hidden="true">3.</strong> 调试器</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="debugging/rtt.html"><strong aria-hidden="true">3.1.</strong> RTT</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="led/external-led.html"><strong aria-hidden="true">4.</strong> 使用外部 LED</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="core-concepts/basics/breadboard.html"><strong aria-hidden="true">4.1.</strong> 面包板</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="led/embedded-rust-external-led-blinky.html"><strong aria-hidden="true">4.2.</strong> 代码</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="led/external-led-with-rp-hal.html"><strong aria-hidden="true">4.3.</strong> 使用 rp-hal</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="std-to-no-std/index.html"><strong aria-hidden="true">5.</strong> 从 std 到 no_std</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="std-to-no-std/cross-compilation/index.html"><strong aria-hidden="true">5.1.</strong> 交叉编译</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="std-to-no-std/cross-compilation/embedded.html"><strong aria-hidden="true">5.1.1.</strong> 针对微控制器</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="std-to-no-std/no-std.html"><strong aria-hidden="true">5.2.</strong> no_std</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="std-to-no-std/panic-handler.html"><strong aria-hidden="true">5.3.</strong> Panic 处理函数</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="std-to-no-std/no-main.html"><strong aria-hidden="true">5.4.</strong> no_main</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="std-to-no-std/embassy-rp.html"><strong aria-hidden="true">5.5.</strong> Pico 的 Embassy</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="std-to-no-std/blinking-pico-led-with-rust.html"><strong aria-hidden="true">5.6.</strong> 闪一闪 LED</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="std-to-no-std/flashing-rust-into-pico.html"><strong aria-hidden="true">5.7.</strong> 烧录</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="std-to-no-std/rust-linker-script.html"><strong aria-hidden="true">5.8.</strong> 链接脚本</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="core-concepts/pwm/index.html"><strong aria-hidden="true">6.</strong> PWM</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="core-concepts/pwm/basic-concepts.html"><strong aria-hidden="true">6.1.</strong> PWM 概念</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="core-concepts/pwm/pwm-in-depth.html"><strong aria-hidden="true">6.2.</strong> 深入理解 PWM</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="core-concepts/pwm/pwm-in-rp2350.html"><strong aria-hidden="true">6.3.</strong> RP2350 中的 PWM</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="led/pwm-dimming/index.html"><strong aria-hidden="true">7.</strong> 调节 LED 亮度</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="led/pwm-dimming/simulation.html"><strong aria-hidden="true">7.1.</strong> 仿真</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="led/pwm-dimming/embassy.html"><strong aria-hidden="true">7.2.</strong> 使用 Embassy</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="led/pwm-dimming/rp-hal.html"><strong aria-hidden="true">7.3.</strong> 使用 RP HAL</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="pico-in-vscode/create-rust-project.html"><strong aria-hidden="true">8.</strong> 在 VS Code 中使用 Pico</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="core-concepts/basics/button.html"><strong aria-hidden="true">9.</strong> 按钮</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="core-concepts/basics/pull-up-pull-down-resistors.html"><strong aria-hidden="true">9.1.</strong> 上拉与下拉</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="core-concepts/basics/pico-led-on-button-press.html"><strong aria-hidden="true">9.2.</strong> 按钮触发 LED</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="core-concepts/voltage-divider.html"><strong aria-hidden="true">10.</strong> 分压器</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="ultrasonic/index.html"><strong aria-hidden="true">11.</strong> 超声波</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="ultrasonic/how-it-works.html"><strong aria-hidden="true">11.1.</strong> 工作原理？</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="ultrasonic/hc-sr04-circuit.html"><strong aria-hidden="true">11.2.</strong> HC-SR04 电路</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="ultrasonic/circuit.html"><strong aria-hidden="true">11.3.</strong> HC-SR04+ 电路</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="ultrasonic/code.html"><strong aria-hidden="true">11.4.</strong> 使用 Embassy</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="ultrasonic/using-rp-hal.html"><strong aria-hidden="true">11.5.</strong> 使用 RP HAL</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="i2c/index.html"><strong aria-hidden="true">12.</strong> I2C</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="i2c/i2c-and-rust.html"><strong aria-hidden="true">12.1.</strong> 嵌入式 Rust 中的 I2C</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="i2c/rp2350-pico-i2c.html"><strong aria-hidden="true">12.2.</strong> RP2350 中的 I2C</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="oled/index.html"><strong aria-hidden="true">13.</strong> OLED 显示屏</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="oled/hello-oled.html"><strong aria-hidden="true">13.1.</strong> 你好，世界</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="oled/ferris.html"><strong aria-hidden="true">13.2.</strong> Ferris</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="servo/index.html"><strong aria-hidden="true">14.</strong> 舵机</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="servo/servo.html"><strong aria-hidden="true">14.1.</strong> 简介</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="servo/pwm.html"><strong aria-hidden="true">14.2.</strong> 更多 PWM 细节</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="servo/servo-pico.html"><strong aria-hidden="true">14.3.</strong> 舵机与 Pico</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="servo/action.html"><strong aria-hidden="true">14.4.</strong> 实操</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="core-concepts/watchdog.html"><strong aria-hidden="true">15.</strong> 看门狗</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="buzzer/intro.html"><strong aria-hidden="true">16.</strong> Buzzinga</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="buzzer/buzzer.html"><strong aria-hidden="true">16.1.</strong> 蜂鸣器简介</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="buzzer/beep.html"><strong aria-hidden="true">16.2.</strong> 嘟声</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="buzzer/got-buzzer.html"><strong aria-hidden="true">16.3.</strong> GOT 蜂鸣器？</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="buzzer/music-theory.html"><strong aria-hidden="true">16.3.1.</strong> 音符</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="buzzer/music-module.html"><strong aria-hidden="true">16.3.2.</strong> 音乐模块</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="buzzer/got-module.html"><strong aria-hidden="true">16.3.3.</strong> got 模块</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="buzzer/play.html"><strong aria-hidden="true">16.3.4.</strong> 播放</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="buzzer/active-beep.html"><strong aria-hidden="true">16.4.</strong> 有源蜂鸣</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="ldr/index.html"><strong aria-hidden="true">17.</strong> LDR 光敏电阻</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="ldr/ldr.html"><strong aria-hidden="true">17.1.</strong> 什么是 LDR</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="ldr/ldr-led/index.html"><strong aria-hidden="true">17.2.</strong> LDR 与 LED</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="ldr/ldr-led/action.html"><strong aria-hidden="true">17.2.1.</strong> 实操</a></span></li></ol></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="core-concepts/adc.html"><strong aria-hidden="true">18.</strong> ADC</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="thermistor/index.html"><strong aria-hidden="true">19.</strong> 热敏电阻</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="thermistor/voltage-divider.html"><strong aria-hidden="true">19.1.</strong> NTC 与分压器</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="thermistor/adc.html"><strong aria-hidden="true">19.2.</strong> ADC</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="thermistor/adc-maths.html"><strong aria-hidden="true">19.2.1.</strong> 数学</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="thermistor/non-linear.html"><strong aria-hidden="true">19.3.</strong> 非线性</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="thermistor/b-equation.html"><strong aria-hidden="true">19.3.1.</strong> B 方程</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="thermistor/steinhart.html"><strong aria-hidden="true">19.3.2.</strong> Steinhart 方程</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="thermistor/temperature/index.html"><strong aria-hidden="true">19.4.</strong> 在 OLED 上显示温度</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="thermistor/temperature/action.html"><strong aria-hidden="true">19.4.1.</strong> 实操</a></span></li></ol></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="usb-serial/index.html"><strong aria-hidden="true">20.</strong> USB 串口</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="usb-serial/action.html"><strong aria-hidden="true">20.1.</strong> 实操</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="rfid/index.html"><strong aria-hidden="true">21.</strong> RFID</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="rfid/rc522.html"><strong aria-hidden="true">21.1.</strong> 硬件</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="rfid/mifare.html"><strong aria-hidden="true">21.2.</strong> MIFARE</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="rfid/flow.html"><strong aria-hidden="true">21.3.</strong> 流程</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="rfid/circuit.html"><strong aria-hidden="true">21.4.</strong> 电路</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="rfid/read-uid.html"><strong aria-hidden="true">21.5.</strong> 读取 UID</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="rfid/uid-led.html"><strong aria-hidden="true">21.5.1.</strong> UID 匹配时点亮 LED</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="rfid/read-data.html"><strong aria-hidden="true">21.6.</strong> 读取数据</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="rfid/dump-memory.html"><strong aria-hidden="true">21.6.1.</strong> 转储存储区</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="rfid/write-data.html"><strong aria-hidden="true">21.7.</strong> 写入数据</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="rfid/change-auth-key.html"><strong aria-hidden="true">21.7.1.</strong> 更改认证密钥</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="rfid/access-bits.html"><strong aria-hidden="true">21.8.</strong> 访问控制</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="rfid/access-bits-calculator.html"><strong aria-hidden="true">21.8.1.</strong> AccessBits 计算</a></span></li></ol></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="sdcard/index.html"><strong aria-hidden="true">22.</strong> SD 卡（MMC/SDC）</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="sdcard/circuit.html"><strong aria-hidden="true">22.1.</strong> 电路</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="sdcard/read-sdcard.html"><strong aria-hidden="true">22.2.</strong> 读取 SD 卡</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="lcd-display/index.html"><strong aria-hidden="true">23.</strong> LCD 显示屏</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="lcd-display/how-it-works.html"><strong aria-hidden="true">23.1.</strong> 工作原理？</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="lcd-display/pin-layout.html"><strong aria-hidden="true">23.2.</strong> 引脚布局</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="lcd-display/circuit.html"><strong aria-hidden="true">23.3.</strong> 电路</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="lcd-display/hello-rust.html"><strong aria-hidden="true">23.4.</strong> 你好，Rust!</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="lcd-display/supported-characters.html"><strong aria-hidden="true">23.5.</strong> 支持的字符</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="lcd-display/custom-chars.html"><strong aria-hidden="true">23.6.</strong> 自定义字符</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="lcd-display/lcd-custom-char-generator.html"><strong aria-hidden="true">23.6.1.</strong> 生成器</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="lcd-display/display-custom-chars.html"><strong aria-hidden="true">23.6.2.</strong> 在 LCD 上显示</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="lcd-display/multi-custom-gen.html"><strong aria-hidden="true">23.6.3.</strong> 多字符生成器</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="lcd-display/multi-custom-character.html"><strong aria-hidden="true">23.6.4.</strong> 多个自定义字符</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="lcd-display/custom-symbols-index.html"><strong aria-hidden="true">23.6.5.</strong> 符号索引</a></span></li></ol></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="joystick/index.html"><strong aria-hidden="true">24.</strong> 摇杆</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="joystick/movement-and-12-bit-adc-value.html"><strong aria-hidden="true">24.1.</strong> 移动与 ADC</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="joystick/pin-layout.html"><strong aria-hidden="true">24.2.</strong> 引脚布局</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="joystick/circuit.html"><strong aria-hidden="true">24.3.</strong> 电路</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="joystick/adc-values-to-ubs-serial.html"><strong aria-hidden="true">24.4.</strong> 输出 ADC 数值</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="debugging/index.html"><strong aria-hidden="true">25.</strong> 调试</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="debugging/gdb/probe-rs-debug-probe.html"><strong aria-hidden="true">25.1.</strong> GDB</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="debugging/gdb/finding-main.html"><strong aria-hidden="true">25.1.1.</strong> 查找 main</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="debugging/gdb/analyze-led-loop.html"><strong aria-hidden="true">25.1.2.</strong> 断点</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="debugging/gdb/atomic-gpio-set.html"><strong aria-hidden="true">25.1.3.</strong> 原子寄存器</a></span></li></ol></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="projects.html"><strong aria-hidden="true">26.</strong> 精选项目列表</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="resources.html"><strong aria-hidden="true">27.</strong> 好用的资源列表</a></span></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split('#')[0].split('?')[0];
        if (current_page.endsWith('/')) {
            current_page += 'index.html';
        }
        const links = Array.prototype.slice.call(this.querySelectorAll('a'));
        const l = links.length;
        for (let i = 0; i < l; ++i) {
            const link = links[i];
            const href = link.getAttribute('href');
            if (href && !href.startsWith('#') && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The 'index' page is supposed to alias the first chapter in the book.
            if (link.href === current_page
                || i === 0
                && path_to_root === ''
                && current_page.endsWith('/index.html')) {
                link.classList.add('active');
                let parent = link.parentElement;
                while (parent) {
                    if (parent.tagName === 'LI' && parent.classList.contains('chapter-item')) {
                        parent.classList.add('expanded');
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', e => {
            if (e.target.tagName === 'A') {
                const clientRect = e.target.getBoundingClientRect();
                const sidebarRect = this.getBoundingClientRect();
                sessionStorage.setItem('sidebar-scroll-offset', clientRect.top - sidebarRect.top);
            }
        }, { passive: true });
        const sidebarScrollOffset = sessionStorage.getItem('sidebar-scroll-offset');
        sessionStorage.removeItem('sidebar-scroll-offset');
        if (sidebarScrollOffset !== null) {
            // preserve sidebar scroll position when navigating via links within sidebar
            const activeSection = this.querySelector('.active');
            if (activeSection) {
                const clientRect = activeSection.getBoundingClientRect();
                const sidebarRect = this.getBoundingClientRect();
                const currentOffset = clientRect.top - sidebarRect.top;
                this.scrollTop += currentOffset - parseFloat(sidebarScrollOffset);
            }
        } else {
            // scroll sidebar to current active section when navigating via
            // 'next/previous chapter' buttons
            const activeSection = document.querySelector('#mdbook-sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        const sidebarAnchorToggles = document.querySelectorAll('.chapter-fold-toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(el => {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define('mdbook-sidebar-scrollbox', MDBookSidebarScrollbox);


// ---------------------------------------------------------------------------
// Support for dynamically adding headers to the sidebar.

(function() {
    // This is used to detect which direction the page has scrolled since the
    // last scroll event.
    let lastKnownScrollPosition = 0;
    // This is the threshold in px from the top of the screen where it will
    // consider a header the "current" header when scrolling down.
    const defaultDownThreshold = 150;
    // Same as defaultDownThreshold, except when scrolling up.
    const defaultUpThreshold = 300;
    // The threshold is a virtual horizontal line on the screen where it
    // considers the "current" header to be above the line. The threshold is
    // modified dynamically to handle headers that are near the bottom of the
    // screen, and to slightly offset the behavior when scrolling up vs down.
    let threshold = defaultDownThreshold;
    // This is used to disable updates while scrolling. This is needed when
    // clicking the header in the sidebar, which triggers a scroll event. It
    // is somewhat finicky to detect when the scroll has finished, so this
    // uses a relatively dumb system of disabling scroll updates for a short
    // time after the click.
    let disableScroll = false;
    // Array of header elements on the page.
    let headers;
    // Array of li elements that are initially collapsed headers in the sidebar.
    // I'm not sure why eslint seems to have a false positive here.
    // eslint-disable-next-line prefer-const
    let headerToggles = [];
    // This is a debugging tool for the threshold which you can enable in the console.
    let thresholdDebug = false;

    // Updates the threshold based on the scroll position.
    function updateThreshold() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // The number of pixels below the viewport, at most documentHeight.
        // This is used to push the threshold down to the bottom of the page
        // as the user scrolls towards the bottom.
        const pixelsBelow = Math.max(0, documentHeight - (scrollTop + windowHeight));
        // The number of pixels above the viewport, at least defaultDownThreshold.
        // Similar to pixelsBelow, this is used to push the threshold back towards
        // the top when reaching the top of the page.
        const pixelsAbove = Math.max(0, defaultDownThreshold - scrollTop);
        // How much the threshold should be offset once it gets close to the
        // bottom of the page.
        const bottomAdd = Math.max(0, windowHeight - pixelsBelow - defaultDownThreshold);
        let adjustedBottomAdd = bottomAdd;

        // Adjusts bottomAdd for a small document. The calculation above
        // assumes the document is at least twice the windowheight in size. If
        // it is less than that, then bottomAdd needs to be shrunk
        // proportional to the difference in size.
        if (documentHeight < windowHeight * 2) {
            const maxPixelsBelow = documentHeight - windowHeight;
            const t = 1 - pixelsBelow / Math.max(1, maxPixelsBelow);
            const clamp = Math.max(0, Math.min(1, t));
            adjustedBottomAdd *= clamp;
        }

        let scrollingDown = true;
        if (scrollTop < lastKnownScrollPosition) {
            scrollingDown = false;
        }

        if (scrollingDown) {
            // When scrolling down, move the threshold up towards the default
            // downwards threshold position. If near the bottom of the page,
            // adjustedBottomAdd will offset the threshold towards the bottom
            // of the page.
            const amountScrolledDown = scrollTop - lastKnownScrollPosition;
            const adjustedDefault = defaultDownThreshold + adjustedBottomAdd;
            threshold = Math.max(adjustedDefault, threshold - amountScrolledDown);
        } else {
            // When scrolling up, move the threshold down towards the default
            // upwards threshold position. If near the bottom of the page,
            // quickly transition the threshold back up where it normally
            // belongs.
            const amountScrolledUp = lastKnownScrollPosition - scrollTop;
            const adjustedDefault = defaultUpThreshold - pixelsAbove
                + Math.max(0, adjustedBottomAdd - defaultDownThreshold);
            threshold = Math.min(adjustedDefault, threshold + amountScrolledUp);
        }

        if (documentHeight <= windowHeight) {
            threshold = 0;
        }

        if (thresholdDebug) {
            const id = 'mdbook-threshold-debug-data';
            let data = document.getElementById(id);
            if (data === null) {
                data = document.createElement('div');
                data.id = id;
                data.style.cssText = `
                    position: fixed;
                    top: 50px;
                    right: 10px;
                    background-color: 0xeeeeee;
                    z-index: 9999;
                    pointer-events: none;
                `;
                document.body.appendChild(data);
            }
            data.innerHTML = `
                <table>
                  <tr><td>documentHeight</td><td>${documentHeight.toFixed(1)}</td></tr>
                  <tr><td>windowHeight</td><td>${windowHeight.toFixed(1)}</td></tr>
                  <tr><td>scrollTop</td><td>${scrollTop.toFixed(1)}</td></tr>
                  <tr><td>pixelsAbove</td><td>${pixelsAbove.toFixed(1)}</td></tr>
                  <tr><td>pixelsBelow</td><td>${pixelsBelow.toFixed(1)}</td></tr>
                  <tr><td>bottomAdd</td><td>${bottomAdd.toFixed(1)}</td></tr>
                  <tr><td>adjustedBottomAdd</td><td>${adjustedBottomAdd.toFixed(1)}</td></tr>
                  <tr><td>scrollingDown</td><td>${scrollingDown}</td></tr>
                  <tr><td>threshold</td><td>${threshold.toFixed(1)}</td></tr>
                </table>
            `;
            drawDebugLine();
        }

        lastKnownScrollPosition = scrollTop;
    }

    function drawDebugLine() {
        if (!document.body) {
            return;
        }
        const id = 'mdbook-threshold-debug-line';
        const existingLine = document.getElementById(id);
        if (existingLine) {
            existingLine.remove();
        }
        const line = document.createElement('div');
        line.id = id;
        line.style.cssText = `
            position: fixed;
            top: ${threshold}px;
            left: 0;
            width: 100vw;
            height: 2px;
            background-color: red;
            z-index: 9999;
            pointer-events: none;
        `;
        document.body.appendChild(line);
    }

    function mdbookEnableThresholdDebug() {
        thresholdDebug = true;
        updateThreshold();
        drawDebugLine();
    }

    window.mdbookEnableThresholdDebug = mdbookEnableThresholdDebug;

    // Updates which headers in the sidebar should be expanded. If the current
    // header is inside a collapsed group, then it, and all its parents should
    // be expanded.
    function updateHeaderExpanded(currentA) {
        // Add expanded to all header-item li ancestors.
        let current = currentA.parentElement;
        while (current) {
            if (current.tagName === 'LI' && current.classList.contains('header-item')) {
                current.classList.add('expanded');
            }
            current = current.parentElement;
        }
    }

    // Updates which header is marked as the "current" header in the sidebar.
    // This is done with a virtual Y threshold, where headers at or below
    // that line will be considered the current one.
    function updateCurrentHeader() {
        if (!headers || !headers.length) {
            return;
        }

        // Reset the classes, which will be rebuilt below.
        const els = document.getElementsByClassName('current-header');
        for (const el of els) {
            el.classList.remove('current-header');
        }
        for (const toggle of headerToggles) {
            toggle.classList.remove('expanded');
        }

        // Find the last header that is above the threshold.
        let lastHeader = null;
        for (const header of headers) {
            const rect = header.getBoundingClientRect();
            if (rect.top <= threshold) {
                lastHeader = header;
            } else {
                break;
            }
        }
        if (lastHeader === null) {
            lastHeader = headers[0];
            const rect = lastHeader.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            if (rect.top >= windowHeight) {
                return;
            }
        }

        // Get the anchor in the summary.
        const href = '#' + lastHeader.id;
        const a = [...document.querySelectorAll('.header-in-summary')]
            .find(element => element.getAttribute('href') === href);
        if (!a) {
            return;
        }

        a.classList.add('current-header');

        updateHeaderExpanded(a);
    }

    // Updates which header is "current" based on the threshold line.
    function reloadCurrentHeader() {
        if (disableScroll) {
            return;
        }
        updateThreshold();
        updateCurrentHeader();
    }


    // When clicking on a header in the sidebar, this adjusts the threshold so
    // that it is located next to the header. This is so that header becomes
    // "current".
    function headerThresholdClick(event) {
        // See disableScroll description why this is done.
        disableScroll = true;
        setTimeout(() => {
            disableScroll = false;
        }, 100);
        // requestAnimationFrame is used to delay the update of the "current"
        // header until after the scroll is done, and the header is in the new
        // position.
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                // Closest is needed because if it has child elements like <code>.
                const a = event.target.closest('a');
                const href = a.getAttribute('href');
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    threshold = targetElement.getBoundingClientRect().bottom;
                    updateCurrentHeader();
                }
            });
        });
    }

    // Takes the nodes from the given head and copies them over to the
    // destination, along with some filtering.
    function filterHeader(source, dest) {
        const clone = source.cloneNode(true);
        clone.querySelectorAll('mark').forEach(mark => {
            mark.replaceWith(...mark.childNodes);
        });
        dest.append(...clone.childNodes);
    }

    // Scans page for headers and adds them to the sidebar.
    document.addEventListener('DOMContentLoaded', function() {
        const activeSection = document.querySelector('#mdbook-sidebar .active');
        if (activeSection === null) {
            return;
        }

        const main = document.getElementsByTagName('main')[0];
        headers = Array.from(main.querySelectorAll('h2, h3, h4, h5, h6'))
            .filter(h => h.id !== '' && h.children.length && h.children[0].tagName === 'A');

        if (headers.length === 0) {
            return;
        }

        // Build a tree of headers in the sidebar.

        const stack = [];

        const firstLevel = parseInt(headers[0].tagName.charAt(1));
        for (let i = 1; i < firstLevel; i++) {
            const ol = document.createElement('ol');
            ol.classList.add('section');
            if (stack.length > 0) {
                stack[stack.length - 1].ol.appendChild(ol);
            }
            stack.push({level: i + 1, ol: ol});
        }

        // The level where it will start folding deeply nested headers.
        const foldLevel = 3;

        for (let i = 0; i < headers.length; i++) {
            const header = headers[i];
            const level = parseInt(header.tagName.charAt(1));

            const currentLevel = stack[stack.length - 1].level;
            if (level > currentLevel) {
                // Begin nesting to this level.
                for (let nextLevel = currentLevel + 1; nextLevel <= level; nextLevel++) {
                    const ol = document.createElement('ol');
                    ol.classList.add('section');
                    const last = stack[stack.length - 1];
                    const lastChild = last.ol.lastChild;
                    // Handle the case where jumping more than one nesting
                    // level, which doesn't have a list item to place this new
                    // list inside of.
                    if (lastChild) {
                        lastChild.appendChild(ol);
                    } else {
                        last.ol.appendChild(ol);
                    }
                    stack.push({level: nextLevel, ol: ol});
                }
            } else if (level < currentLevel) {
                while (stack.length > 1 && stack[stack.length - 1].level > level) {
                    stack.pop();
                }
            }

            const li = document.createElement('li');
            li.classList.add('header-item');
            li.classList.add('expanded');
            if (level < foldLevel) {
                li.classList.add('expanded');
            }
            const span = document.createElement('span');
            span.classList.add('chapter-link-wrapper');
            const a = document.createElement('a');
            span.appendChild(a);
            a.href = '#' + header.id;
            a.classList.add('header-in-summary');
            filterHeader(header.children[0], a);
            a.addEventListener('click', headerThresholdClick);
            const nextHeader = headers[i + 1];
            if (nextHeader !== undefined) {
                const nextLevel = parseInt(nextHeader.tagName.charAt(1));
                if (nextLevel > level && level >= foldLevel) {
                    const toggle = document.createElement('a');
                    toggle.classList.add('chapter-fold-toggle');
                    toggle.classList.add('header-toggle');
                    toggle.addEventListener('click', () => {
                        li.classList.toggle('expanded');
                    });
                    const toggleDiv = document.createElement('div');
                    toggleDiv.textContent = '❱';
                    toggle.appendChild(toggleDiv);
                    span.appendChild(toggle);
                    headerToggles.push(li);
                }
            }
            li.appendChild(span);

            const currentParent = stack[stack.length - 1];
            currentParent.ol.appendChild(li);
        }

        const onThisPage = document.createElement('div');
        onThisPage.classList.add('on-this-page');
        onThisPage.append(stack[0].ol);
        const activeItemSpan = activeSection.parentElement;
        activeItemSpan.after(onThisPage);
    });

    document.addEventListener('DOMContentLoaded', reloadCurrentHeader);
    document.addEventListener('scroll', reloadCurrentHeader, { passive: true });
})();

