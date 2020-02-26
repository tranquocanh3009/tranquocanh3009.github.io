var menu = document.getElementById("menu");

var modal = document.getElementById("modal");

menu.onclick = () => {
    if (modal.style.display == "none") {
        modal.style.display = "block";
        menu.src = "images/icon-close.svg";
    }
    else {
        modal.style.display = "none";
        menu.src = "images/icon-hamburger.svg";
    }
}
