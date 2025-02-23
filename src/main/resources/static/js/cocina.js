const pedidos = [
  { numero: 1001, items: ["Pizza", "Gaseosa"], comentario: "Sin sal" },
  { numero: 1002, items: ["Hamburguesa", "Jugo"], comentario: "" },
  { numero: 1003, items: ["Ensalada", "Agua"], comentario: "Sin aderezo" },
];

function renderOrders() {
  const ordersContainer = document.getElementById("orders");
  ordersContainer.innerHTML = "";

  pedidos.forEach((pedido) => {
    const orderDiv = document.createElement("div");
    orderDiv.classList.add("order-container");

    orderDiv.innerHTML = `
            <div class="order-number">Pedido #${pedido.numero}</div>
            <div class="order-items">${pedido.items.join(", ")}</div>
            ${
              pedido.comentario
                ? `<div class="order-comment">${pedido.comentario}</div>`
                : ""
            }
            <button class="ready-btn" onclick="markAsReady(${
              pedido.numero
            })">Listo para entregar</button>
        `;

    ordersContainer.appendChild(orderDiv);
  });
}

function markAsReady(numeroPedido) {
  alert(`Pedido #${numeroPedido} está listo para entregar.`);
  pedidos.splice(
    pedidos.findIndex((p) => p.numero === numeroPedido),
    1
  );
  renderOrders();
}

function obtenerPedidosCocina() {
  fetch("http://localhost:8080/pedidos")
    .then((response) => response.json())
    .then((data) => {
      if (data.status) {
        let pedidos = data.data;
        let contenedor = document.getElementById("listaPedidos");
        contenedor.innerHTML = ""; // Limpiar pedidos anteriores

        pedidos.forEach((pedido) => {
          let item = document.createElement("div");
          item.innerHTML = `
                        <h3>Pedido #${pedido.numeroDiario}</h3>
                        <p>Estado: ${pedido.estado}</p>
                        <p>Productos: ${pedido.listaProductos
                          .map((p) => p.nombre)
                          .join(", ")}</p>
                        <hr>
                    `;
          contenedor.appendChild(item);
        });
      }
    })
    .catch((error) => console.error("Error obteniendo pedidos:", error));
}

// Llamar a la función cada 5 segundos para actualizar los pedidos en cocina
setInterval(obtenerPedidosCocina, 5000);

function logout() {
  if (confirm("¿Estás seguro de que quieres cerrar sesión?")) {
    // Aquí puedes agregar la lógica de logout, como redireccionar o limpiar tokens
    window.location.href = "login.html"; // Redirige a la página de login
  }
}

document.addEventListener("DOMContentLoaded", renderOrders);