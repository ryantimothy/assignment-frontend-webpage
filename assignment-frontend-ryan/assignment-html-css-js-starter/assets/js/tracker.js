const amount = document.getElementById("amount");
const balance = document.getElementById("balance");

const addMoney = document.getElementById("add-money");
const minMoney = document.getElementById("min-money");

const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("trans-detail");

const localStorageTransations = JSON.parse(localStorage.getItem("transations"));
let transactions =
  localStorage.getItem("transations") !== null ? localStorageTransations : [];

function addTransation() {
  if (text.value.trim() === "" || amount.value.trim() === "") {
    text.placeholder = "Enter details...";
    text.style.backgroundColor = "#ccc";
    amount.placeholder = "Enter amount...";
    amount.style.backgroundColor = "#ccc";
  } else {
    const transation = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
    };
    transactions.push(transation);
    addTransationDOM(transation);
    updateValues();
    updateLocalStorage();
    text.value = "";
    amount.value = "";
  }
}

function generateID() {
  return Math.floor(Math.random() * 100000);
}

function updateValues() {
  const amounts = transactions.map((transation) => transation.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0); // filter amount yg ada diatas 0 utk income

  const expense =
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1; // filter amount yg ada dibwh 0 utk expense

  let stringTotal = Intl.NumberFormat("id-ID").format(total);
  let stringaddMoney = Intl.NumberFormat("id-ID").format(income);
  let stringminMoney = Intl.NumberFormat("id-ID").format(expense);

  balance.innerText = `Rp${stringTotal}`;
  addMoney.innerText = `+Rp${stringaddMoney}`;
  minMoney.innerText = `-Rp${stringminMoney}`;
}

function init() {
  list.innerHTML = "";
  transactions.forEach(addTransationDOM);
  updateValues();
}
init();

function addTransationDOM(transation) {
  const sign = transation.amount < 0 ? "-" : "+";
  const item = document.createElement("li");

  item.classList.add(transation.amount < 0 ? "minus" : "plus");
  item.innerHTML = `<button class="delete-btn" onclick="removeTransation(${
    transation.id
  })">x</button> ${transation.text} <span>${sign}${Math.abs(
    transation.amount
  )} </span> `;
  list.appendChild(item);
}

function removeTransation(id) {
  transactions = transactions.filter((transation) => transation.id !== id);
  updateLocalStorage();
  init();
}

function updateLocalStorage() {
  localStorage.setItem("transations", JSON.stringify(transactions));
}
