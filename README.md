# 健康管理系統前端模板

此專案是基於 [Create React App](https://github.com/facebook/create-react-app) 建立的健康管理系統前端模板，旨在提供用戶健康資料的視覺化、管理及分析功能。此應用可用於展示個人健康資訊，如運動紀錄、飲食跟蹤、健康指標（如體重、血壓等）的變化趨勢。

## 資料夾結構

- `/public`：包含靜態資源（如圖片和字體），以及主要的 `index.html` 文件。
- `/src`：應用的主要程式碼，包含了組件、頁面、API 請求、上下文管理等模組化的文件。

```plaintext
/public
│
├── /assets           # 靜態資源文件，如圖片、字體等
│   ├── /images
│   └── /fonts
│
├── favicon.ico
├── index.html        # 應用的主要 HTML 文件
└── manifest.json     # PWA 設定檔（如適用）
│
/src
│
├── /components       # 通用的功能組件，如按鈕、表單輸入等
│   └── /Button
│       ├── Button.js
│       └── Button.css
│
├── /containers       # 有邏輯或狀態管理的頁面級組件或容器
│   └── /HomePage
│       ├── HomePage.js
│       └── HomePage.css
│
├── /services         # API 請求和業務邏輯處理 (如與後端交互)
│   └── api.js
│
├── /contexts         # 全局或多層級狀態管理的 Context
│   └── AuthContext.js
│
├── /utils            # 通用的工具函數或幫助類別
│   └── formatDate.js
│
├── /routes           # 應用中的路由配置
│   └── Routes.js
│
├── /App.js           # 應用的主入口組件
├── /index.js         # ReactDOM.render 入口
└── /package.json
```

## 可用的 Scripts

在項目目錄中，你可以執行以下命令：

### `npm start`

以開發模式運行應用程式。\
打開 [http://localhost:3000](http://localhost:3000) 在瀏覽器中查看。

應用程式將在你進行更改後重新加載。\
你也可以在控制台中看到任何的 lint 錯誤。

### `npm test`

啟動測試工具並以互動式模式運行。\
更多資訊請參見 [運行測試](https://facebook.github.io/create-react-app/docs/running-tests)。

### `npm run build`

為生產環境進行打包。\
打包後的應用將放置於 `build` 資料夾中。\
它將正確打包 React 並在生產模式下進行優化，以獲得最佳性能。

打包後的文件名稱會包含雜湊值。\
應用已準備好進行部署。

更多資訊請參見 [部署](https://facebook.github.io/create-react-app/docs/deployment)。

### `npm run eject`

**注意：這是一個單向操作，無法逆轉！**

如果你對預設的 build 工具和配置不滿意，可以使用 `eject` 命令。此命令將從你的項目中移除所有的配置，並將所有的構建依賴工具（如 Webpack, Babel, ESLint 等）直接複製到你的項目中。執行後，所有命令除了 `eject` 以外仍然可用，但它們將指向已複製的腳本，這樣你可以進行自定義。

## 學習更多

你可以在 [Create React App 官方文件](https://facebook.github.io/create-react-app/docs/getting-started) 中了解更多。

如需學習 React，請查看 [React 官方文件](https://reactjs.org/)。