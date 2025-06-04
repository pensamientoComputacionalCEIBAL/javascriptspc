document.addEventListener('DOMContentLoaded', function () {
  const baseURL = "https://script.google.com/macros/s/AKfycbySTx4X4_jUGeuvf6L0nMUbk2AcDw6KvforsTrSjqlX_JWpEMu6BkBBldzkzzSMugZN/exec?q=";

  const el1 = document.getElementById('element_1');
  const el2 = document.getElementById('element_2');
  const el3 = document.getElementById('element_3');
  const el4 = document.getElementById('element_4');
  const el5 = document.getElementById('element_5');
  const el6 = document.getElementById('element_6');
  const el7 = document.getElementById('element_7');
  const el8 = document.getElementById('element_8');

  let currentResults = [];

  const clearElements = () => {
    [el2, el3, el4, el6, el7, el8].map(el => el && (el.value = ''));
    if (el5) {
      el5.innerHTML = '';
      el5.disabled = true;
      el5.innerHTML = `<option value="">Sin resultados</option>`;
    }
  };

  const fillSecondaryFields = index => {
    const row = currentResults[index];
    if (!row) return;
    [el6, el7, el8].map((el, i) => el && (el.value = row[i + 4] ?? ''));
  };

  const fetchData = async (value) => {
    clearElements();
    try {
      const res = await fetch(baseURL + encodeURIComponent(value));
      const data = await res.json();

      if (!Array.isArray(data) || data.length === 0) return;

      currentResults = data;

      // Primer resultado -> element_2, 3, 4
      const [first] = data;
      [el2, el3, el4].map((el, i) => { if (el) el.value = first[i + 1] ?? ''; });

      // Opciones desde columna 7 (índice 7)
      const options = data
        .map((row, index) => ({ label: row[7], index }))
        .filter(opt => opt.label != null && opt.label !== '');

      if (options.length === 0) {
        el5.innerHTML = `<option value="">Sin resultados</option>`;
        el5.disabled = true;
        return;
      }

      el5.innerHTML =
        `<option value="" disabled selected>Selecciona aquí una clase</option>` +
        options.map(opt => `<option value="${opt.index}">${opt.label}</option>`).join('');
      el5.disabled = false;

    } catch (err) { console.error("Error consultando la API:", err); }
  };

  const handler = () => {
    const val = el1?.value?.trim();
    if (val) fetchData(val);
  };

  const onListboxChange = () => {
    const selectedIndex = parseInt(el5.value, 10);
    if (!isNaN(selectedIndex)) {
      [el6, el7, el8].map(el => el && (el.value = ''));
      fillSecondaryFields(selectedIndex);
    }
  };

  if (el1) { el1.addEventListener('change', handler); el1.addEventListener('blur', handler); }

  if (el5) { el5.addEventListener('change', onListboxChange); }
});
