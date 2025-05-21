// Obtener referencias a los elementos del carrito
const cartIcon = document.getElementById('cartIcon');
const cartContainer = document.getElementById('cartContainer');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');

// Mostrar/Ocultar el carrito al hacer clic en el ícono
cartIcon.addEventListener('click', () => {
 cartContainer.classList.toggle('show');
});

// Cargar el carrito desde localStorage
function loadCart() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    cartCount.textContent = carrito.length;

    cartItems.innerHTML = '';
    let total = 0;

    if (carrito.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; padding: 10px;">El carrito está vacío.</p>';
        cartTotal.textContent = 'Total: $0.00';
        checkoutBtn.style.display = 'none';
        return;
    }
    checkoutBtn.style.display = 'block';

    carrito.forEach((producto, index) => {
        const item = document.createElement('div');
        item.classList.add('cart-item');
        item.innerHTML = `
            <div>
                <p><strong>${producto.nombre}</strong></p>
                <p>Precio: ${producto.precio}</p>
            </div>
            <button class="remove-btn" data-index="${index}">Eliminar</button>
        `;
        cartItems.appendChild(item);

        // Sumar el precio al total
        total += parseFloat(producto.precio.replace('$', ''));
    });

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;

    // Agregar funcionalidad a los botones "Eliminar"
    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            removeFromCart(index);
        });
    });
}

// Eliminar un producto del carrito
function removeFromCart(index) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    loadCart();
}

// Comprar todo
checkoutBtn.addEventListener('click', () => {
    alert('Gracias por tu compra.');
    localStorage.removeItem('carrito');
    loadCart();
});

// Cargar el carrito al cargar la página
loadCart();