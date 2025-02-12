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