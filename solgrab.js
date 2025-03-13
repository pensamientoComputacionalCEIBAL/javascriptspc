document.addEventListener('DOMContentLoaded', () => {
  const id_dr = document.getElementById('element_2');
  const resultado_dr = document.getElementById('element_7');

  const id_centro = document.getElementById('element_5');
  const resultado_centro = document.getElementById('element_8');
  

  if (id_dr && resultado_dr) {
    id_dr.addEventListener('input', () => {
      const valor = id_dr.value;
      const url = `https://script.google.com/macros/s/AKfycbzR8fTPxWsMm-1q7HXhi_NwDa-gWiFIHL6S4uFId89YM2hZIRCkRAWN-lwpaBe1yf8y/exec?buscar=${encodeURIComponent(valor)}`;

      fetch(url)
        .then(response => response.text())
        .then(data => resultado_dr.value = data)
        .catch(error => console.error('Error al obtener los datos:', error));
    });
  } else { console.error("No se encontraron los elementos 'element_2' o 'element_7'."); }

  if (id_centro && resultado_centro) {
    id_centro.addEventListener('input', () => {
      const valor = id_centro.value;
      const url = `https://script.google.com/macros/s/AKfycbyNFfIVNy4Y5Rz9Vbl5PxJwS5BA7Avpmd5vg_p2IrXDSQIfwRouMqM9PDoj6L5ETjjfZQ/exec?buscar=${encodeURIComponent(valor)}`;

      fetch(url)
        .then(response => response.text())
        .then(data => resultado_centro.value = data)
        .catch(error => console.error('Error al obtener los datos:', error));
    });
  } else { console.error("No se encontraron los elementos 'element_5' o 'element_8'."); }

});

