import React, { useState } from 'react';
import { Edit2, Trash2, Search, Filter } from 'lucide-react';

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const categories = [...new Set(expenses.map(expense => expense.category))];

  const filteredAndSortedExpenses = expenses
    .filter(expense => {
      const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           expense.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !filterCategory || expense.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === 'date') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(amount);
  };

  const getCategoryClass = (category) => {
    return `category-badge category-${category.toLowerCase()}`;
  };

  return (
    <div className="card fade-in">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search expenses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control pl-10"
            />
          </div>
        </div>
        
        <div className="flex gap-3">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="form-select"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [field, order] = e.target.value.split('-');
              setSortBy(field);
              setSortOrder(order);
            }}
            className="form-select"
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="amount-desc">Highest Amount</option>
            <option value="amount-asc">Lowest Amount</option>
          </select>
        </div>
      </div>

      {filteredAndSortedExpenses.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Filter size={48} />
          </div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No expenses found</h3>
          <p className="text-gray-500">
            {searchTerm || filterCategory ? 'Try adjusting your search or filter criteria.' : 'Start by adding your first expense!'}
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedExpenses.map((expense) => (
                  <tr key={expense._id || expense.id}>
                    <td>{formatDate(expense.date)}</td>
                    <td>
                      <div className="font-medium">{expense.description}</div>
                    </td>
                    <td>
                      <span className={getCategoryClass(expense.category)}>
                        {expense.category}
                      </span>
                    </td>
                    <td className="expense-amount">{formatAmount(expense.amount)}</td>
                    <td>
                      <div className="expense-actions">
                        <button
                          onClick={() => onEdit(expense)}
                          className="btn btn-secondary"
                          title="Edit expense"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => onDelete(expense._id || expense.id)}
                          className="btn btn-danger"
                          title="Delete expense"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default ExpenseList;