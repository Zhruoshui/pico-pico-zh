# 面包板

面包板（Breadboard）是一种无需焊接即可搭建电路的小型板子。它有许多孔洞，你可以在其中插入导线和电子元件。在板子内部，金属条连接了其中一些孔洞。这使得连接元件和完成电路变得非常简单。

<div class="image-with-caption" style="text-align:center; ">
    <img src="../images/Breadboard.png" alt="Breadboard" style="max-width:70%; height:auto; display:block; margin:0 auto;"/>
    <div class="caption" style="font-size:0.9em; color:#555; margin-top:6px;">图片来源：<a href="https://commons.wikimedia.org/wiki/File:Breadboard.png">Wikimedia Commons</a>，许可证：CC BY-SA 3.0</a></div>
</div>

这张图片展示了面包板内部的孔洞是如何连接的。

## 电源轨

两侧的长垂直线称为电源轨（Power rails）。人们通常将电源连接到标有"+"的轨道，将地线连接到标有"-"的轨道。轨道中的每个孔从上到下都是连接在一起的。

假设你想给多个元件供电。你只需要将电源（例如 3.3V 或 5V）连接到"+"轨道上的一个点。之后，你可以使用同一轨道上的任何其他孔来为你的元件供电。

## 中间区域

面包板的中间部分是你放置大部分元件的地方。这里的孔洞以小型水平行的方式连接。每一行有五个孔，它们在板子内部连接在一起。

如图所示，每一行都是独立的，标记为 `a b c d e` 的组与标记为 `f g h i j` 的组是分开的。中间的间隙将这两侧分隔开，因此连接不会从一侧跨越到另一侧。

以下是一些简单的例子：

- 如果你将一根导线插入 5a，另一根导线插入 5c，它们是连接的，因为它们在同一行。
- 如果你将一根导线插入 5a，另一根导线插入 5f，它们是**不**连接的，因为它们在间隙的不同侧。
- 如果你将一根导线插入 5a，另一根导线插入 6a，它们是**不**连接的，因为它们在不同的行。
