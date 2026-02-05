# 深入理解脉宽调制（PWM）

<style> 
canvas {
    border: 1px solid #000;
    margin-top: 20px;
}
.controls {
    margin: 20px;
}
.control {
    margin: 10px 0;
}
#pwmCanvas {
    background-color: #fefefe;
}
#timerCanvas {
    background-color: #fefefe;
}
#simulation-div{
        background-color: #fefefe;
            text-align: center;

}   
</style>

## 定时器工作原理

定时器（Timer）在 PWM 生成中起关键作用。它从零计数到指定的最大值（保存在寄存器中），然后复位并重新开始一个循环。这个计数过程决定了一个完整循环的持续时间，称为周期（Period）。

## 比较值（Compare Value）

定时器硬件会持续将当前计数与一个比较值（保存在寄存器中）进行比较。当计数小于比较值时，PWM 信号保持高电平；当计数超过比较值时，信号变为低电平。通过改变这个比较值，你可以直接控制占空比（Duty Cycle）。


## PWM 分辨率（Resolution）

分辨率指的是占空比可控制的精细程度。这由定时器在一个完整周期内计数的取值范围决定。

定时器根据分辨率从 0 计数到一个最大值。分辨率越高，占空比的调整就越精细。

对于具有 **n** 位分辨率的系统，定时器从 0 计数到 \(2^n - 1\)，这为占空比提供了 \(2^n\) 个可能的等级。

例如：
- 8 位分辨率允许定时器从 0 计数到 255，提供 256 个可能的占空比等级。
- 10 位分辨率允许定时器从 0 计数到 1023，提供 1024 个可能的占空比等级。

更高的分辨率能提供对占空比更精确的控制，但要求在同一周期内定时器需要计数更多的值。这形成了一种权衡：若要在更高分辨率下保持相同频率（Frequency），你需要更快的定时器时钟，或者接受更低的频率。

## 仿真（Simulation）

你可以在此仿真中修改 PWM 分辨率位与占空比。调整 PWM 分辨率位会增加最大计数，但仍然受限于时间周期（不会影响占空比）。改变占空比会相应调整高低电平的持续时间，同样保持在该周期内。
 
  <div class="controls">
    <div class="control">
      <label for="resolution">PWM 分辨率（位）：</label>
      <input type="range" id="resolution" min="4" max="20" value="8">
      <input type="number" id="resolutionNumber" min="4" max="20" value="8">
    </div>
    <div class="control">
      <label for="dutyCycle">占空比（%）：</label>
      <input type="range" id="dutyCycle" min="0" max="100" value="75">
      <input type="number" id="dutyCycleNumber" min="0" max="100" value="75">
    </div>
  </div>
 <div id='simulation-div'>
    <canvas id="timerCanvas" width="800" height="200"></canvas>
    <canvas id="pwmCanvas" width="800" height="150"></canvas>
  </div>

## 占空比、频率与分辨率之间的关系

下图展示了占空比、频率、周期、脉冲宽度与分辨率在 PWM 生成中的协同作用。虽然初看略显复杂，但将其拆解能帮助你更好地理解这些概念。

在此示例中，定时器分辨率为 4 位，意味着定时器从 0 








































































































































































































































































































































































































































































 15（共 16 个可能值）。当定时器到达最大值（即 15）时，会触发溢出中断（Overflow Interrupt，以蓝色箭头表示），计数器复位为 0。定时器从 0 计数到最大值所需的时间称为周期（Period）。

<img style="display: block; margin: auto;" alt="PWM" src="./images/pwm-duty-cycle-timer.jpg"/>

占空比设置为 50%，即信号在一个周期中有一半时间保持高电平。在计数过程中的每一步，定时器都会将当前计数与占空比的比较值进行比较。当定时器计数超过该比较值（以黄色箭头标记）时，信号从高电平切换为低电平。这会触发比较中断（Compare Interrupt），以指示状态变化。

信号保持高电平的这段时间称为脉冲宽度（Pulse Width）。

  <script>
    const timerCanvas = document.getElementById('timerCanvas');
    const timerCtx = timerCanvas.getContext('2d');

    const pwmCanvas = document.getElementById('pwmCanvas');
    const pwmCtx = pwmCanvas.getContext('2d');

    const resolutionInput = document.getElementById('resolution');
    const resolutionNumber = document.getElementById('resolutionNumber');
    const dutyCycleInput = document.getElementById('dutyCycle');
    const dutyCycleNumber = document.getElementById('dutyCycleNumber');

    const numCountLabels = 1;

    function drawTimerAndPWM(resolution, dutyCycle) {
      const maxTicks = Math.pow(2, resolution) - 1;
      const highTicks = Math.round(maxTicks * (dutyCycle / 100));
      const periodWidth = pwmCanvas.width / 10;

      timerCtx.clearRect(0, 0, timerCanvas.width, timerCanvas.height);
      pwmCtx.clearRect(0, 0, pwmCanvas.width, pwmCanvas.height);

      timerCtx.beginPath();
      const stepsToDraw = Math.min(800, maxTicks);
      const stepIncrement = Math.ceil(maxTicks / stepsToDraw);
      for (let period = 0; period < 10; period++) {
        const startX = period * periodWidth;
        for (let tick = 0; tick <= maxTicks; tick += stepIncrement) {
          const x1 = startX + (tick / maxTicks) * periodWidth;
          const y1 = timerCanvas.height - (tick / maxTicks) * (timerCanvas.height - 100);
          const y2 = timerCanvas.height - ((tick + stepIncrement) / maxTicks) * (timerCanvas.height - 100);
          timerCtx.lineTo(x1, y1);
          if (tick + stepIncrement <= maxTicks) {
            timerCtx.lineTo(x1, y2);
          }
        }
      }
      timerCtx.strokeStyle = 'blue';
      timerCtx.lineWidth = 2;
      timerCtx.stroke();

      timerCtx.font = '12px Arial';
      timerCtx.fillStyle = 'black';
      let labelValues = [];
      if (numCountLabels == 1) {
        labelValues = [0, maxTicks];
      } else if (numCountLabels == 2) {
        labelValues = [0, Math.round(maxTicks / 2), maxTicks];
      } else {
        labelValues = [0, Math.round(maxTicks / 3), Math.round(2 * maxTicks / 3), maxTicks];
      }

      for (let i = 0; i < labelValues.length; i++) {
        const y = timerCanvas.height - (labelValues[i] / maxTicks) * (timerCanvas.height - 100);
        timerCtx.fillText(Math.round(labelValues[i]), 5, y);
      }

      const dutyCycleY = timerCanvas.height - (highTicks / maxTicks) * (timerCanvas.height - 100);
      timerCtx.beginPath();
      timerCtx.moveTo(0, dutyCycleY);
      timerCtx.lineTo(timerCanvas.width, dutyCycleY);
      timerCtx.strokeStyle = 'red';
      timerCtx.lineWidth = 1;
      timerCtx.stroke();

      const maxValueY = timerCanvas.height - (maxTicks / maxTicks) * (timerCanvas.height - 100);
      timerCtx.beginPath();
      timerCtx.moveTo(0, maxValueY);
      timerCtx.lineTo(timerCanvas.width, maxValueY);
      timerCtx.strokeStyle = 'gray';
      timerCtx.lineWidth = 1;
      timerCtx.setLineDash([5, 5]);
      timerCtx.stroke();
      timerCtx.setLineDash([]);

      pwmCtx.beginPath();
      for (let period = 0; period < 10; period++) {
        const startX = period * periodWidth;
        pwmCtx.moveTo(startX, pwmCanvas.height / 2);
        pwmCtx.lineTo(startX + (dutyCycle / 100) * periodWidth, pwmCanvas.height / 2);
        pwmCtx.lineTo(startX + (dutyCycle / 100) * periodWidth, pwmCanvas.height - 20);
        pwmCtx.lineTo(startX + periodWidth, pwmCanvas.height - 20);
        pwmCtx.lineTo(startX + periodWidth, pwmCanvas.height / 2);
      }
      pwmCtx.strokeStyle = 'green';
      pwmCtx.lineWidth = 2;
      pwmCtx.stroke();

      timerCtx.font = '16px Arial';
      timerCtx.fillStyle = 'black';
      timerCtx.fillText(`分辨率: ${resolution} bits`, 10, 20);
      timerCtx.fillText(`最大定时器计数值: ${maxTicks}`, 10, 40);

      pwmCtx.font = '16px Arial';
      pwmCtx.fillStyle = 'black';
      pwmCtx.fillText(`占空比: ${dutyCycle}%`, 10, 20);
    }

    function updateSimulation() {
      const resolution = parseInt(resolutionInput.value);
      const dutyCycle = parseInt(dutyCycleInput.value);
      drawTimerAndPWM(resolution, dutyCycle);
    }

    resolutionInput.addEventListener('input', () => {
      resolutionNumber.value = resolutionInput.value;
      updateSimulation();
    });

    resolutionNumber.addEventListener('input', () => {
      resolutionInput.value = resolutionNumber.value;
      updateSimulation();
    });

    dutyCycleInput.addEventListener('input', () => {
      dutyCycleNumber.value = dutyCycleInput.value;
      updateSimulation();
    });

    dutyCycleNumber.addEventListener('input', () => {
      dutyCycleInput.value = dutyCycleNumber.value;
      updateSimulation();
    });

    updateSimulation();
  </script>
