import axios from 'axios'
import getCookie from '../functions/getCookie';
var data = [{location: "Select Delivery Address", pincode: 0, delCharge: 40 }];
const id = getCookie("userId");
    try {
        await axios.post(process.env.REACT_APP_SERVER_URL + "/api/user/getAddresses", {userId: id})
            .then((res) => {
                data = [...data, ...res.data.addresses];
            });
    
    } catch (error) {
        console.log(error);
    }


export default data;