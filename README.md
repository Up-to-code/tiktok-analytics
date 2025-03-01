# TikTok Analytics Dashboard

A modern web application built with Next.js that provides detailed analytics and insights for TikTok profiles. This tool allows users to analyze TikTok accounts, view follower statistics, and track engagement metrics.

## Screenshots

### Dashboard Overview
![Dashboard Overview](./public/screenshots.png)
*Main dashboard showing key metrics and profile information*


## Features

- **Profile Analysis**: View detailed statistics for any public TikTok account
- **Follower Insights**: Analyze follower demographics and engagement patterns
- **Following List**: Explore accounts followed by the target user
- **Post Analytics**: Track performance metrics for individual posts
- **Real-time Data**: Get up-to-date statistics using the TikTok API
- **Modern UI**: Clean and responsive interface with smooth animations

## Tech Stack

- **Frontend**: Next.js 13+ with App Router
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **API Integration**: RapidAPI TikTok API
- **Type Safety**: TypeScript

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm or yarn
- RapidAPI Key (for TikTok API access)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/tiktok-analytics.git
cd tiktok-analytics
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your RapidAPI key:
```env
RAPIDAPI_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Features in Detail

### Profile Overview
- Total followers count
- Total likes
- Video count
- Engagement rate calculation

### Follower Analysis
- List of followers with profile details
- Follower growth tracking
- Engagement metrics per follower

### Following List
- Grid view of followed accounts
- Profile pictures and verification status
- Account statistics and engagement metrics

### Post Analytics
- Video thumbnails and duration
- Like and view counts
- Music information
- Hashtag tracking
- Engagement metrics per post

## API Integration

The application uses the TikTok API from RapidAPI to fetch:
- User profile data
- Follower information
- Following list
- Post details and statistics

## UI/UX Features

- Responsive grid layouts
- Smooth hover animations
- Loading states
- Error handling
- Modern card designs
- Interactive elements

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- TikTok API provided by RapidAPI
- Icons from React Icons
- Animation library from Framer Motion
- Styling framework from Tailwind CSS

## Security Note

Remember to keep your API keys secure and never commit them directly to the repository. Use environment variables for sensitive information.
