document.addEventListener("DOMContentLoaded", () => {
    // Registro de Service Worker y solicitud de permisos de notificaciones
    if ('serviceWorker' in navigator && 'PushManager' in window) {
        navigator.serviceWorker.register('serviceworker.js')
            .then(() => console.log('Service Worker registrado'))
            .catch(err => console.error('Falló el registro de Service Worker:', err));

        Notification.requestPermission(permission => {
            if (permission === 'granted') {
                console.log('Permiso de notificaciones concedido.');
            } else {
                console.log('Permiso de notificaciones denegado.');
            }
        });
    }

    let db;
    function initDB() {
        let request = indexedDB.open("productosDB", 1);
        request.onupgradeneeded = (event) => {
            db = event.target.result;
            db.createObjectStore("productos", { keyPath: "id" });
        };
        request.onsuccess = (event) => {
            db = event.target.result;
            loadProducts();
        };
    }

    async function loadProducts() {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        const tx = db.transaction("productos", "readwrite");
        const store = tx.objectStore("productos");

        data.products.forEach(product => store.put(product));
        tx.oncomplete = () => displayProducts();
    }

    function displayProducts() {
        const tx = db.transaction("productos", "readonly");
        const store = tx.objectStore("productos");
        const productsContainer = document.getElementById("productsContainer");
        productsContainer.innerHTML = "";

        store.openCursor(null, "prev").onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) {
                const product = cursor.value;
                productsContainer.innerHTML += `
                    <div class="col-md-4 mb-4">
                        <div class="card h-100">
                            <img src="${product.thumbnail || 'https://via.placeholder.com/150?text=Imagen+no+disponible'}" class="card-img-top img-fluid" style="height: 200px; object-fit: cover;" alt="${product.title}">
                            <div class="card-body">
                                <h5 class="card-title">${product.title}</h5>
                                <p class="card-text">${product.description}</p>
                                <p><strong>Precio:</strong> $${product.price.toFixed(2)}</p>
                                <p><strong>Stock:</strong> ${product.stock}</p>
                                <button class="btn btn-warning btn-sm edit-btn" data-id="${product.id}">Editar</button>
                                <button class="btn btn-danger btn-sm delete-btn" data-id="${product.id}">Eliminar</button>
                            </div>
                        </div>
                    </div>
                `;
                cursor.continue();
            }
        };
    }

    document.getElementById("productForm").addEventListener("submit", (event) => {
        event.preventDefault();
        const id = document.getElementById("productId").value || Date.now();
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const category = document.getElementById("category").value;
        const price = parseFloat(document.getElementById("price").value);
        const stock = parseInt(document.getElementById("stock").value);
        const imageUrl = document.getElementById("imageUrl").value;

        const tx = db.transaction("productos", "readwrite");
        const store = tx.objectStore("productos");
        const product = { id: Number(id), title, description, category, price, stock, thumbnail: imageUrl };

        // Verifica si el producto ya existe
        const request = store.get(product.id);
        request.onsuccess = () => {
            const isEdit = request.result !== undefined;

            // Agrega o actualiza el producto
            store.put(product);
            tx.oncomplete = () => {
                displayProducts();
                bootstrap.Modal.getInstance(document.getElementById('productModal')).hide();
                document.getElementById("productForm").reset();
                document.getElementById("productId").value = "";
                document.getElementById("modalLabel").textContent = "Añadir producto";

                let tx = "";
                // Muestra el toast correspondiente
                if (isEdit) {
                    tx = `Se editó el producto "${title}"`
                    showToast(tx);
                } else {
                    tx = `Se añadió el producto "${title}"`
                    showToast(tx);
                }

                // Notificación push
                if (Notification.permission === 'granted') {
                    navigator.serviceWorker.ready.then(registration => {
                        registration.showNotification('Listo', {
                            body: tx,
                            icon: 'img/icons/android-icon-96x96.png',
                        });
                    });
                }
            };
        };
    });

    document.getElementById("productsContainer").addEventListener("click", (event) => {
        if (event.target.classList.contains("edit-btn")) {
            const id = Number(event.target.getAttribute("data-id"));
            const tx = db.transaction("productos", "readonly");
            const store = tx.objectStore("productos");
            const request = store.get(id);

            request.onsuccess = () => {
                const product = request.result;
                document.getElementById("productId").value = product.id;
                document.getElementById("title").value = product.title;
                document.getElementById("description").value = product.description;
                document.getElementById("category").value = product.category;
                document.getElementById("price").value = product.price;
                document.getElementById("stock").value = product.stock;
                document.getElementById("imageUrl").value = product.thumbnail;
                document.getElementById("modalLabel").textContent = "Editar producto";
                new bootstrap.Modal(document.getElementById("productModal")).show();
            };
        } else if (event.target.classList.contains("delete-btn")) {
            const id = Number(event.target.getAttribute("data-id"));
            const tx = db.transaction("productos", "readonly");
            const store = tx.objectStore("productos");
            const request = store.get(id);

            request.onsuccess = () => {
                const product = request.result;
                document.getElementById("deleteProductName").textContent = `"${product.title}"`;
                const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
                deleteModal.show();

                document.getElementById("confirmDeleteBtn").onclick = () => {
                    const tx = db.transaction("productos", "readwrite");
                    const store = tx.objectStore("productos");
                    store.delete(id);
                    tx.oncomplete = () => {
                        displayProducts();
                        showToast(`Se eliminó el producto "${product.title}"`, 'danger');
                        deleteModal.hide();
                    };
                };
            };
        }
    });

    // Función para mostrar Toast
    function showToast(message, type = 'success') {
        const toastContainer = document.getElementById("toast-container");
        const toastElement = document.createElement("div");
        toastElement.classList.add('toast');
        toastElement.classList.add(`bg-${type}`);
        toastElement.setAttribute('role', 'alert');
        toastElement.setAttribute('aria-live', 'assertive');
        toastElement.setAttribute('aria-atomic', 'true');

        toastElement.innerHTML = `
            <div class="toast-body" style="color: #fff;">
                ${message}
            </div>
        `;

        toastContainer.appendChild(toastElement);

        // Muestra el toast
        const toast = new bootstrap.Toast(toastElement, { delay: 3000 });
        toast.show();

        // Eliminar el toast después de mostrarlo
        toastElement.addEventListener('hidden.bs.toast', () => {
            toastContainer.removeChild(toastElement);
        });
    }

    document.getElementById("addProductBtn").addEventListener("click", () => {
        document.getElementById("productForm").reset();
        document.getElementById("productId").value = "";
        document.getElementById("modalLabel").textContent = "Añadir Producto";
        new bootstrap.Modal(document.getElementById("productModal")).show();
    });

    initDB();

    //Checar estado
    function checkConnection() {
        if (!navigator.onLine) {
            console.log("Sin conexión");
            // Crear y mostrar el badge si no está ya presente
            if (!document.getElementById("offlineBadge")) {
                const badge = document.createElement("span");
                badge.id = "offlineBadge";
                badge.className = "badge bg-secondary mb-3";
                badge.innerText = "Estás sin conexión. Algunas funciones no están disponibles.";

                // Insertar el badge al principio de productList
                const productList = document.getElementById("productList");
                productList.insertBefore(badge, productList.children[1]);
            }
        } else {
            console.log("Conexión establecida");
            // Eliminar el badge si vuelve la conexión
            const offlineBadge = document.getElementById("offlineBadge");
            if (offlineBadge) {
                offlineBadge.remove();
            }
        }
    }

    // Detecta cambios en la conexión
    window.addEventListener('online', checkConnection);
    window.addEventListener('offline', checkConnection);

    // Llama a la función al cargar la página
    checkConnection();

});
