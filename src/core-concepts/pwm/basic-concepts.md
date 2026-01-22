
# 脉宽调制（PWM）

<style>
  
  .slider-container {
    margin: 20px 0;
  }

  label {
    margin-right: 10px;
  }

  .led-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    position: relative;
  }

  .led-body {
    width: 30px;
    height: 40px;
    background: radial-gradient(circle at center, #ff5555, #cc0000);
    border-radius: 50% 50% 0 0;
    border: 2px solid #990000;
    position: relative;
    box-shadow: 0 0 10px rgba(255, 85, 85, 0.8);
  }

  .led-body::after {
    content: '';
    position: absolute;
    top: 5px;
    left: 7px;
    width: 16px;
    height: 16px;
    background: rgba(255, 255, 255, 0.4);
    border-radius: 50%;
  }

  .led-pin {
    width: 2px;
    height: 40px;
    background-color: #333;
    position: relative;
  }

  .anode {
    height: 50px; /* Longer pin for the anode */
    margin-right: 15px;
    background-color: #666;
  }

  .cathode {
    height: 40px; /* Shorter pin for the cathode */
    margin-left: 15px;
    background-color: #333;
    position: absolute;
    margin-top: 45px;
  }

  canvas {
    border: 1px solid #ccc;
    display: block;
    margin: 10px auto;
  }
  #pwmCanvas {
    background-color: #fefefe;
  } 
</style>

PWM 代表脉宽调制（Pulse Width Modulation）。它是一种使用在 HIGH 和 LOW 之间快速切换的数字信号来模拟模拟输出的技术。

PWM 不像真正的模拟信号那样提供稳定的电压（如 1.5V），而是在全电压和 0V 之间快速切换。通过控制信号保持在 HIGH 和 LOW 的时间长短，你可以控制输送到设备的平均功率或电压。

### PWM 如何工作

PWM 的工作原理是以固定的频率发送在 HIGH 和 LOW 之间切换的方波信号。关键参数是“占空比”，即在一个完整周期内信号处于 HIGH 状态的时间百分比。

<img style="display: block; margin: auto;" alt="LED PWM" src="../images/led-pwm.jpg" />

例如：
- 0% 占空比意味着信号始终为 LOW（平均 0V）。
- 50% 占空比意味着信号在 HIGH 和 LOW 的时间相等（3.3V 系统中平均 1.65V）。
- 75% 占空比意味着信号有 75% 的时间为 HIGH，25% 的时间为 LOW。
- 100% 占空比意味着信号始终为 HIGH（3.3V）。

这种切换发生得极快，通常每秒数百或数千次。速度如此之快，以至于 LED 和电机等设备响应的是平均电压，而不是单个脉冲。

## 示例用法：LED 调光

LED 闪烁得如此之快，以至于你的眼睛看不到单独的“开”和“关”脉冲，因此你只感知到平均亮度。较低的占空比使其看起来较暗，较高的占空比使其看起来较亮，即使 LED 始终在全电压和零电压之间切换。

## 示例用法：控制伺服电机

伺服电机读取脉冲的宽度来决定其角度。它每20毫秒接收一个脉冲，脉冲宽度分别为：0°时约1毫秒，90°时1.5毫秒，180°时2毫秒——这些脉冲宽度决定了伺服电机的移动方向。


## 周期和频率

在 PWM 中，周期和频率协同工作以决定信号在 HIGH 和 LOW 状态之间切换的速度，这直接影响控制的平滑度和有效性。

周期是一个“开-关”循环完成所需的总时间。

<img style="display: block; margin: auto;" alt="Period and Frequency" src="./images/pwm-period-frequency.svg"/>

频率是一秒钟内完成的循环次数，以赫兹（Hz）为单位测量。频率是周期的倒数。因此，频率越高，周期越短，从而导致 HIGH 和 LOW 状态之间的切换越快。

\\[
\text{Frequency (Hz)} = \\frac{1}{\text{Period (s)}}
\\]

因此，如果周期为 1 秒，则频率将为 1Hz。

\\[
1 \text{Hz} = \\frac{1 \text{ cycle}}{1 \text{ second}} = \\frac{1}{1 \text{ s}}
\\]

例如，如果周期为 20ms（0.02s），频率将为 50Hz。

\\[
\text{Frequency} = \\frac{1}{20 \text{ ms}} = \\frac{1}{0.02 \text{ s}} = 50 \text{ Hz}
\\]


**根据每秒频率计算循环计数**

计算循环计数的公式：
\\[
\text{Cycle Count} = \text{Frequency (Hz)} \\times \text{Total Time (seconds)}
\\]

如果 PWM 信号的频率为 50Hz，这意味着它在一秒钟内完成 50 个循环。


## 仿真

这是一个交互式仿真。使用滑块调整占空比和频率，并观察脉冲宽度和 LED 亮度如何变化。方波的上半部分代表信号为高电平（开）时。下半部分代表信号为低电平（关）时。高电平部分的宽度随占空比而变化。

<canvas id="pwmCanvas" width="800" height="200"></canvas>
<div class="led-container">
  <div class="led-body" id="ledBody"></div>
  <div class="led-pin anode"></div>
  <div class="led-pin cathode"></div>
</div>

<div class="slider-container">
  <label for="dutyCycle">Duty Cycle (%): </label>
  <input type="range" id="dutyCycle" min="0" max="100" value="50">
  <span id="dutyCycleValue">50</span>%
</div>
<div class="slider-container">
  <label for="frequency">Frequency (Hz): </label>
  <input type="range" id="frequency" min="1" max="50" value="10">
  <!-- <span id="frequencyValue">x</span> Hz -->
</div>

如果你在仿真中把占空比从“低调到高”再从“高调到低”，你应该会注意到 LED 呈现出一种调光效果。


<script>
  const pwmCanvas = document.getElementById('pwmCanvas');
  const pwmCtx = pwmCanvas.getContext('2d');
  
  const dutyCycleSlider = document.getElementById('dutyCycle');
  const dutyCycleValue = document.getElementById('dutyCycleValue');
  const frequencySlider = document.getElementById('frequency');
  const frequencyValue = document.getElementById('frequencyValue');
  const ledBody = document.getElementById('ledBody');

  let dutyCycle = 50; // Initial duty cycle in percentage
  let frequency = 10; // Initial frequency in Hz

  function drawPWM() {
    pwmCtx.clearRect(0, 0, pwmCanvas.width, pwmCanvas.height);

    const period = 1000 / frequency; // Period in ms
    const onTime = period * (dutyCycle / 100); // On time in ms
    const offTime = period - onTime; // Off time in ms

    const totalWidth = pwmCanvas.width;
    const cycles = frequency; // Number of cycles to display
    const cycleWidth = totalWidth / cycles;

    pwmCtx.strokeStyle = 'black';
    pwmCtx.lineWidth = 2;
    pwmCtx.beginPath();

    let x = 0;

    if (dutyCycle === 100) {
      pwmCtx.moveTo(0, 50);
      pwmCtx.lineTo(pwmCanvas.width, 50);
    } else if (dutyCycle === 0) {
      pwmCtx.moveTo(0, 150);
      pwmCtx.lineTo(pwmCanvas.width, 150);
    } else {
      for (let i = 0; i < cycles; i++) {
        const highWidth = (onTime / period) * cycleWidth;
        const lowWidth = (offTime / period) * cycleWidth;

        pwmCtx.moveTo(x, 50);
        pwmCtx.lineTo(x + highWidth, 50);
        pwmCtx.lineTo(x + highWidth, 150);
        pwmCtx.lineTo(x + highWidth + lowWidth, 150);
        pwmCtx.lineTo(x + highWidth + lowWidth, 50);

        x += cycleWidth;
      }
    }
    pwmCtx.stroke();
  }

  function updateLED() {
    const brightness = dutyCycle / 100;
    
    ledBody.style.background = `radial-gradient(circle at center, rgba(255, 85, 85, ${brightness}), #cc0000)`;
  }

  function update() {
    dutyCycle = parseInt(dutyCycleSlider.value, 10);
    frequency = parseInt(frequencySlider.value, 10);

    dutyCycleValue.textContent = dutyCycle;
    // frequencyValue.textContent = frequency;

    drawPWM();
    updateLED();
  }

  dutyCycleSlider.addEventListener('input', update);
  frequencySlider.addEventListener('input', update);

  // Initial draw
  drawPWM();
  updateLED();
</script>
