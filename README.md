### Restful API###

整理RESTful API CRUD

獲取XX資料 /GET     /XX
獲取XXID資料 /GET     /XX/1
新增XX資料 /POST   /XX
更新XX資料 /PATCH /XX/1 
刪除XX資料 /DELETE /XX/1

POST／PUT 
都可以用來新增
POST是原本沒有的資料去做一筆新增的動作
PUT 是覆寫，不管做多少次結果都是一樣的

ex:
PUT新增一個用戶aaa，假如資料表裡面原本就有aaa他會直接蓋過去還有安全性的問題，要小心使用。
POST新增用戶時會自動產生ID

PATCH／PUT 
都可以用來修改

PATCH可以更新一個裡面的資料(也可以新增沒有的欄位)
PUT 即使只要改一個欄位，也要傳整個物件，會整個資源覆蓋，如果某個欄位沒有包含在請求中可能會整個刪除。

意思是說你要全部更新可以用PUT，但是部分要用PATCH。


目前僅使用
```bash
npm run dev

### hotel為例(未串middlewares未串驗證) ###

獲取XX資料   /GET    /hotel


獲取XXID資料 /GET    /hotel/1

新增XX資料   /POST   /hotel

更新XX資料   /PATCH  /hotel/1

軟刪除XX資料 /PATCH  /hotel/1

刪除XX資料   /DELETE /hotel/1

## 狀態碼(status code)

基本使用:(一般情況使用 200 通用)

```text
GET: 200 OK
POST: 201 Created
PUT: 200 OK
PATCH: 200 OK
DELETE: 204 No Content
```

常用的狀態碼:

```text
200 OK - 請求成功，回應包含請求的資料
201 Created - 請求成功並且建立了一個新的資源
400 Bad Request - 請求無效或缺少必要的參數
401 Unauthorized - 客戶端需要驗證以訪問資源
404 Not Found - 找不到請求的資源
500 Internal Server Error - 伺服器發生意外錯誤
```

`POST`

```text
當您在伺服器上新建立一個或多個資源，應該返回 201 狀態碼並附帶一個 Location 標頭，讓客戶端能夠定位新建立的資源。回應的有效負載(payload)是可選的，通常會描述並鏈接到新建的資源。
```

`PUT`

```text
200 OK 表示成功更新現有資源的 PUT 請求。不需要回應主體。

201 Created 表示成功建立新資源的 PUT 請求，並在 Location 標頭欄位中返回新資源的最具體 URI，以及在回應主體中回顯資源的任何其他相關 URI 和元數據。

409 Conflict 表示由於第三方修改而導致 PUT 請求失敗，回應主體中包含嘗試更新與當前資源之間差異的列表。

400 Bad Request 表示 PUT 請求失敗，回應主體中包含解釋 PUT 為何失敗的自然語言文本（例如英語）。
```

`DELETE`

```text
202: 請求已被接受處理，但處理尚未完成。
204: 伺服器已成功處理請求，且回應的有效負載中沒有額外的內容。
200: 請求成功，回應的有效負載中包含操作狀態的表示。
```

## 分頁用(pagination)

```text
GET /posts?limit=10&offset=0 - retrieves the first 10 posts
GET /posts?limit=10&offset=10 - retrieves the second 10 posts
GET /posts?limit=10&offset=20 - retrieves the third 10 posts, and so on
```

## JWT 相關

- 只會加入 token 中不會被修改或更動的欄位，例如 id, username, role