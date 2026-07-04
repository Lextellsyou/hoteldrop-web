# 即宿科技官网

西安即宿信息科技有限公司官网，服务于「今夜有房」小程序项目。

## 本地预览

```bash
npm run dev
```

打开：

```text
http://localhost:4173/
```

## 测试

```bash
npm test
```

如需运行真实浏览器视觉检查，需要提供 Playwright 模块路径：

```bash
PLAYWRIGHT_NODE_MODULES=/path/to/node_modules node tests/visual-check.mjs
```

## 部署

当前为纯静态站点，可直接将以下文件部署到 Nginx、阿里云 ECS、OSS 静态站点或其他静态托管服务：

- `index.html`
- `styles.css`
- `app.js`
- `assets/`

上线前建议替换：

- 小程序码
- 正式商务邮箱或联系入口
- 备案号
- 正式合作留资接口
