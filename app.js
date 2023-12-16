const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// 將靜態文件夾指定為 'public'
app.use(express.static('public'));

app.post('/post', async (req, res) => {
    try {
        // 獲取表單數據
        const { input } = req.body;

        // 創建一個新的文檔
        const database = new db({ input });

        // 將文檔保存到數據庫
        await database.save();

        res.json({ message: `Hello, ${input}! Your form is submitted and saved to MongoDB.` });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
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