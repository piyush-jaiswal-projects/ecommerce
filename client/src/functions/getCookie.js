export default function getCookie(cookieName) {
  var cookieArray = document.cookie.split(";");

  for (var i = 0; i < cookieArray.length; i++) {
    var cookie = cookieArray[i].trim();

    if (cookie.indexOf(cookieName + "=") === 0) {
      var cookieValue = cookie.substring(cookieName.length + 1);
      return decodeURIComponent(cookieValue);
    }

  }
  return "";
}