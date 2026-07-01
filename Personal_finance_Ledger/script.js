document.addEventListener('DOMContentLoaded', () => {

    // 1. Grab operational interaction node references from the DOM
    const totalBalanceEl = document.getElementById('total-balance');
    const totalIncomeEl = document.getElementById('total-income');
    const totalExpenseEl = document.getElementById('total-expense');
    const transactionListEl = document.getElementById('transaction-list');
    const ledgerForm = document.getElementById('ledgerForm');
    const entryText = document.getElementById('entryText');
    const entryAmount = document.getElementById('entryAmount');

    // 2. Fetch or initialize the persistence ledger array from browser storage
    const storageKey = 'webLedgerTransactions';
    let transactionsDataArr = JSON.parse(localStorage.getItem(storageKey)) || [];

    // 3. Currency formatter function helper
    function formatCurrency(value) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(value);
    }




    