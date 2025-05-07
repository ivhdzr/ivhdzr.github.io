AOS.init();

const btnSection = document.querySelector("#btn_section");
const btnTop = document.querySelector("#btn_top");

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

