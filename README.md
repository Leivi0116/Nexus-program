# WILD RIFT SUMMONER LOOKUP

A Next.js application with an authentic League of Legends Wild Rift aesthetic that allows users to search for summoner data from a Google Sheet using Summoner IDs.

## Features

- **Wild Rift Inspired UI**: Authentic League of Legends color scheme with gold and blue accents
- **Summoner Profile Search**: Look up summoner stats using unique identifiers
- **Immersive Gaming Experience**: Card-based stats display with gaming-specific icons
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Clean Data Display**: Name field hidden, focus on relevant gaming statistics

## Design Elements

- **Authentic Color Palette**: Gold (#c89b3c), Blue (#0596aa), and dark backgrounds
- **Gaming Typography**: Clean, modern fonts with proper hierarchy
- **Animated Elements**: Subtle floating animations and glowing effects
- **Card-Based Layout**: Stats displayed in individual cards with hover effects
- **League-Inspired Icons**: Gaming-specific icons for different stat types

## Getting Started

### Prerequisites

- Node.js 16.8.0 or later
- npm or yarn

### Installation

1. Clone this repository or download the code
2. Install dependencies:

\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Run the development server:

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How It Works

The application searches for Summoner IDs in the first column of your Google Sheet and returns all associated data from that row. The search is case-insensitive and handles whitespace automatically.

### Google Sheet Configuration

- **Sheet ID**: `1D0pv0tieTAb3lyKqY9853FEI0BXdr0YvpOrze8qiVu8`
- **Service Account**: `rayvimendeja@summer-drive-462209-e3.iam.gserviceaccount.com`

### Important Setup Step

Make sure your Google Sheet is shared with the service account email:
`rayvimendeja@summer-drive-462209-e3.iam.gserviceaccount.com`

To share your sheet:
1. Open your Google Sheet
2. Click the "Share" button in the top right
3. Add the service account email with "Viewer" permissions
4. Click "Done"

## Usage

1. **Enter Summoner ID**: Type the unique identifier in the search field
2. **Search**: Click the search button to find associated stats
3. **View Profile**: See all summoner stats in Wild Rift-styled cards
4. **Clear**: Reset the search to try a different Summoner ID

## Data Format

The application expects:
- Summoner IDs in the first column (Column A) of your Google Sheet
- Headers in the first row
- Data in subsequent rows

## Deployment

This application is designed to be easily deployable on platforms like:
- Vercel (recommended for Next.js)
- Netlify
- Railway
- Any Node.js hosting platform

## Customization

To use a different Google Sheet, update the `SHEET_ID` constant in:
- `app/api/search-uid/route.ts`

## Wild Rift Theme Features

The UI includes:
- Authentic League of Legends color scheme
- Gold and blue gradient elements
- Dark theme optimized for gaming
- Floating background animations
- Card-based stat display with hover effects
- Gaming-specific iconography
- Immersive user experience
# nexuscreator
