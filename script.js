// Data Produk
const products = [
    { id: 1, name: 'Cincin Berlian Klasik', price: 15000000, image: 'assets/cincin1.jpg' },
    { id: 2, name: 'Jam Tangan Kulit Mewah', price: 8500000, image: 'assets/jam2.jpg' },
    { id: 3, name: 'Tas Tangan Kulit Asli', price: 4200000, image: 'assets/tas3.jpg' },
    { id: 4, name: 'Kacamata Desainer', price: 2800000, image: 'assets/kacamata4.jpg' },
    // Tambahkan lebih banyak produk di sini
];

let cart = []; // Array untuk menyimpan item di keranjang

// DOM Elements
const productListEl = document.getElementById('product-list');
const cartCountEl = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const cartButton = document.getElementById('cart-button');
const closeButton = document.querySelector('.close-button');
const cartItemsEl = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const emptyCartMessage = cartItemsEl.querySelector('.empty-cart-message');

// Fungsi untuk format mata uang Rupiah
const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);
};

// 1. Menampilkan Produk ke Halaman
function renderProducts() {
    productListEl.innerHTML = ''; // Bersihkan kontainer
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

    // Pasang Event Listener ke semua tombol "Tambahkan ke Keranjang"
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            addToCart(productId);
        });
    });
}

// 2. Menambahkan Produk ke Keranjang
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    // Cek apakah produk sudah ada di keranjang
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartDisplay();
    alert("${product.name}" telah ditambahkan ke keranjang!); // Notifikasi sederhana
}

// 3. Menghapus Item dari Keranjang
function removeItem(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
}

// 4. Update Tampilan Keranjang (Modal) dan Hitungan
function updateCartDisplay() {
    cartItemsEl.innerHTML = ''; // Bersihkan item di modal
    let total = 0;

    if (cart.length === 0) {
        // Tampilkan pesan keranjang kosong jika keranjang kosong
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

    // Update hitungan di ikon keranjang
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountEl.textContent = totalItems;
    
    // Update total harga
    cartTotalEl.textContent = formatRupiah(total);
    
    // Pasang Event Listener ke tombol Hapus
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            removeItem(productId);
        });
    });
}

// 5. Menangani Checkout (Fungsionalitas Demo)
function handleCheckout() {
    if (cart.length === 0) {
        alert("Keranjang Anda kosong! Silakan tambahkan produk.");
        return;
    }
    
    // ***********************
    // Catatan Penting: 
    // Untuk toko online sungguhan, pada titik ini Anda akan mengirim data 
    // keranjang ke server untuk diproses (pembayaran, pengiriman, dll.).
    // Karena ini murni frontend (GitHub Pages), kita hanya bisa memberi demo.
    // ***********************

    const orderDetails = cart.map(item => ${item.name} (x${item.quantity})).join('\n');
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    alert(`
        --- Pesanan Anda (DEMO) ---
        ${orderDetails}
        
        Total Akhir: ${formatRupiah(total)}
        
        Terima kasih! (Diperlukan backend untuk proses pembayaran dan pesanan nyata)
    `);

    // Kosongkan keranjang setelah checkout (simulasi)
    cart = [];
    updateCartDisplay();
    cartModal.style.display = 'none';
}

// 6. Event Listeners untuk Modal
cartButton.onclick = function() {
    cartModal.style.display = 'block';
    updateCartDisplay(); // Pastikan keranjang diperbarui saat modal dibuka
}

closeButton.onclick = function() {
    cartModal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == cartModal) {
        cartModal.style.display = 'none';
    }
}

checkoutBtn.addEventListener('click', handleCheckout);

// Inisialisasi: Render Produk saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartDisplay(); // Tampilkan 0 item saat pertama kali dimuat
});
