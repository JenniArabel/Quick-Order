package gc._4.pr2.grupo1.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import gc._4.pr2.grupo1.dto.ResponseDTO;
import gc._4.pr2.grupo1.entity.Pedidos;
import gc._4.pr2.grupo1.service.IPedidosService;

@RestController
@RequestMapping("/pedidos")
@CrossOrigin(origins = "*") // Permitir solicitudes desde el frontend
public class PedidosController {
	@Autowired
	private IPedidosService service;
	
	@GetMapping
	public ResponseDTO<List<Pedidos>> mostrarTodosPedidos(){
		return service.mostrarTodos().isEmpty()?new ResponseDTO<>(false,"Listado Vacio",service.mostrarTodos()):new ResponseDTO<>(true,"Listado",service.mostrarTodos());	
	}
	
	@GetMapping("/{id}")
	public ResponseDTO<?> mostrarPedidosId(@PathVariable("id") Long id){
		return service.existe(id)?new ResponseDTO<>(true,"Encontrado",service.mostrarPorId(id)):new ResponseDTO<>(false,"No Encontrado");
	}
	
	@PostMapping("/pedidos")
	public ResponseDTO<?> crearNuevoPedido(@RequestBody Pedidos pedido) {
		// Generar número de pedido diario automáticamente
		pedido.setNumeroDiario(service.generarNumeroPedidoDiario());

		// Guardar el pedido en la base de datos
		Pedidos nuevoPedido = service.guardar(pedido);
		
		return new ResponseDTO<>(true, "Pedido creado con éxito.", nuevoPedido);
	}

	@PutMapping
	public ResponseDTO<?> actualizarNuevoPedidos(@RequestBody Pedidos pedidosDesdeElServicio){
		return service.existe(pedidosDesdeElServicio.getId())?new ResponseDTO<>(true,"Modificado",service.guardar(pedidosDesdeElServicio)):new ResponseDTO<>(false,"Este elemento no existe.");
	}
	
	@DeleteMapping("/{id}")
	public ResponseDTO<?> borrarPedidos(@PathVariable("id") Long id){
		if(service.existe(id)) {
			service.eliminarPorId(id);
		}
		return service.existe(id)?new ResponseDTO<>(true,"Eliminado"):new ResponseDTO<>(false,"Este elemento no existe, No se puede eliminar");
	}

	//ACTUALIZAR ESTADO DEL PEDIDO
	@PutMapping("/{id}/estado")
    public ResponseDTO<?> actualizarEstado(@PathVariable("id") Long id, @RequestParam("estado") String estado) {
        if (!service.existe(id)) {
            return new ResponseDTO<>(false, "Pedido no encontrado");
        }
        Pedidos pedido = service.mostrarPorId(id);
        pedido.setEstado(estado);
        service.guardar(pedido);
        return new ResponseDTO<>(true, "Estado actualizado", pedido);
    }
	
	// BUSCAR POR ESTADO DE LOS PEDIDOS
	@GetMapping("/estado/{estado}")
    public ResponseDTO<List<Pedidos>> obtenerPedidosPorEstado(@PathVariable("estado") String estado) {
        List<Pedidos> pedidos = service.obtenerPorEstado(estado);
        return pedidos.isEmpty() ? new ResponseDTO<>(false, "No hay pedidos en este estado") : new ResponseDTO<>(true, "Pedidos encontrados", pedidos);
    }
}