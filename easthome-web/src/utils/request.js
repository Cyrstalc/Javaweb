// axios的封装工具类模块
// 导入axios
import axios from 'axios';
// 导入element-ui中的Message组件
import { Message } from 'element-ui';

// 创建axios对象
const instance = axios.create({
    // 请求基础路径
    baseURL: 'http://localhost:8080',
    // 请求超时时间
    timeout: 60000
});

// 拦截器
// 请求拦截器: 发送请求之前的统一处理
instance.interceptors.request.use(
    config => {
        // 参数config是配置对象
        // console.log(config);
        // 此方法必须返回配置对象
        return config;
    },
    () => {
        return false;
    }
)

// 响应拦截器: 接收响应之后的统一处理
instance.interceptors.response.use(
    response => {
        // 请求成功，响应状态码200
        return response;
    },
    error => {
        // 请求失败，响应状态码非200
        Message.error('系统出错，请联系管理员');
        return new Promise(() => {});
    }
)

export default instance