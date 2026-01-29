## Japanese langauge learning platform
### [Live Demo](https://kenshou2.github.io/react-japanese-learning-platform/)
A large-scale frontend Japanese language learning application built with React and TypeScript, designed to simulate a real-world production environment with complex state management, routing, caching, and API interaction.

<img width="343" height="188" alt="img" src="https://github.com/user-attachments/assets/f3dd0b86-f6ae-49db-96de-271111d2fc8d" />
<img width="343" height="188" alt="img1" src="https://github.com/user-attachments/assets/07d8d407-a0b7-42e4-bdc4-e104cf044e13" />
<img width="343" height="188" alt="img2" src="https://github.com/user-attachments/assets/32db051b-df7e-4040-9be8-39932203dfb9" />
<img width="343" height="188" alt="img3" src="https://github.com/user-attachments/assets/58e58433-081d-4c56-aa16-dbae2441fbb7" />

## Technologies
- React
- TypeScript
- Tailwind CSS
- React Router
- TanStack Query
- Vite
  
## Features
1. Search, filter, and sort courses and vocabulary decks into a personal library
2. Course content viewer with automatic progress tracking, lesson dictionary and chat-bot assistant menu
3. Interactive tests with multiple question types, explanations, and gamified results
4. Spaced repetition (SRS) sessions for vocabulary review
5. Articles and dictionary with audio, examples, and translations
6. Editable user profile, settings, and automatic light/dark theme detection
> Note: The platform includes a fully implemented API architecture (services + queries) designed for future CMS and admin integration.

## Architecture Overview

The project follows a **feature-based architecture** focused on scalability and maintainability.

### Core structure
- **fakeServer** — mock database and async API abstraction layer
- **features** — domain-level logic with services and TanStack Query hooks
- **pages** — page-level UI composition
- **shared** — reusable UI components

### Supporting layers
- **context** — global state (user, notifications)
- **hooks** — reusable custom hooks (media queries, device detection, gestures)
- **types** — shared TypeScript types
- **utils** — helper functions

This structure minimizes code duplication and mirrors patterns used in production frontend applications.

## What I Learned
- Designing and implementing scalable, feature-based frontend architecture
- Managing server state with TanStack Query (caching, error handling, background refetching)
- Building a mock backend with separate database and async API layers
- Advanced UI techniques, including 3D CSS transforms and complex animations

## Future Improvements
- Improve accessibility across the application
- Optimize assets with responsive image loading strategies
- Implement an admin dashboard for CMS and database management
- Add authentication and authorization flows

## Running the project
In order to run the project yourself, follow these steps:
1. Clone the repository to your machine
2. Run `npm install` in the project directory - it will install required dependencies
3. Run `npm run dev` to start local development server
4. Visit `http://localhost:5173` or the address listed in the console
