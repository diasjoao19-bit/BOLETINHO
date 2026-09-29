```javascript
// Aguarda a página carregar completamente

document.addEventListener("DOMContentLoaded", function () {

    // Mostra uma mensagem no console para confirmar que o JavaScript carregou
    console.log("Boletim Digital carregado com sucesso!");

    // Seleciona todos os cards das matérias
    const cards = document.querySelectorAll(".card");

    // Adiciona uma interação para cada card
    cards.forEach(function (card) {

        card.addEventListener("click", function () {
            const materia = card.querySelector("h3").textContent;

            alert("Você selecionou: " + materia);
        });

    });

});
```
