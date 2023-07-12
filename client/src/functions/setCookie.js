export default function setCookie(loginStatus, name, id, cart, wishlist, username) {
    document.cookie = "userLoggedIn=" + loginStatus;
            document.cookie = "userName=" + name;
            document.cookie = "userId=" + id;
            document.cookie = "cart=" + cart;
    document.cookie = "wishlist=" + wishlist;
    document.cookie = "contact=" + username;
}