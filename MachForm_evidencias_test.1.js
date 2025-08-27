$(document).ready(function() {
  console.log("Script funcionando correctamente.");

  const inputDocente = $('#element_1');   // Campo docente
  const inputClase   = $('#element_10');  // Input para autocompletado
  const elem3 = $('#element_3');
  const elem4 = $('#element_4');

  let datosRecibidos = [];

  // Crear contenedor para sugerencias
  const suggestionBox = $('<ul>', {
    id: 'autocomplete-list',
    css: {
      position: 'absolute',
      border: '1px solid #ccc',
      background: '#fff',
      listStyle: 'none',
      padding: '0',
      margin: '0',
      width: inputClase.outerWidth(),
      zIndex: 9999,
      display: 'none',
      maxHeight: '150px',
      overflowY: 'auto',
      borderRadius: '6px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
      fontFamily: 'Roboto, sans-serif',
      fontSize: '14px'
    }
  }).insertAfter(inputClase);

  // Estado inicial
  const estadoInicial = () => {
    inputClase.val('').prop('disabled', true);
    elem3.val('');
    elem4.val('');
    suggestionBox.hide().empty();
  };

  // Mostrar cargando
  const cargarCargando = () => {
    inputClase.val('Cargando clases asociadas...').prop('disabled', true);
    suggestionBox.hide().empty();
  };

  // Sin resultados
  const cargarSinResultados = () => {
    inputClase.val('SIN clases asociadas al docente remoto').prop('disabled', true);
    suggestionBox.hide().empty();
  };

  // Mostrar sugerencias
  const mostrarSugerencias = (lista) => {
    suggestionBox.empty();
    lista.forEach(item => {
      $('<li>', {
        text: item,
        css: {
          padding: '8px',
          cursor: 'pointer'
        }
      })
      .on('mousedown', function() {
        inputClase.val(item);
        suggestionBox.hide();
        actualizarCamposDependientes(item);
      })
      .hover(
        function() { $(this).css('background', '#f0f0f0'); },
        function() { $(this).css('background', '#fff'); }
      )
      .appendTo(suggestionBox);
    });
    suggestionBox.show();
  };

  // Actualizar campos dependientes
  const actualizarCamposDependientes = (valorSeleccionado) => {
    const fila = datosRecibidos.find(arr => arr[0] === valorSeleccionado);
    if (fila) {
      elem3.val(fila[1] || '');
      elem4.val([fila[2], fila[3]].filter(Boolean).join(' - '));
    } else {
      elem3.val('');
      elem4.val('');
    }
  };

  // Evento: filtrar sugerencias mientras se escribe
  inputClase.on('input', function() {
    const valor = $(this).val().toLowerCase();
    if (!valor) {
      suggestionBox.hide();
      return;
    }
    const listaFiltrada = datosRecibidos
      .map(arr => arr[0])
      .filter(item => item.toLowerCase().includes(valor));

    if (listaFiltrada.length > 0) {
      mostrarSugerencias(listaFiltrada);
    } else {
      suggestionBox.hide();
    }
  });

  // Evento: mostrar todas las sugerencias al enfocar
  inputClase.on('focus', function() {
    if (datosRecibidos.length > 0) {
      const listaCompleta = datosRecibidos.map(arr => arr[0]);
      mostrarSugerencias(listaCompleta);
    }
  });

  // Ocultar sugerencias si se hace clic fuera
  $(document).on('click', function(e) {
    if (!$(e.target).closest(inputClase).length && !$(e.target).closest(suggestionBox).length) {
      suggestionBox.hide();
    }
  });

  // Validar cuando pierde foco
  inputClase.on('blur', function() {
    const valor = $(this).val().trim();
    actualizarCamposDependientes(valor);
  });

  // Evento: cuando se escribe el docente (element_1)
  inputDocente.on('input', async function() {
    const valor = $(this).val().trim();
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

      inputClase.prop('disabled', false).val('');
      suggestionBox.hide();

    } catch (error) {
      console.error('Error al obtener datos:', error);
      cargarSinResultados();
    }
  });

  // Inicializar
  estadoInicial();
});
