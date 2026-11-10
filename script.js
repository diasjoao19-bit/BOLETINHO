// =========================
// CONFIGURAÇÃO FIXA DO ALUNO
// =========================

const CONFIG_ALUNO = {
    turma: "9C",
    numeroChamada: 38,
    apiUrl: "https://boletim-api.profbt.com.br"
};

// Guardado somente em memória durante a sessão
let pinSessao = "";

// Modo de edição
let modoEdicao = false;

// =========================
// DADOS FICTÍCIOS LOCAIS
// =========================

let disciplinas = [
    {
        disciplina: "Língua Portuguesa",
        tri1: 78,
        tri2: "8,2",
        tri3: 8.6,
        faltas: [2, 2, 1]
    },
    {
        disciplina: "Matemática",
        tri1: 55,
        tri2: "5,4",
        tri3: null,
        faltas: [3, 2, 2]
    },
    {
        disciplina: "Ciências",
        tri1: 84,
        tri2: 7.9,
        tri3: "8,3",
        faltas: [1, 1, 1]
    },
    {
        disciplina: "História",
        tri1: "7,1",
        tri2: 82,
        tri3: null,
        faltas: [1, 2, 1]
    },
    {
        disciplina: "Geografia",
        tri1: 69,
        tri2: "7,5",
        tri3: 7.8,
        faltas: [0, 1, 1]
    },
    {
        disciplina: "Língua Inglesa",
        tri1: 88,
        tri2: 8.4,
        tri3: null,
        faltas: [1, 0, 1]
    },
    {
        disciplina: "Arte",
        tri1: "9,2",
        tri2: 87,
        tri3: 9.0,
        faltas: [1, 1, 0]
    },
    {
        disciplina: "Educação Física",
        tri1: 96,
        tri2: "9,3",
        tri3: null,
        faltas: [0, 1, 0]
    },
    {
        disciplina: "Educação Digital",
        tri1: 91,
        tri2: 8.9,
        tri3: "9,4",
        faltas: [1, 1, 0]
    },
    {
        disciplina: "Educação Financeira",
        tri1: 76,
        tri2: "7,2",
        tri3: null,
        faltas: [1, 1, 1]
    },
    {
        disciplina: "Rec. Aprend. Matemática",
        tri1: 58,
        tri2: "5,9",
        tri3: 6.2,
        faltas: [2, 2, 1]
    },
    {
        disciplina: "Leitura Rec. Aprend. Lingua Portuguesa",
        tri1: 72,
        tri2: "7,6",
        tri3: null,
        faltas: [2, 1, 1]
    },
    {
        disciplina: "Pensamento Lógico",
        tri1: 49,
        tri2: 5.5,
        tri3: "5,8",
        faltas: [2, 2, 2]
    },
    {
        disciplina: "Literatura Arte e Movimento",
        tri1: "8,0",
        tri2: 84,
        tri3: null,
        faltas: [1, 1, 0]
    },
    {
        disciplina: "Práticas Experimentais",
        tri1: 64,
        tri2: "6,6",
        tri3: 7.0,
        faltas: [1, 1, 1]
    }
];

// =========================
// NORMALIZAÇÃO DAS NOTAS
// =========================

function normalizarNota(valor) {
    if (valor === null || valor === undefined || valor === "") {
        return null;
    }

    const numero = Number(String(valor).trim().replace(",", "."));

    if (Number.isNaN(numero)) {
        return null;
    }

    if (numero >= 0 && numero <= 10) {
        return numero;
    }

    if (numero > 10 && numero <= 100) {
        return numero / 10;
    }

    return null;
}

// =========================
// CÁLCULO DA MÉDIA
// =========================

function calcularMedia(disciplina) {
    const notas = [
        normalizarNota(disciplina.tri1),
        normalizarNota(disciplina.tri2),
        normalizarNota(disciplina.tri3)
    ];

    const notasValidas = notas.filter(function (nota) {
        return nota !== null;
    });

    if (notasValidas.length === 0) {
        return null;
    }

    let soma = 0;

    notasValidas.forEach(function (nota) {
        soma += nota;
    });

    return soma / notasValidas.length;
}

// =========================
// SOMA DAS FALTAS
// =========================

function calcularFaltas(faltas) {
    if (!Array.isArray(faltas)) return 0;
    let total = 0;

    faltas.forEach(function (falta) {
        const num = Number(falta);
        if (!Number.isNaN(num)) {
            total += num;
        }
    });

    return total;
}

// =========================
// DEFINIÇÃO DA SITUAÇÃO
// =========================

function definirSituacao(media) {
    if (media === null) {
        return "Nota ainda não disponível";
    }

    if (media >= 6) {
        return "Bom desempenho";
    }

    return "Atenção";
}

// =========================
// FORMATAÇÃO DAS NOTAS
// =========================

function formatarNota(nota) {
    if (nota === null) {
        return "Ainda não lançada";
    }

    return nota.toFixed(1).replace(".", ",");
}

// =========================
// PREENCHER A TABELA
// =========================

function preencherTabela() {
    const tabela = document.getElementById("tabelaBoletim");
    tabela.innerHTML = "";

    disciplinas.forEach(function (disciplina, index) {
        const nota1 = normalizarNota(disciplina.tri1);
        const nota2 = normalizarNota(disciplina.tri2);
        const nota3 = normalizarNota(disciplina.tri3);

        const media = calcularMedia(disciplina);
        const faltasArray = Array.isArray(disciplina.faltas) ? disciplina.faltas : [0, 0, 0];
        const faltas = calcularFaltas(faltasArray);
        const situacao = definirSituacao(media);

        const linha = document.createElement("tr");

        let classeSituacao = "situacao-indisponivel";

        if (situacao === "Bom desempenho") {
            classeSituacao = "situacao-bom";
        } else if (situacao === "Atenção") {
            classeSituacao = "situacao-atencao";
        }

        if (modoEdicao) {
            linha.innerHTML = `
                <td id="nome-disc-${index}"></td>
                <td><input type="text" class="input-edicao" id="edit-tri1-${index}" value="${nota1 !== null ? String(nota1).replace(".", ",") : ""}"></td>
                <td><input type="text" class="input-edicao" id="edit-tri2-${index}" value="${nota2 !== null ? String(nota2).replace(".", ",") : ""}"></td>
                <td><input type="text" class="input-edicao" id="edit-tri3-${index}" value="${nota3 !== null ? String(nota3).replace(".", ",") : ""}"></td>
                <td class="media">${formatarNota(media)}</td>
                <td>
                    <div style="display:flex; gap:4px; justify-content:center;">
                        <input type="text" class="input-edicao" id="edit-f1-${index}" value="${faltasArray[0] !== undefined ? faltasArray[0] : 0}">
                        <input type="text" class="input-edicao" id="edit-f2-${index}" value="${faltasArray[1] !== undefined ? faltasArray[1] : 0}">
                        <input type="text" class="input-edicao" id="edit-f3-${index}" value="${faltasArray[2] !== undefined ? faltasArray[2] : 0}">
                    </div>
                </td>
                <td>
                    <span class="situacao ${classeSituacao}">
                        ${situacao}
                    </span>
                </td>
            `;
            tabela.appendChild(linha);
            document.getElementById(`nome-disc-${index}`).textContent = disciplina.disciplina;
        } else {
            linha.innerHTML = `
                <td id="nome-disc-${index}"></td>
                <td class="${nota1 === null ? "nota-indisponivel" : "nota"}">
                    ${formatarNota(nota1)}
                </td>
                <td class="${nota2 === null ? "nota-indisponivel" : "nota"}">
                    ${formatarNota(nota2)}
                </td>
                <td class="${nota3 === null ? "nota-indisponivel" : "nota"}">
                    ${formatarNota(nota3)}
                </td>
                <td class="media">
                    ${formatarNota(media)}
                </td>
                <td>
                    ${faltas}
                </td>
                <td>
                    <span class="situacao ${classeSituacao}">
                        ${situacao}
                    </span>
                </td>
            `;
            tabela.appendChild(linha);
            document.getElementById(`nome-disc-${index}`).textContent = disciplina.disciplina;
        }
    });
}

// =========================
// ATUALIZAR CARDS DE RESUMO
// =========================

function atualizarResumo() {
    let somaDasMedias = 0;
    let disciplinasComMedia = 0;

    let bomDesempenho = 0;
    let precisamAtencao = 0;

    let totalFaltas = 0;

    disciplinas.forEach(function (disciplina) {
        const media = calcularMedia(disciplina);
        const faltasArray = Array.isArray(disciplina.faltas) ? disciplina.faltas : [0, 0, 0];

        totalFaltas += calcularFaltas(faltasArray);

        if (media !== null) {
            somaDasMedias += media;
            disciplinasComMedia++;
        }

        if (media !== null && media >= 6) {
            bomDesempenho++;
        } else if (media !== null && media < 6) {
            precisamAtencao++;
        }
    });

    let mediaGeral = null;

    if (disciplinasComMedia > 0) {
        mediaGeral = somaDasMedias / disciplinasComMedia;
    }

    document.getElementById("mediaGeral").textContent =
        mediaGeral === null ? "—" : formatarNota(mediaGeral);

    document.getElementById("totalFaltas").textContent = totalFaltas;
    document.getElementById("bomDesempenho").textContent = bomDesempenho;
    document.getElementById("precisamAtencao").textContent = precisamAtencao;
    document.getElementById("frequencia").textContent = "92%";
    document.getElementById("frequenciaTexto").textContent = "Frequência adequada";
}

// =========================
// CONEXÃO COM A API - ABRIR
// =========================

async function tentarEntrar() {
    const inputPin = document.getElementById("inputPin");
    const msgAcesso = document.getElementById("mensagemAcesso");
    const pinDigitado = inputPin.value.trim();

    if (!pinDigitado) {
        msgAcesso.textContent = "Por favor, digite seu PIN.";
        msgAcesso.className = "mensagem-status mensagem-erro";
        return;
    }

    msgAcesso.textContent = "Conectando...";
    msgAcesso.className = "mensagem-status";

    try {
        const resposta = await fetch(`${CONFIG_ALUNO.apiUrl}/api/v1/boletins/abrir`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                turma: CONFIG_ALUNO.turma,
                numero_chamada: CONFIG_ALUNO.numeroChamada,
                pin: pinDigitado
            })
        });

        if (resposta.status === 401) {
            msgAcesso.textContent = "Turma, chamada ou PIN inválidos.";
            msgAcesso.className = "mensagem-status mensagem-erro";
            return;
        }

        if (resposta.status === 429) {
            msgAcesso.textContent = "Muitas tentativas. Aguarde um minuto e tente novamente.";
            msgAcesso.className = "mensagem-status mensagem-erro";
            return;
        }

        if (!resposta.ok) {
            msgAcesso.textContent = "Não foi possível conectar ao servidor. Tente novamente.";
            msgAcesso.className = "mensagem-status mensagem-erro";
            return;
        }

        const dadosRetornados = await resposta.json();

        // Guarda PIN em memória e limpa do campo
        pinSessao = pinDigitado;
        inputPin.value = "";

        // Se existirem dados na API, substitui completamente
        if (dadosRetornados && dadosRetornados.dados && Array.isArray(dadosRetornados.dados.disciplinas)) {
            disciplinas = dadosRetornados.dados.disciplinas;
        }

        document.getElementById("areaAcesso").style.display = "none";
        document.getElementById("conteudoBoletim").style.display = "block";

        preencherTabela();
        atualizarResumo();

        // (GRÁFICOS) atualização após exibição normal do boletim
        atualizarGraficos();

    } catch (erro) {
        msgAcesso.textContent = "Não foi possível conectar ao servidor. Tente novamente.";
        msgAcesso.className = "mensagem-status mensagem-erro";
    }
}

// =========================
// VALIDAÇÃO E SALVAMENTO
// =========================

function validarNotaInput(input) {
    const valor = input.value.trim();

    if (valor === "") {
        input.classList.remove("input-invalido");
        return { valido: true, valor: null };
    }

    const valorNormalizado = valor.replace(",", ".");
    const num = Number(valorNormalizado);

    if (Number.isNaN(num) || num < 0 || num > 10) {
        input.classList.add("input-invalido");
        return { valido: false };
    }

    input.classList.remove("input-invalido");
    return { valido: true, valor: num };
}

function validarFaltaInput(input) {
    const valor = input.value.trim();

    if (valor === "" || !/^\d+$/.test(valor)) {
        input.classList.add("input-invalido");
        return { valido: false };
    }

    const num = Number(valor);
    if (num < 0) {
        input.classList.add("input-invalido");
        return { valido: false };
    }

    input.classList.remove("input-invalido");
    return { valido: true, valor: num };
}

async function salvarAlteracoes() {
    const msgEdicao = document.getElementById("mensagemEdicao");
    let comErro = false;

    const novasDisciplinas = JSON.parse(JSON.stringify(disciplinas));

    novasDisciplinas.forEach(function (disc, index) {
        const inputT1 = document.getElementById(`edit-tri1-${index}`);
        const inputT2 = document.getElementById(`edit-tri2-${index}`);
        const inputT3 = document.getElementById(`edit-tri3-${index}`);

        const inputF1 = document.getElementById(`edit-f1-${index}`);
        const inputF2 = document.getElementById(`edit-f2-${index}`);
        const inputF3 = document.getElementById(`edit-f3-${index}`);

        const valT1 = validarNotaInput(inputT1);
        const valT2 = validarNotaInput(inputT2);
        const valT3 = validarNotaInput(inputT3);

        const valF1 = validarFaltaInput(inputF1);
        const valF2 = validarFaltaInput(inputF2);
        const valF3 = validarFaltaInput(inputF3);

        if (!valT1.valido || !valT2.valido || !valT3.valido || !valF1.valido || !valF2.valido || !valF3.valido) {
            comErro = true;
        } else {
            disc.tri1 = valT1.valor;
            disc.tri2 = valT2.valor;
            disc.tri3 = valT3.valor;
            disc.faltas = [valF1.valor, valF2.valor, valF3.valor];
        }
    });

    if (comErro) {
        msgEdicao.textContent = "Por favor, corrija os campos destacados em vermelho antes de salvar.";
        msgEdicao.className = "mensagem-status mensagem-erro";
        return;
    }

    msgEdicao.textContent = "Salvando...";
    msgEdicao.className = "mensagem-status";

    try {
        const resposta = await fetch(`${CONFIG_ALUNO.apiUrl}/api/v1/boletins/salvar`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                turma: CONFIG_ALUNO.turma,
                numero_chamada: CONFIG_ALUNO.numeroChamada,
                pin: pinSessao,
                dados: {
                    disciplinas: novasDisciplinas
                }
            })
        });

        if (!resposta.ok) {
            msgEdicao.textContent = "Erro ao salvar os dados no servidor. Tente novamente.";
            msgEdicao.className = "mensagem-status mensagem-erro";
            return;
        }

        disciplinas = novasDisciplinas;
        modoEdicao = false;
        document.getElementById("painelEdicaoBotoes").style.display = "none";
        document.getElementById("btnEditar").style.display = "inline-block";

        preencherTabela();
        atualizarResumo();

        // (GRÁFICOS) atualização após salvamento bem-sucedido
        atualizarGraficos();

        msgEdicao.textContent = "Dados salvos com sucesso.";
        msgEdicao.className = "mensagem-status mensagem-sucesso";

    } catch (erro) {
        msgEdicao.textContent = "Não foi possível conectar ao servidor. Tente novamente.";
        msgEdicao.className = "mensagem-status mensagem-erro";
    }
}

// =========================
// INICIAR O BOLETIM
// =========================

document.addEventListener("DOMContentLoaded", function () {
    const btnEntrar = document.getElementById("btnEntrar");
    const inputPin = document.getElementById("inputPin");
    const btnEditar = document.getElementById("btnEditar");
    const btnSalvar = document.getElementById("btnSalvar");
    const btnCancelar = document.getElementById("btnCancelar");

    if (btnEntrar) {
        btnEntrar.addEventListener("click", tentarEntrar);
    }

    if (inputPin) {
        inputPin.addEventListener("keyup", function (evento) {
            if (evento.key === "Enter") {
                tentarEntrar();
            }
        });
    }

    if (btnEditar) {
        btnEditar.addEventListener("click", function () {
            modoEdicao = true;
            document.getElementById("painelEdicaoBotoes").style.display = "flex";
            btnEditar.style.display = "none";
            document.getElementById("mensagemEdicao").textContent = "";
            preencherTabela();
        });
    }

    if (btnCancelar) {
        btnCancelar.addEventListener("click", function () {
            modoEdicao = false;
            document.getElementById("painelEdicaoBotoes").style.display = "none";
            btnEditar.style.display = "inline-block";
            document.getElementById("mensagemEdicao").textContent = "";
            preencherTabela();
        });
    }

    if (btnSalvar) {
        btnSalvar.addEventListener("click", salvarAlteracoes);
    }

    console.log("Boletim Digital configurado para a Turma 9C, Chamada nº 38.");
});

// =========================
// GRÁFICOS (SOMENTE LEITURA)
// =========================

// Instâncias
let graficoMedias = null;
let graficoEvolucao = null;
let graficoFaltas = null;

// Referência interna de risco (NÃO exibir na interface)
const LIMITE_INTERNO_FALTAS = 350;

// Tema visual reaproveitado do projeto
const TEMA_GRAFICOS = {
    azul: "#0878d1",
    azulClaro: "#35b8f4",
    azulBorda: "#a6e1ff",
    azulFundo: "#e0f4ff",
    texto: "#17324d",
    textoSecundario: "#5b7185",
    grade: "#dcecf5",
    verde: "#2b8a3e",
    verdeClaro: "#7ed6a4",
    vermelho: "#e03131",
    vermelhoEscuro: "#c92a2a",
    vermelhoFundo: "#ffe3e3"
};

// -------- Helpers de leitura (não mutam o estado) --------

function mediaAtualPorDisciplina() {
    // Retorna { labels: [...], valores: [...] } a partir de `disciplinas`.
    // Usa calcularMedia() existente. null permanece null.
    const labels = [];
    const valores = [];

    disciplinas.forEach(function (disc) {
        labels.push(disc.disciplina);
        valores.push(calcularMedia(disc)); // pode ser null
    });

    return { labels: labels, valores: valores };
}

function evolucaoMediaGeralPorTrimestre() {
    // Para cada trimestre (1,2,3), calcula a média de todas as notas válidas.
    // null quando não houver nenhuma nota válida no trimestre.
    const chaves = ["tri1", "tri2", "tri3"];
    const valores = [];

    chaves.forEach(function (chave) {
        let soma = 0;
        let contagem = 0;

        disciplinas.forEach(function (disc) {
            const nota = normalizarNota(disc[chave]);
            if (nota !== null) {
                soma += nota;
                contagem++;
            }
        });

        valores.push(contagem > 0 ? soma / contagem : null);
    });

    return {
        labels: ["1º Tri", "2º Tri", "3º Tri"],
        valores: valores
    };
}

function faltasPorTrimestre() {
    // Soma faltas[0], faltas[1], faltas[2] de todas as disciplinas.
    const totais = [0, 0, 0];

    disciplinas.forEach(function (disc) {
        if (!Array.isArray(disc.faltas)) return;
        for (let i = 0; i < 3; i++) {
            const n = Number(disc.faltas[i]);
            if (!Number.isNaN(n)) {
                totais[i] += n;
            }
        }
    });

    return {
        labels: ["1º Tri", "2º Tri", "3º Tri"],
        valores: totais,
        total: totais[0] + totais[1] + totais[2]
    };
}

// -------- Gráfico 1 — Média por disciplina --------

function atualizarGraficoMedias() {
    const canvas = document.getElementById("graficoMediasDisciplinas");
    if (!canvas || typeof Chart === "undefined") return;

    if (graficoMedias) {
        graficoMedias.destroy();
        graficoMedias = null;
    }

    const dados = mediaAtualPorDisciplina();

    // Barras: cada disciplina com cor baseada em sua média
    const cores = dados.valores.map(function (v) {
        if (v === null) return "#cfd8e0";
        if (v >= 6) return TEMA_GRAFICOS.azul;
        return TEMA_GRAFICOS.vermelho;
    });

    graficoMedias = new Chart(canvas.getContext("2d"), {
        type: "bar",
        data: {
            labels: dados.labels,
            datasets: [{
                label: "Média",
                data: dados.valores,
                backgroundColor: cores,
                borderColor: cores,
                borderWidth: 0,
                borderRadius: 6,
                barPercentage: 0.8,
                categoryPercentage: 0.85
            }]
        },
        options: {
            indexAxis: "y",
            responsive: true,
            maintainAspectRatio: false,
            animation: { duration: 400 },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: "rgba(23, 50, 77, 0.95)",
                    titleColor: "#ffffff",
                    bodyColor: "#ffffff",
                    callbacks: {
                        label: function (ctx) {
                            const v = ctx.parsed.x;
                            if (v === null || v === undefined) {
                                return "Sem nota lançada";
                            }
                            return "Média: " + v.toFixed(1).replace(".", ",");
                        }
                    }
                }
            },
            scales: {
                x: {
                    min: 0,
                    max: 10,
                    ticks: {
                        color: TEMA_GRAFICOS.textoSecundario,
                        stepSize: 2
                    },
                    grid: { color: TEMA_GRAFICOS.grade },
                    title: {
                        display: true,
                        text: "Média (0 a 10)",
                        color: TEMA_GRAFICOS.textoSecundario,
                        font: { size: 11 }
                    }
                },
                y: {
                    ticks: {
                        color: TEMA_GRAFICOS.texto,
                        autoSkip: false,
                        font: { size: 11 }
                    },
                    grid: { color: "transparent" }
                }
            }
        }
    });
}

// -------- Gráfico 2 — Evolução da média geral --------

function atualizarGraficoEvolucao() {
    const canvas = document.getElementById("graficoEvolucaoTrimestres");
    if (!canvas || typeof Chart === "undefined") return;

    if (graficoEvolucao) {
        graficoEvolucao.destroy();
        graficoEvolucao = null;
    }

    const dados = evolucaoMediaGeralPorTrimestre();

    graficoEvolucao = new Chart(canvas.getContext("2d"), {
        type: "line",
        data: {
            labels: dados.labels,
            datasets: [{
                label: "Média geral",
                data: dados.valores,
                borderColor: TEMA_GRAFICOS.azulClaro,
                backgroundColor: "rgba(53, 184, 244, 0.18)",
                pointBackgroundColor: TEMA_GRAFICOS.azul,
                pointBorderColor: "#ffffff",
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8,
                borderWidth: 3,
                tension: 0.35,
                fill: true,
                spanGaps: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: { duration: 400 },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: "rgba(23, 50, 77, 0.95)",
                    titleColor: "#ffffff",
                    bodyColor: "#ffffff",
                    callbacks: {
                        label: function (ctx) {
                            const v = ctx.parsed.y;
                            if (v === null || v === undefined) {
                                return "Sem notas neste trimestre";
                            }
                            return "Média: " + v.toFixed(1).replace(".", ",");
                        }
                    }
                }
            },
            scales: {
                y: {
                    min: 0,
                    max: 10,
                    ticks: {
                        color: TEMA_GRAFICOS.textoSecundario,
                        stepSize: 2
                    },
                    grid: { color: TEMA_GRAFICOS.grade },
                    title: {
                        display: true,
                        text: "Média (0 a 10)",
                        color: TEMA_GRAFICOS.textoSecundario,
                        font: { size: 11 }
                    }
                },
                x: {
                    ticks: {
                        color: TEMA_GRAFICOS.texto,
                        font: { size: 12 }
                    },
                    grid: { color: "transparent" }
                }
            }
        }
    });
}

// -------- Gráfico 3 — Faltas por trimestre --------

function atualizarGraficoFaltas() {
    const canvas = document.getElementById("graficoFaltasTrimestres");
    if (!canvas || typeof Chart === "undefined") return;

    if (graficoFaltas) {
        graficoFaltas.destroy();
        graficoFaltas = null;
    }

    const dados = faltasPorTrimestre();

    // Estado de perigo (interno, sem expor a referência)
    const emPerigo = dados.total >= LIMITE_INTERNO_FALTAS;

    const card = document.getElementById("cardGraficoFaltas");
    const badge = document.getElementById("badgePerigo");

    if (card) {
        card.classList.toggle("perigo", emPerigo);
    }
    if (badge) {
        badge.hidden = !emPerigo;
    }

    const corBase = emPerigo ? TEMA_GRAFICOS.vermelho : TEMA_GRAFICOS.azul;
    const corBaseHover = emPerigo ? TEMA_GRAFICOS.vermelhoEscuro : TEMA_GRAFICOS.azulClaro;

    graficoFaltas = new Chart(canvas.getContext("2d"), {
        type: "bar",
        data: {
            labels: dados.labels,
            datasets: [{
                label: "Faltas",
                data: dados.valores,
                backgroundColor: corBase,
                hoverBackgroundColor: corBaseHover,
                borderRadius: 8,
                borderWidth: 0,
                barPercentage: 0.7,
                categoryPercentage: 0.8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: { duration: 400 },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: "rgba(23, 50, 77, 0.95)",
                    titleColor: "#ffffff",
                    bodyColor: "#ffffff",
                    callbacks: {
                        label: function (ctx) {
                            const v = ctx.parsed.y;
                            return v + (v === 1 ? " falta" : " faltas");
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: TEMA_GRAFICOS.textoSecundario,
                        precision: 0
                    },
                    grid: { color: TEMA_GRAFICOS.grade },
                    title: {
                        display: true,
                        text: "Faltas",
                        color: TEMA_GRAFICOS.textoSecundario,
                        font: { size: 11 }
                    }
                },
                x: {
                    ticks: {
                        color: TEMA_GRAFICOS.texto,
                        font: { size: 12 }
                    },
                    grid: { color: "transparent" }
                }
            }
        }
    });
}

// -------- Orquestrador --------

function atualizarGraficos() {
    atualizarGraficoMedias();
    atualizarGraficoEvolucao();
    atualizarGraficoFaltas();
}