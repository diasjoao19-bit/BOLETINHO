# BOLETINHO
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Boletim Digital</title>

    <!-- Ligação com o arquivo de estilos -->
    <link rel="stylesheet" href="style.css">
</head>

<body>

    <!-- Cabeçalho -->
    <header class="cabecalho">
        <h1>📚 Boletim Digital</h1>
        <p>Confira suas notas e seu desempenho escolar</p>
    </header>

    <!-- Informações do aluno -->
    <main class="container">

        <section class="aluno-card">
            <h2>👨‍🎓 Informações do aluno</h2>

            <p><strong>Nome:</strong> João Silva</p>
            <p><strong>Turma:</strong> 9º Ano A</p>
            <p><strong>Ano letivo:</strong> 2026</p>
        </section>

        <!-- Área das matérias -->
        <section>
            <h2 class="titulo-materias">📖 Minhas matérias</h2>

            <div class="cards-materias">

                <!-- Matemática -->
                <div class="card materia-matematica">
                    <h3>📐 Matemática</h3>
                    <p>1º Bimestre: <strong>8,5</strong></p>
                    <p>2º Bimestre: <strong>9,0</strong></p>
                    <p>3º Bimestre: <strong>8,0</strong></p>
                    <p>4º Bimestre: <strong>9,0</strong></p>

                    <div class="media">
                        Média: <strong>8,6</strong>
                    </div>

                    <div class="situacao aprovado">
                        ✅ Aprovado
                    </div>
                </div>

                <!-- Português -->
                <div class="card materia-portugues">
                    <h3>📖 Português</h3>
                    <p>1º Bimestre: <strong>9,0</strong></p>
                    <p>2º Bimestre: <strong>8,5</strong></p>
                    <p>3º Bimestre: <strong>9,0</strong></p>
                    <p>4º Bimestre: <strong>9,5</strong></p>

                    <div class="media">
                        Média: <strong>9,0</strong>
                    </div>

                    <div class="situacao aprovado">
                        ✅ Aprovado
                    </div>
                </div>

                <!-- Ciências -->
                <div class="card materia-ciencias">
                    <h3>🔬 Ciências</h3>
                    <p>1º Bimestre: <strong>7,0</strong></p>
                    <p>2º Bimestre: <strong>6,5</strong></p>
                    <p>3º Bimestre: <strong>7,5</strong></p>
                    <p>4º Bimestre: <strong>7,0</strong></p>

                    <div class="media">
                        Média: <strong>7,0</strong>
                    </div>

                    <div class="situacao recuperacao">
                        ⚠️ Recuperação
                    </div>
                </div>

                <!-- História -->
                <div class="card materia-historia">
                    <h3>🏛️ História</h3>
                    <p>1º Bimestre: <strong>8,0</strong></p>
                    <p>2º Bimestre: <strong>8,5</strong></p>
                    <p>3º Bimestre: <strong>8,0</strong></p>
                    <p>4º Bimestre: <strong>9,0</strong></p>

                    <div class="media">
                        Média: <strong>8,4</strong>
                    </div>

                    <div class="situacao aprovado">
                        ✅ Aprovado
                    </div>
                </div>

            </div>
        </section>

    </main>

    <!-- Rodapé -->
    <footer>
        <p>Boletim Digital • Dados fictícios para demonstração</p>
    </footer>

    <!-- JavaScript -->
    <script src="script.js"></script>

</body>
</html>
```
