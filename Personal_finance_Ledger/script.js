document.addEventListener("DOMContentLoaded", () => {
  // 1. Grab operational interaction node references from the DOM
  const totalBalanceEl = document.getElementById("total-balance");
  const totalIncomeEl = document.getElementById("total-income");
  const totalExpenseEl = document.getElementById("total-expense");
  const transactionListEl = document.getElementById("transaction-list");
  const ledgerForm = document.getElementById("ledgerForm");
  const entryText = document.getElementById("entryText");
  const entryAmount = document.getElementById("entryAmount");

  // 2. Fetch or initialize the persistence ledger array from browser storage
  const storageKey = "webLedgerTransactions";
  let transactionsDataArr = JSON.parse(localStorage.getItem(storageKey)) || [];

  // 3. Currency formatter function helper
  function formatCurrency(value) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value);
  }

  // 4. Core Render Ledger Loop: Recalculates balance values summary and draws lists
  function renderLedgerDashboard() {
    // Clear past operational nodes
    transactionListEl.innerHTML = "";

    let incomeAccumulator = 0;
    let expenseAccumulator = 0;

    if (transactionsDataArr.length === 0) {
      transactionListEl.innerHTML = `<p style="text-align: center; color: #94a3b8; font-size: 0.9rem; padding-top: 20px;">No transaction records logged yet.</p>`;
    }

    // Iterate through items data array tracking math conditions
    transactionsDataArr.forEach((transaction) => {
      const amountVal = parseFloat(transaction.amount);

      // Allocate numbers to their matching financial buckets
      if (amountVal > 0) {
        incomeAccumulator += amountVal;
      } else {
        expenseAccumulator += amountVal;
      }

      // Create horizontal item structural cards list nodes
      const listItemEl = document.createElement("li");
      const flowClass = amountVal > 0 ? "plus-border" : "minus-border";
      listItemEl.className = `log-item ${flowClass}`;

      const signMarker = amountVal > 0 ? "+" : "";

      listItemEl.innerHTML = `
                <span class="item-desc">${transaction.description}</span>
                <span class="item-amt">${signMarker}${formatCurrency(amountVal)}</span>
                <button class="delete-item-btn" data-id="${transaction.id}" title="Delete transaction">&times;</button>
            `;

      // Connect sub-component transactional row removal click loops
      listItemEl
        .querySelector(".delete-item-btn")
        .addEventListener("click", () => {
          removeTransactionItem(transaction.id);
        });

      transactionListEl.appendChild(listItemEl);
    });

    // Compute terminal net balances account summary fields
    const netTotalBalance = incomeAccumulator + expenseAccumulator;

    // Render string values out directly onto screen layout wrappers
    totalBalanceEl.innerText = formatCurrency(netTotalBalance);
    totalIncomeEl.innerText = `+ ${formatCurrency(incomeAccumulator)}`;
    totalExpenseEl.innerText = `- ${formatCurrency(Math.abs(expenseAccumulator))}`;

    // Keep absolute values balanced inside local storage blocks
    localStorage.setItem(storageKey, JSON.stringify(transactionsDataArr));
  }

  // 5. Append New Transaction Records Event Handlers
  ledgerForm.addEventListener("submit", (submitEvent) => {
    submitEvent.preventDefault();

    const descriptionString = entryText.value.trim();
    const numericAmount = parseFloat(entryAmount.value);

    // Prevent process operations from processing blank zeroes
    if (numericAmount === 0) {
      alert("Transaction amounts cannot be exactly zero.");
      return;
    }

    // Build data structure item payload
    const transactionPayload = {
      id: Date.now().toString(), // Generates instant unique tracking tags
      description: descriptionString,
      amount: numericAmount,
    };

    // Inject ledger object item directly into master monitoring streams
    transactionsDataArr.push(transactionPayload);
    renderLedgerDashboard();

    // Wipe data input form elements clean back to default baseline states
    entryText.value = "";
    entryAmount.value = "";
  });

  // 6. Delete Target Asset Row Items Routine
  function removeTransactionItem(targetId) {
    transactionsDataArr = transactionsDataArr.filter(
      (item) => item.id !== targetId,
    );
    renderLedgerDashboard();
  }

  // 7. Initial Bootstrap Load Matrix Initialization Setup
  renderLedgerDashboard();
});
