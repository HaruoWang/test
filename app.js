const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// 將靜態文件夾指定為 'public'
app.use(express.static('public'));

// 處理 POST 請求
app.post('/process', (req, res) => {
    const inputData = req.body.data;

    // 在這裡處理 POST 資料，並回傳相應的回應
    res.json({ message: `你提交的資料是：${inputData}` });
});

// 處理 GET 請求
app.get('/get', (req, res) => {
    // 在這裡處理 GET 請求，從資料庫中取得數據，並回傳相應的回應
    res.json({ message: '這是從伺服器獲取的數據' });
});

// 根路徑處理程序
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 啟動服務器
app.listen(port, () => {
    console.log(`伺服器正在運行於 http://localhost:${port}`);
});