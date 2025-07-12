$(document).ready(function() {
  console.log("Script funcionando correctamente.");
(() => {
  const input = document.querySelector('#element_1');
  const select = document.querySelector('#element_2');
  const elem3 = document.querySelector('#element_3');
  const elem4 = document.querySelector('#element_4');

  let datosRecibidos = [];

  const estadoInicial = () => {
    select.innerHTML = '';
    select.disabled = true;
    elem3.value = '';
    elem4.value = '';
    const opt = new Option('Selecciona aquí una clase', '');
    opt.disabled = true;
    opt.selected = true;
    select.appendChild(opt);
  };

  const cargarCargando = () => {
    select.innerHTML = '';
    select.disabled = true;
    const opt = new Option('Cargando clases asociadas en SVC...', '');
    opt.disabled = true;
    opt.selected = true;
    select.appendChild(opt);
  };

  const cargarSinResultados = () => {
    select.innerHTML = '';
    select.disabled = true;
    const opt = new Option('SIN clases asociadas al docente remoto en SVC', '');
    opt.disabled = true;
    opt.selected = true;
    select.appendChild(opt);
  };

  const cargarOpciones = () => {
    select.innerHTML = '';
    const opciones = datosRecibidos.map(arr => new Option(arr[0], arr[0]));
    const def = new Option('Selecciona aquí una clase', '');
    def.disabled = true;
    def.selected = true;
    select.appendChild(def);
    opciones.forEach(opt => select.appendChild(opt));
    select.disabled = false;
  };

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

  input?.addEventListener('input', async () => {
    const valor = input.value.trim();
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

  select?.addEventListener('change', () => {
    const valorSeleccionado = select.value;
    actualizarCamposDependientes(valorSeleccionado);
  });

  // Inicializar en frío
  estadoInicial();
})();


});
