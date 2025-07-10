const nomesMeses = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

const mesAnoEl = document.getElementById("mesAno");
const diasEl = document.getElementById("dias");
const anterior = document.getElementById("anterior");
const proximo = document.getElementById("proximo");

let dataAtual = new Date();

function renderizarCalendario() {
  const ano = dataAtual.getFullYear();
  const mes = dataAtual.getMonth();

  mesAnoEl.textContent = nomesMeses[mes].toUpperCase();

  diasEl.innerHTML = "";

  const primeiroDia = new Date(ano, mes, 1).getDay();
  const totalDias = new Date(ano, mes + 1, 0).getDate();

  for (let i = 0; i < primeiroDia; i++) {
    diasEl.innerHTML += "<div></div>";
  }

 for (let d = 1; d <= totalDias; d++) {
    const dia = document.createElement("div");
    dia.classList.add("dia");

    const hoje = new Date();
    if (
      d === hoje.getDate() &&
      mes === hoje.getMonth() &&
      ano === hoje.getFullYear()
    ) {
      dia.classList.add("hoje");
    }

    dia.textContent = d.toString().padStart(2, "0");

    dia.onclick = () => {
        const dataSelecionada = new Date(ano, mes, d);
        mostrarCompromissos(dataSelecionada);
    };

    diasEl.appendChild(dia);
}

}

anterior.onclick = () => {
  dataAtual.setMonth(dataAtual.getMonth() - 1);
  renderizarCalendario();
};

proximo.onclick = () => {
  dataAtual.setMonth(dataAtual.getMonth() + 1);
  renderizarCalendario();
};

renderizarCalendario();


// aparecer form

async function adicionar() {
    let div = document.getElementById("AgendaForm");

    div.style.visibility = "visible"
}

async function fecharForm() {
    let div = document.getElementById("AgendaForm");

    div.style.visibility = "hidden"
}

function mostrarCompromissos(data) {
    const usuarioId = localStorage.getItem('usuarioId');
    if (!usuarioId) return;

    const dataFormatada = data.toISOString().split("T")[0];
    const container = document.getElementById("compromisso");
    container.innerHTML = "Carregando...";

    fetch(`http://localhost:3002/compromissos?usuario_id=${usuarioId}&dia=${dataFormatada}`)
        .then(res => res.json())
        .then(data => {
            container.innerHTML = "";

            if (!data.success || data.compromissos.length === 0) {
                container.innerHTML = "<h2>Sem compromissos para este dia.</h2>";
                return;
            }

            data.compromissos.forEach(c => {
                const div = document.createElement("div");
                div.className = "compromissos_conteudo";
                div.innerHTML = `
                    <h2>${c.hora.substring(0, 5)} - ${c.titulo}</h2>
                    <img src="./assents/lapis.png" alt="" id="lapis_editar" onclick="editar()">`;
                container.appendChild(div);
            });
        });
}

document.querySelector('#AgendaForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const usuarioId = localStorage.getItem('usuarioId');
    const titulo = document.getElementById('nome').value;
    const descricao = document.getElementById('descricao').value;
    const dia = document.querySelectorAll('#AgendaForm input[type="date"]')[0].value;
    const hora = document.getElementById('horario').value;

    fetch('http://localhost:3002/compromissos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            usuario_id: usuarioId,
            titulo,
            descricao,
            dia,
            hora,
            aviso_antecipado: 0
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            alert('Compromisso salvo com sucesso');
            fecharForm();
            mostrarCompromissos(new Date(dia));
        } else {
            alert("Erro ao salvar compromisso");
        }
    });
});


// editar compromisso

// async function editar() {
//     try{
//         const response = await fetch()
//     }
// }