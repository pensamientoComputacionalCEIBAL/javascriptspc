(function() {
  const servicio = 'https://script.google.com/macros/s/AKfycbzVqP7-dqmkf3dMJS5KFUy8dU0BvsRoVdOZ3PxBhcr_Jl9CcCYLqyIkEhBG3AoqujjB/exec?valor=';

  const resetCombo = combo => {
    combo.innerHTML = '';
    const opt = document.createElement('option');
    opt.value = '';
    opt.textContent = 'Sin clases';
    combo.appendChild(opt);
    combo.disabled = true;
  };

  const cargarOpciones = (combo, lista) => {
    combo.innerHTML = '';
    lista.forEach(item => {
      const opt = document.createElement('option');
      opt.value = item;
      opt.textContent = item;
      combo.appendChild(opt);
    });
    combo.disabled = false;
  };

  // Debounce para no saturar el servicio
  const debounce = (fn, delay) => {
    let timer = null;
    return function(...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  };

  const iniciar = () => {
    const input = document.getElementById('element_1');
    const combo = document.getElementById('element_3');
    const output = document.getElementById('element_2');

    if (!input || !combo || !output) {
      setTimeout(iniciar, 200); // espera si los elementos no están listos
      return;
    }

    resetCombo(combo);
    output.value = '';

    const buscarYActualizar = async () => {
      const valor = input.value.trim();
      output.value = '';
      resetCombo(combo);

      if (!valor) return;

      // Mostrar "Cargando..."
      combo.innerHTML = '';
      const cargando = document.createElement('option');
      cargando.value = '';
      cargando.textContent = 'Cargando...';
      combo.appendChild(cargando);
      combo.disabled = true;

      try {
        const resp = await fetch(servicio + encodeURIComponent(valor));
        if (!resp.ok) throw new Error('Error al conectar con el servicio');

        const data = await resp.json();
        if (Array.isArray(data) && data.length > 0) {
          cargarOpciones(combo, data);
        } else {
          resetCombo(combo);
        }
      } catch (err) {
        console.error(err);
        resetCombo(combo);
      }
    };

    const debouncedBuscar = debounce(buscarYActualizar, 400);

    input.addEventListener('input', debouncedBuscar); // escucha mientras escribe

    combo.addEventListener('change', () => {
      const seleccionado = combo.value.trim();
      output.value = seleccionado || '';
    });
  };

  // Ejecuta automáticamente al cargar
  document.addEventListener('DOMContentLoaded', iniciar);
})();
