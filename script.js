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