var botaoBuscar = document.querySelector("#buscar-encomendas");

botaoBuscar.addEventListener("click", function () {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "http://localhost:3000/encomendas_web");
    xhr.addEventListener("load", function () {
        var resposta = xhr.responseText;

        var encomendas = JSON.parse(resposta);

        encomendas.forEach(function (encomenda) {
            adicionarEncomenda(encomenda.nome, encomenda.quantidade, encomenda.produto, encomenda.valor);
        })


    });
    xhr.send();
});

// Função para adicionar a nova encomenda na tabela
function addEncomenda(novaEncomenda) {
    const tabela = document.querySelector("#tabela-clientes");

    tabela.appendChild(montaTR(novaEncomenda));
}

// Função para montar uma nova TD
function montaTD(dado) {
    var td = document.createElement("td");
    td.textContent = dado;

    return td;
}

// Função para montar uma nova TR
function montaTR(novaEncomenda) {
    var tr = document.createElement("tr");
    tr.classList.add("linhas");

    tr.appendChild(montaTD(novaEncomenda.nome, "info-nome"));
    tr.appendChild(montaTD(novaEncomenda.produto, "info-produto"));
    tr.appendChild(montaTD(novaEncomenda.qtde, "info-qtde"));
    tr.appendChild(montaTD(formataValor(parseFloat(novaEncomenda.unitario)), "info-valor"));
    tr.appendChild(montaTD(formataValor(parseFloat(novaEncomenda.total)), "info-valor-total"));

    return tr;
}

// Função para formatar o valor em moeda
function formataValor(valor) {
    return valor.toLocaleString('pt-Br', { style: 'currency', currency: 'BRL' });
}

// Função para calcular o total
function calculaTotal(qtde, unitario) {
    return qtde * unitario;
}