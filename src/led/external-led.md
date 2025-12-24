# 闪烁外部 LED

从现在开始，我们将与 Pico 一起使用更多外部部件。在此之前，熟悉简单的电路以及如何将组件连接到 Pico 的引脚会有所帮助。在本章中，我们将从一个基本的东西开始：闪烁连接在电路板外的 LED。

## 硬件需求

- LED
- 电阻
- 跳线


## 组件概述

1. LED：发光二极管（LED）在电流通过时会发光。较长的引脚（阳极）连接到正极，较短的引脚（阴极）连接到地线。我们将阳极连接到 GP13（带电阻），阴极连接到 GND。

2. 电阻：电阻限制电路中的电流，以保护 LED 等组件。其值以欧姆（Ω）计量。我们将使用 330 欧电阻来安全地为 LED 供电。

<table>
  <thead>
    <tr>
      <th>Pico 引脚</th>
      <th style="width: 250px; margin: 0 auto;">导线</th>
      <th>组件</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>GPIO 13</td>
      <td style="text-align: center; vertical-align: middle; padding: 0;">
        <div class="wire yellow" style="width: 200px; margin: 0 auto;">
          <div class="female-left"></div>
          <div class="female-right"></div>
        </div>
      </td>
      <td>电阻</td>
    </tr>
    <tr>
      <td>电阻</td>
      <td style="text-align: center; vertical-align: middle; padding: 0;">
        <div class="wire orange" style="width: 200px; margin: 0 auto;">
          <div class="female-left"></div>
          <div class="female-right"></div>
        </div>
      </td>
      <td>LED 的阳极（长脚）</td>
    </tr>
    <tr>
      <td>GND</td>
      <td style="text-align: center; vertical-align: middle; padding: 0;">
        <div class="wire black" style="width: 200px; margin: 0 auto;">
          <div class="female-left"></div>
          <div class="female-right"></div>
        </div>
      </td>
      <td>LED 的阴极（短脚）</td>
    </tr>
  </tbody>
</table>


<img style="display: block; margin: auto;" alt="pico2" src="../images/pico-external-led.png"/>

你可以使用跳线直接将 Pico 连接到 LED，或者可以在面包板上放置所有东西。如果你对硬件设置不确定，也可以参考 [Raspberry Pi 指南](https://projects.raspberrypi.org/en/projects/introduction-to-the-pico/7)。

<div class="image-with-caption" style="text-align:center; ">
    <img src="./images/pico-2-rp2350-with-external-led.png" alt="使用 Pico 2（RP2350）连接外部 LED" style="max-width:100%; height:auto; display:block; margin:0 auto;"/>
    <div class="caption" style="font-size:0.9em; color:#555; margin-top:6px;">面包板电路</div>
</div>

注意：在 Pico 上，引脚标签在电路板的背面，在插入导线时可能会感到不便。我经常需要在想要使用通用输入输出（GPIO）引脚时检查引脚分配图。使用前面的 Raspberry Pi 标志作为参考点，并将其与[引脚分配图](../pico2-pinout.md)相匹配以找到正确的引脚。引脚位置 2 和 39 也印在前面，可以作为额外的参考指南。


## LED 闪烁 - 模拟


<style>
.wrap{
  margin:0px auto;
  padding:18px;
  background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
  border-radius:10px;
  box-shadow:0 8px 24px rgba(2,6,23,0.45);
  color:var(--mm-text, #e6eef8);
  font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,monospace;
}

.top{display:flex;gap:18px;align-items:center;flex-wrap:wrap}

/* LED visual */
.led{
  width:56px;height:56px;border-radius:50%;background:#334155;display:flex;align-items:center;justify-content:center;
  box-shadow:0 0 0 6px rgba(16,185,129,0.02), inset 0 -6px 12px rgba(0,0,0,0.5);
  transition:background 180ms,box-shadow 180ms,transform 180ms;
}
.led.on{
  background:radial-gradient(circle at 35% 30%, #bbf7d0, #10b981);
  box-shadow:0 0 18px rgba(16,185,129,0.45), 0 6px 20px rgba(0,0,0,0.45);
  transform:scale(1.06);
}
.led-label{font-size:13px;color:#94a3b8;margin-top:8px;text-align:center}

/* Code lines */
.code{
  margin-top:8px;
  background:#0b1220;
  padding:12px;
  border-radius:8px;
  font-size:14px;
  color:#cbd5e1;
  overflow:auto;
}
.line{padding:6px 8px;border-radius:6px;display:flex;align-items:center;gap:10px}
.line .num{width:28px;color:#94a3b8;text-align:right;padding-right:6px}
.line .text{white-space:pre}
.line.current{
  background:linear-gradient(90deg, rgba(255,0,0,0.35), rgba(255,150,150,0.25));
  box-shadow:inset 0 0 10px rgba(255,0,0,0.45);
}

/* progress bar */
.progress-wrap{margin-top:10px}
.progress{height:12px;background:rgba(255,255,255,0.04);border-radius:8px;overflow:hidden}
.bar{height:100%;width:0%;background:linear-gradient(90deg, rgba(16,185,129,0.95), rgba(34,197,94,0.95));transition:width 0.06s linear}
.progress-info{display:flex;justify-content:space-between;margin-top:6px;color:#94a3b8;font-size:13px}

/* controls */
.controls{margin-top:12px;display:flex;gap:10px;align-items:center;flex-wrap:wrap}
button{background:#0b1826;border:1px solid rgba(255,255,255,0.03);color:inherit;padding:8px 10px;border-radius:8px;cursor:pointer}
button:active{transform:translateY(1px)}
input[type=number]{width:110px;padding:8px;border-radius:8px;border:1px solid rgba(255,255,255,0.04);background:#071023;color:inherit}
</style>

在这个模拟中，我将默认延迟设置为 5000 毫秒，以便动画更平缓，更容易跟踪。你可以将其降低到 500 毫秒左右，以看到 LED 闪烁得更快。当我们在 Pico 上运行实际代码时，我们将使用 500 毫秒的延迟。

<div class="wrap">
  <div class="top">
    <div style="display:flex;flex-direction:column;align-items:center">
      <div id="led" class="led" aria-hidden="true"></div>
      <div class="led-label"><strong id="led-state">LOW</strong></div>
    </div>
    <div style="flex:1">
      <div class="code" id="code">
        <div class="line" data-index="0"><div class="num">1</div><div class="text">let mut led = Output::new(p.PIN_13, Level::Low);</div></div>
        <div class="line" data-index="1"><div class="num">2</div><div class="text">loop {</div></div>
        <div class="line" data-index="2"><div class="num">3</div><div class="text">    led.set_high(); // 打开 LED</div></div>
        <div class="line" data-index="3"><div class="num">4</div><div class="text">    Timer::after_millis(<span class="ms-val">5000</span>).await;</div></div>
        <div class="line" data-index="4"><div class="num">5</div><div class="text">    led.set_low(); // 关闭 LED</div></div>
        <div class="line" data-index="5"><div class="num">6</div><div class="text">    Timer::after_millis(<span class="ms-val">5000</span>).await;</div></div>
        <div class="line" data-index="6"><div class="num">7</div><div class="text">}</div></div>
      <div class="progress-wrap">
        <div class="progress" aria-hidden="true"><div id="bar" class="bar"></div></div>
        <div class="progress-info"><div id="progress-label">空闲</div><div id="ms-left">0 ms</div></div>
      </div>
      <div class="controls">
        <label>间隔（毫秒）：<input id="interval" type="number" value="5000" min="50" step="50"></label>
        <button id="restart">重新开始</button>
        <button id="pause">暂停</button>
        <button id="resume" style="display:none">继续</button>
      </div>
    </div>
  </div>
</div>



<script>
document.addEventListener("DOMContentLoaded", () => {

  const lines = Array.from(document.querySelectorAll('.line'));
  const ledEl = document.getElementById('led');
  const ledState = document.getElementById('led-state');
  const bar = document.getElementById('bar');
  const progressLabel = document.getElementById('progress-label');
  const msLeft = document.getElementById('ms-left');
  const intervalInput = document.getElementById('interval');
  const restartBtn = document.getElementById('restart');
  const pauseBtn = document.getElementById('pause');
  const resumeBtn = document.getElementById('resume');
  const msValSpans = Array.from(document.querySelectorAll('.ms-val'));

  let intervalMs = Number(intervalInput.value) || 5000;
  let running = true;
  let paused = false;

  function setLed(on){
    if(on){
      ledEl.classList.add('on');
      ledState.textContent = '高';
    } else {
      ledEl.classList.remove('on');
      ledState.textContent = '低';
    }
  }

  function highlight(index){
    lines.forEach(l => l.classList.toggle('current', Number(l.dataset.index) === index));
  }

  function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // update the displayed ms inside code examples
  function updateCodeMs(v){
    msValSpans.forEach(el => el.textContent = v);
  }

  // animate a timer and update progress bar and labels
  function runTimer(ms, onUpdate){
    return new Promise(resolve => {
      let start = performance.now();
      let lastNow = start;
      function step(now){
        if(paused){
          // push the start forward so elapsed stops accumulating during pause
          start += (now - lastNow);
          lastNow = now;
          requestAnimationFrame(step);
          return;
        }
        const elapsed = now - start;
        const p = Math.min(1, elapsed / ms);
        onUpdate(p, Math.max(0, ms - Math.floor(elapsed)));
        if(p >= 1){
          resolve();
        } else {
          lastNow = now;
          requestAnimationFrame(step);
        }
      }
      requestAnimationFrame(step);
    });
  }

  async function mainLoop(){
    while(running){
      intervalMs = Number(intervalInput.value) || 5000;
      updateCodeMs(intervalMs);

      // line: led.set_high();
      highlight(2);
      await sleep(300);           // 暂停以使高亮可见
      setLed(true);
      progressLabel.textContent = 'set_high() 后等待';

      // timer line
      highlight(3);
      bar.style.width = '0%';
      await runTimer(intervalMs, (p, left) => {
        bar.style.width = (p * 100) + '%';
        msLeft.textContent = left + ' ms';
      });

      // line: led.set_low();
      highlight(4);
      await sleep(300);           // 暂停以使高亮可见
      setLed(false);
      progressLabel.textContent = 'set_low() 后等待';

      // timer line
      highlight(5);
      bar.style.width = '0%';
      await runTimer(intervalMs, (p, left) => {
        bar.style.width = (p * 100) + '%';
        msLeft.textContent = left + ' ms';
      });

      // 循环结束 - 右括号短暂显示
      highlight(6);
      progressLabel.textContent = '循环中...';
      await sleep(120);

      bar.style.width = '0%';
      msLeft.textContent = '0 ms';
      progressLabel.textContent = '空闲';

      // respect pause
      while(paused){
        await sleep(100);
      }
    }
  }

  // controls
  restartBtn.addEventListener('click', () => {
    paused = false;
    running = false;
    setTimeout(() => { running = true; mainLoop(); }, 50);
  });
  pauseBtn.addEventListener('click', () => {
    paused = true;
    pauseBtn.style.display = 'none';
    resumeBtn.style.display = 'inline-block';
    progressLabel.textContent = '已暂停';
  });
  resumeBtn.addEventListener('click', () => {
    paused = false;
    resumeBtn.style.display = 'none';
    pauseBtn.style.display = 'inline-block';
    progressLabel.textContent = '继续中...';
  });

  // update interval on input and reflect in code
  intervalInput.addEventListener('input', () => {
    intervalMs = Number(intervalInput.value) || 5000;
    updateCodeMs(intervalMs);
  });

  // initialize
  updateCodeMs(intervalMs);
  highlight(0);
  setLed(false);
  mainLoop();
});
</script>
