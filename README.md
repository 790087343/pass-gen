# 密码生成器 (Password Generator)

一个安全、易用的在线密码生成工具，帮助您快速生成强密码，提升账户安全性。

## ✨ 功能特性

- 🔐 **安全生成**：使用 Web Crypto API 生成加密安全的随机密码
- 🎛️ **灵活配置**：支持自定义密码长度（8-128 字符）和字符类型
- 📊 **强度评估**：实时显示密码强度（弱/中/强/极强）
- 📋 **一键复制**：快速复制生成的密码到剪贴板
- 🔄 **批量生成**：支持一次生成多个密码（最多 50 个）
- 🌓 **主题切换**：支持亮色/暗色主题
- 📱 **响应式设计**：完美适配桌面端和移动端
- 🔒 **隐私保护**：所有密码在本地生成，不会上传到服务器

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

在浏览器中打开 `http://localhost:5173` 查看应用。

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录。

### 预览生产构建

```bash
npm run preview
```

## 🛠️ 技术栈

- **React 18** - UI 框架
- **Vite** - 构建工具
- **Tailwind CSS** - 样式框架
- **Web Crypto API** - 加密安全的随机数生成

## 📁 项目结构

```
pass-gen/
├── src/
│   ├── components/          # React 组件
│   │   ├── PasswordDisplay.jsx    # 密码显示组件
│   │   ├── PasswordConfig.jsx     # 配置面板组件
│   │   ├── BatchPasswordList.jsx  # 批量密码列表
│   │   └── ThemeToggle.jsx        # 主题切换组件
│   ├── utils/               # 工具函数
│   │   ├── passwordGenerator.js   # 密码生成逻辑
│   │   └── passwordStrength.js    # 密码强度评估
│   ├── App.jsx              # 主应用组件
│   ├── main.jsx             # 应用入口
│   └── index.css            # 全局样式
├── index.html               # HTML 模板
├── package.json             # 项目配置
├── vite.config.js           # Vite 配置
├── tailwind.config.js       # Tailwind 配置
└── README.md                # 项目说明
```

## 🎯 核心功能

### 密码生成选项

- **字符类型**：
  - 大写字母 (A-Z)
  - 小写字母 (a-z)
  - 数字 (0-9)
  - 特殊字符 (!@#$%^&*等)

- **排除选项**：
  - 排除相似字符（0/O, 1/l/I）
  - 排除歧义字符（{ } [ ] ( ) / \ 等）

- **密码长度**：8-128 字符可调

### 密码强度评估

密码强度基于以下因素评估：
- 密码长度
- 字符类型多样性
- 字符重复度
- 随机性

## 🔒 安全说明

- ✅ 所有密码在用户浏览器中本地生成
- ✅ 使用 Web Crypto API 的 `crypto.getRandomValues()` 确保加密安全
- ✅ 不收集、不存储、不上传任何用户数据
- ✅ 支持 HTTPS 部署

## 📝 使用建议

1. **密码长度**：建议至少 12 位，重要账户建议 16 位以上
2. **字符类型**：包含多种字符类型可提高安全性
3. **不要重复使用**：每个账户使用不同的密码
4. **定期更换**：特别是重要账户
5. **使用密码管理器**：使用 1Password、LastPass 等工具安全存储密码

## 🌐 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

需要支持 Web Crypto API 的现代浏览器。

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**注意**：本工具仅用于生成密码，请妥善保管生成的密码，建议使用密码管理器进行存储。
