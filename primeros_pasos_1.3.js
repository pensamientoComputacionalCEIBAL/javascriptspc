document.addEventListener('DOMContentLoaded', function () {
  // URL de tu Google Apps Script
  const urlBase = 'https://script.google.com/macros/s/AKfycbyw0feBuxUbjyn6yd7NdYopre_3D-d4ztDK0aaxx8fqNcTi5mH8u0pkaMSsHuPRi7Sp/exec';

  // Función para cargar los departamentos en element_2
  function cargarDepartamentos() {
    fetch(urlBase)
      .then(res => res.json())
      .then(departamentos => {
        const selectDepto = document.querySelector('#element_2');
        selectDepto.innerHTML = '<option value="" disabled selected>Selecciona un departamento</option>';

        // Cargar departamentos únicos (ordenados por aparición)
        const departamentosUnicos = [...new Set(departamentos.map(d => d.Departamento.trim()))];
        departamentosUnicos.forEach(depto => {
          if (depto) selectDepto.add(new Option(depto, depto));
        });

        bloquearElemento3(true);  // Bloquear element_3 al inicio
        limpiarElemento8();      // Limpiar element_8 al iniciar
      })
      .catch(err => console.error('❌ Error al cargar departamentos:', err));
  }

  // Función para cargar los centros según el departamento y la fila
  function cargarCentros(departamento, fila) {
    bloquearElemento3(true);  // Deshabilitar mientras carga
    limpiarElemento3();       // Limpiar el select

    // Agregar el parámetro 'fila' a la URL
    const urlConParametros = `${urlBase}?depto=${encodeURIComponent(departamento)}&fila=${fila}`;
    console.log('🔍 URL con parámetros:', urlConParametros);

    fetch(urlConParametros)
      .then(res => res.json())
      .then(centros => {
        const selectCentro = document.querySelector('#element_3');

        if (!Array.isArray(centros) || centros.length === 0) {
          console.warn('⚠️ No hay centros para este departamento.');
          return;
        }

        // Rellenar el select con los centros
        centros.forEach(centro => {
          selectCentro.add(new Option(centro.Nombre, centro.Nombre));
        });

        bloquearElemento3(false);  // Habilitar el select
      })
      .catch(err => console.error('❌ Error al cargar centros:', err));
  }

  // Limpia element_3 y agrega "Selecciona centro"
  function limpiarElemento3() {
    const selectCentro = document.querySelector('#element_3');
    selectCentro.innerHTML = '<option value="" disabled selected>Selecciona centro</option>';
  }

  // Bloquea o desbloquea element_3
  function bloquearElemento3(estado) {
    document.querySelector('#element_3').disabled = estado;
  }

  // Limpia element_8
  function limpiarElemento8() {
    document.querySelector('#element_8').value = '';
  }

  // Volcar selecciones en element_8
  function volcarSeleccionAElemento8() {
    const selectDepto = document.querySelector('#element_2');
    const selectCentro = document.querySelector('#element_3');
    const element8 = document.querySelector('#element_8');

    if (selectDepto.value && selectCentro.value) {
      element8.value = `${selectDepto.value} - ${selectCentro.value}`;
    } else {
      element8.value = '';  // Limpiar si no hay selección completa
    }
  }

  // Escuchar cambios en element_2 para cargar centros
  document.querySelector('#element_2').addEventListener('change', (e) => {
    const departamentoSeleccionado = e.target.value;

    if (departamentoSeleccionado) {
      const fila = obtenerFila();  // Obtener la fila (puedes ajustarlo)
      cargarCentros(departamentoSeleccionado, fila);
    } else {
      limpiarElemento3();
      bloquearElemento3(true);
    }

    limpiarElemento8();
  });

  // Escuchar cambios en element_3 para actualizar element_8
  document.querySelector('#element_3').addEventListener('change', volcarSeleccionAElemento8);

  // Función de ejemplo para obtener la fila (ajústala según tu lógica)
  function obtenerFila() {
    return 1;  // Ajusta el valor de 'fila' según tus necesidades
  }

  // Iniciar la carga de departamentos
  cargarDepartamentos();
});
