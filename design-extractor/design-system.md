# Design System Guide

## 0. Overview

提取自 `https://www.dayy.com/en` 的视觉语言：强首屏氛围、悬浮胶囊导航、大字号编辑式主张、浅灰 tile 序列、克制黑白体系和少量渐变影像。

## 1. Design Principles

1. 首屏先建立情绪，再解释服务。
2. 用巨大字体做品牌记忆，不用密集卡片堆信息。
3. 导航低干扰，底部悬浮，始终可达。
4. 色彩克制，依赖空间、字号和影像建立高级感。
5. 组件圆角统一，阴影尽量少。

## 2. Color Palette

核心颜色见 `palette.md`。应用到即宿科技时，保留近黑、白、浅灰底，加入「夜晚酒店」场景的琥珀色与深青色，但不使用通用科技紫蓝渐变。

## 3. Typography

- Base：系统 sans，中文使用 `PingFang SC` / `Microsoft YaHei`。
- Mono：仅用于短标签、邮箱、域名，不用于大段文案。
- Display：`clamp(64px, 12vw, 176px)`，行高 `0.92-1.0`。
- Statement：`clamp(28px, 4.2vw, 64px)`，字重 500，行高约 1.08。
- Body：17-20px，行高 1.45-1.65。

## 4. Spacing System

- 页面横向边距：`clamp(24px, 4.5vw, 64px)`。
- 区块纵向间距：`clamp(80px, 12vw, 176px)`。
- tile 间距：`8px`。
- 内容面板内边距：`clamp(20px, 3vw, 44px)`。

## 5. Component Styles

组件见 `components.md`。所有组件使用 `8px`、`12px` 和 `999px` 圆角系统。避免原官网旧版的大量传统卡片与边框堆叠。

## 6. Shadows & Elevation

默认无阴影。只有悬浮导航和必要覆盖层可使用 `0 12px 40px rgba(16, 19, 27, 0.08)`。

## 7. Animations & Transitions

- 链接 hover：150ms。
- tile hover：300ms，轻微 translate 或颜色变化。
- 首屏文字：进入时淡入上移，reduced motion 下禁用。
- 不使用滚动劫持，不阻塞内容阅读。

## 8. Border Radius

- `8px`：小型控件。
- `12px`：tile、面板、图片。
- `999px`：底部导航和按钮。

## 9. Responsive Design

桌面端强调横向节奏和超大字号。移动端保持同样信息顺序，但首屏高度降低，tile 单列或双列，底部导航保留核心入口。
