
# Cognizant Communication Round Assessment Clone

This project is a React + TypeScript web application that simulates the Cognizant Communication Round Assessment. It features four sections (Reading, Speaking, Grammar, Listening) with timers, progress tracking, and audio recording capabilities.

## Features

- **Section A:** Reading sentences, word groups, and repeating audio.
- **Section B:** Speaking on random topics with thinking and speaking timers.
- **Section C:** Grammar questions (MCQs and fill-in-the-blanks).
- **Section D:** Listening comprehension with audio clips and MCQs.
- **Audio Recording:** Record and playback answers, with speech-to-text transcription (if supported by browser).
- **Progress Bar:** Visual progress tracking across all sections.
- **Responsive UI:** Built with Tailwind CSS for a modern, responsive design.


## Screenshots

- **Home Page:**  
  ![Home Page](src/images/main_page.png)

- **Section Example:**  
  ![Section Example](src/images/sections.png)

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   cd congizant
   ```

2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```

### Running the App

Start the development server:
```sh
npm run dev
# or
yarn dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```sh
npm run build
# or
yarn build
```

### Linting

```sh
npm run lint
# or
yarn lint
```

## Project Structure

- `src/` - Main source code
  - `components/` - React components for each section and shared UI
  - `images/` - Screenshots and image assets
  - `App.tsx` - Main application logic
  - `main.tsx` - Entry point
- `public/` - Static assets (if any)
- `index.html` - Main HTML file
- `tailwind.config.js` - Tailwind CSS configuration

## Notes

- Audio recording and speech-to-text features require browser permissions and may not work on all browsers.
- This project is for educational/demo purposes and does not submit or store any user data.

## License



