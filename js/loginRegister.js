var loginHeaderBtn = document.getElementById("login-header-button");
loginHeaderBtn.onclick = loginFunc;
var registerHeaderBtn = document.getElementById("register-header-button");
registerHeaderBtn.onclick = registerFunc;
var loginInputs = document.getElementById("login-inputs-div");
var registerInputs = document.getElementById("register-inputs-div");

var url = window.location.href;
var fragPartIndex = url.lastIndexOf("#");
var fragStr = url.substring(fragPartIndex + 1);
if (fragStr === "login_sec")
    loginFunc();
else
    registerFunc();

function loginFunc() {
    loginInputs.style.display = "block";
    loginHeaderBtn.classList.add("active-tab");
    loginHeaderBtn.classList.remove("inactive-tab");
    loginInputs.setAttribute("align", "center");

    registerInputs.style.display = "none";
    registerHeaderBtn.classList.add("inactive-tab");
    registerHeaderBtn.classList.remove("active-tab");
}

function registerFunc() {
    loginInputs.style.display = "none";
    loginHeaderBtn.classList.add("inactive-tab");
    loginHeaderBtn.classList.remove("active-tab");

    registerInputs.style.display = "block";
    registerHeaderBtn.classList.add("active-tab");
    registerHeaderBtn.classList.remove("inactive-tab");
    registerInputs.setAttribute("align", "center")
}

