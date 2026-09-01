# Social Media Platform - Getting Started

## Project Structure

```
social-media-platform/
├── backend/                 # Node.js/Express backend
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── utils/              # Helper functions
│   ├── server.js           # Entry point
│   └── package.json
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context
│   │   ├── services/       # API services
│   │   ├── styles/         # CSS files
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   └── package.json
├── docs/                   # Documentation
└── README.md
```

## Backend Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env with your configuration
```

### 3. Start MongoDB
```bash
# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo

# Or use MongoDB Atlas (cloud)
# Update DATABASE_URL in .env
```

### 4. Start Server
```bash
npm start
# or for development with auto-reload
npm run dev
```

Server will run on `http://localhost:5000`

## Frontend Setup

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
# Default should work (points to localhost:5000)
```

### 3. Start Development Server
```bash
npm start
```

Frontend will open at `http://localhost:3000`

## Features

### Authentication
- User registration with validation
- Secure login with JWT tokens
- Protected routes and API endpoints
- Password hashing with bcrypt

### Posts & Feed
- Create posts with text content
- Like and unlike posts
- Comment on posts
- Delete own posts
- Feed with pagination

### Notifications
- Real-time notifications for likes, comments, follows
- Mark notifications as read
- View notification history
- Delete notifications

### Bookmarks
- Save posts for later
- Manage bookmarks
- Check if post is bookmarked

### User Management
- User profiles
- Follow/unfollow users
- View user information
- Update own profile

## API Endpoints

See `docs/API.md` for complete API documentation

### Key Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/posts/feed` - Get user feed
- `POST /api/posts` - Create post
- `POST /api/posts/:id/like` - Like post
- `GET /api/notifications` - Get notifications

## Testing

### Backend
```bash
cd backend
npm test
```

### Frontend
```bash
cd frontend
npm test
```

## Deployment

See `docs/DEPLOYMENT.md` for detailed deployment instructions

### Quick Deploy to Heroku
```bash
# Backend
heroku create your-app-backend
git push heroku main

# Frontend (with backend URL)
vercel
```

## Security Features

✅ JWT Authentication
✅ Password Hashing (bcrypt)
✅ CORS Protection
✅ Rate Limiting
✅ Input Validation
✅ XSS Protection
✅ Helmet.js Security Headers
✅ Environment Variables

## Troubleshooting

### Backend Issues
1. **Port already in use**: Change PORT in .env
2. **Database connection error**: Verify DATABASE_URL and MongoDB is running
3. **CORS errors**: Check FRONTEND_URL in .env

### Frontend Issues
1. **API connection failed**: Ensure backend is running on correct port
2. **Login not working**: Check browser console for errors
3. **Page not loading**: Clear cache and reload

## Contributing

See `CONTRIBUTING.md` for guidelines

## License

MIT License - see `LICENSE` file

## Support

For help, check:
- `docs/SECURITY.md` - Security documentation
- `docs/TESTING.md` - Testing guide
- `docs/DEPLOYMENT.md` - Deployment guide

## Next Steps

1. ✅ Complete core features
2. 🔄 Add more features:
   - Search functionality
   - User messaging
   - Photo uploads
   - Real-time notifications (Socket.io)
   - Analytics dashboard
3. 📱 Mobile app
4. 🔐 Advanced security features

Happy coding! 🚀
