# OpenAI Integration Setup Guide

## Overview
This application now includes AI-powered outfit generation using OpenAI's GPT-4 model. The system uses the "Stylla" AI fashion consultant prompt to generate personalized outfit recommendations based on user profile data.

## Setup Instructions

### 1. Get OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in to your account
3. Navigate to "API Keys" in your dashboard
4. Create a new API key
5. Copy the API key (it starts with `sk-`)

### 2. Configure Environment Variables
1. Create a `.env.local` file in the root directory of the project
2. Add your OpenAI API key:
   ```
   REACT_APP_OPENAI_API_KEY=sk-your_actual_api_key_here
   ```
3. Replace `sk-your_actual_api_key_here` with your actual OpenAI API key

### 3. Install Dependencies
The OpenAI package is already included in the project. If you need to reinstall:
```bash
npm install openai
```

### 4. Start the Application
```bash
npm start
```

## How It Works

### User Profile Data
The system uses the following user profile data to generate personalized outfits:

- **Event & Occasion**: Event name and automatically determined occasion category
- **Body Profile**: Gender, age, height, weight, body measurements (shoulder/bust, waist, hip), calculated body shape, build proportions, fit preferences
- **Style Preferences**: Personal style archetypes, skin tone, undertone, hair color
- **Environmental Factors**: Location, weather, season
- **Lifestyle**: Profession, budget range, brand preferences

### Advanced Body Shape Analysis
The system includes sophisticated body shape calculation based on gender:

**For Males:**
- **Height Categories**: Short (<170cm), Average (170-183cm), Tall (>183cm)
- **Build Categories**: Very Slender, Slender, Average, Slightly Full, Full-Figured (based on Waist-to-Height Ratio)
- **Geometric Shapes**: Inverted Triangle (V-Shape), Triangle (A-Shape), Rectangle (H-Shape), Oval (O-Shape/Apple), X-Shape (Hourglass-Like), Athletic, Column (I-Shape), Diamond
- **Plus-Size Modifier**: Automatically applied when waist > 100cm

**For Females:**
- **Height Categories**: Petite (≤162cm), Moderate (163-175cm), Tall (≥176cm)
- **Build Categories**: Very Slender, Slender, Average, Slightly Full, Full-Figured (based on Waist-to-Height Ratio)
- **Geometric Shapes**: Hourglass, Top Hourglass, Bottom Hourglass, Pear (Triangle), Apple (Inverted Triangle), Rectangle, Diamond, Column, Cornet Silhouette, Teardrop, Athletic Frame, Lollipop Silhouette
- **Plus-Size Modifier**: Automatically applied when waist > 90cm

### AI Prompt Structure
The system uses a sophisticated prompt template that:
1. Establishes Stylla as a world-class AI fashion consultant
2. Incorporates body-shape science, fashion psychology, and textile expertise
3. Provides detailed outfit recommendations with explanations
4. Ensures practical, budget-conscious suggestions

### Output Format
Each generated outfit includes:
- **Creative Title**: Descriptive name for the outfit
- **Detailed Items**: Top, bottom, layer, footwear, accessories
- **Reasoning**: Body-shape analysis, color harmony, event suitability

## Features

### 1. Personalized Recommendations
- Analyzes body shape and proportions using advanced measurement-based calculations
- Considers personal style preferences
- Accounts for weather and location
- Respects budget constraints
- Provides specific styling recommendations based on body shape

### 2. Smart Occasion Detection
- Automatically categorizes events (Formal, Semi-formal, Business-Casual, etc.)
- Adjusts formality level based on event type
- Considers environmental factors

### 3. Comprehensive Explanations
- Body-shape reasoning for each outfit
- Color harmony analysis
- Event and weather suitability explanations

### 4. User-Friendly Interface
- Beautiful card-based layout
- Loading states with spinner
- Error handling with retry options
- Responsive design for all devices

## Usage

1. Navigate to the Outfit Generation page
2. Select a category (User Preferences or Outfit Preferences)
3. Choose a subcategory
4. Click "GENERATE" to create personalized outfits
5. Review the 6 generated outfits with detailed explanations
6. Use "Generate New Outfits" to create different variations

## Error Handling

The system includes comprehensive error handling:
- API connection issues
- Invalid API keys
- Rate limiting
- Network timeouts

Users can retry generation if errors occur.

## Security Notes

⚠️ **Important**: The current implementation uses `dangerouslyAllowBrowser: true` for development. In production, this should be handled server-side to protect your API key.

## Cost Considerations

- Each outfit generation uses GPT-4 model
- Estimated cost: ~$0.03-0.05 per generation (6 outfits)
- Monitor usage in your OpenAI dashboard
- Consider implementing rate limiting for production use

## Customization

You can modify the user profile data in `src/components/OutfitGeneration.js` to match your actual user data collection system. The current implementation uses mock data for demonstration purposes. 