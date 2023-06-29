import axios from 'axios'
import getCookie from '../functions/getCookie';
var data = [];
const id = getCookie("userId");
    try {
        await axios.post(process.env.REACT_APP_SERVER_URL + "/api/user/getCart", {userId: id})
            .then((res) => {
                data = res.data.cart;
                console.log("Cart: " + res.data);
            });
    
    } catch (error) {
        console.log(error);
    }


export default data;