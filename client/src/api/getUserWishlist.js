import axios from 'axios'
import getCookie from '../functions/getCookie';
var data = [];
const id = getCookie("userId");
    try {
        await axios.post(process.env.REACT_APP_SERVER_URL + "/api/user/getWishlist", {userId: id})
            .then((res) => {
                data = res.data.wishlist;
            });
    
    } catch (error) {
        console.log(error);
    }
      

export default data;