AOS.init();

const btnSection = document.querySelector("#btn_section");
const btnTop = document.querySelector("#btn_top");
const btnMenu = document.getElementById("btn_menu");
const menu = document.querySelector(".flx-menu");
const iconMenu = document.querySelector("#icon_menu");
const btnContact = document.querySelector("#btn_contact");

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
                showAlert({
                    title: "En proceso",
                    text: "Pronto estará disponible",
                    icon: "info",
                    timer: 5000
                });
                //window.open("assets/docs/cv2025.pdf", "_blank");
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
<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
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

menu.querySelectorAll("span").forEach(link => {
    link.addEventListener("click", () => {
        const isOpen = menu.style.left === "0px";
        menu.style.left = isOpen ? "-100%" : "0px";
        iconMenu.innerHTML = isOpen ? iconHamburger : iconClose;
    });
});

btnContact.addEventListener("click", () => {
    genera();
    document.querySelector("#nombre").focus();
});

const genera = () => {
    const overlay = document.createElement("div");
    overlay.className = "overlay-m";

    overlay.innerHTML = `
        <div class="card-contact">
            <div class="card-contact-title ff-cal-sans-regular">
                Contacto
                <button class="card-close" id="closeBtn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                </button>
            </div>
            <div class="card-contact-content">
                <div class="tx-pad ff-cal-sans-regular">Comunícate conmigo para más información</div>
                <form class="form-contact" autocomplete="off">
                    <div class="form-grid">
                        <div class="form-group">
                            <label for="nombre">Nombre</label>
                            <input type="text" id="nombre" name="nombre" placeholder="Ingresa tu nombre" tabindex="1">
                            <small class="error-message"></small>
                        </div>
                        <div class="form-group">
                            <label for="telefono">Número de teléfono</label>
                            <input type="tel" id="telefono" name="telefono" placeholder="Ej: 5551234567" pattern="[0-9]+" maxlength="10" tabindex="2">
                            <small class="error-message"></small>
                        </div>
                        <div class="form-group">
                            <label for="correo">Correo electrónico</label>
                            <input type="email" id="correo" name="correo" placeholder="Ingresa tu correo electrónico" tabindex="3">
                            <small class="error-message"></small>
                        </div>
                        <div class="form-group">
                            <label for="servicio">Tipo de servicio</label>
                            <div class="custom-select" id="customSelect">
                                <div class="selected">
                                    <span class="selected-text">Selecciona una opción</span>
                                    <span class="arrow">&#9662;</span>
                                </div>
                                <ul class="options">
                                    <li data-value="Página o sitio web">Página o sitio web</li>
                                    <li data-value="Aplicación web">Aplicación web</li>
                                    <li data-value="API">API</li>
                                    <li data-value="Consultoría">Consultoría</li>
                                    <li data-value="Otro">Otro</li>
                                </ul>
                                <input type="hidden" name="tipo_servicio">
                                <small class="error-message"></small>
                            </div>
                        </div>
                        <div class="form-group full-width">
                            <label for="descripcion">Detalles</label>
                            <textarea id="descripcion" name="contenido" rows="4" placeholder="Ingresa detalles u observaciones" tabindex="4"></textarea>
                            <small class="error-message"></small>
                        </div>
                    </div>
                    <button type="submit" class="btn-submit">Enviar</button>
                </form>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);
    document.body.style.overflow = "hidden";

    // Cerrar modal
    const cierraContact = () => {
        overlay.querySelector(".card-contact").classList.add("fromout-anim");
        overlay.classList.add("overlay-anim");
        overlay.addEventListener("animationend", () => overlay.remove(), { once: true });
        document.body.style.overflow = "auto";
    };

    overlay.addEventListener("click", e => {
        if (e.target.classList.contains("overlay-m")) cierraContact();
    });

    overlay.querySelector("#closeBtn").addEventListener("click", cierraContact);

    // Custom Select
    document.querySelectorAll('.custom-select').forEach(wrapper => {
        const selected = wrapper.querySelector('.selected');
        const selectedText = selected.querySelector('.selected-text');
        const options = wrapper.querySelectorAll('.options li');
        const hiddenInput = wrapper.querySelector('input[type="hidden"]');

        selected.addEventListener('click', () => {
            document.querySelectorAll('.custom-select.open').forEach(s => {
                if (s !== wrapper) s.classList.remove('open');
            });
            wrapper.classList.toggle('open');
        });

        options.forEach(option => {
            option.addEventListener('click', () => {
                selectedText.textContent = option.textContent;
                hiddenInput.value = option.dataset.value;
                wrapper.classList.remove('open');
            });
        });

        document.addEventListener('click', e => {
            if (!wrapper.contains(e.target)) wrapper.classList.remove('open');
        });
    });

    // Envío del formulario
    const form = overlay.querySelector(".form-contact");

    form.addEventListener("submit", async e => {
        e.preventDefault();

        // Limpiar errores anteriores
        form.querySelectorAll(".error-message").forEach(el => el.textContent = "");

        const data = Object.fromEntries(new FormData(form).entries());
        const respuestaEl = form.querySelector(".btn-submit");

        const errores = {};

        // Validaciones frontend
        if (!data.nombre || data.nombre.trim() === "") {
            errores.nombre = "El campo nombre es obligatorio.";
        }

        if (!data.correo || data.correo.trim() === "") {
            errores.correo = "El campo correo es obligatorio.";
        } else if (!/^[\w\.-]+@[\w\.-]+\.\w{2,}$/.test(data.correo)) {
            errores.correo = "El correo electrónico no es válido.";
        }

        if (!data.telefono || data.telefono.trim() === "") {
            errores.telefono = "El campo teléfono es obligatorio.";
        } else if (!/^\d{10}$/.test(data.telefono)) {
            errores.telefono = "El teléfono debe tener 10 dígitos.";
        }

        if (!data.tipo_servicio || data.tipo_servicio.trim() === "") {
            errores.tipo_servicio = "Debes seleccionar un tipo de servicio.";
        }

        if (!data.contenido || data.contenido.trim() === "") {
            errores.contenido = "Este campo no puede estar vacío.";
        }

        // Mostrar errores en el DOM
        if (Object.keys(errores).length > 0) {
            for (let campo in errores) {
                const input = form.querySelector(`[name="${campo}"]`);
                if (input) {
                    let errorEl = input.parentElement.querySelector(".error-message");
                    if (!errorEl) {
                        errorEl = document.createElement("small");
                        errorEl.classList.add("error-message");
                        input.parentElement.appendChild(errorEl);
                    }
                    errorEl.textContent = errores[campo];
                }
            }

            // Enfocar el primer campo con error
            const primerCampo = form.querySelector(`[name="${Object.keys(errores)[0]}"]`);
            if (primerCampo) primerCampo.focus();
            return;
        }

        // Envío si no hay errores
        respuestaEl.classList.add("bcolor");
        respuestaEl.disabled = true;
        respuestaEl.textContent = "Enviando...";

        try {
            const res = await fetch("https://prf-fxbxa0ffdsb8a7g6.canadacentral-01.azurewebsites.net/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            const result = await res.json();

            if (!res.ok && result.errors) {
                for (let campo in result.errors) {
                    const input = form.querySelector(`[name="${campo}"]`);
                    if (input) {
                        let errorEl = input.parentElement.querySelector(".error-message");
                        if (!errorEl) {
                            errorEl = document.createElement("small");
                            errorEl.classList.add("error-message");
                            input.parentElement.appendChild(errorEl);
                        }
                        errorEl.textContent = result.errors[campo][0];
                    }
                }

                showAlert({
                    title: "Errores en el formulario",
                    text: "Revisa los datos que ingresaste.",
                    icon: "warning",
                    timer: 5000
                });
            } else {
                showAlert({
                    title: "Se envió el formulario",
                    text: "Recibí tu contacto. Te contactaré pronto.",
                    icon: "success",
                    timer: 5000
                });
                form.reset();
                cierraContact();
            }
        } catch (err) {
            showAlert({
                title: "No se envió el formulario",
                text: "Ocurrió un problema al enviar. Intenta más tarde.",
                icon: "error",
                timer: 5000
            });
            console.error(err);
        } finally {
            respuestaEl.classList.remove("bcolor");
            respuestaEl.disabled = false;
            respuestaEl.textContent = "Enviar";
        }
    });

};

const showAlert = (obj) => {
    const { title = "", text = "", icon = "info", timer = 3000 } = obj;

    // Crear contenedor si no existe
    let container = document.querySelector(".toast-container");
    if (!container) {
        container = document.createElement("div");
        container.className = "toast-container";
        Object.assign(container.style, {
            position: "fixed",
            top: "1rem",
            right: "1rem",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem"
        });
        document.body.appendChild(container);
    }

    // Crear el toast
    const toast = document.createElement("div");
    toast.className = `toast toast-${icon}`;
    toast.innerHTML = `
        <strong>${title}</strong><br>
        <span>${text}</span>
    `;

    // Estilo básico y animación
    Object.assign(toast.style, {
        background: "#212121",
        color: "#fff",
        padding: "0.75rem 1rem",
        border: "1px solid rgba(255, 255, 255, 0.4)",
        borderRadius: "5px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        minWidth: "200px",
        maxWidth: "300px",
        opacity: 0,
        transform: "translateX(100%)",
        transition: "all 0.5s ease"
    });

    // Color por tipo
    const colores = {
        success: "#4CAF50",
        error: "#F44336",
        info: "#2196F3",
        warning: "#FF9800"
    };

    toast.style.borderLeft = `5px solid ${colores[icon] || "#2196F3"}`;

    // Agregar al contenedor
    container.appendChild(toast);

    // Forzar animación
    requestAnimationFrame(() => {
        toast.style.opacity = 1;
        toast.style.transform = "translateX(0)";
    });

    // Ocultar luego del tiempo
    setTimeout(() => {
        toast.style.opacity = 0;
        toast.style.transform = "translateX(100%)";
        toast.addEventListener("transitionend", () => {
            toast.remove();
        });
    }, timer);
}
