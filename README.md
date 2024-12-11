# Movie List App

## Description
The Movie List App is a React application that fetches a list of movies from the OMDb API and displays them in a collapsible, paginated list. Users can search for movies by title and see detailed information about each movie, including the year, genre, director, and poster image. The app also features infinite scrolling to load more results as the user scrolls down.

## Features

- **Collapsible Movie Items:** Click on a movie title to expand and reveal additional details.
- **Infinite Scrolling:** Automatically loads more movies as the user scrolls to the bottom of the list.
- **Search Functionality:** Search for movies by title using the search bar.
- **Loading and Error States:** Displays a loading spinner while fetching data and an error message if the API request fails.
- **Modern UI Design:** Styled using Tailwind CSS with a dark theme.

## Demo
You can view the live deployment of the app here: [Live Demo](https://movie-list-snowy-rho.vercel.app/)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/movie-list-app.git
   cd movie-list-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following environment variable:
     ```plaintext
     REACT_APP_OMDB_API_KEY=your_api_key_here
     ```
   Replace `your_api_key_here` with your OMDb API key.

4. Start the development server:
   ```bash
   npm start
   ```

5. Open the app in your browser at `http://localhost:3000`.

## Deployment

The app is deployed on Vercel. To deploy:

1. Push your code to a GitHub repository.
2. Link the repository to Vercel.
3. Add the `REACT_APP_OMDB_API_KEY` environment variable in the Vercel dashboard.
4. Deploy the app.

## Technologies Used

- **React.js**: Frontend framework.
- **Tailwind CSS**: For styling.
- **OMDb API**: Movie data source.
- **Vercel**: Deployment platform.

## How It Works

1. **Fetching Movies:**
   - The app uses the OMDb API to fetch movies based on the search term and current page.
   - Infinite scrolling fetches additional movies as the user scrolls down.

2. **Collapsible Items:**
   - Movie details toggle between expanded and collapsed states when clicked.

3. **Search:**
   - Typing in the search bar triggers a new API request and resets the movie list.

4. **Error Handling:**
   - Displays appropriate messages for loading and error states.
