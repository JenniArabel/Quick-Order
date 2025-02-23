package gc._4.pr2.grupo1.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.ManyToOne;

@Entity
public class Factura {
	// ATRIBUTOS
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id; 
	private String detalle;
	private int total;
	private String metodoDePago;
	
	// RELACIONES CON OTRAS ENTIDADES
	@OneToOne
	private Pedidos pedidos;
	
	@ManyToOne
	@JoinColumn(name = "empleado_id")
	private Empleado empleado;
		
	// METODOS GETTERS Y SETTERS
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getDetalle() {
		return detalle;
	}
	public void setDetalle(String detalle) {
		this.detalle = detalle;
	}
	public int getTotal() {
		return total;
	}
	public void setTotal(int total) {
		this.total = total;
	}
	public String getMetodoDePago() {
		return metodoDePago;
	}
	public void setMetodoDePago(String metodoDePago) {
		this.metodoDePago = metodoDePago;
	}
	public Empleado getEmpleado() {
		return empleado;
	}
	public void setEmpleado(Empleado empleado) {
		this.empleado = empleado;
	}
}