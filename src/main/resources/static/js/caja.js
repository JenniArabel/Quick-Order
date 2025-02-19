const pedidos = [
  {
    numero: 1001,
    items: [
      { nombre: "Pizza", precio: 10 },
      { nombre: "Gaseosa", precio: 3 },
    ],
    propina: false,
  },
  {
    numero: 1002,
    items: [
      { nombre: "Hamburguesa", precio: 8 },
      { nombre: "Jugo", precio: 4 },
    ],
    propina: false,
  },
];

function renderOrders() {
  const ordersContainer = document.getElementById("orders");
  ordersContainer.innerHTML = "";

  pedidos.forEach((pedido) => {
    const total = pedido.items.reduce((sum, item) => sum + item.precio, 0);
    const totalConPropina = (total * 1.15).toFixed(2);

    const orderDiv = document.createElement("div");

    orderDiv.classList.add("order-container");

    orderDiv.innerHTML = `
            <div class="order-number"> Pedido #${pedido.numero} </div>

            <div class="order-items">
                ${pedido.items.map((item) => `<p>${item.nombre} - $${item.precio}</p>`).join("")}
            </div>

            <div class="order-total"> Total: $${total.toFixed(2)} </div>

            <div class="order-total"> Total con propina (15%): $${totalConPropina} </div>

            <div class="payment-section">
                <label> ¿Incluir propina? </label>

                <select onchange="updateTotal(this, ${total})">
                    <option value="no"> No </option>
                    <option value="si"> Sí </option>
                </select>

                <label> Método de pago: </label>

                <select>
                    <option value="efectivo"> Efectivo </option>
                    <option value="tarjeta"> Tarjeta </option>
                </select>

                <label> Pago del cliente: </label>

                <input type="number" placeholder="Ingrese cantidad">

                <button class="finalize-btn" onclick="finalizarPedido(${pedido.numero})"> Finalizar Pago </button>
            </div>
        `;

    ordersContainer.appendChild(orderDiv);
  });
}

function updateTotal(select, total) {
  const orderContainer = select.closest(".order-container");
  const totalElement = orderContainer.querySelectorAll(".order-total")[1];
  totalElement.textContent =
    select.value === "si"
      ? `Total con propina (15%): $${(total * 1.15).toFixed(2)}`
      : `Total con propina (15%): $${total.toFixed(2)}`;
}

function finalizarPedido(numeroPedido) {
  alert(`Pago del pedido #${numeroPedido} finalizado.`);
  pedidos.splice(pedidos.findIndex((p) => p.numero === numeroPedido), 1);
  renderOrders();
}

document.addEventListener("DOMContentLoaded", renderOrders);