import axios from 'axios';

const API_URL = 'http://localhost:8080/sensor'; // Thay đổi URL nếu cần

// Lấy dữ liệu sensor với phân trang
const getDataSensorByCondition = (pageNo = 0, pageSize = 10) => {
    return axios.get(`${API_URL}/data`, {
        params: {
            pageNo: pageNo,
            pageSize: pageSize
        }
    });
};

// Lấy dữ liệu sensor mới nhất
const getLatestDataSensor = () => {
    return axios.get(`${API_URL}/latest`);
};

export default {
    getDataSensorByCondition,
    getLatestDataSensor
};
