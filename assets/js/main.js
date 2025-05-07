AOS.init();

const btnSection = document.querySelector("#btn_section");
const btnTop = document.querySelector("#btn_top");
const btnMenu = document.getElementById("btn_menu");
const menu = document.querySelector(".flx-menu");
const iconMenu = document.querySelector("#icon_menu");

btnSection.addEventListener("click", (e) => {
    // Encontrar el botón más cercano al clic, si existe
    const button = e.target.closest("button");

    if (button && button.name) {
        // Ejecutar acciones según el atributo 'name' del botón clicado
        switch (button.name) {
            case "mail":
                window.open("mailto:ivanhdzr1605@gmail.com", "_blank");
                break;

            case "linkedin":
                window.open("https://www.linkedin.com/in/ivan-hdz-rojas", "_blank");
                break;

            case "github":
                window.open("https://github.com/ivhdzr", "_blank");
                break;

            case "tiktok":
                window.open("https://tiktok.com/@codivan", "_blank");
                break;

            case "cv":
                window.open("assets/docs/cv2025.pdf", "_blank");
                break;
        }
    } else {
        console.log("Clic fuera de los botones");
    }
});

window.addEventListener("scroll", function () {
    window.scrollY > 100 ?
        btnTop.classList.add("transcale") :
        btnTop.classList.remove("transcale");
});

btnTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
    });
});

const iconHamburger = `
<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
  class="bi bi-list" viewBox="0 0 16 16">
  <path fill-rule="evenodd"
    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
</svg>`;

const iconClose = `
<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
  class="bi bi-x-lg" viewBox="0 0 16 16">
  <path
    d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
</svg>`;

btnMenu.addEventListener("click", () => {
    const isOpen = menu.style.left === "0px";
    menu.style.left = isOpen ? "-100%" : "0px";
    iconMenu.innerHTML = isOpen ? iconHamburger : iconClose;
});

menu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        const isOpen = menu.style.left === "0px";
        menu.style.left = isOpen ? "-100%" : "0px";
        iconMenu.innerHTML = isOpen ? iconHamburger : iconClose;
    });
});

