// =========================
// DADOS FICTÍCIOS DO BOLETIM
// =========================

// Array = uma lista de informações.
// Cada objeto representa uma disciplina.
const disciplinas = [
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

// Função = um bloco de código que realiza uma tarefa.
function normalizarNota(valor) {

    // Nota vazia não está lançada.
    if (valor === null || valor === undefined || valor === "") {
        return null;
    }

    // Aceita números escritos com vírgula ou ponto.
    const numero = Number(String(valor).trim().replace(",", "."));

    // Se não for um número válido, não usamos na média.
    if (Number.isNaN(numero)) {
        return null;
    }

    // Valores entre 0 e 10 já estão na escala correta.
    if (numero >= 0 && numero <= 10) {
        return numero;
    }

    // Valores maiores que 10 até 100 são convertidos.
    if (numero > 10 && numero <= 100) {
        return numero / 10;
    }

    // Valores fora das regras são inválidos.
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

    // Filtra somente as notas que realmente existem.
    const notasValidas = notas.filter(function (nota) {
        return nota !== null;
    });

    // Se não houver notas válidas, não existe média.
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

    let total = 0;

    faltas.forEach(function (falta) {
        total += falta;
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

    disciplinas.forEach(function (disciplina) {

        const nota1 = normalizarNota(disciplina.tri1);
        const nota2 = normalizarNota(disciplina.tri2);
        const nota3 = normalizarNota(disciplina.tri3);

        const media = calcularMedia(disciplina);
        const faltas = calcularFaltas(disciplina.faltas);
        const situacao = definirSituacao(media);

        const linha = document.createElement("tr");

        let classeSituacao = "situacao-indisponivel";

        if (situacao === "Bom desempenho") {
            classeSituacao = "situacao-bom";
        } else if (situacao === "Atenção") {
            classeSituacao = "situacao-atencao";
        }

        linha.innerHTML = `
            <td>${disciplina.disciplina}</td>

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

        // Soma todas as faltas.
        totalFaltas += calcularFaltas(disciplina.faltas);

        // Calcula a média geral somente usando médias disponíveis.
        if (media !== null) {
            somaDasMedias += media;
            disciplinasComMedia++;
        }

        // Conta as situações.
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

    // Esta frequência é APENAS demonstrativa.
    // No futuro, ela será tratada de outra forma.
    document.getElementById("frequencia").textContent = "92%";

    document.getElementById("frequenciaTexto").textContent =
        "Frequência adequada";
}


// =========================
// INICIAR O BOLETIM
// =========================

// DOM = representação da página HTML que o JavaScript consegue modificar.
document.addEventListener("DOMContentLoaded", function () {

    preencherTabela();
    atualizarResumo();

    console.log("Boletim Digital carregado com sucesso!");
});