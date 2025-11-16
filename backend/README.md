# Roomeze Backend API

This is the backend API for Roomeze - a student housing and services platform.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Properties
- `GET /api/properties` - Get all properties
- `GET /api/properties/nearby` - Get properties within 2km of Atharva College
- `GET /api/properties/:id` - Get property by ID
- `POST /api/properties` - Create a property (Owner only)
- `PUT /api/properties/:id` - Update a property (Owner only)
- `DELETE /api/properties/:id` - Delete a property (Owner only)

### Mess Partners
- `GET /api/mess` - Get all mess partners
- `GET /api/mess/official` - Get official mess (Atharva Canteen)
- `GET /api/mess/:id` - Get mess partner by ID
- `POST /api/mess` - Create a mess partner (Owner only)
- `PUT /api/mess/:id` - Update a mess partner (Owner only)
- `DELETE /api/mess/:id` - Delete a mess partner (Owner only)

### Laundry Services
- `GET /api/laundry` - Get all laundry services
- `GET /api/laundry/:id` - Get laundry service by ID
- `POST /api/laundry` - Create a laundry service (Owner only)
- `PUT /api/laundry/:id` - Update a laundry service (Owner only)
- `DELETE /api/laundry/:id` - Delete a laundry service (Owner only)

### Printing Services
- `GET /api/printing` - Get all printing services
- `GET /api/printing/:id` - Get printing service by ID
- `POST /api/printing` - Create a printing service (Owner only)
- `PUT /api/printing/:id` - Update a printing service (Owner only)
- `DELETE /api/printing/:id` - Delete a printing service (Owner only)

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event by ID
- `POST /api/events` - Create an event (Owner only)
- `PUT /api/events/:id` - Update an event (Owner only)
- `DELETE /api/events/:id` - Delete an event (Owner only)

### Community
- `GET /api/community/posts` - Get all community posts
- `GET /api/community/posts/:id` - Get community post by ID
- `POST /api/community/posts` - Create a community post
- `PUT /api/community/posts/:id` - Update a community post
- `DELETE /api/community/posts/:id` - Delete a community post
- `PUT /api/community/posts/:id/like` - Like a community post
- `POST /api/community/posts/:id/comment` - Comment on a community post

### Project Friday
- `GET /api/community/project-friday` - Get all Project Friday stories
- `GET /api/community/project-friday/:id` - Get Project Friday story by ID
- `POST /api/community/project-friday` - Create a Project Friday story
- `PUT /api/community/project-friday/:id` - Update a Project Friday story
- `DELETE /api/community/project-friday/:id` - Delete a Project Friday story
- `PUT /api/community/project-friday/:id/like` - Like a Project Friday story
- `POST /api/community/project-friday/:id/comment` - Comment on a Project Friday story

### Owner Dashboard
- `GET /api/owner/dashboard` - Get owner dashboard data (Owner only)
- `GET /api/owner/services` - Get owner services (Owner only)
- `PUT /api/owner/profile` - Update owner profile (Owner only)