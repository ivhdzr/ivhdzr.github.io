const btnSection = document.querySelector("#btn_section");

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

            case "cv":
                window.open("assets/docs/cv2025.pdf", "_blank");
                break;
        }
    } else {
        console.log("Clic fuera de los botones");
    }
});