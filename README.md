# LazyDog Backend

LazyDog 是一個飯店管理系統的後端專案，使用 **Node.js + Express + MySQL**，提供飯店資料管理、優惠券管理等功能。

## 📌 目錄
- [server準備]( #建立-server-端要先思考)
- [API]( #restful-api)
- [] (#)


### 建立 server 端要先思考

1.結構建立 2.需要串那些資料表 3.哪些表單需要 CRUD
4.res.json HTTP 端顯示狀態碼是甚麼?

### Restful API###

整理 RESTful API CRUD

獲取 XX 資料 /GET /XX
獲取 XXID 資料 /GET /XX/1
新增 XX 資料 /POST /XX
更新 XX 資料 /PATCH /XX/1
刪除 XX 資料 /DELETE/XX/1

POST／PUT
都可以用來新增
POST 是原本沒有的資料去做一筆新增的動作
PUT 是覆寫，不管做多少次結果都是一樣的

ex:
PUT 新增一個用戶 aaa，假如資料表裡面原本就有 aaa 他會直接蓋過去還有安全性的問題，要小心使用。
POST 新增用戶時會自動產生 ID

PATCH／PUT
都可以用來修改

PATCH 可以更新一個裡面的資料(也可以新增沒有的欄位)
PUT 即使只要改一個欄位，也要傳整個物件，會整個資源覆蓋，如果某個欄位沒有包含在請求中可能會整個刪除。

意思是說你要全部更新可以用 PUT，但是部分要用 PATCH。

目前僅使用

````bash
npm run dev

### hotel為例(未串middlewares未串驗證) ###

獲取XX資料   /GET    /hotels

獲取XXID資料 /GET    /hotels/1

新增XX資料   /POST   /hotels

更新XX資料   /PATCH  /hotels/1

軟刪除XX資料 /PATCH  /hotels/:id/soft-delete

刪除XX資料   /DELETE /hotels/1

## 狀態碼(status code)

基本使用:(一般情況使用 200 通用)

```text
GET: 200 OK
POST: 201 Created
PUT: 200 OK
PATCH: 200 OK
DELETE: 204 No Content
````

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
- 避免將敏感資料放入 JWT
  不要放密碼、信用卡資訊、email，可以放 user_id, role
- HttpOnly Cookie 儲存 Token
  不要存 localStorage，容易被 XSS 攻擊，推薦存 HttpOnly Cookie
- Access Token + Refresh Token
  Access Token 短時效 (15-30 分鐘)
  Refresh Token 長時效 (7-30 天)，存 HttpOnly Cookie
  過期時自動刷新，提升安全性

### 資料庫 CRUD

# CRUD-資料庫操作

## 1. CRUD 是什麼？

CRUD 是一個縮寫，代表了資料庫的四個基本操作：Create（新增）、Read（讀取）、Update（更新）和 Delete（刪除）。這四個操作是資料庫管理系統（DBMS）中最基本的操作，幾乎所有的應用程式都會使用到這些操作。

## 2. CRUD 操作

### 2.1 Create（新增）

Create 操作用於在資料庫中新增一條新的記錄。在關聯式資料庫中，Create 操作通常對應到 SQL 的 `INSERT` 語句。

```sql
INSERT INTO users (name, email) VALUES ('Alice', 'alice@test.com');
```

### 2.2 Read（讀取）

Read 操作用於從資料庫中讀取記錄。在關聯式資料庫中，Read 操作通常對應到 SQL 的 `SELECT` 語句。

```sql
SELECT * FROM users;
```

### 2.3 Update（更新）

Update 操作用於更新資料庫中的記錄。在關聯式資料庫中，Update 操作通常對應到 SQL 的 `UPDATE` 語句。

```sql
UPDATE users SET name = 'Bob' WHERE id = 1;
```

### 2.4 Delete（刪除）

Delete 操作用於刪除資料庫中的記錄。在關聯式資料庫中，Delete 操作通常對應到 SQL 的 `DELETE` 語句。

```sql
DELETE FROM users WHERE id = 1;
```

## 3. CRUD 操作的應用

CRUD 操作是應用程式與資料庫之間的橋樑，幾乎所有的應用程式都會使用到這些操作。例如，一個簡單的網站可能會有以下功能：

- Create：用戶註冊
- Read：查看用戶列表
- Update：修改用戶資料
- Delete：刪除用戶

透過這些 CRUD 操作，應用程式可以與資料庫進行交互，實現各種功能。

## 4. 總結

CRUD 是資料庫管理系統中最基本的操作，幾乎所有的應用程式都會使用到這些操作。通過 Create、Read、Update 和 Delete 這四個操作，應用程式可以與資料庫進行交互，實現各種功能。
