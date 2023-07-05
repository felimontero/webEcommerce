
const shopContent = document.querySelector("#shopContent");
const showCart = document.querySelector("#showCart");
const modalContainer = document.querySelector("#modal-container")
const cartAmount = document.querySelector("#cantidadCarrito")

//Function para traer los productos del archivo JSON 
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const getProducts = async () => {
    const response = await fetch("../js/products.json");
    const data = await response.json();


    //Creacion de cards para los productos 
    data.forEach((product) => {
        let content = document.createElement("div");
        content.className = "producto1"
        content.innerHTML = `
    <img id="shopContent" class="img" src="${product.img}">
    <h3 class="descripcion">${product.nombre}</h3>
    <p class="descripcion">$${product.precio}</p>
    `;

        shopContent.append(content);

        let buy = document.createElement("button");
        buy.innerText = "Comprar";
        buy.className = "normal";

        content.append(buy);

        buy.addEventListener("click", () => {
            const repeat = cart.some((repeatProduct) => repeatProduct.id === product.id);
            if (repeat) {
                cart.map((prod) => {
                    if (prod.id === product.id) {
                        prod.cantidad++;
                    }
                });
            } else {
                cart.push({
                    id: product.id,
                    img: product.img,
                    nombre: product.nombre,
                    precio: product.precio,
                    cantidad: product.cantidad,
                });
                console.log(cart);
                console.log(cart.length);
                cartCounter();
                saveLocal();
            }
        });
    });

//Modal donde se encuentra el carrito de compras
    const shoppingCart = () => {
        modalContainer.innerHTML = "";
        modalContainer.style.display = "flex";
        const modalHeader = document.createElement("div");
        modalHeader.className = "modal-header"
        modalHeader.innerHTML = `
    <h2 class="modal-header-title">CARRITO DE COMPRAS</h2>
    `;
        modalContainer.append(modalHeader);

        const modalButton = document.createElement("h2");
        modalButton.innerText = "x";
        modalButton.className = "modal-header-button";

        modalButton.addEventListener("click", () => {
            modalContainer.style.display = "none";
        });

        modalHeader.append(modalButton);

        //Descripcion dentro del modal carrito
        cart.forEach((product) => {
            let cartContent = document.createElement("div");
            cartContent.className = "modal-content";
            cartContent.innerHTML = `
        <img src="${product.img}">
        <h3 class="descripcion">${product.nombre}</h3>
        <p class="descripcion">$${product.precio}</p>
        <span class="restar"> - </span>
        <p class="descripcion"> Cantidad: ${product.cantidad}</p>
        <span class="sumar"> + </span>
        <p class="descripcion">Total: $${product.cantidad * product.precio}</p>
        <span class="delete-product"> X </span>
        `;

            modalContainer.append(cartContent);


            //Sumar y restar cantidades dentro del modal carrito
            let substract = cartContent.querySelector(".restar");
            substract.addEventListener("click", () => {
                if (product.cantidad !== 1) {
                    product.cantidad--;
                }
                saveLocal();
                shoppingCart();
            });

            let sum = cartContent.querySelector(".sumar");
            sum.addEventListener("click", () => {
                product.cantidad++;
                saveLocal();
                shoppingCart();
            });

            let erase = cartContent.querySelector(".delete-product");
            erase.addEventListener("click", () => {
                deleteProduct(product.id);
            })
        });

        //Cuenta para calcular el total a pagar del modal carrito
        const total = cart.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

        const totalBuying = document.createElement("div");
        totalBuying.className = "total-content";
        totalBuying.innerHTML = `Total a pagar: $${total}`;
        modalContainer.append(totalBuying);
    };

    showCart.addEventListener("click", shoppingCart);

    //Borrar producto del modal carrito
    const deleteProduct = (id) => {
        const foundId = cart.find((Element) => Element.id === id);

        cart = cart.filter((cartId) => {
            return cartId !== foundId;
        });

        cartCounter();
        saveLocal();
        shoppingCart();
    };

    const cartCounter = () => {
        cartAmount.style.display = "block";
        const cartLength = cart.length;
        localStorage.setItem("cartLength", JSON.stringify(cartLength));
        cartAmount.innerText = JSON.parse(localStorage.getItem("cartLength"));
    };
    cartCounter();
};

//Llama a la function async para traer los productos que se encuentran en el JSON 
getProducts();

//Local Storage
//set item (guardar)
const saveLocal = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
};