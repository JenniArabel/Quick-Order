const pedidos = [
    { numero: 1001, items: ['Pizza', 'Gaseosa'], comentario: 'Sin sal' },
    { numero: 1002, items: ['Hamburguesa', 'Jugo'], comentario: '' },
    { numero: 1003, items: ['Ensalada', 'Agua'], comentario: 'Sin aderezo' }
];

function renderOrders() {
    const ordersContainer = document.getElementById('orders');
    ordersContainer.innerHTML = '';
    
    pedidos.forEach(pedido => {
        const orderDiv = document.createElement('div');
        orderDiv.classList.add('order-container');
        
        orderDiv.innerHTML = `
            <div class="order-number">Pedido #${pedido.numero}</div>
            <div class="order-items">${pedido.items.join(', ')}</div>
            ${pedido.comentario ? `<div class="order-comment">${pedido.comentario}</div>` : ''}
            <button class="ready-btn" onclick="markAsReady(${pedido.numero})">Listo para entregar</button>
        `;
        
        ordersContainer.appendChild(orderDiv);
    });
}

function markAsReady(numeroPedido) {
    alert(`Pedido #${numeroPedido} está listo para entregar.`);
    pedidos.splice(pedidos.findIndex(p => p.numero === numeroPedido), 1);
    renderOrders();
}

document.addEventListener("DOMContentLoaded", renderOrders);