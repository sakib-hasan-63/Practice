// DAY 6 — Advanced JavaScript + OOP
// File: day-6-advanced-js.js

// ==========================================
// 1. BANK ACCOUNT (OOP & PRIVATE FIELDS)
// ==========================================
class BankAccount {

  #balance;

  constructor(owner, initialBalance = 0) {
    this.owner = owner;
    this.#balance = initialBalance;
    this.transactions = [];
  }

  deposit(amount) {

    if (amount <= 0) {
      throw new Error(
        "Deposit amount must be greater than 0"
      );
    }

    this.#balance += amount;

    this.transactions.push({
      type: "Deposit",
      amount,
      date: new Date().toISOString()
    });

    return this.#balance;
  }

  withdraw(amount) {

    if (amount <= 0) {
      throw new Error(
        "Withdrawal amount must be greater than 0"
      );
    }

    if (amount > this.#balance) {
      throw new Error(
        "Insufficient balance"
      );
    }

    this.#balance -= amount;

    this.transactions.push({
      type: "Withdrawal",
      amount,
      date: new Date().toISOString()
    });

    return this.#balance;
  }

  getBalance() {
    return this.#balance;
  }

  getTransactions() {
    return [...this.transactions];
  }
}

const account =
  new BankAccount("Sakib Hasan", 10000);

account.deposit(5000);
account.withdraw(2500);

console.log(
  "Account Holder:",
  account.owner
);

console.log(
  "Balance:",
  account.getBalance()
);

console.table(
  account.getTransactions()
);


// ==========================================
// 2. CLOSURE
// ==========================================
const createCounter = initialValue => {

  let count = initialValue;

  return {
    increment: () => ++count,

    decrement: () => --count,

    reset: () => {
      count = initialValue;
      return count;
    },

    getValue: () => count
  };
};

const counter = createCounter(10);

console.log(counter.increment());
console.log(counter.increment());
console.log(counter.decrement());
console.log(counter.getValue());
console.log(counter.reset());


// ==========================================
// 3. HIGHER ORDER FUNCTION
// ==========================================
const calculate = (a, b, operation) => {
  return operation(a, b);
};

const add = (a, b) => a + b;

const multiply = (a, b) => a * b;

const divide = (a, b) => a / b;

console.log(
  calculate(10, 5, add)
);

console.log(
  calculate(10, 5, multiply)
);

console.log(
  calculate(10, 5, divide)
);


// ==========================================
// UI BINDING LOGIC FOR HTML PAGE
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  // --- Bank Account UI Binding ---
  const ownerEl = document.getElementById("accountOwner");
  const balanceEl = document.getElementById("accountBalance");
  const txnTable = document.getElementById("txnTableBody");
  const bankError = document.getElementById("bankError");

  const updateBankUI = () => {
    if (ownerEl) ownerEl.innerText = account.owner;
    if (balanceEl) balanceEl.innerText = account.getBalance().toLocaleString('en-IN');
    
    if (txnTable) {
      txnTable.innerHTML = "";
      account.getTransactions().forEach(txn => {
        const row = document.createElement("tr");
        const typeColor = txn.type === "Deposit" ? "text-emerald-600" : "text-rose-600";
        row.innerHTML = `
          <td class="p-3 font-semibold ${typeColor}">${txn.type}</td>
          <td class="p-3">₹${txn.amount.toLocaleString('en-IN')}</td>
          <td class="p-3 text-xs text-slate-400">${new Date(txn.date).toLocaleString()}</td>
        `;
        txnTable.appendChild(row);
      });
    }
  };

  const handleTxn = (action) => {
    const amountInput = document.getElementById("txnAmount");
    const val = parseFloat(amountInput.value);
    
    try {
      bankError.classList.add("hidden");
      if (action === "deposit") account.deposit(val);
      if (action === "withdraw") account.withdraw(val);
      amountInput.value = "";
      updateBankUI();
    } catch (err) {
      bankError.innerText = err.message;
      bankError.classList.remove("hidden");
    }
  };

  document.getElementById("depositBtn")?.addEventListener("click", () => handleTxn("deposit"));
  document.getElementById("withdrawBtn")?.addEventListener("click", () => handleTxn("withdraw"));
  
  updateBankUI();

  // --- Counter UI Binding ---
  const counterValEl = document.getElementById("counterValue");
  
  document.getElementById("incBtn")?.addEventListener("click", () => {
    if (counterValEl) counterValEl.innerText = counter.increment();
  });
  document.getElementById("decBtn")?.addEventListener("click", () => {
    if (counterValEl) counterValEl.innerText = counter.decrement();
  });
  document.getElementById("resetBtn")?.addEventListener("click", () => {
    if (counterValEl) counterValEl.innerText = counter.reset();
  });

  // --- HOF Calculator UI Binding ---
  const calcResultEl = document.getElementById("calcResult");
  const getInputs = () => [
    parseFloat(document.getElementById("numA").value) || 0,
    parseFloat(document.getElementById("numB").value) || 0
  ];

  document.getElementById("addBtn")?.addEventListener("click", () => {
    const [a, b] = getInputs();
    if (calcResultEl) calcResultEl.innerText = calculate(a, b, add);
  });

  document.getElementById("multiplyBtn")?.addEventListener("click", () => {
    const [a, b] = getInputs();
    if (calcResultEl) calcResultEl.innerText = calculate(a, b, multiply);
  });

  document.getElementById("divideBtn")?.addEventListener("click", () => {
    const [a, b] = getInputs();
    if (calcResultEl) calcResultEl.innerText = calculate(a, b, divide);
  });
});