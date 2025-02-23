package gc._4.pr2.grupo1.entity;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
public class Pedidos {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id; //Unico e incremental. Incrementa indefinidamente. Nro unico en la base de datos.
	
	private int numeroDiario; //Nro incremental que se reinicia cada dia.
	
	@Temporal(TemporalType.DATE)
	private Date fechaPedido; //Se usará para reiniciar la numeracion diaria
	
	private String estado;
	
	// RELACIONES CON OTRAS ENTIDADES
	@OneToOne(mappedBy="pedidos")
	private Factura factura;
	
	@ManyToMany(mappedBy = "Lista_PedidosM")
	private Set<Mesa> Lista_Mesas = new HashSet<>();

	@ManyToMany(mappedBy = "Lista_PedidosP")
	private Set<Productos>  Lista_Productos = new HashSet<>();

    @ManyToOne
    @JoinColumn(name="empleado_id")
    private Empleado empleado;
    
    @ManyToMany
    @JoinTable(
        name = "pedido_productos",
        joinColumns = @JoinColumn(name = "pedido_id"),
        inverseJoinColumns = @JoinColumn(name = "producto_id")
    )
    private Set<Productos> listaProductos = new HashSet<>();

    // METODOS GETTERS Y SETTERS
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public int getNumeroDiario() {
		return numeroDiario;
	}

	public void setNumeroDiario(int numeroDiario) {
		this.numeroDiario = numeroDiario;
	}

	public Date getFechaPedido() {
		return fechaPedido;
	}

	public void setFechaPedido(Date fechaPedido) {
		this.fechaPedido = fechaPedido;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}
}