$(document).ready(function() {
  console.log("Script funcionando correctamente.");

(() => {
  const inputDocente = document.querySelector('#element_1');   // Campo docente
  const inputClase   = document.querySelector('#element_10');  // Input con autocompletado
  const elem3 = document.querySelector('#element_3');
  const elem4 = document.querySelector('#element_4');

  let datosRecibidos = [];
  let awesomplete;

  // Estado inicial: limpia campos y autocompletado
  const estadoInicial = () => {
    inputClase.value = '';
    inputClase.disabled = true;
    elem3.value = '';
    elem4.value = '';
    if (awesomplete) awesomplete.list = [];
  };

  // Mostrar cargando
  const cargarCargando = () => {
    inputClase.value = 'Cargando clases asociadas...';
    inputClase.disabled = true;
  };

  // Sin resultados
  const cargarSinResultados = () => {
    inputClase.value = 'SIN clases asociadas al docente remoto';
    inputClase.disabled = true;
    if (awesomplete) awesomplete.list = [];
  };

  // Cargar sugerencias en Awesomplete
  const cargarOpciones = () => {
    const lista = datosRecibidos.map(arr => arr[0]); // Solo nombres de clase
    if (!awesomplete) {
      awesomplete = new Awesomplete(inputClase, {
        list: lista,
        minChars: 1,
        autoFirst: true
      });
    } else {
      awesomplete.list = lista;
    }
    inputClase.value = '';
    inputClase.disabled = false;
  };

  // Validar y actualizar campos dependientes
  const actualizarCamposDependientes = (valorSeleccionado) => {
    const fila = datosRecibidos.find(arr => arr[0] === valorSeleccionado);
    if (fila) {
      elem3.value = fila[1] || '';
      elem4.value = [fila[2], fila[3]].filter(Boolean).join(' - ');
    } else {
      elem3.value = '';
      elem4.value = '';
    }
  };

  // Evento: cuando se escribe el docente (element_1)
  inputDocente?.addEventListener('input', async () => {
    const valor = inputDocente.value.trim();
    estadoInicial();

    if (!valor) return;

    cargarCargando();

    try {
      const url = 'https://script.google.com/macros/s/AKfycby2JkWchY6-sXkJLlcTaQsq3hVVPFKCtWhxZRt3lIBVwnadCqHtbeS0n7EglEFHPsqf/exec';
      const params = new URLSearchParams({ 'Docente remoto (doc.)': valor });
      const response = await fetch(`${url}?${params}`);
      datosRecibidos = await response.json();

      if (!Array.isArray(datosRecibidos) || datosRecibidos.length === 0) {
        cargarSinResultados();
        return;
      }

      cargarOpciones();

    } catch (error) {
      console.error('Error al obtener datos:', error);
      cargarSinResultados();
    }
  });

  // Evento: cuando pierde foco o elige una clase
  inputClase?.addEventListener('blur', () => {
    const valor = inputClase.value.trim();
    actualizarCamposDependientes(valor);
  });

  // Inicializar
  estadoInicial();

})();
});
