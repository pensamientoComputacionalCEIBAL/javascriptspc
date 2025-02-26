document.addEventListener('DOMContentLoaded', function () {
// URL de tu Google Apps Script
const urlBase = 'https://script.google.com/macros/s/AKfycbyw0feBuxUbjyn6yd7NdYopre_3D-d4ztDK0aaxx8fqNcTi5mH8u0pkaMSsHuPRi7Sp/exec';

// Función para cargar los departamentos en el select 'element_2'
function cargarDepartamentos() {
  fetch(urlBase)
  .then(response => response.json())
  .then(data => {
    const selectDepto = document.querySelector('#element_2');

    // Limpiar y agregar opción predeterminada
    selectDepto.innerHTML = '<option value="" disabled selected>Selecciona un departamento</option>';
    data.forEach(depto => selectDepto.add(new Option(depto, depto)));

    // Inicializar: Limpiar y deshabilitar element_3 y element_8
    limpiarElemento3();
    limpiarElemento8();
    bloquearElemento3(true);

    // console.log('✅ Departamentos cargados:', data);
  }).catch(err => console.error('❌ Error al cargar departamentos:', err));
}

// Función para cargar centros en 'element_3' según el departamento seleccionado
function cargarCentros(departamento) {
  const selectCentro = document.querySelector('#element_3');

  // Limpiar, deshabilitar mientras carga y agregar opción predeterminada
  limpiarElemento3();
  bloquearElemento3(true);

  fetch(`${urlBase}?depto=${encodeURIComponent(departamento)}`)
  .then(response => response.json())
  .then(centros => {
   // Cargar centros y habilitar el select
   centros.forEach(centro => selectCentro.add(new Option(centro.centro, centro.centro)));
   bloquearElemento3(false);
   // console.log(`✅ Centros cargados para ${departamento}:`, centros);
   }).catch(err => console.error('❌ Error al cargar centros:', err));
}

// Limpia el select de centros y agrega la opción por defecto
function limpiarElemento3() {
  const selectCentro = document.querySelector('#element_3');
  selectCentro.innerHTML = '<option value="" disabled selected>Selecciona un centro</option>';
}

// Bloquea o desbloquea el select de centros
function bloquearElemento3(estado) { document.querySelector('#element_3').disabled = estado; }

// Limpia el valor del input element_8
function limpiarElemento8() { document.querySelector('#element_8').value = ''; }

// Función para volcar las selecciones en 'element_8'
function volcarSeleccionAElemento8() {
  const selectDepto = document.querySelector('#element_2');
  const selectCentro = document.querySelector('#element_3');
  const element8 = document.querySelector('#element_8');

  if (selectDepto.value && selectCentro.value) {
    element8.value = `${selectDepto.value} - ${selectCentro.value}`;
    //console.log('🔄 Valor volcado en element_8:', element8.value);
  } else { limpiarElemento8(); }
}

// Escuchar cambios en element_2 (cargar centros cuando se seleccione un departamento)
document.querySelector('#element_2').addEventListener('change', function() {
  if (this.value) {
    cargarCentros(this.value);
    limpiarElemento8(); // Limpiar element_8 al cambiar de departamento
  } else {
    limpiarElemento3();
    bloquearElemento3(true);
  }
});

// Escuchar cambios en element_3 (actualizar element_8)
document.querySelector('#element_3').addEventListener('change', volcarSeleccionAElemento8);

// Ejecutar la carga de departamentos al iniciar
cargarDepartamentos();

});
