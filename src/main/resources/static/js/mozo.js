let orderId = 1000;

const orders = [
  { id: 1001, status: 'En preparación' },
  { id: 1002, status: 'Listo para entregar' }
];

function showSection(section) {
  // Ocultar todas las secciones
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelector(`.${section}`).classList.add('active');

  // Quitar resaltado de todos los botones
  document.querySelectorAll('.menu-bar button').forEach(btn => btn.classList.remove('active-btn'));

  // Resaltar el botón correspondiente
  const buttons = {
    order: document.querySelector(".menu-bar button:nth-child(1)"),
    status: document.querySelector(".menu-bar button:nth-child(2)"),
    history: document.querySelector(".menu-bar button:nth-child(3)")
  };

  if (buttons[section]) {
    buttons[section].classList.add("active-btn");
  }
}

function showOrdersStatus() {
  const statusContainer = document.getElementById('ordersStatus');
  statusContainer.innerHTML = orders.map(order => `
    <div class="order-card ${order.status === 'Listo para entregar' ? 'ready' : 'preparation'}">
      Pedido #${order.id} - ${order.status}
    </div>
  `).join('');
}

function changeQuantity(id, change) {
  const qtyElement = document.getElementById(id);
  let qty = parseInt(qtyElement.textContent) + change;
  qtyElement.textContent = qty < 0 ? 0 : qty;
}

function showPopup() {
  document.getElementById("popup").style.display = "flex";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  showSection('order');
  showOrdersStatus();
});