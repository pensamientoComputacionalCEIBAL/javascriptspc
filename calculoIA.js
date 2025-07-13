$(document).ready(function () {
  console.log("Script funcionando correctamente :)");

  // Cargar automáticamente los correos
  $('#element_2').change(function () {
    const nombre = $("#element_2 :selected").text();
    const correos = {
      "Agustín Romano": "aromano@ceibal.edu.uy",
      "Ailan Moreno": "amoreno@ceibal.edu.uy",
      "Bruno Oliva Gonzalez": "broliva@ceibal.edu.uy",
      "Carolina Larronda": "clarronda@ceibal.edu.uy",
      "Carolina Romero Magallanes": "cromero@ceibal.edu.uy",
      "Cinthia Nuñez": "cinunez@ceibal.edu.uy",
      "Cristofer Cabrera": "crcabrera@ceibal.edu.uy",
      "Dayana Silva Caffarel": "dasilva@ceibal.edu.uy",
      "Diego Texeira": "dtexeira@ceibal.edu.uy",
      "Emilia Casaravilla": "ecasaravilla@ceibal.edu.uy",
      "Patricia Mosquera": "amosquera@ceibal.edu.uy",
      "Federico Touya": "ftouya@ceibal.edu.uy",
      "Flavia Altolaguirre": "faltolaguirre@ceibal.edu.uy",
      "Florencia Pilatti Conde": "fpilatti@ceibal.edu.uy",
      "Francisco Risso": "frisso@ceibal.edu.uy",
      "Ignacio Martinez": "igmartinez@ceibal.edu.uy",
      "Irina Rodriguez": "irrodriguez@ceibal.edu.uy",
      "Kalahan Dutra": "kdutra@ceibal.edu.uy",
      "Luciana Valentina Prudente Acevedo": "lprudente@ceibal.edu.uy",
      "Magela Araujo": "magaraujo@ceibal.edu.uy",
      "Monica Gonzalez": "mogonzalez@ceibal.edu.uy",
      "Natalia Salguero": "nsalguero@ceibal.edu.uy",
      "Pablo Berocay": "pberocay@ceibal.edu.uy",
      "Renzo Javier Cayrus Melgarejo": "rcayrus@ceibal.edu.uy",
      "Romina Etchepare": "roetchepare@ceibal.edu.uy",
      "Silvana Salvador": "ssalvador@ceibal.edu.uy",
      "Stefanía Cabrera": "stcabrera@ceibal.edu.uy",
      "Tatiana Gilles": "tgilles@ceibal.edu.uy",
      "Thiago Antúnez": "tantunez@ceibal.edu.uy",
      "Veda Contreras": "vcontreras@ceibal.edu.uy",
      "Victoria Alonso": "maalonso@ceibal.edu.uy",
      "Yenniffer de los Santos": "ydelossantos@ceibal.edu.uy"
    };
    if (correos[nombre]) $("#element_3").val(correos[nombre]);
  });

  // Asignar eventos sin usar bucles
  const asignar = (id, evento) => {
    const e = document.getElementById(id);
    if (e) e.addEventListener(evento, actualizarYConsultarIA);
  };

  asignar('element_8_1', 'blur');
  asignar('element_8_2', 'blur');
  asignar('element_8_3', 'blur');
  asignar('element_7_1', 'blur');
  asignar('element_7_2', 'blur');

  asignar('element_9_1', 'blur');
  asignar('element_9_2', 'blur');
  asignar('element_9_3', 'blur');
  asignar('element_10_1', 'blur');
  asignar('element_10_2', 'blur');

  asignar('element_40_1', 'blur');
  asignar('element_40_2', 'blur');
  asignar('element_41_1', 'blur');
  asignar('element_41_2', 'blur');

  asignar('element_37_1', 'click');
  asignar('element_37_2', 'click');
  asignar('element_43', 'change');

  // Validación y envío a Assistant
  async function actualizarYConsultarIA() {
    const campoError = document.getElementById('element_34');
    if (campoError) campoError.value = '';

    const fecha_salida = construirFecha('element_8', 'element_7');
    const fecha_llegada = construirFecha('element_9', 'element_10');
    const hora_inicio = construirHora('element_40');
    const hora_fin = construirHora('element_41');

    if (!fecha_salida || !fecha_llegada) {
      campoError.value = '❌ Debes ingresar la fecha de salida y de llegada.';
      return;
    }

    if (new Date(fecha_salida) >= new Date(fecha_llegada)) {
      campoError.value = '❌ La fecha de salida no puede ser mayor o igual que la de llegada.';
      return;
    }

    if (!hora_inicio || !hora_fin) {
      campoError.value = '❌ Especifica la jornada laboral.';
      return;
    }

    const [hI, mI] = hora_inicio.split(':').map(Number);
    const [hF, mF] = hora_fin.split(':').map(Number);
    if (hI > hF || (hI === hF && mI >= mF)) {
      campoError.value = '❌ La hora de inicio debe ser menor que la hora de fin.';
      return;
    }

    const pernoctaSi = document.getElementById('element_37_1');
    const noches = document.getElementById('element_43')?.value || '0';
    const pernoctaTexto = pernoctaSi?.checked ? `Sí (${noches} noche/s)` : "No";

    const mensajeIA = `Fecha de salida: ${fecha_salida}, hora de llegada: ${fecha_llegada} (horario laboral ${hora_inicio} a ${hora_fin}). Pernocta: ${pernoctaTexto}.`;

    campoError.value = '🧠 Consultando al Assistant...';
    const respuesta = await getAIResponse(mensajeIA);
    campoError.value = respuesta;
  }

  function construirFecha(idFecha, idHora) {
    const d = document.getElementById(idFecha + '_1')?.value;
    const m = document.getElementById(idFecha + '_2')?.value;
    const y = document.getElementById(idFecha + '_3')?.value;
    const h = document.getElementById(idHora + '_1')?.value;
    const min = document.getElementById(idHora + '_2')?.value;
    if (!d || !m || !y || !h || !min) return null;
    const fecha = `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')} ${h.padStart(2, '0')}:${min.padStart(2, '0')}`;
    return isNaN(new Date(fecha).getTime()) ? null : fecha;
  }

  function construirHora(idHora) {
    const h = document.getElementById(idHora + '_1')?.value;
    const m = document.getElementById(idHora + '_2')?.value;
    if (!h || !m) return null;
    return `${h.padStart(2, '0')}:${m.padStart(2, '0')}`;
  }

  // --- Assistant API ---
  const a = "sk-proj-QQN00cYDlxJ7CIhJEWb64kEBcsjLsvTnCVyU4n5qtUgBsBqiWeICs4XBwpliFRMpH3kPKub9OET3BlbkFJvR54SUvl47AQ9yI2bQ3yW8kQ9bJrDF";
  const b = "_ZHEYJL8Jw6RvBUPOjoYMkznb_g5MJ0lhASlCFVe3ZcA";
  const cc = a + b;
  const ASSISTANT_ID = "asst_xGFmQgITR0JyF381hcrvclIE";
  let threadId = null;

  async function getAIResponse(prompt) {
    try {
      if (!threadId) {
        const res = await fetch("https://api.openai.com/v1/threads", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${cc}`,
            "Content-Type": "application/json",
            "OpenAI-Beta": "assistants=v2"
          }
        });
        const data = await res.json();
        threadId = data.id;
      }

      await fetch(`https://api.openai.com/v1/threads/${threadId}/messages`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${cc}`,
          "Content-Type": "application/json",
          "OpenAI-Beta": "assistants=v2"
        },
        body: JSON.stringify({ role: "user", content: prompt })
      });

      const runRes = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${cc}`,
          "Content-Type": "application/json",
          "OpenAI-Beta": "assistants=v2"
        },
        body: JSON.stringify({ assistant_id: ASSISTANT_ID })
      });

      const runData = await runRes.json();
      let status = runData.status;
      const runId = runData.id;

      while (status !== "completed" && status !== "failed") {
        await new Promise(res => setTimeout(res, 2000));
        const statusCheck = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs/${runId}`, {
          headers: {
            "Authorization": `Bearer ${cc}`,
            "OpenAI-Beta": "assistants=v2"
          }
        });
        const sData = await statusCheck.json();
        status = sData.status;
      }

      if (status === "failed") return "❌ El Assistant falló.";

      const messagesRes = await fetch(`https://api.openai.com/v1/threads/${threadId}/messages`, {
        headers: {
          "Authorization": `Bearer ${cc}`,
          "OpenAI-Beta": "assistants=v2"
        }
      });
      const messagesData = await messagesRes.json();
      const msg = messagesData.data.find(m => m.role === "assistant");
      return msg?.content?.[0]?.text?.value || "⚠️ Sin respuesta del Assistant.";
    } catch (err) {
      return "Error: " + err.message;
    }
  }

});

