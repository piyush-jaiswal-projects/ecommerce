import axios from 'axios'
import getCookie from '../functions/getCookie';
var data = [];
const id = getCookie("userId");
    try {
        await axios.post(process.env.REACT_APP_SERVER_URL + "/api/user/getOrders", {userId: id})
            .then((res) => {
                data = res.data.placedOrders;
            });
    
    } catch (error) {
        data = {
            items: [],
            refNum: []
        };
        console.log(error);
    }


export default data;