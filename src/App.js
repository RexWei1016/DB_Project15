import logo from './logo.svg';
import './App.css';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>歡迎來到健康管理系統</h1>
        <p>
          請使用本應用來跟蹤您的健康數據並保持健康生活。
        </p>
        {/* 你可以加入一些導航按鈕或鏈接到其他頁面 */}
        <a
          className="App-link"
          href="/dashboard"  // 這裡是未來的健康數據儀表板頁面
        >
          開始使用
        </a>
      </header>
    </div>
  );
}

export default App;