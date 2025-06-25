# Expense Tracker - Architecture Documentation

## 🏗️ System Architecture Overview

The Expense Tracker is built using a modern full-stack architecture with clear separation of concerns between the frontend and backend components.

## 🎯 Architecture Principles

- **Separation of Concerns**: Clear distinction between UI, business logic, and data layers
- **RESTful Design**: Standard HTTP methods and status codes
- **Component-Based UI**: Reusable React components
- **State Management**: Context API for global state
- **Error Handling**: Comprehensive error handling at all levels
- **Security**: JWT authentication and input validation

## 🔧 Backend Architecture

### Technology Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs for password hashing

### Folder Structure
```
backend/
├── controllers/     # Business logic and request handling
├── models/         # Database schemas and models
├── routes/         # API route definitions
├── config/         # Database and app configuration
├── middleware/     # Custom middleware functions
└── server.js       # Application entry point
```

### Data Flow
1. **Request Reception**: Express server receives HTTP requests
2. **Route Matching**: Router directs requests to appropriate controllers
3. **Controller Processing**: Business logic processes the request
4. **Database Interaction**: Mongoose models interact with MongoDB
5. **Response Formation**: Structured JSON responses sent back

### Database Schema

#### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  timestamps: true
}
```

#### Expense Model
```javascript
{
  amount: Number (required, min: 0),
  category: String (required, enum),
  description: String (required),
  date: Date (required),
  userId: ObjectId (reference to User),
  timestamps: true
}
```

### API Endpoints Architecture

#### Authentication Routes (`/api/auth`)
- `POST /register` → `authController.registerUser`
- `POST /login` → `authController.loginUser`

#### Expense Routes (`/api/expenses`)
- `GET /` → `expenseController.getExpenses`
- `POST /` → `expenseController.createExpense`
- `PUT /:id` → `expenseController.updateExpense`
- `DELETE /:id` → `expenseController.deleteExpense`
- `GET /stats` → `expenseController.getExpenseStats`

## 🎨 Frontend Architecture

### Technology Stack
- **Framework**: React.js 18
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Charts**: Chart.js with react-chartjs-2
- **Notifications**: React Hot Toast
- **Icons**: Lucide React

### Folder Structure
```
frontend/src/
├── components/     # Reusable UI components
├── pages/         # Page-level components
├── context/       # React Context for state management
├── services/      # API service functions
├── App.js         # Main application component
└── index.js       # Application entry point
```

### Component Hierarchy
```
App
├── AuthProvider (Context)
├── Router
    ├── Login/Register Pages
    └── Home Page
        ├── Header
        ├── Dashboard
        ├── ExpenseList
        └── ExpenseForm (Modal)
```

### State Management
- **Global State**: React Context API for user authentication
- **Local State**: useState hooks for component-specific state
- **Server State**: Direct API calls with loading states

### Data Flow
1. **User Interaction**: User interacts with UI components
2. **State Update**: Local or global state updates
3. **API Call**: Service functions make HTTP requests
4. **Response Handling**: Success/error handling with notifications
5. **UI Update**: Components re-render with new data

## 🔄 Communication Flow

### Frontend ↔ Backend Communication
1. **Authentication Flow**:
   - User submits login/register form
   - Frontend sends credentials to backend
   - Backend validates and returns JWT token
   - Frontend stores token and sets authorization headers

2. **Expense Management Flow**:
   - User performs CRUD operations on expenses
   - Frontend sends authenticated requests to backend
   - Backend validates JWT and processes requests
   - Database operations performed via Mongoose
   - Response sent back to frontend with updated data

3. **Dashboard Analytics Flow**:
   - Frontend requests expense statistics
   - Backend aggregates data from database
   - Calculated statistics returned to frontend
   - Charts rendered using processed data

## 🛡️ Security Architecture

### Authentication & Authorization
- **JWT Tokens**: Stateless authentication mechanism
- **Password Hashing**: bcryptjs with salt rounds
- **Protected Routes**: Middleware validates tokens
- **CORS Configuration**: Controlled cross-origin access

### Data Validation
- **Backend Validation**: Mongoose schema validation
- **Frontend Validation**: Form validation before submission
- **Sanitization**: Input sanitization to prevent injection attacks

## 📊 Database Design

### Relationships
- **One-to-Many**: User → Expenses
- **Indexing**: Optimized queries with strategic indexes
- **Aggregation**: Statistics calculated using MongoDB aggregation

### Data Consistency
- **Validation Rules**: Schema-level validation
- **Default Values**: Sensible defaults for optional fields
- **Error Handling**: Graceful handling of database errors

## 🚀 Deployment Architecture

### Development Environment
- **Concurrent Development**: Frontend and backend run simultaneously
- **Hot Reloading**: Automatic refresh on code changes
- **Environment Variables**: Separate configs for different environments

### Production Considerations
- **Build Process**: Optimized production builds
- **Environment Variables**: Secure configuration management
- **Database Connection**: Production MongoDB setup
- **HTTPS**: Secure communication in production

## 🔧 Error Handling Strategy

### Backend Error Handling
- **Global Error Middleware**: Centralized error processing
- **HTTP Status Codes**: Appropriate status codes for different scenarios
- **Error Logging**: Comprehensive error logging for debugging

### Frontend Error Handling
- **Try-Catch Blocks**: Async operation error handling
- **User Notifications**: User-friendly error messages
- **Fallback UI**: Graceful degradation on errors

## 📈 Performance Considerations

### Backend Optimization
- **Database Indexing**: Optimized query performance
- **Middleware Efficiency**: Minimal processing overhead
- **Response Compression**: Reduced payload sizes

### Frontend Optimization
- **Component Optimization**: Efficient re-rendering
- **Code Splitting**: Lazy loading for better performance
- **Caching Strategy**: Appropriate caching mechanisms

## 🔮 Scalability Considerations

### Horizontal Scaling
- **Stateless Design**: Easy to scale across multiple instances
- **Database Sharding**: Potential for database scaling
- **Load Balancing**: Ready for load balancer integration

### Vertical Scaling
- **Resource Optimization**: Efficient resource utilization
- **Memory Management**: Proper memory handling
- **Connection Pooling**: Database connection optimization

This architecture provides a solid foundation for a scalable, maintainable, and secure expense tracking application.