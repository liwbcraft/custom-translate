# Custom Translate | 自定义翻译

[English](#english) | [中文](#中文)

---

## English

An Obsidian plugin for local translation and vocabulary management, designed to work with the open-source LibreTranslate.

### Features

- **Text Translation**: Uses local translation service (LibreTranslate required)
- **Vocabulary Management**: Build and manage your personal word collection
- **Word Details**: Store part of speech, definition, examples, synonyms, antonyms, tags, frequency, and CEFR level
- **Phonetic Notation**: Save both UK and US pronunciations
- **Import/Export**: Backup and restore your vocabulary
- **Customizable Hotkeys**: Set your own shortcuts in Obsidian Settings → Hotkeys
- **Bilingual Interface**: Switch between Chinese and English UI

### Prerequisites

This plugin depends on LibreTranslate translation service. Please ensure it is deployed and running.

#### Quick Deploy with Docker

```bash
docker run -d --name libretranslate -p 5000:5000 -m 1.5g --memory-swap 1.5g libretranslate/libretranslate:v1.9.5 --load-only en,zh
```

After deployment, set the API URL to `http://127.0.0.1:5000/translate` in plugin settings.

The API should accept POST requests with:

```json
{
  "q": "text to translate",
  "source": "auto",
  "target": "zh"
}
```

And return a response with a `translatedText` field.

### Installation

#### From Obsidian Community Plugins
1. Open Obsidian Settings
2. Go to Community Plugins and disable Safe Mode
3. Browse and search for "Custom Translate"
4. Install and enable the plugin

#### Manual Installation
1. Download the latest release from [GitHub Releases](https://github.com/liwbcraft/custom-translate/releases)
2. Extract to `{your_vault}/.obsidian/plugins/custom-translate/`
3. Reload Obsidian
4. Enable the plugin in Community Plugins settings

### Usage

#### Translation
- Select text in your note
- Right-click and choose "Translate selected text"
- Or use Command Palette (Ctrl/Cmd + P)
- Or set a custom hotkey for faster access

#### Vocabulary Management
- Select a word, right-click to "Look up word" or "Add to vocabulary"
- Click the book icon in the left ribbon
- Double-click to select word text, then use hotkey to look up
- Supports sorting by word or frequency, searching, and pagination

#### 📖 Import Example Vocabulary

To quickly experience the plugin features, you can download the example configuration file:

1. Download [examples/example-data.json](examples/example-data.json)
2. Click "Import" in the plugin settings page
3. Select the downloaded `example-data.json` file

> 💡 The example file is the value of `vocabulary`. You can copy its content and replace the `vocabulary` field in your `data.json` with it.

### 🏷️ Tag Reference

The plugin automatically recognizes and translates the following tags:

| Tag | Display | Description |
|------|---------|-------------|
| `a1` | Basic daily words | CEFR level (most basic vocabulary) |
| `a2` | Everyday expressions | CEFR level (daily communication) |
| `b1` | Abstract/Academic/Slightly complex words | CEFR level (intermediate vocabulary) |
| `core` | Core | Core/common words |
| `idiom` | Idiom | Idiomatic expressions |
| `slang` | Slang | Slang/colloquial expressions |
| `formal` | Formal | Formal usage |
| `informal` | Informal | Informal usage |
| `technical` | Technical | Technical/domain-specific terms |

> 💡 You can also use custom tags (e.g., `my-tag`). The plugin will display them as-is (with the first letter capitalized).

#### Interface Language
- Go to plugin settings
- Select "Interface Language" at the top
- Choose between Chinese and English

### Hotkey Setup

Go to **Obsidian Settings → Hotkeys** and search for "Custom Translate" to set your own shortcuts for:
- Translate selected text
- Look up selected word
- Add selected word to vocabulary
- Open vocabulary manager

### License

MIT

---

## 中文

一款为 Obsidian 打造的本地翻译 + 单词本管理插件，需配合开源的 LibreTranslate 使用。

### 功能特点

- **文本翻译**：调用本地翻译服务（需 LibreTranslate）
- **单词本管理**：收藏和管理你的单词
- **详细信息**：存储词性、释义、例句、同义词、反义词、标签、词频、CEFR等级
- **音标支持**：同时保存英式和美式发音
- **导入/导出**：备份和恢复单词本
- **自定义快捷键**：在 Obsidian 设置中自由配置快捷键
- **双语界面**：支持中英文界面切换

### 使用前提

本插件依赖 LibreTranslate 翻译服务，请确保已部署并运行。

#### Docker 一键部署

```bash
docker run -d --name libretranslate -p 5000:5000 -m 1.5g --memory-swap 1.5g libretranslate/libretranslate:v1.9.5 --load-only en,zh
```

部署成功后，在插件设置中将 API 地址设置为 `http://127.0.0.1:5000/translate`。

API 需要接受 POST 请求，格式如下：

```json
{
  "q": "要翻译的文本",
  "source": "auto",
  "target": "zh"
}
```

返回格式需包含 `translatedText` 字段。

### 安装方法

#### 从 Obsidian 社区安装
1. 打开 Obsidian 设置
2. 进入「第三方插件」→「社区插件」，关闭安全模式
3. 点击「浏览」，搜索「自定义翻译」
4. 安装并启用

#### 手动安装
1. 从 [GitHub Releases](https://github.com/liwbcraft/custom-translate/releases) 下载最新版本
2. 解压到 `{你的仓库}/.obsidian/plugins/custom-translate/`
3. 重启 Obsidian
4. 在设置中启用插件

### 使用说明

#### 翻译文本
- 选中需要翻译的文字
- 右键菜单选择「翻译选中文本」
- 或使用命令面板（Ctrl/Cmd + P）
- 或在设置中配置快捷键，一键翻译

#### 单词本管理
- 选中单词，右键选择「查询单词」或「添加到单词本」
- 点击左侧边栏的书本图标打开单词本管理
- 双击单词后可以选中文字，使用快捷键查询
- 支持按单词或词频排序、搜索、分页

#### 📖 导入示例单词本

如果你想快速体验插件功能，可以下载示例配置文件：

1. 下载 [examples/example-data.json](examples/example-data.json)
2. 在插件设置页面点击「导入」
3. 选择下载的 `example-data.json` 文件

> 💡 示例文件就是 `vocabulary` 的值，直接复制替换到你 `data.json` 的 `vocabulary` 字段中即可。

### 🏷️ 标签说明

插件会自动识别并翻译以下标签：

| 标签 | 显示 | 说明 |
|------|------|------|
| `a1` | 基础生活词 | CEFR 等级（最基础词汇） |
| `a2` | 日常表达词 | CEFR 等级（日常交流词汇） |
| `b1` | 抽象/学术/稍复杂词 | CEFR 等级（进阶词汇） |
| `core` | 核心词 | 核心常用词汇 |
| `idiom` | 习语 | 习语/惯用语 |
| `slang` | 俚语 | 俚语/口语表达 |
| `formal` | 正式 | 正式场合用语 |
| `informal` | 非正式 | 非正式场合用语 |
| `technical` | 专业术语 | 专业领域词汇 |

> 💡 你也可以使用自定义标签（如 `my-tag`），插件会直接显示原文（首字母大写）。

#### 界面语言切换
- 进入插件设置页面
- 选择顶部的「界面语言」
- 在中文和英文之间切换

### 快捷键设置

打开 **Obsidian 设置 → 快捷键**，搜索「Custom Translate」，即可为以下功能设置自定义快捷键：
- 翻译选中的文本
- 查询选中单词
- 添加选中单词到单词本
- 打开单词本管理

### 许可证

MIT

---

## Links | 链接

- [GitHub Repository](https://github.com/liwbcraft/custom-translate)
- [Issues](https://github.com/liwbcraft/custom-translate/issues)
- [LibreTranslate](https://github.com/LibreTranslate/LibreTranslate)

### `LICENSE`

```text
MIT License

Copyright (c) 2026 Liwb

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
