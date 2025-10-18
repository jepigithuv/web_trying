// Data Produk
const products = [
    { id: 1, name: 'Bundling T-Shirt & Bandana', price: 150000, image: 'WhatsApp Image 2025-10-18 at 13.24.20 (1).jpeg' },
    { id: 2, name: 'T-Shirt True Love', price: 120000, image: 'assets/jam2.jpg' },
    { id: 3, name: 'T-Shirt 0322 Troops', price: 120000, image: 'WhatsApp Image 2025-10-18 at 13.34.46.jpeg' },
    { id: 4, name: 'T-Shirt Forever Blue Brigade', price: 120000, image: 'assets/kacamata4.jpg' },
];

// Keranjang belanja
let cart = [];

// Elemen DOM
const productListEl = document.getElementById('product-list');
const cartCountEl = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const cartButton = document.getElementById('cart-button');
const closeButton = document.querySelector('.close-button');
const cartItemsEl = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

// Format ke Rupiah
const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);
};

// 1. Tampilkan Produk
function renderProducts() {
    productListEl.innerHTML = '';
    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h3>${product.name}</h3>
            <p class="product-price">${formatRupiah(product.price)}</p>
            <button class="btn primary-btn add-to-cart-btn" data-id="${product.id}">Tambahkan ke Keranjang</button>
        `;
        productListEl.appendChild(card);
    });

    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            addToCart(productId);
        });
    });
}

// 2. Tambahkan ke Keranjang
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartDisplay();
    alert(`${product.name} telah ditambahkan ke keranjang!`);
}

// 3. Hapus Item
function removeItem(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
}

// 4. Update Tampilan Keranjang
function updateCartDisplay() {
    cartItemsEl.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        const p = document.createElement('p');
        p.classList.add('empty-cart-message');
        p.textContent = 'Keranjang Anda masih kosong.';
        cartItemsEl.appendChild(p);
        checkoutBtn.disabled = true;
    } else {
        checkoutBtn.disabled = false;
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const div = document.createElement('div');
            div.classList.add('cart-item');
            div.innerHTML = `
                <div class="cart-item-info">
                    <span class="item-name">${item.name} (x${item.quantity})</span><br>
                    <span class="item-price">${formatRupiah(item.price)} per unit</span>
                </div>
                <span>${formatRupiah(itemTotal)}</span>
                <button class="remove-btn" data-id="${item.id}">Hapus</button>
            `;
            cartItemsEl.appendChild(div);
        });
    }

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountEl.textContent = totalItems;
    cartTotalEl.textContent = formatRupiah(total);

    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            removeItem(productId);
        });
    });
}

// 5. Checkout (Demo)
function handleCheckout() {
    if (cart.length === 0) {
        alert("Keranjang Anda kosong! Silakan tambahkan produk.");
        return;
    }

    const orderDetails = cart.map(item => `${item.name} (x${item.quantity})`).join('\n');
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    alert(`
        --- Pesanan Anda (DEMO) ---
        ${orderDetails}
        
        Total Akhir: ${formatRupiah(total)}
        
        Terima kasih! (Simulasi tanpa pembayaran nyata)
    `);

    cart = [];
    updateCartDisplay();
    cartModal.style.display = 'none';
}

// 6. Event Modal
cartButton.onclick = function() {
    cartModal.style.display = 'block';
    updateCartDisplay();
};

closeButton.onclick = function() {
    cartModal.style.display = 'none';
};

window.onclick = function(event) {
    if (event.target == cartModal) {
        cartModal.style.display = 'none';
    }
};

checkoutBtn.addEventListener('click', handleCheckout);

// Inisialisasi
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartDisplay();
});
