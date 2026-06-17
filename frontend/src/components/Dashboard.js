import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('income');
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get('https://expense-tracker-backend-u2qf.onrender.com/api/transactions');
      setTransactions(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addTransaction = async () => {
    if (!description || !amount || !category) return alert('Please fill all fields!');
    try {
      await axios.post('https://expense-tracker-backend-u2qf.onrender.com/api/transactions', {
        description,
        amount: parseFloat(amount),
        type,
        category
      });
      fetchTransactions();
      setDescription('');
      setAmount('');
      setCategory('');
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`https://expense-tracker-backend-u2qf.onrender.com/api/transactions/${id}`);
      fetchTransactions();
    } catch (error) {
      console.error(error);
    }
  };

  const balance = transactions.reduce((acc, t) =>
    t.type === 'income' ? acc + t.amount : acc - t.amount, 0);

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  // Data for pie chart - expenses by category
  const categoryData = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      const existing = acc.find(item => item.name === t.category);
      if (existing) existing.value += t.amount;
      else acc.push({ name: t.category, value: t.amount });
      return acc;
    }, []);

  // Data for bar chart
  const barData = [
    { name: 'Income', amount: totalIncome },
    { name: 'Expense', amount: totalExpense }
  ];

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px', fontFamily: 'Arial' }}>
      <h1 style={{ color: '#1F4E79' }}>💰 Expense Tracker</h1>

      {/* Summary Cards */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div style={{ flex: 1, background: '#e8f5e9', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
          <h3 style={{ color: '#2e7d32', margin: 0 }}>Total Income</h3>
          <h2 style={{ color: '#2e7d32', margin: '10px 0' }}>₹{totalIncome}</h2>
        </div>
        <div style={{ flex: 1, background: '#ffebee', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
          <h3 style={{ color: '#c62828', margin: 0 }}>Total Expense</h3>
          <h2 style={{ color: '#c62828', margin: '10px 0' }}>₹{totalExpense}</h2>
        </div>
        <div style={{ flex: 1, background: '#e3f2fd', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
          <h3 style={{ color: '#1565c0', margin: 0 }}>Balance</h3>
          <h2 style={{ color: '#1565c0', margin: '10px 0' }}>₹{balance}</h2>
        </div>
      </div>

      {/* Add Transaction Form */}
      <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', marginBottom: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h3>Add Transaction</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
          <input placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
          <input placeholder="Category (e.g. Food, Salary)" value={category} onChange={e => setCategory(e.target.value)} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
          <select value={type} onChange={e => setType(e.target.value)} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <button onClick={addTransaction} style={{ width: '100%', padding: '12px', marginTop: '10px', background: '#1F4E79', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}>
          + Add Transaction
        </button>
      </div>

      {/* Charts */}
      {transactions.length > 0 && (
        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
          <div style={{ flex: 1, background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h3>Income vs Expense</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#1F4E79" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {categoryData.length > 0 && (
            <div style={{ flex: 1, background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <h3>Expense by Category</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {categoryData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      )}

      {/* Transaction List */}
      <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h3>Transactions</h3>
        {transactions.length === 0 && <p style={{ color: '#666' }}>No transactions yet. Add one above!</p>}
        {transactions.map(t => (
          <div key={t._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', marginBottom: '10px', background: t.type === 'income' ? '#e8f5e9' : '#ffebee', borderRadius: '5px', borderLeft: `4px solid ${t.type === 'income' ? '#2e7d32' : '#c62828'}` }}>
            <div>
              <strong>{t.description}</strong>
              <span style={{ marginLeft: '10px', fontSize: '12px', color: '#666', background: '#ddd', padding: '2px 8px', borderRadius: '10px' }}>{t.category}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span style={{ fontWeight: 'bold', color: t.type === 'income' ? '#2e7d32' : '#c62828' }}>
                {t.type === 'income' ? '+' : '-'}₹{t.amount}
              </span>
              <button onClick={() => deleteTransaction(t._id)} style={{ background: '#c62828', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', padding: '5px 12px' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;