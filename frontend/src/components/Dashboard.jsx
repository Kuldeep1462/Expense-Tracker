import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { TrendingUp, DollarSign, Calendar, PieChart } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = ({ expenses, stats }) => {
  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(amount);
  };

  const getCurrentMonthExpenses = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    return expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === currentMonth && 
             expenseDate.getFullYear() === currentYear;
    }).reduce((sum, expense) => sum + expense.amount, 0);
  };

  const getAverageExpense = () => {
    if (expenses.length === 0) return 0;
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    return total / expenses.length;
  };

  // Prepare chart data
  const categoryData = {
    labels: Object.keys(stats?.categoryTotals || {}),
    datasets: [
      {
        data: Object.values(stats?.categoryTotals || {}),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#FF6384',
          '#C9CBCF',
          '#4BC0C0'
        ],
        borderWidth: 2,
        borderColor: '#fff',
      },
    ],
  };

  const monthlyData = {
    labels: Object.keys(stats?.monthlyTotals || {}),
    datasets: [
      {
        label: 'Monthly Expenses',
        data: Object.values(stats?.monthlyTotals || {}),
        backgroundColor: 'rgba(102, 126, 234, 0.8)',
        borderColor: 'rgba(102, 126, 234, 1)',
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
        },
      },
    },
  };

  const barChartOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '₹' + value.toFixed(0);
          }
        }
      }
    }
  };

  return (
    <div className="fade-in">
      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card card-hover">
          <div className="flex items-center justify-between mb-3">
            <span className="text-blue-500 text-2xl font-bold">₹</span>
            <span className="text-sm text-gray-500">Total</span>
          </div>
          <div className="stat-value">{formatAmount(stats?.totalExpenses || 0)}</div>
          <div className="stat-label">Total Expenses</div>
        </div>

        <div className="stat-card card-hover">
          <div className="flex items-center justify-between mb-3">
            <Calendar className="text-green-500" size={24} />
            <span className="text-sm text-gray-500">This Month</span>
          </div>
          <div className="stat-value">{formatAmount(getCurrentMonthExpenses())}</div>
          <div className="stat-label">Monthly Expenses</div>
        </div>

        <div className="stat-card card-hover">
          <div className="flex items-center justify-between mb-3">
            <TrendingUp className="text-purple-500" size={24} />
            <span className="text-sm text-gray-500">Average</span>
          </div>
          <div className="stat-value">{formatAmount(getAverageExpense())}</div>
          <div className="stat-label">Average Expense</div>
        </div>

        <div className="stat-card card-hover">
          <div className="flex items-center justify-between mb-3">
            <PieChart className="text-orange-500" size={24} />
            <span className="text-sm text-gray-500">Count</span>
          </div>
          <div className="stat-value">{expenses.length}</div>
          <div className="stat-label">Total Transactions</div>
        </div>
      </div>

      {/* Charts */}
      {expenses.length > 0 ? (
        <div className="charts-grid">
          <div className="chart-container card-hover">
            <h3 className="chart-title">Expenses by Category</h3>
            <div style={{ height: '300px' }}>
              <Pie data={categoryData} options={chartOptions} />
            </div>
          </div>

          <div className="chart-container card-hover">
            <h3 className="chart-title">Monthly Expenses</h3>
            <div style={{ height: '300px' }}>
              <Bar data={monthlyData} options={barChartOptions} />
            </div>
          </div>
        </div>
      ) : (
        <div className="card text-center py-12">
          <div className="text-gray-400 mb-4">
            <PieChart size={64} />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Data Available</h3>
          <p className="text-gray-500">Add some expenses to see your spending analytics!</p>
        </div>
      )}

      {/* Recent Expenses */}
      {expenses.length > 0 && (
        <div className="card card-hover recent-expenses-section mb-8">
          <h3 className="text-xl font-semibold mb-6">Recent Expenses</h3>
          <div className="space-y-3">
            {expenses.slice(0, 5).map((expense) => (
              <div
                key={expense._id || expense.id}
                className="recent-expense-item flex flex-row items-center justify-between gap-4 p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition"
              >
                <span className={`recent-expense-category-badge px-3 py-1 rounded-full font-bold text-xs uppercase ${expense.category === 'Food' ? 'bg-yellow-400 text-yellow-900 border-2 border-yellow-600 shadow' : 'bg-yellow-100 text-yellow-700'}`} style={{letterSpacing: '0.5px', minWidth: '80px', textAlign: 'center'}}>
                  {expense.category}
                </span>
                <span className="recent-expense-description">{expense.description}</span>
                <span className="recent-expense-date">{new Date(expense.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                <span className="recent-expense-amount-top flex items-center gap-1 text-green-600 font-bold text-lg" style={{minWidth: '60px', justifyContent: 'flex-end'}}>
                  <span className="recent-expense-rupee">₹</span>
                  <span className="recent-expense-amount-value">{expense.amount}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;