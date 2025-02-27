## 環境建置

- 此專案為系統的前端，關於後端以及系統架構的更多資訊，請參考專案【dilab-notebook-paradise-api】。
- 已經在 [vite.config.ts](./vite.config.ts) 設定，在 local 端的開發模式中，會在每次的 request 加入 /api 前綴。
在建置模式不會做這件事情，要額外在 proxy server 設定。

---

## 筆記

- 因為後段是使用 HttpOnly Cookies，所以每次送出 request 都要包含 credentials 
（如果是 Axios 的話就是```withCredentials: true```，fetch 的話就是```credentials: 'include'```）。

---

## TODO

- 加入登入介面。
- 登入後的資訊要儲存於 Zustand Store（用 localStorage 版）。可以在 Route Guard 加入 user token 驗證，
這樣每個頁面都會有預先檢查。
- 每個元件加入動畫效果。
