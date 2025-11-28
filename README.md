# PeakSea

A React + TypeScript + Vite application for image uploading and management.

🌐 **Live Demo:** [https://peaksea.netlify.app/](https://peaksea.netlify.app/)

## Getting Started

### Prerequisites

- Install [Node.js](https://nodejs.org/) (v18 or higher recommended)

### Installation

1. Install dependencies:

```bash
npm i
```

2. Create a `.env` file in the root directory:

```env
VITE_IMGBB_API_KEY=your_api_key_here
```

**Getting Your API Key:**

- Sign up for a free account at [imgbb.com](https://imgbb.com/)
- Navigate to the API section in your account settings
- Generate an API key
- Add it to your `.env` file

**Note:** The `.env` file is already included in `.gitignore` to keep your API key secure. Never commit your `.env` file to version control.

### Development

Run the development server:

```bash
npm run dev
```

### Build

Build for production:

```bash
npm run build
```

## Environment Variables

This project requires the following environment variable:

- `VITE_IMGBB_API_KEY` - Your imgbb.com API key for image uploads

Create a `.env` file in the root directory with your API key.
