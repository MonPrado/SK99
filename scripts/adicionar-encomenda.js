document.getElementById("produtoForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o envio do formulário

    // Limpa mensagens de erro anteriores
    document.getElementById("error-messages").innerHTML = '';

    // Captura dos valores do formulário
    var nome = document.getElementById("nome").value;
    var quantidade = parseInt(document.getElementById("quantidade").value);
    var produto = document.getElementById("produto").value;
    var valor = parseFloat(document.getElementById("valor").value);

     // Limpa mensagens de erro anteriores
     limparMensagensErro();

     // Array para armazenar mensagens de erro
     var mensagensErro = [];
 
     // Verificação da validade da quantidade e do valor
     if (quantidade <= 0 || isNaN(quantidade)) {
         mensagensErro.push("Quantidade inválida.");
     }
     
     if (valor <= 0 || isNaN(valor)) {
         mensagensErro.push("Valor inválido.");
     }
     
     // Se houver mensagens de erro, exibe todas
     if (mensagensErro.length > 0) {
         exibirErros(mensagensErro);
         return;
     }
    
    // Se chegou até aqui, os campos estão corretos, então pode adicionar a encomenda
    adicionarEncomenda(nome, quantidade, produto, valor);
});

// Função para exibir mensagens de erro no div de erro
function exibirErros(mensagensErro) {
    var errorDiv = document.getElementById("error-messages");
    mensagensErro.forEach(function(mensagem) {
        var errorMessage = document.createElement("div");
        errorMessage.textContent = mensagem;
        errorMessage.style.color = "red";
        errorDiv.appendChild(errorMessage);
    });
}

// Função para adicionar a encomenda na tabela
function adicionarEncomenda(nome, quantidade, produto, valor) {

    document.getElementById("error-messages").innerHTML = '';

    var table = document.querySelector(".tabela_principal tbody");
    var newRow = table.insertRow();

    // Criação das células da nova linha
    var cellNome = newRow.insertCell(0);
    var cellProduto = newRow.insertCell(1);
    var cellQuantidade = newRow.insertCell(2);
    var cellValorUnitario = newRow.insertCell(3);
    var cellValorTotal = newRow.insertCell(4);

    // Definição do conteúdo das células
    cellNome.textContent = nome;
    cellProduto.textContent = produto;
    cellQuantidade.textContent = quantidade;
    cellValorUnitario.textContent = formatarValorMonetario(valor);

    // Verificação da validade da quantidade e do valor
    if (quantidade <= 0 || isNaN(quantidade)) { // Modificado <= 0
        cellQuantidade.textContent = "Quantidade Inválida";
        cellQuantidade.style.color = "red";
        cellValorTotal.textContent = ""; // Limpa o valor total
    } else if (valor <= 0 || isNaN(valor)) { // Modificado <= 0
        cellValorUnitario.textContent = "Valor Inválido";
        newRow.style.backgroundColor = "red";
        cellNome.style.color = "white";
        cellProduto.style.color = "white";
        cellQuantidade.style.color = "white";
        cellValorUnitario.style.color = "white";
        cellValorTotal.textContent = ""; // Limpa o valor total
    } else {
        // Quantidade e valor válidos, calcula o valor total e formata
        cellValorTotal.textContent = formatarValorMonetario(calculoTotal(quantidade, valor));
    }

    // Limpa os campos do formulário
    document.getElementById("nome").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("produto").selectedIndex = 0;
    document.getElementById("valor").value = "";

    // Adiciona evento de duplo clique para remover a linha recém-adicionada
    newRow.addEventListener("dblclick", function() {
        this.remove();
    });
}

function limparMensagensErro() {
    var errorDiv = document.getElementById("error-messages");
    errorDiv.innerHTML = ''; // Limpa o conteúdo do div de mensagens de erro
}

document.querySelectorAll(".linhas").forEach(function(linha) {
    linha.addEventListener("dblclick", function() {
        this.remove();
    });
});

// Adiciona evento de clique para remover a tabela
document.querySelector(".tabela_principal").addEventListener("click", function(event) {
    // Verifica se o elemento clicado é a própria tabela
    if (event.target.classList.contains("tabela_principal")) {
        // Remove a tabela
        this.remove();
    }
});
