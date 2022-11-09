
const w = window;
const d = document;

class ListaTareas { // Estado incial de las Atributoy y metodos de ListTareas()
   constructor() {   //* ESC 2015
      this.tareas = JSON.parse(localStorage.getItem('tareas')) ||
         [ // Estado incial de la propiedad tares 
            { tarea: 'Aprender Java', completado: false },
            { tarea: 'Aprender Spring java', completado: false },
            { tarea: 'Aprender clojure', completado: false },
            { tarea: 'aprender Scala', completado: false },
            { tarea: 'aprender Haskell', completado: false }
         ];

      this.agregarEventListeners(); // Metodo de Instncia de la clase ListaTareas(()) ==> firamas ?
      this.cargarTareas();// Metodo de Instncia   de la clase ListaTareas(()) ==> firamas ?  
   }


   agregarEventListeners() { // ¿ Metodo Instancia de la clase ListaTareas(()) ==> firamas ?
      d.getElementById("recordatorio").addEventListener('keypress', (evento) => {
         if (evento.keyCode == 13) {// 13 ==> Enter
            console.log(evento.target.value);
            this.agregarTarea(evento.target.value); // Cacturan contenido introducido en el  campo de texto  e invoca el metodo agregarTarea(tarea)
            evento.target.value = " "; // Vaciar el campo de texto
         }
      });
   }


   cargarTareas() { // Guardar las tareas actuales introducidas por el usuario
      let htmlTareas = this.tareas.reduce((acc, item, indice) => { // reduce ==> reduce un array a un valor unico  (acc) 
         return acc + this.generarHtmlTareas(item, indice); // concatena el valor de acc con el valor de  return generarHtmlTareas(item, indice)
      }, '');
      document.getElementById('listaTareas').innerHTML = htmlTareas; //  Inyecta el valor de htmlTareas en el elemento con id listaTareas
      console.log(evento)
   }
   cambiarEstadoTarea(indice) { // Cambiar el estado de una tarea de pendiente a completada o viceversa
      this.tareas[indice].completado = !this.tareas[indice].completado;
      this.cargarTareas();// refesca contenidode la interfax grafica
   }

   eliminarTarea(evento, indice) { // Eliminar una tarea de la lista de tareas
      evento.preventDefault(); // Evita que se ejecute el comportamiento por defecto del enlace (enlace a la pagina principal) 
      this.tareas.splice(indice, 1); // Elimina el elemento de la posicion indice de la lista de tareas
      this.cargarTareas();// refesca contenidode la interfax grafica
   }

   generarHtmlTareas(item, indice) {
      return `
      <li class="list-group-item checkbox  ">
      <div class=" container  color">
        <div class="row">
          <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 checkbox  color1">
            <label>
              <input id="cambiarEstadoTarea" type="checkbox" onchange="listaTareas.cambiarEstadoTarea(${indice})"
                value="" class="caja-comprobacion" ${item.completado ? 'checked' : ''}>
            </label>
          </div>
          <div class="col-md-10 col-xs-10 col-lg-10 col-sm-10 texto-tarea color2 ${item.completado ? 'tarea-completada' : ''}">
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
   };


   agregarTarea(tarea) { ///  ¿ Metodo Instancia de la clase ListaTareas(()) ==> firamas ?
      let $recordatorioInput = d.getElementById("recordatorio"); // Obtiene el elemento padre del elemento con id recordatorio
      if (tarea !== '') {//  Si el campo de texto no esta vacio
         $recordatorioInput.classList.remove('has-error'); // Elimina la clase has-error del elemento padre del elemento con id recordatorio
         let nuevaTarea = {// Crea un nuevo objeto con el valor de la tarea introducida por el usuario
            tarea, //            completado: false
         };
         this.tareas.push(nuevaTarea);
         this.cargarTareas(tarea);
      } else {
         $recordatorioInput.classList.add('has-error');
      }
   }

   agregarTareaClick() { ///  ¿ Metodo Instancia de la clase ListaTareas(()) ==> firmas ?
      // alert("Estoy en el  agrerTareaClick()  por que pulse el boton agregar");
      let $recordatorio = d.getElementById("recordatorio");
      let tarea = $recordatorio.value;
      if (tarea) {
         this.agregarTarea(tarea);
         $recordatorio.value = "";
      }

      console.log(this);
      console.log(tarea);
   };
};


let listaTareas; ///  ¿ Variable Global de la clase ListaTareas(()) ==> firmas ?
w.addEventListener('load', () => {
   listaTareas = new ListaTareas();
   // listaTareas.agregarTareaClick()
});



