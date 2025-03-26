console.log("Script funcionando correctamente :)");

$(document).ready(function(){

$('#element_2').change(function(){
  switch($("#element_2 :selected").text()) {
    case "Agustín Romano": $("#element_3").val('aromano@ceibal.edu.uy'); break;
    case "Bruno Oliva Gonzalez": $("#element_3").val('broliva@ceibal.edu.uy'); break;
    case "Carolina Larronda": $("#element_3").val('clarronda@ceibal.edu.uy'); break;
    case "Carolina Romero Magallanes": $("#element_3").val('cromero@ceibal.edu.uy'); break;
    case "Cinthia Nuñez": $("#element_3").val('cinunez@ceibal.edu.uy'); break;
    case "Cristofer Cabrera": $("#element_3").val('crcabrera@ceibal.edu.uy'); break;
    case "Diego Texeira": $("#element_3").val('dtexeira@ceibal.edu.uy'); break;
    case "Emilia Casaravilla": $("#element_3").val('ecasaravilla@ceibal.edu.uy'); break;
    case "Patricia Mosquera": $("#element_3").val('amosquera@ceibal.edu.uy'); break;
    case "Federico Touya": $("#element_3").val('ftouya@ceibal.edu.uy'); break;
    case "Flavia Altolaguirre": $("#element_3").val('faltolaguirre@ceibal.edu.uy'); break;
    case "Florencia Pilatti Conde": $("#element_3").val('fpilatti@ceibal.edu.uy'); break;
    case "Francisco Risso": $("#element_3").val('frisso@ceibal.edu.uy'); break;
    case "Ignacio Martinez": $("#element_3").val('igmartinez@ceibal.edu.uy'); break;
    case "Irina Rodriguez": $("#element_3").val('irrodriguez@ceibal.edu.uy'); break;
    case "Kalahan Dutra": $("#element_3").val('kdutra@ceibal.edu.uy'); break;
    case "Luciana Valentina Prudente Acevedo":	$("#element_3").val('lprudente@ceibal.edu.uy'); break;
    case "Magela Araujo": $("#element_3").val('magaraujo@ceibal.edu.uy'); break;
    case "Monica Gonzalez": $("#element_3").val('mogonzalez@ceibal.edu.uy'); break;
    case "Natalia Salguero": $("#element_3").val('nsalguero@ceibal.edu.uy'); break;
    case "Pablo Berocay": $("#element_3").val('pberocay@ceibal.edu.uy'); break;
    case "Renzo Javier Cayrus Melgarejo": $("#element_3").val('rcayrus@ceibal.edu.uy'); break;
    case "Romina Etchepare": $("#element_3").val('roetchepare@ceibal.edu.uy'); break;
    case "Silvana Salvador": $("#element_3").val('ssalvador@ceibal.edu.uy'); break;
    case "Tatiana Gilles": $("#element_3").val('tgilles@ceibal.edu.uy'); break;
    case "Thiago Antúnez": $("#element_3").val('tantunez@ceibal.edu.uy'); break;
    case "Veda Contreras": $("#element_3").val('vcontreras@ceibal.edu.uy'); break;
    case "Yenniffer de los Santos":	$("#element_3").val('ydelossantos@ceibal.edu.uy'); break;
  }
});

// Variables globales
let fecha_salida = null;
let fecha_llegada = null;
let hora_inicio = null;
let hora_fin = null;
let pernocta = document.getElementById('element_37_1');
let no_pernocta = document.getElementById('element_37_2');
let noches = document.getElementById('element_43');

// Añadir eventos a los campos
['element_8', 'element_7', 'element_9', 'element_10', 'element_40', 'element_41'].forEach(id => {
  for (let i = 1; i <= 3; i++) {
    const campo = document.getElementById(`${id}_${i}`); 
    if (campo) campo.addEventListener('blur', actualizarFechas); }

  for (let i = 1; i <= 2; i++) {
    const campoHora = document.getElementById(`${id}_${i}`); 
    if (campoHora) campoHora.addEventListener('blur', actualizarFechas); }
  
});

if (pernocta) pernocta.addEventListener('click', function() { actualizarFechas(); });

if (no_pernocta) no_pernocta.addEventListener('click', function() { actualizarFechas(); });

if (noches) noches.addEventListener('change', function() { actualizarFechas(); });

// Función para actualizar las fechas, horas y validar el orden
function actualizarFechas() {
  let fecha_salida = construirFecha('element_8', 'element_7');
  let fecha_llegada = construirFecha('element_9', 'element_10');
  let hora_inicio = construirHora('element_40');
  let hora_fin = construirHora('element_41');

  const campoError = document.getElementById('element_34');
  if (campoError) campoError.value = '';

  if (fecha_salida && fecha_llegada && new Date(fecha_salida) > new Date(fecha_llegada)) {
    if (campoError) campoError.value = '❌ Error: La fecha de salida no puede ser mayor a la fecha de llegada.';
    return;
  }

  if (hora_inicio && hora_fin) {
    const [horaI, minI] = hora_inicio.split(':').map(Number);
    const [horaF, minF] = hora_fin.split(':').map(Number);

    if (horaI > horaF || (horaI === horaF && minI >= minF)) {
      if (campoError) campoError.value = '❌ Error: La hora de inicio debe ser menor que la hora de fin.';
      return;
    }
  }

  // **Nueva validación: Fechas y horarios coinciden dentro del horario laboral**
  if (!fecha_salida || !fecha_llegada) {
  if (campoError) campoError.value = '❌ Error: Debes ingresar la fecha de salida y la fecha de llegada.';
    return;
  } 
  
  let fecha_salida_soloFecha = fecha_salida.split(' ')[0]; // Extrae solo la fecha
  let fecha_llegada_soloFecha = fecha_llegada.split(' ')[0]; // Extrae solo la fecha

  if (
    fecha_salida_soloFecha === fecha_llegada_soloFecha && // Fechas iguales
    estaEnHorarioLaboral(fecha_salida, hora_inicio, hora_fin) && // Horario de salida dentro del horario laboral
    estaEnHorarioLaboral(fecha_llegada, hora_inicio, hora_fin) // Horario de llegada dentro del horario laboral
  ) {
    if (campoError) campoError.value = '❌ Error: La fecha de salida y llegada coinciden y el horario está dentro del horario laboral.';
    return;
  }

  let resultado = '';
  let totalHorasViaje = 0; // Acumulador para sumar horas de viaje

  if (pernocta.checked) {
    let nocheCantidad = noches.value;
    if (nocheCantidad) resultado += `- Corresponde ${nocheCantidad} ciclo/s de 24hs.\n`;

    let fecha_salida_date = new Date(`${fecha_salida}T${hora_inicio}:00`);
    let fecha_fin_jornada = new Date(`${fecha_salida}T${hora_fin}:00`);

    if (fecha_salida_date <= fecha_fin_jornada) {
      if (!estaEnHorarioLaboral(fecha_salida, hora_inicio, hora_fin)) {
        totalHorasViaje += calcularDiferenciaHoras(fecha_salida, hora_inicio, fecha_llegada);
      }
    }
  }

  if (!pernocta.checked) {
    if (fecha_salida && hora_inicio && !estaEnHorarioLaboral(fecha_salida, hora_inicio, hora_fin)) {
      totalHorasViaje += calcularDiferenciaHoras(fecha_salida, hora_inicio, fecha_llegada);
    }
  }

  if (fecha_llegada && hora_fin) {
    totalHorasViaje += calcularDiferenciaLlegadaFin(fecha_llegada, hora_fin);
  }

  // Determinar el viaje final con la suma total de horas
  let viaje = determinarViajes(totalHorasViaje.toFixed(2));
  resultado += `- Corresponde un total de: ${viaje}.\n`;

  if (campoError) campoError.value = resultado;
}

// Función para determinar el ciclo de viajes
function determinarViajes(x) {
  if (x > 0 && x <= 1) { return "Viaje 1 hora"; }
  else if (x > 1 && x <= 2) { return "Viaje 1 - 2 horas"; }
  else if (x > 2 && x <= 6) { return "Viaje 2 - 6 horas"; }
  else if (x > 6) { return "Viaje +6 horas"; }
}

// Función para obtener y validar la fecha y hora
function construirFecha(idFecha, idHora) {
  const dia = document.getElementById(idFecha + '_1').value;
  const mes = document.getElementById(idFecha + '_2').value;
  const anio = document.getElementById(idFecha + '_3').value;

  const hora = document.getElementById(idHora + '_1').value;
  const minuto = document.getElementById(idHora + '_2').value;

  if (!dia || !mes || !anio || !hora || !minuto) { return null; }

  const fechaCompleta = `${anio}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')} ${hora.padStart(2, '0')}:${minuto.padStart(2, '0')}`;

  const fechaValida = !isNaN(new Date(fechaCompleta).getTime());

  return fechaValida ? fechaCompleta : null;
}

// Función para obtener y validar solo la hora
function construirHora(idHora) {
  const hora = document.getElementById(idHora + '_1').value;
  const minuto = document.getElementById(idHora + '_2').value;

  if (!hora || !minuto) { return null; }

  return `${hora.padStart(2, '0')}:${minuto.padStart(2, '0')}`;
}

function estaEnHorarioLaboral(fecha, inicio, fin) {
  if (!fecha || !inicio || !fin) return false;

  const fechaObj = new Date(fecha);
  const [horaI, minI] = inicio.split(':').map(Number);
  const [horaF, minF] = fin.split(':').map(Number);

  const horaFecha = fechaObj.getHours() + fechaObj.getMinutes() / 60;
  const horaInicio = horaI + minI / 60;
  const horaFin = horaF + minF / 60;

  return horaFecha >= horaInicio && horaFecha <= horaFin;
}

// Función para calcular la diferencia de horas entre dos fechas
function calcularDiferenciaHoras(fecha, hora, fecha_llegada) {
 if (!fecha || !hora) return 0;

 let fecha_salida_soloFecha = fecha.split(' ')[0]; // Extrae solo la fecha
 let fecha_llegada_soloFecha = fecha_llegada.split(' ')[0]; // Extrae solo la fecha
 
  if (fecha_salida_soloFecha === fecha_llegada_soloFecha) return 0;

 const fechaObj = new Date(fecha);
 const [horaH, minH] = hora.split(':').map(Number);

 const fechaHora = new Date(fechaObj);
 fechaHora.setHours(horaH, minH);

 if (fechaHora < fechaObj) { fechaHora.setDate(fechaHora.getDate() + 1); }

 return (fechaHora - fechaObj) / (1000 * 60 * 60);
}

// Función para calcular la diferencia entre fecha_llegada y hora_fin
function calcularDiferenciaLlegadaFin(fechaLlegada, horaFin) {
  if (!fechaLlegada || !horaFin) return 0;

  const fechaObj = new Date(fechaLlegada);
  const [horaH, minH] = horaFin.split(':').map(Number);

  const fechaHoraFin = new Date(fechaObj);
  fechaHoraFin.setHours(horaH, minH);

  // Si fechaHoraFin es mayor, restamos un día a fechaHoraFin para calcular correctamente
  if (fechaHoraFin > fechaObj) { fechaObj.setDate(fechaObj.getDate() + 1);  }

  return (fechaObj - fechaHoraFin) / (1000 * 60 * 60);
}

});
