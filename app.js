require('dotenv').config();
const express = require('express');
const db = require('./db');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

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
app.get('/get', async (req, res) => {
    try {
        // 從 MongoDB 中檢索數據
        const data = await db.find();
    
        // 提取 input 的值
        const inputs = data.map(entry => entry.input);
    
        // 將檢索到的數據發送給客戶端
        res.json({ success: true, inputs });
        } catch (error) {
        console.error('Error fetching data from MongoDB:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
        }
});

// 根路徑處理程序
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 啟動服務器
app.listen(port, () => {
    console.log(`伺服器正在運行於 http://localhost:${port}`);
});