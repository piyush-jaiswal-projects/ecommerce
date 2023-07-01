import axios from 'axios'

async function GetProductFromId(id) {
    try {
        const { data } = await axios.post(process.env.REACT_APP_SERVER_URL + "/api/product/getProductFromId", { id: id })
        console.log(data);
        return data;
        //             .then((res) => {
        //                 products = res.data;
        //                 setData(() => res.data);
        //                 console.log(res.data);
        //                 return [products, data];
        // });
        
            
} catch (error) {
        console.log(error);
    }
}

export default GetProductFromId;