import getCookie from "./getCookie"

export default function getAllCookies() {
    const data = {
        userLoggedIn: getCookie("userLoggedIn"),
        userId: getCookie("userId"),
        userName: getCookie("userName"),
        cart: getCookie("cart"),
        wishlist: getCookie("wishlist")
    }

    return data;
}