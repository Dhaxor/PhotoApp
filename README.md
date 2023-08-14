# Image App
This is a photo app built with Laravel, React.js and SQLite.



## Installation 
Make sure you have environment setup properly. You will need PHP8.1, composer and Node.js.

1. Download the project (or clone using GIT)
2. Copy `.env.example` into `.env` and configure database credentials
3. Navigate to the project's root directory using terminal
4. Run `composer install`
5. Set the encryption key by executing `php artisan key:generate --ansi`
6. Run migrations php artisan migrate
7. Start local server by executing `php artisan serve`
8. Open new terminal and navigate to the `image-app-frontend` folder
9. Copy `image-app-frontend/.env.example` into `.env` and adjust the `VITE_API_BASE_URL` parameter
9. Run `npm install`
10. Run `npm run dev` to start vite server for React


## Features

1. User authentication (register/login/logout)
2. Photo upload
3. View uploaded photos in a grid view
4. Add/remove photos as favorites
5. View favorited photos on a separate page
6. Photo details page

### Backend

The backend is built with Laravel and uses:

1.  Database migrations and models
2. API routes and controllers
3. JWT authentication
4. Image upload handled via Laravel Filesystem
5. Repository pattern for abstraction
6. Validation, transformations, pagination

### Frontend

The frontend is built with React and uses:

1. React Router for routing
2. Custom React hooks for state management
3. Axios for API calls
4. React context for global state
5. Local storage for JWT token
6. Tailwind CSS for styling
