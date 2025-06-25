import React, { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';

const CATEGORIES = [
  'Food',
  'Transportation',
  'Entertainment',
  'Healthcare',
  'Shopping',
  'Bills',
  'Education',
  'Travel',
  'Other'
];

const MAX_DESCRIPTION_LENGTH = 200;

const ExpenseForm = ({ expense, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    amount: '',
    category: 'Food',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (expense) {
      setFormData({
        amount: expense.amount.toString(),
        category: expense.category,
        description: expense.description,
        date: new Date(expense.date).toISOString().split('T')[0]
      });
    } else {
      setFormData({
        amount: '',
        category: 'Food',
        description: '',
        date: new Date().toISOString().split('T')[0]
      });
    }
  }, [expense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'description' && value.length > MAX_DESCRIPTION_LENGTH) return;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }
    if (parseFloat(formData.amount) <= 0) {
      alert('Amount must be greater than 0');
      return;
    }
    onSubmit({
      ...formData,
      amount: parseFloat(formData.amount)
    });
  };

  return (
    <div className="expense-form-modal-card">
      <button
        className="expense-form-close-btn"
        onClick={onCancel}
        aria-label="Close"
        type="button"
      >
        <X size={24} />
      </button>
      <h2 className="expense-form-title">
        {expense ? 'Edit Expense' : 'Add New Expense'}
      </h2>
      <form onSubmit={handleSubmit} className="expense-form-fields">
      <div className="form-group">
          <label className="form-label">AMOUNT *</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          className="form-control"
            placeholder="Enter amount (e.g., 25.50)"
          step="0.01"
          min="0.01"
          required
        />
      </div>
      <div className="form-group">
          <label className="form-label">CATEGORY *</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="form-select"
          required
        >
          {CATEGORIES.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
          <label className="form-label">DESCRIPTION *</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="form-control"
            placeholder="What did you spend on? (e.g., Lunch at restaurant)"
            maxLength={MAX_DESCRIPTION_LENGTH}
          required
        />
          <div className="expense-form-charcount">
            {formData.description.length}/{MAX_DESCRIPTION_LENGTH} characters
          </div>
      </div>
      <div className="form-group">
          <label className="form-label">DATE *</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
        <div className="expense-form-actions">
        <button
          type="submit"
            className="btn btn-primary expense-form-submit-btn"
        >
          <Save size={18} />
            {expense ? 'Update Expense' : 'Add Expense'}
        </button>
        <button
          type="button"
          onClick={onCancel}
            className="btn btn-secondary expense-form-cancel-btn"
        >
          <X size={18} />
          Cancel
        </button>
      </div>
    </form>
    </div>
  );
};

export default ExpenseForm;