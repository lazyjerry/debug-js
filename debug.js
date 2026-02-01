  /**
   * Debug 模式管理
   * 控制 console.log 輸出和 vConsole 載入
   * 
   * 當 IS_DEBUG = false 時，console.log/warn/info/debug/table/group/time 等方法會被靜默
   * 當 IS_DEBUG = true 時，console 正常運作並載入 vConsole
   */

  // ==================== Debug 設定 ====================
  const IS_DEBUG = false;  // 設為 true 開啟 debug 模式，false 關閉

  // ==================== 覆蓋 Console ====================
  (function() {
      // 保存原始 console 方法
      const originalConsole = {
          log: console.log.bind(console),
          warn: console.warn.bind(console),
          error: console.error.bind(console),
          info: console.info.bind(console),
          debug: console.debug.bind(console),
          table: console.table.bind(console),
          group: console.group.bind(console),
          groupCollapsed: console.groupCollapsed.bind(console),
          groupEnd: console.groupEnd.bind(console),
          time: console.time.bind(console),
          timeEnd: console.timeEnd.bind(console),
          timeLog: console.timeLog.bind(console),
          trace: console.trace.bind(console),
          clear: console.clear.bind(console),
          count: console.count.bind(console),
          countReset: console.countReset.bind(console),
          assert: console.assert.bind(console),
          dir: console.dir.bind(console),
          dirxml: console.dirxml.bind(console)
      };

      // 空函數
      const noop = function() {};

      if (!IS_DEBUG) {
          // 非 debug 模式：靜默所有 console 輸出（保留 error）
          console.log = noop;
          // console.warn = noop;
          // console.info = noop;
          console.debug = noop;
          console.table = noop;
          console.group = noop;
          console.groupCollapsed = noop;
          console.groupEnd = noop;
          console.time = noop;
          console.timeEnd = noop;
          console.timeLog = noop;
          console.trace = noop;
          console.count = noop;
          console.countReset = noop;
          console.dir = noop;
          console.dirxml = noop;
          // 注意：保留 console.error 和 console.assert 以便追蹤真正的錯誤
      }

      // 暴露原始 console 供特殊情況使用
      window._console = originalConsole;
  })();

  // ==================== vConsole 載入 ====================
  (function initVConsole() {
      if (IS_DEBUG) {
          // 動態載入 vConsole
          const script = document.createElement('script');
          script.src = 'https://unpkg.com/vconsole@latest/dist/vconsole.min.js';
          script.onload = function() {
              // vConsole 載入完成後初始化
              if (typeof VConsole !== 'undefined') {
                  window.vConsole = new VConsole({
                      theme: 'dark',
                      onReady: function() {
                          console.log('[Debug] vConsole 已啟動');
                      }
                  });
              }
          };
          script.onerror = function() {
              console.error('[Debug] vConsole 載入失敗');
          };
          document.head.appendChild(script);
          
          console.log('[Debug] Debug 模式已啟用');
      }
  })();

  // 暴露到全局作用域
  window.IS_DEBUG = IS_DEBUG;
