import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import Dashboard from '../components/Dashboard';
import Header from '../components/Header';
import { expenseAPI } from '../services/api';
import toast from 'react-hot-toast';
import { PlusCircle, BarChart3, List } from 'lucide-react';

const Home = () => {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    fetchExpenses();
    fetchStats();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await expenseAPI.getExpenses();
      setExpenses(response.data);
    } catch (error) {
      toast.error('Failed to fetch expenses');
      console.error('Error fetching expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await expenseAPI.getExpenseStats();
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleAddExpense = async (expenseData) => {
    try {
      const response = await expenseAPI.createExpense(expenseData);
      setExpenses([response.data, ...expenses]);
      setShowExpenseForm(false);
      fetchStats();
      toast.success('Expense added successfully!');
    } catch (error) {
      toast.error('Failed to add expense');
      console.error('Error adding expense:', error);
    }
  };

  const handleUpdateExpense = async (id, expenseData) => {
    try {
      const response = await expenseAPI.updateExpense(id, expenseData);
      setExpenses(expenses.map(exp => exp._id === id || exp.id === id ? response.data : exp));
      setEditingExpense(null);
      fetchStats();
      toast.success('Expense updated successfully!');
    } catch (error) {
      toast.error('Failed to update expense');
      console.error('Error updating expense:', error);
    }
  };

  const handleDeleteExpense = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await expenseAPI.deleteExpense(id);
        setExpenses(expenses.filter(exp => exp._id !== id && exp.id !== id));
        fetchStats();
        toast.success('Expense deleted successfully!');
      } catch (error) {
        toast.error('Failed to delete expense');
        console.error('Error deleting expense:', error);
      }
    }
  };

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
    setShowExpenseForm(true);
  };

  const handleCancelEdit = () => {
    setEditingExpense(null);
    setShowExpenseForm(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container">
        {/* Navigation Tabs */}
        <div className="card">
          <div className="flex flex-wrap gap-4 mb-6">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`btn ${activeTab === 'dashboard' ? 'btn-primary' : 'btn-secondary'}`}
            >
              <BarChart3 size={18} />
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('expenses')}
              className={`btn ${activeTab === 'expenses' ? 'btn-primary' : 'btn-secondary'}`}
            >
              <List size={18} />
              Expenses
            </button>
            <button
              onClick={() => { setEditingExpense(null); setShowExpenseForm(true); }}
              className="btn btn-success ml-auto"
            >
              <PlusCircle size={18} />
              Add Expense
            </button>
          </div>
        </div>
        {/* Content */}
        {activeTab === 'dashboard' && (
          <Dashboard expenses={expenses} stats={stats} />
        )}
        {activeTab === 'expenses' && (
          <ExpenseList
            expenses={expenses}
            onEdit={handleEditExpense}
            onDelete={handleDeleteExpense}
          />
        )}
      </div>
      {/* Expense Form Modal (now outside .container for full-page overlay) */}
        {showExpenseForm && (
        <div className="expense-modal-overlay">
              <ExpenseForm
                expense={editingExpense}
                onSubmit={editingExpense ? 
                  (data) => handleUpdateExpense(editingExpense._id || editingExpense.id, data) : 
                  handleAddExpense
                }
                onCancel={handleCancelEdit}
              />
          </div>
        )}
    </div>
  );
};

export default Home;