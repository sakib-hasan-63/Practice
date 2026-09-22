// DAY 8 — Expense Tracker 

const form = document.querySelector("#expenseForm");

const titleInput = document.querySelector("#title");
const amountInput = document.querySelector("#amount");
const categoryInput = document.querySelector("#category");

const expenseList = document.querySelector("#expenseList");

const totalExpense = document.querySelector("#totalExpense");
const foodExpense = document.querySelector("#foodExpense");
const shoppingExpense =
  document.querySelector("#shoppingExpense");

const clearAll = document.querySelector("#clearAll");


let expenses =
  JSON.parse(localStorage.getItem("expenses")) || [];


const saveExpenses = () => {

  localStorage.setItem(
    "expenses",
    JSON.stringify(expenses)
  );

};


const calculateTotal = (category = null) => {

  return expenses
    .filter(expense =>
      category ? expense.category === category : true
    )
    .reduce(
      (total, expense) =>
        total + expense.amount,
      0
    );

};


const renderExpenses = () => {

  expenseList.innerHTML = "";

  if (expenses.length === 0) {

    expenseList.innerHTML = `
      <p class="text-center text-slate-500 py-10">
        No expenses found.
      </p>
    `;

  }

  expenses.forEach(expense => {

    const div = document.createElement("div");

    div.className =
      "flex justify-between items-center " +
      "bg-slate-800 p-4 rounded-xl";

    div.innerHTML = `

      <div>

        <h3 class="font-bold">
          ${expense.title}
        </h3>

        <p class="text-sm text-slate-400">
          ${expense.category} • ${expense.date}
        </p>

      </div>

      <div class="flex items-center gap-4">

        <span class="font-bold text-cyan-400">
          ₹${expense.amount}
        </span>

        <button
          data-id="${expense.id}"
          class="delete-btn text-red-400">
          Delete
        </button>

      </div>

    `;

    expenseList.appendChild(div);

  });


  totalExpense.textContent =
    `₹${calculateTotal()}`;

  foodExpense.textContent =
    `₹${calculateTotal("Food")}`;

  shoppingExpense.textContent =
    `₹${calculateTotal("Shopping")}`;

};


form.addEventListener("submit", event => {

  event.preventDefault();

  const title = titleInput.value.trim();
  const amount = Number(amountInput.value);
  const category = categoryInput.value;


  if (!title || !amount || amount <= 0) {

    alert("Please enter valid details");

    return;

  }


  const expense = {

    id: Date.now(),

    title,

    amount,

    category,

    date: new Date().toLocaleDateString()

  };


  expenses.unshift(expense);

  saveExpenses();

  renderExpenses();

  form.reset();

});


expenseList.addEventListener("click", event => {

  if (!event.target.classList.contains("delete-btn")) {
    return;
  }

  const id = Number(
    event.target.dataset.id
  );

  expenses = expenses.filter(
    expense => expense.id !== id
  );

  saveExpenses();

  renderExpenses();

});


clearAll.addEventListener("click", () => {

  if (expenses.length === 0) return;

  const confirmDelete =
    confirm("Delete all expenses?");

  if (!confirmDelete) return;

  expenses = [];

  saveExpenses();

  renderExpenses();

});


renderExpenses();