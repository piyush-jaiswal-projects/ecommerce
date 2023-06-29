import axios from 'axios'
var products = [];

        try {
            await axios.get(process.env.REACT_APP_SERVER_URL + "/api/product/getProducts")
                .then((res) => {
                    products = res.data.products;
                });
        
        } catch (error) {
            console.log(error);
        }

export default products;