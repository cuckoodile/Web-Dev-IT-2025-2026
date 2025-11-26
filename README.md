# E-Commerce Full-Stack Application

This is a full-stack e-commerce application built with Django REST Framework on the backend and React on the frontend. The application provides a complete online shopping experience with user authentication, product browsing, and profile management.

## Features

- **User Authentication**: JWT-based authentication system with login functionality
- **Product Management**: Browse products with detailed information
- **User Profiles**: Manage user-specific information and preferences
- **Shopping Cart**: Add and manage items in a shopping cart
- **Purchase History**: View past purchases and order history
- **Category Management**: Organized product browsing by categories
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS

## Tech Stack

### Backend
- **Framework**: Django 5.2.3
- **API Framework**: Django REST Framework
- **Authentication**: Django REST Framework Simple JWT
- **Database**: SQLite3 (can be extended to PostgreSQL/MySQL)
- **File Storage**: Django's built-in file upload system
- **CORS**: django-cors-headers for cross-origin requests

### Frontend
- **Framework**: React 19.1.0
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **State Management**: React Query for server state management
- **Styling**: Tailwind CSS
- **Animations**: GSAP (GreenSock Animation Platform)
- **Icons**: React Icons

## Project Structure

```
practice/
├── backend/                 # Django REST API
│   ├── core/               # Django settings and configuration
│   ├── products/           # Product-related models and views
│   ├── profiles/           # User profile models and views
│   └── db.sqlite3          # Database file
└── frontend/               # React application
    ├── src/
    │   ├── pages/          # Page components
    │   ├── functions/      # API functions and HOCs
    │   └── components/     # Reusable components
    ├── public/
    └── package.json
```

## API Endpoints

### Authentication
- `POST /api/token/` - Generate JWT access token
- `POST /api/token/refresh/` - Refresh JWT access token
- `POST /api/token/verify/` - Verify JWT access token

### User Profiles
- `GET /api/profiles/` - List all user profiles
- `POST /api/profiles/` - Create a new user profile
- `GET /api/profiles/<id>/` - Retrieve a specific profile
- `PATCH /api/profiles/<id>/` - Update a specific profile
- `DELETE /api/profiles/<id>/` - Delete a specific profile

### Products
- `GET /api/products/` - List all products
- `POST /api/products/` - Create a new product

### Categories
- `GET /api/categories/` - List all categories
- `POST /api/categories/` - Create a new category
- `GET /api/categories/<id>/` - Retrieve a specific category
- `PATCH /api/categories/<id>/` - Update a specific category
- `DELETE /api/categories/<id>/` - Delete a specific category

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up the database:
   ```bash
   python manage.py migrate
   ```

5. Create a superuser (optional):
   ```bash
   python manage.py createsuperuser
   ```

6. Start the development server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```
SECRET_KEY=your_django_secret_key_here
DEBUG=True
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Django](https://www.djangoproject.com/) and [React](https://react.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [React Icons](https://react-icons.github.io/react-icons/)