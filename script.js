
document.addEventListener('DOMContentLoaded', () => {

  const products = [
    { id:1, name:'Organic Cotton Tee', category:'tops', price:799, desc:'Soft GOTS-certified cotton tee.', img:'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
    { id:2, name:'Linen Summer Shirt', category:'tops', price:1299, desc:'Lightweight breathable linen.', img:'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
    { id:3, name:'Recycled Denim Pants', category:'pants', price:1999, desc:'Durable, low-water denim.', img:'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
    { id:4, name:'Handloom Scarf', category:'home', price:699, desc:'Artisan hand-loomed scarf.', img:'https://5.imimg.com/data5/ECOM/Default/2023/6/313354990/WK/PA/YJ/159110959/minimal-striped-handloom-scarf-patrah-281-womens-scarf-brown-living-688913-1000x1000.jpg' },
    { id:5, name:'Bamboo Socks (3-pack)', category:'home', price:499, desc:'Moisture-wicking bamboo.', img:'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
    { id:6, name:'Organic Joggers', category:'pants', price:1499, desc:'Comfort-fit organic joggers.', img:'https://images.unsplash.com/photo-1623393807193-e095f7944161?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687' }
  ];

  const productGrid = document.getElementById('product-grid');
  const filterSelect = document.getElementById('filter-select');
  const cartCountEl = document.getElementById('cart-count');

  
  document.getElementById('year').textContent = new Date().getFullYear();

  function renderProducts(filter = 'all') {
    productGrid.innerHTML = '';
    const filtered = products.filter(p => filter === 'all' ? true : p.category === filter);
    if(filtered.length === 0){
      productGrid.innerHTML = '<p>No products found for this category.</p>';
      return;
    }
    filtered.forEach(p => {
      const card = document.createElement('div');
      card.className = 'product';
      card.innerHTML = `
        <div class="thumb">
          <img src="${escapeHtml(p.img)}" alt="${escapeHtml(p.name)}" loading="lazy">
        </div>
        <h4>${escapeHtml(p.name)}</h4>
        <p class="muted">${escapeHtml(p.desc)}</p>
        <div style="display:flex;justify-content:space-between;align-items:center;gap:0.6rem;">
          <div class="price">₹${p.price}</div>
          <button class="add-btn" data-id="${p.id}">Add</button>
        </div>
      `;
      productGrid.appendChild(card);
    });
  }


  function escapeHtml(str){
    return String(str).replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
  }

  let cart = 0;
  function updateCartCount(){
    cartCountEl.textContent = cart;
  }

  productGrid.addEventListener('click', (e) => {
    if(e.target.matches('.add-btn')){
      cart++;
      updateCartCount();
      e.target.textContent = 'Added';
      e.target.disabled = true;
      setTimeout(()=>{ e.target.textContent = 'Add'; e.target.disabled = false; }, 900);
    }
  });

  filterSelect.addEventListener('change', (ev) => {
    renderProducts(ev.target.value);
  });

  renderProducts();

  const menuBtn = document.getElementById('menu-btn');
  const nav = document.getElementById('main-nav');
  menuBtn.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    status.textContent = '';
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if(name.length < 2){
      status.textContent = 'Please enter a valid name.';
      return;
    }
    if(!/^\S+@\S+\.\S+$/.test(email)){
      status.textContent = 'Please enter a valid email address.';
      return;
    }
    if(message.length < 10){
      status.textContent = 'Message should be at least 10 characters.';
      return;
    }


    submitBtn.classList.add('loading');
    submitBtn.disabled = true;


    status.textContent = 'Sending…';
    setTimeout(() => {
      status.textContent = 'Thanks! We received your message and will reply soon.';
      form.reset();
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }, 1500); 
  });

  nav.addEventListener('click', (e) => {
    if(e.target.tagName === 'A') nav.classList.remove('open');
  });

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  window.ecothread = { renderProducts, products, updateCartCount };
});
