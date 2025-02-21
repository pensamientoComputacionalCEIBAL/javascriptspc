console.log("Script funcionando correctamente :) para testing XDDD");

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
    case "Facundo Costa": $("#element_3").val('ecosta@ceibal.edu.uy'); break;
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


// Al 'volver atrás', dejar vacíos los cuadros de textos.
$("#submit_secondary" ).click(function() {
  $('input[type="text"]').val('');
  $('textarea').val('');
} );



$('.anaPelea').on('propertychange input', function (e) {


if ($("#element_8_1").val() != '' && 
$("#element_8_2").val() != '' && 
$("#element_8_3").val() != '' &&
$("#element_7_1").val() != '' && 
$("#element_7_2").val() != '' &&
$("#element_9_1").val() != '' && 
$("#element_9_2").val() != '' && 
$("#element_9_3").val() != '' && 
$("#element_10_1").val() != '' &&
$("#element_10_2").val() != '') {

  let fecha_partidaTexto = $("#element_8_3").val() + "-" + 
  $("#element_8_2").val() + "-" + 
  $("#element_8_1").val() + " " + 
  $("#element_7_1").val() + ":" + 
  $("#element_7_2").val() + ":00 GMT-0300";

  let fecha_llegadaTexto = $("#element_9_3").val() + "-" + 
  $("#element_9_2").val() + "-" + 
  $("#element_9_1").val() + " " + 
  $("#element_10_1").val() + ":" + 
  $("#element_10_2").val() + ":00 GMT-0300";

  let ms = Date.parse(fecha_partidaTexto);
  let ms2 = Date.parse(fecha_llegadaTexto);
  let fechaPartida = new Date(ms);
  let fechaLlegada = new Date(ms2);
  let dif_Minutos = (fechaLlegada.getTime() - fechaPartida.getTime() ) /  1000 / 60;
  let limite_laboral = null, limite_laboral_inicio = null;
  let mensaje = "";
  
  if (dif_Minutos > 0) {
    
    limite_laboral = new Date(fechaLlegada);
    limite_laboral.setHours(17);
    limite_laboral.setMinutes(0);

    if ( limite_laboral > fechaLlegada ) { limite_laboral.setDate(limite_laboral.getDate() - 1); }

    limite_laboral_inicio = new Date(fechaPartida);
    limite_laboral_inicio.setHours(9);
    limite_laboral_inicio.setMinutes(0);

    if ( limite_laboral_inicio < fechaPartida ) { limite_laboral_inicio.setDate(limite_laboral_inicio.getDate() + 1); }

    let temp = Math.trunc( dif_Minutos / 1440);
    cantidadDeCiclos24 = 0;

    if ( $("#element_37_1").is(":checked") == false) {
      // cantidadDeCiclos24 = 0;
      cantidadDeHorasSinCiclo24 = ((fechaLlegada -  limite_laboral) / 1000 / 60 / 60) +
      ((limite_laboral_inicio -  fechaPartida) / 1000 / 60 / 60);
      // mensaje = "No corresponde ciclo de 24 horas\n";
    }
    else {
      if (temp >= 0) { cantidadDeCiclos24 = temp; } else { cantidadDeCiclos24 = 1; }
        cantidadDeHorasSinCiclo24 = ((fechaLlegada -  limite_laboral) / 1000 / 60 / 60);
        mensaje = "Corresponde " + cantidadDeCiclos24 + " ciclo/s de 24 horas.\n";
    }
    
    temp2 = ( (dif_Minutos / 1440) - temp ).toFixed(2);
    
    if (temp2 >= 0.60) { 
      cantidadDeCiclos24  = cantidadDeCiclos24  + 1; 
      mensaje = "Corresponde " + cantidadDeCiclos24 + " ciclo/s de 24 horas.\n"; }

    if (cantidadDeHorasSinCiclo24 >= 6) { mensaje += "Corresponde también: 'Viaje: +6 hs'"; }
    else if (cantidadDeHorasSinCiclo24 >= 2 && cantidadDeHorasSinCiclo24 < 6 ) { mensaje += "Corresponde también: 'Viaje: 2-6 hs'"; }
    else if (cantidadDeHorasSinCiclo24 >= 1 && cantidadDeHorasSinCiclo24 < 2 ) { mensaje += "Corresponde también: 'Viaje: 1-2 hs'"; }
    else if (cantidadDeHorasSinCiclo24 > 0 ) { mensaje += "Corresponde también: 'Viaje: 1 h'"; }
  } else { mensaje = "Error de ingreso, no corresponde el cálculo."; }

  $("#element_34").val(mensaje);

}

} );

} );
