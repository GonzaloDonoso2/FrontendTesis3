let URL = window.location.toString();
let frontendURL;
let backendURL;

if (URL === "https://frontendtesis1.herokuapp.com/") {

    frontendURL = "https://frontendtesis1.herokuapp.com";
    backendURL = "https://backendtesis1.herokuapp.com";
    sessionStorage.setItem("frontendURL", frontendURL);
    sessionStorage.setItem("backendURL", backendURL);

} else {

    frontendURL = "http://localhost/FrontendTesis1";
    backendURL = "http://localhost/BackendTesis1";
    sessionStorage.setItem("frontendURL", frontendURL);
    sessionStorage.setItem("backendURL", backendURL);
}
