export default function getCookie(cookieName) {
    var cookieArray = document.cookie.split(";"); // Split cookies by semicolon
    for (var i = 0; i < cookieArray.length; i++) {
      var cookie = cookieArray[i].trim(); // Remove whitespace around the cookie
      if (cookie.indexOf(cookieName + "=") === 0) {
        // Found the cookie by name
        var cookieValue = cookie.substring(cookieName.length + 1); // Extract the cookie value
        return decodeURIComponent(cookieValue); // Return the decoded cookie value
      }
    }
    return "";
  }