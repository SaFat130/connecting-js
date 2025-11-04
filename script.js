document.addEventListener('DOMContentLoaded', () => {
  const balanceEl = document.getElementById('balance');
  const depositInput = document.getElementById('deposit-input');
  const withdrawInput = document.getElementById('withdraw-input');
  const depositBtn = document.getElementById('deposit-btn');
  const withdrawBtn = document.getElementById('withdraw-btn');
  const transactionsTbody = document.getElementById('transactions');

  // start balance
  let balance = 0.00;
  const transactions = [];

  function renderBalance() {
    if (balanceEl) balanceEl.textContent = balance.toFixed(2);
  }

  function renderTransactions() {
    if (!transactionsTbody) return;
    transactionsTbody.innerHTML = '';
    transactions.slice().reverse().forEach((tx, i) => {
      const row = document.createElement('tr');
      const idx = document.createElement('th');
      const amt = document.createElement('td');
      const date = document.createElement('td');
      const type = document.createElement('td');
      idx.textContent = (transactions.length - i).toString();
      amt.textContent = (tx.type === 'Withdraw' ? '-' : '') + tx.amount.toFixed(2);
      date.textContent = new Date(tx.date).toLocaleString();
      type.textContent = tx.type;
      row.appendChild(idx);
      row.appendChild(amt);
      row.appendChild(date);
      row.appendChild(type);
      transactionsTbody.appendChild(row);
    });
  }

  function addTransaction(amount, type) {
    transactions.push({ amount, type, date: new Date().toISOString() });
    renderTransactions();
  }

  if (depositBtn) depositBtn.addEventListener('click', () => {
    const val = parseFloat(depositInput.value);
    if (isNaN(val) || val <= 0) {
      alert('Enter a valid deposit amount (> 0).');
      return;
    }
    balance += val;
    renderBalance();
    addTransaction(val, 'Deposit');
    depositInput.value = '';
  });

  if (withdrawBtn) withdrawBtn.addEventListener('click', () => {
    const val = parseFloat(withdrawInput.value);
    if (isNaN(val) || val <= 0) {
      alert('Enter a valid withdraw amount (> 0).');
      return;
    }
    if (val > balance) {
      alert('You do not have enough money in your account.');
      return;
    }
    balance -= val;
    renderBalance();
    addTransaction(val, 'Withdraw');
    withdrawInput.value = '';
  });

  renderBalance();
  renderTransactions();
});
