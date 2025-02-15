# Cloud Notes

A full-stack web application that allows users to create, store, update, and manage their personal notes securely in the cloud. Built with React, Node.js, Express, and JWT authentication.

## Features

- User authentication (signup/login) with JWT
- Create, read, update, and delete notes
- Secure access to personal notes
- Responsive design for desktop and mobile devices
- Real-time updates
- Auto-save functionality

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- Axios for API requests
- CSS3 for styling
- Local storage for token management

### Backend
- Node.js
- Express.js framework
- MongoDB for database
- JWT for authentication
- Bcrypt for password hashing
- Mongoose ODM

## Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/cloud-notes.git
cd cloud-notes
```

2. Install dependencies for backend
```bash
cd backend
npm install
```

3. Install dependencies for frontend
```bash
cd ../frontend
npm install
```

4. Create a `.env` file in the backend directory with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

5. Create a `.env` file in the frontend directory:
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend development server:
```bash
cd frontend
npm start
```

The application will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user

### Notes
- `GET /api/notes` - Get all notes for logged-in user
- `POST /api/notes` - Create a new note
- `PUT /api/notes/:id` - Update an existing note
- `DELETE /api/notes/:id` - Delete a note

## Database Schema

### User Schema
```javascript
{
  username: String,
  email: String,
  password: String,
  createdAt: Date
}
```

### Note Schema
```javascript
{
  title: String,
  content: String,
  user: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

## Security Features

- Password hashing using bcrypt
- JWT token authentication
- Protected API routes
- HTTP-only cookies
- XSS protection
- Rate limiting

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.

## Contact

Your Name - youremail@example.com
Project Link: https://github.com/yourusername/cloud-notes
