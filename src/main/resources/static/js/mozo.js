let orderId = 1000;

const orders = [
  { id: 1001, status: 'En preparación' },
  { id: 1002, status: 'Listo para entregar' }
];

function showSection(section) {
  document
    .querySelectorAll(".section")
    .forEach((s) => s.classList.remove("active"));
  document.querySelector(`.${section}`).classList.add("active");
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