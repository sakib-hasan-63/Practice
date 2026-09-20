// DAY 6 — Advanced JavaScript + OOP
// File: day-6-advanced-js.js

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


// Closure

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


// Higher Order Function

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