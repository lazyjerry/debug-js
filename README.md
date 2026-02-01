# debug-js

一個輕量級的 JavaScript Debug 工具，用於控制 console 輸出和整合 [vConsole](https://github.com/nicknisi/vconsole) 移動端調試面板。

## 功能特色

- 🔇 **Console 靜默控制** - 在生產環境自動靜默 `console.log`、`console.debug` 等輸出
- 📱 **vConsole 整合** - Debug 模式下自動載入 vConsole，方便移動端調試
- 🛡️ **錯誤保留** - 保留 `console.error` 和 `console.assert`，確保重要錯誤不被遺漏
- 🔧 **原始 Console 備份** - 透過 `window._console` 隨時存取原始 console 方法

## 安裝

直接在 HTML 中引入 `debug.js`：

```html
<script src="debug.js"></script>
```

或透過 CDN（請替換為你的實際路徑）：

```html
<script src="https://your-cdn.com/debug.js"></script>
```

## 使用方式

### 切換 Debug 模式

編輯 `debug.js` 檔案中的 `IS_DEBUG` 常數：

```javascript
const IS_DEBUG = true;   // 開啟 debug 模式
const IS_DEBUG = false;  // 關閉 debug 模式（生產環境）
```

### Debug 模式開啟時 (`IS_DEBUG = true`)

- 所有 console 方法正常運作
- 自動載入並初始化 vConsole（暗色主題）
- 適用於開發和測試環境

### Debug 模式關閉時 (`IS_DEBUG = false`)

以下 console 方法會被靜默（不輸出任何內容）：

| 靜默的方法 | 保留的方法 |
|-----------|-----------|
| `console.log` | `console.error` |
| `console.debug` | `console.warn` |
| `console.table` | `console.info` |
| `console.group` | `console.assert` |
| `console.groupCollapsed` | |
| `console.groupEnd` | |
| `console.time` | |
| `console.timeEnd` | |
| `console.timeLog` | |
| `console.trace` | |
| `console.count` | |
| `console.countReset` | |
| `console.dir` | |
| `console.dirxml` | |

### 存取原始 Console

即使在非 debug 模式下，你仍可透過 `window._console` 存取原始的 console 方法：

```javascript
// 即使 IS_DEBUG = false，這也會輸出
window._console.log('這是緊急訊息');
window._console.warn('這是警告');
```

### 全域變數

| 變數 | 說明 |
|------|------|
| `window.IS_DEBUG` | 目前的 debug 模式狀態 |
| `window._console` | 原始 console 方法物件 |
| `window.vConsole` | vConsole 實例（僅在 debug 模式） |

## 範例

```javascript
// 一般使用
console.log('開發訊息');  // IS_DEBUG=false 時不輸出

// 錯誤追蹤（永遠輸出）
console.error('發生錯誤！');

// 特殊情況：強制輸出
if (!window.IS_DEBUG) {
    window._console.log('即使在生產環境也需要輸出的訊息');
}
```

## 授權

MIT License
