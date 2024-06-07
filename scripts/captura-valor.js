var titulo = document.querySelector(".titulo_secao");
titulo.textContent = "Lista de Encomendas";

// Captura todos os clientes que fizeram encomendas 
var clientes = document.querySelectorAll(".linhas");

// Passa por cada encomenda calculando o valor total 
for (var count = 0; count < clientes.length; count++) {
    // Captura a quantidade encomendada
    var qtde = parseInt(clientes[count].querySelector(".info-qtde").textContent);
    // Captura o valor unitário do produto 
    var unitario = parseFloat(clientes[count].querySelector(".info-valor").textContent);

    // Valida a quantidade e o valor unitário
    if (qtde <= 0 || isNaN(qtde) || unitario <= 0 || isNaN(unitario)) {
        // Adiciona a mensagem de erro na célula adequada
        if (qtde <= 0 || isNaN(qtde)) {
            var errorMessageCell = clientes[count].querySelector(".info-qtde");
            errorMessageCell.textContent = "Quantidade Inválida";
            errorMessageCell.style.color = "red";
        }
        if (unitario <= 0 || isNaN(unitario)) {
            var errorMessageCell = clientes[count].querySelector(".info-valor");
            errorMessageCell.textContent = "Valor Inválido";
            errorMessageCell.style.color = "red";
        }

        // Colore a linha em vermelho
        clientes[count].style.backgroundColor = "red";
        clientes[count].querySelectorAll("td").forEach(function (cell) {
            cell.style.color = "white";
        });
    } else {
        // Quantidade e valor unitário válidos
        // Calcula o valor total da encomenda 
        clientes[count].querySelector(".info-valor").textContent = formatarValorMonetario(unitario);
        clientes[count].querySelector(".info-valor-total").textContent = formatarValorMonetario(calculoTotal(qtde, unitario));
    }
}

// Função para calcular o valor total de encomendas 
function calculoTotal(qtde, unitario) {
    var total = qtde * unitario;
    return total;
}

// Função para formatar valores monetários 
function formatarValorMonetario(valor) {
    var formReal = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    return formReal;
}
