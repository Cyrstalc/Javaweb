// 导入依赖 import(ES6) require(Commonjs)
const express = require('express');
const multer = require('multer');
const { v4: getUUID } = require('uuid');
const cors = require('cors');

// 创建一个Multer实例，指定存储位置
const storage = multer.diskStorage({
    // 指定文件上传的目标文件夹
    destination: function (req, file, cb) {
        cb(null, 'public/');
    },
    // 修改上传文件名称
    filename: function (req, file, cb) {
        let originName = file.originalname;
        let ext = originName.substring(originName.lastIndexOf('.') + 1);
        console.log('ext:', ext);
        let newName = getUUID() + '.' + ext;
        console.log('newName:', newName);
        // 重命名上传的文件
        cb(null, newName);
    }
});

const upload = multer({ storage: storage });

const app = express();

// 设置静态文件目录，用于访问上传的文件
app.use(express.static('public'));
// 使用cors中间件
app.use(cors()); 

// 设置POST路由处理文件上传
// 定义了一个服务器端接收请求的处理方法
// 请求路径为/upload, 请求参数名file
app.post('/upload', upload.single('file'), (req, res) => {
    let result = {};
    try {
        console.log('File received:', req.file);
        result.msg = req.file.filename;
        res.status(200).send(JSON.stringify(result));
    } catch (error) {
        console.error(error);
        result.msg = 'error';
        res.status(500).send(JSON.stringify(result));
    }
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});