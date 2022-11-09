const d = document;
const w = window;


class ListaTareas {
	constructor() {
		this.actividades = JSON.parse(localStorage.getItem('actividades'));
		if (!this.actividades) {
			this.actividades = [ // Estado incial de la propiedad tares 
				{ tarea: 'Aprender Java', completado: false },
				{ tarea: 'Aprender Spring java', completado: false },
				{ tarea: 'Aprender clojure', completado: false },
				{ tarea: 'aprender Scala', completado: false },
				{ tarea: 'aprender Haskell', completado: false }
			];
		}
		// this.agregarTareas();// Metodo de Instncia   de la clase ListaTareas(()) ==> firamas ?
		this.cargarTareas();// Metodo de Instncia   de la clase ListaTareas(()) ==> firamas ?  
		this.agregarEventListeners(); // Metodo de Instncia de la clase ListaTareas(()) ==> firamas ?

	};

	cargarTareas() {
		let htmlTareas = this.actividades.reduce((acc, item, indice) => { // reduce ==> reduce un array a un valor unico  (acc) 
			return acc + this.generarHtmlTareas(item, indice); // concatena el valor de acc con el valor de  return generarHtmlTareas(item, indice)
		}, '');
		document.getElementById('listaTareas').innerHTML = htmlTareas; //  Inyecta el valor de htmlTareas en el elemento con id listaTareas
	}

	generarHtmlTareas(item, indice) {
		// console.log(item.tarea);
		// console.log(item.completado);
		return `
		<li class="list-group-item checkbox  ">
  			<div class=" container  color">
   	 			<div class="row">
      				<div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 checkbox  color1">
        				<label>
         	 				<input id="cambiarEstadoTarea" type="checkbox" onchange="listaTareas.cambiarEstadoTarea(${indice})"value="" class="caja-comprobacion" ${item.completado ? 'checked' : ''}> 
        				</label>
      				</div>
      				<div class="col-md-10 col-xs-10 col-lg-10 col-sm-10 texto-tarea color2 ${item.completado ? 'tarea-completada' : ''} ">
 						${item.tarea}
      				</div>
      				<div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 area-icono-eliminacion color3">
       				 	<a class="" href="/" onclick="listaTareas.eliminarTarea(event, ${indice})">
       	  		 		<i id="eliminarTarea" data-id=${indice} class="fas fa-trash a__trash"></i>
        				</a>
     	 			</div>
    			</div>
  			</div>
		</li>
      `;
	}

	cambiarEstadoTarea(indice) { // Cambiar el estado de una tarea de pendiente a completada o viceversa
		this.actividades[indice].completado = !this.actividades[indice].completado;// Invierte el valor de ==>  .complertado
		this.cargarTareas();// refesca contenido de la interfax grafica  ==>.cargarTareas();
	};

	agregarEventListeners() { // ¿ Metodo Instancia de la clase ListaTareas(()) ==> firamas ?
		d.getElementById("recordatorio").addEventListener('keypress', (evento) => {
			if (evento.keyCode == 13) { // 13 ==> Enter
				this.agregarTarea(evento.target.value); // Cacturan contenido introducido en el  campo de texto 
				evento.target.value = " "; // Vaciar el campo de texto
			}
		});
	}
	agregarTarea(tarea) { ///  ¿ Metodo Instancia de la clase ListaTareas(()) ==> firamas ?
		let $recordatorioInput = d.getElementById("recordatorio"); // Obtiene el elemento padre del elemento con id recordatorio
		if (tarea !== '') {//  Si el campo de texto no esta vacio
			$recordatorioInput.classList.remove('has-error'); // Elimina la clase has-error de $recordatorioInput.classList
			let nuevaTarea = {// Crea un nuevo objeto con el valor de la tarea introducida por el usuario
				tarea, // completado: false
			};
			this.actividades.push(nuevaTarea);
			this.cargarTareas(tarea);
		} else {
			$recordatorioInput.classList.add('has-error');
		}
	};

	agregarTareaClick() { ///  ¿ Metodo Instancia de la clase ListaTareas(()) ==> firmas ?
		// alert("Estoy en el  agrerTareaClick()  por que pulse el boton agregar");
		let $recordatorioInput = d.getElementById("recordatorio");
		let tarea = $recordatorioInput.value;
		if (tarea) {
			this.agregarTarea(tarea);
			$recordatorioInput.value = "";
		}

		console.log(this);
		console.log(tarea);
	};

	eliminarTarea(evento, indice) { // Eliminar una tarea de la lista de tareas
		console.log(evento);
		evento.preventDefault(); // Evita que se ejecute el comportamiento por defecto del enlace (enlace a la pagina principal) 
		this.actividades.splice(indice, 1); // Elimina el elemento de la posicion indice de la lista de tareas
		this.cargarTareas();// refesca contenidode la interfax grafica 
	}


};

let listaTareas; ///  ¿ Variable Global de la clase ListaTareas(()) ==> firmas ?
w.addEventListener('load', () => {
	listaTareas = new ListaTareas();
	// listaTareas.agregarTareaClick()
});

