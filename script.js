// ==========================
// VARIÁVEIS GLOBAIS
// ==========================
let productList;
let cartList;
let totalEl;

let cartCount;
let miniList;
let miniTotal;

let btnFinalizar;
let mensagemCompra;

let carrinho = [];

// ==========================
// DADOS DOS PRODUTOS
// ==========================
const produtos = [
  { id: 1, nome: "Smartphone", preco: 1500, imagem: "img/iphone.jpg" },
  { id: 2, nome: "Camiseta", preco: 80, imagem: "img/camisa.jpg" },
  { id: 3, nome: "Relógio", preco: 250, imagem: "img/relogio.jpg" }
];

// ==========================
// RENDERIZAÇÃO DOS PRODUTOS
// ==========================
function renderizarProdutos() {
  if (!productList) return;
  productList.innerHTML = "";

  produtos.forEach(produto => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}">
      <h3>${produto.nome}</h3>
      <p>R$ ${produto.preco}</p>
      <button>Adicionar ao carrinho</button>
    `;

    card.querySelector("button").addEventListener("click", () => {
      adicionarAoCarrinho(produto.id);
    });

    productList.appendChild(card);
  });
}

// ==========================
// ADICIONAR PRODUTO AO CARRINHO
// ==========================
function adicionarAoCarrinho(id) {
  const produto = produtos.find(p => p.id === id);
  carrinho.push(produto);
  salvarCarrinho();
}

// ==========================
// RENDERIZAÇÃO DO CARRINHO PRINCIPAL
// ==========================
function renderizarCarrinho() {
  if (!cartList) return;
  cartList.innerHTML = "";

  let total = 0;

  carrinho.forEach((item, index) => {
    total += item.preco;

    const li = document.createElement("li");
    li.innerHTML = `
      ${item.nome} - R$ ${item.preco}
      <button style="background-color: red; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">Remover</button>
    `;

    li.querySelector("button").addEventListener("click", () => {
      carrinho.splice(index, 1);
      salvarCarrinho();
    });

    cartList.appendChild(li);
  });

  if (totalEl) {
    totalEl.textContent = `Total: R$ ${total}`;
  }
}

// ==========================
// MINI CARRINHO
// ==========================
function atualizarMiniCarrinho() {
  if (!cartCount) return;

  cartCount.textContent = carrinho.length;
  miniList.innerHTML = "";

  let total = 0;

  carrinho.forEach(item => {
    total += item.preco;
    const li = document.createElement("li");
    li.textContent = `${item.nome} - R$ ${item.preco}`;
    miniList.appendChild(li);
  });

  miniTotal.textContent = `Total: R$ ${total}`;
}

// ==========================
// FINALIZAR COMPRA
// ==========================
function finalizarCompra() {
  if (carrinho.length === 0) {
    mensagemCompra.textContent = "Seu carrinho está vazio!";
    mensagemCompra.style.color = "red";
    return;
  }

  mensagemCompra.textContent = "Compra realizada com sucesso!";
  mensagemCompra.style.color = "green";

  carrinho = [];
  salvarCarrinho();
}

// ==========================
// PERSISTÊNCIA (LOCALSTORAGE)
// ==========================
function salvarCarrinho() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  renderizarCarrinho();
  atualizarMiniCarrinho();
}

// ==========================
// INICIALIZAÇÃO DO SISTEMA
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  productList = document.getElementById("product-list");
  cartList = document.getElementById("cart-list");
  totalEl = document.getElementById("total");

  cartCount = document.getElementById("cart-count");
  miniList = document.getElementById("mini-cart-list");
  miniTotal = document.getElementById("mini-total");

  btnFinalizar = document.getElementById("finalizar-compra");
  mensagemCompra = document.getElementById("mensagem-compra");

  carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  renderizarProdutos();
  renderizarCarrinho();
  atualizarMiniCarrinho();

  if (btnFinalizar) {
    btnFinalizar.addEventListener("click", finalizarCompra);
  }
});