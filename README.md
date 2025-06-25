# Expense Tracker

A full-stack expense tracking application built with React.js frontend and Node.js backend. Track your expenses, visualize spending patterns, and manage your finances effectively.

## 🚀 Features

### Frontend (React.js)
- **Modern UI/UX**: Clean, responsive design with smooth animations
- **Dashboard**: Interactive charts showing expense analytics
- **Expense Management**: Add, edit, delete, and search expenses
- **Authentication**: User registration and login system
- **Real-time Updates**: Instant updates when managing expenses
- **Mobile Responsive**: Optimized for all device sizes

### Backend (Node.js + Express)
- **RESTful API**: Complete CRUD operations for expenses
- **Authentication**: JWT-based user authentication
- **Database**: MongoDB integration with Mongoose ODM
- **Error Handling**: Comprehensive error handling middleware
- **CORS Support**: Cross-origin resource sharing enabled

## 🛠️ Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- CORS, dotenv, body-parser

### Frontend
- React.js 18
- React Router DOM
- Axios for API calls
- Chart.js with react-chartjs-2
- React Hot Toast for notifications
- Lucide React for icons

## 📁 Project Structure

```
expense-tracker/
├── backend/
│   ├── controllers/
│   │   ├── expenseController.js
│   │   └── authController.js
│   ├── models/
│   │   ├── expenseModel.js
│   │   └── userModel.js
│   ├── routes/
│   │   ├── expenseRoutes.js
│   │   └── authRoutes.js
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   └── errorMiddleware.js
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ExpenseForm.jsx
│   │   │   ├── ExpenseList.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── Header.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── README.md
├── ARCHITECTURE.md
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd expense-tracker
   ```

2. **Install dependencies for both frontend and backend**
   ```bash
   npm run install-deps
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the backend directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/expense-tracker
   JWT_SECRET=your_jwt_secret_key_here
   ```

4. **Start MongoDB**
   - If using local MongoDB: `mongod`
   - If using MongoDB Atlas: Update the MONGODB_URI in .env

5. **Run the application**
   ```bash
   # Run both frontend and backend concurrently
   npm run dev
   
   # Or run them separately:
   # Backend only
   npm run server
   
   # Frontend only
   npm run client
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Expenses
- `GET /api/expenses` - Get all expenses
- `POST /api/expenses` - Create new expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense
- `GET /api/expenses/stats` - Get expense statistics

## 🎯 Usage

1. **Register/Login**: Create an account or login with existing credentials
2. **Add Expenses**: Click "Add Expense" to record new expenses
3. **View Dashboard**: See your spending analytics with interactive charts
4. **Manage Expenses**: Edit or delete expenses from the expenses list
5. **Search & Filter**: Use search and category filters to find specific expenses

## 🔧 Demo Mode

The application includes a demo mode that works without a database connection:
- Uses in-memory storage for demonstration
- Pre-populated with sample data
- All CRUD operations work normally
- Authentication accepts any credentials

## 🚀 Deployment

### Backend Deployment
1. Deploy to platforms like Heroku, Railway, or DigitalOcean
2. Set environment variables in your hosting platform
3. Ensure MongoDB connection string is updated for production

### Frontend Deployment
1. Build the React app: `npm run build`
3. Update API base URL for production

## 🌐 Deploying the Frontend

### Deploy to Vercel
1. Go to https://vercel.com and import your GitHub repository.
2. Set the environment variable `REACT_APP_API_URL` to your backend's live URL in the Vercel dashboard.
3. Vercel will automatically build and deploy your React app.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Chart.js for beautiful charts
- Lucide React for clean icons
- React Hot Toast for notifications
- MongoDB for database solutions