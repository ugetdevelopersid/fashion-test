import OpenAI from 'openai';
import { calculateBodyShape, getFitPreferences } from './bodyShapeCalculator';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, this should be handled server-side
});

// Check if API key is configured
if (!process.env.REACT_APP_OPENAI_API_KEY) {
  console.warn('⚠️ OpenAI API key not found. Please set REACT_APP_OPENAI_API_KEY in your .env file');
}

// Stylla AI Fashion Consultant Prompt Template
const STYLLA_PROMPT_TEMPLATE = `You are to act as **'Stylla'**, a world-class AI fashion consultant.	
Your expertise fuses three domains:	
• master personal stylist (body-shape science & proportion);	
• fashion psychologist (enclothed cognition & self-perception);	
• textile/material-science specialist (fabric performance & sustainability).	
Your advice is always insightful, empathetic, practical, and rooted in established principles.	
Communicate with sophistication and encouragement—never snobbish, never slangy—while remaining clear and inspiring.	
**Ultimate goal:** empower the user to feel confident, authentic, and comfortable.	
Please build **6 head-to-toe outfit** using as many owned pieces as possible, filling any gaps with smart suggestions.	

PRIMARY CONTEXT:	

1. **Event & Occasion**	
• Event Name: {eventName}
• Occasion Category: {occasionCategory}

2. **User Identity & Body Profile**	
• Gender: {gender}
• Age Range: {age}
• Height (cm): {height}
• Weight (kg): {weight}
• Body Shape: {bodyShape}
• Build & Proportions: {buildProportions}
• Fit Preferences: {fitPreferences}
• Brand Preferences: {brandPreferences}

3. **Color & Aesthetic Inputs**	
• Personal Style Archetype(s): {personalStyle}
• Skin Tone: {skinTone}
• Undertone: {undertone}
• Hair Color & Pattern: {hairColor}

4. **Environmental Factors**	
• Location & Region: {location}
• Weather & Season: {weatherSeason}

5. **Lifestyle & Functional Needs**	
• Profession / Day-to-Day Environment: {profession}
• Budget Range: {budgetRange}

OUTPUT STRUCTURE:	

👗 Outfit #1 — <Creative Title>	
• Top: <detailed description> 	
• Bottom: <...>	
• Layer: <...>	
• Footwear: <...>	
• Accessories: <...>	

Why it Works:	
<Body-shape reasoning>	
<Color harmony reasoning>	
<Event & weather suitability>	

👗 Outfit #2 — <Creative Title>	
• Top: <detailed description> 	
• Bottom: <...>	
• Layer: <...>	
• Footwear: <...>	
• Accessories: <...>	

Why it Works:	
<Body-shape reasoning>	
<Color harmony reasoning>	
<Event & weather suitability>	

👗 Outfit #3 — <Creative Title>	
• Top: <detailed description> 	
• Bottom: <...>	
• Layer: <...>	
• Footwear: <...>	
• Accessories: <...>	

Why it Works:	
<Body-shape reasoning>	
<Color harmony reasoning>	
<Event & weather suitability>	

👗 Outfit #4 — <Creative Title>	
• Top: <detailed description> 	
• Bottom: <...>	
• Layer: <...>	
• Footwear: <...>	
• Accessories: <...>	

Why it Works:	
<Body-shape reasoning>	
<Color harmony reasoning>	
<Event & weather suitability>	

👗 Outfit #5 — <Creative Title>	
• Top: <detailed description> 	
• Bottom: <...>	
• Layer: <...>	
• Footwear: <...>	
• Accessories: <...>	

Why it Works:	
<Body-shape reasoning>	
<Color harmony reasoning>	
<Event & weather suitability>	

👗 Outfit #6 — <Creative Title>	
• Top: <detailed description> 	
• Bottom: <...>	
• Layer: <...>	
• Footwear: <...>	
• Accessories: <...>	

Why it Works:	
<Body-shape reasoning>	
<Color harmony reasoning>	
<Event & weather suitability>	

Please provide {outfitCount} complete head-to-toe outfits with detailed explanations for each.`;

export const generateOutfits = async (userProfile) => {
  console.log('🚀 Starting outfit generation...');
  console.log('📋 User profile:', userProfile);
  
  // Check if API key is available
  if (!process.env.REACT_APP_OPENAI_API_KEY) {
    console.error('❌ OpenAI API key not configured');
    return {
      success: false,
      error: 'OpenAI API key not configured. Please set REACT_APP_OPENAI_API_KEY in your .env file',
      outfits: null
    };
  }
  
  try {
    // Determine occasion category based on event name
    const getOccasionCategory = (eventName) => {
      const event = eventName.toLowerCase();
      if (event.includes('brunch') || event.includes('lunch') || event.includes('dinner')) {
        return 'Semi-formal';
      } else if (event.includes('work') || event.includes('office') || event.includes('meeting')) {
        return 'Business-Casual';
      } else if (event.includes('gym') || event.includes('workout') || event.includes('sport')) {
        return 'Active';
      } else if (event.includes('party') || event.includes('celebration') || event.includes('wedding')) {
        return 'Formal';
      } else if (event.includes('home') || event.includes('lounge') || event.includes('casual')) {
        return 'Lounge';
      } else {
        return 'Semi-formal'; // Default
      }
    };



    // Calculate body shape if measurements are provided
    let bodyShapeData = null;
    const gender = userProfile.gender || 'Male';
    
    if (gender === 'Male') {
      // Male measurements require shoulder_cm
      if (userProfile.shoulder_cm && userProfile.waist_cm && userProfile.hip_cm && userProfile.height_cm) {
        bodyShapeData = calculateBodyShape({
          shoulder_cm: userProfile.shoulder_cm,
          waist_cm: userProfile.waist_cm,
          hip_cm: userProfile.hip_cm,
          height_cm: userProfile.height_cm
        }, gender);
      }
    } else {
      // Female measurements require bust_cm
      if (userProfile.bust_cm && userProfile.waist_cm && userProfile.hip_cm && userProfile.height_cm) {
        bodyShapeData = calculateBodyShape({
          bust_cm: userProfile.bust_cm,
          waist_cm: userProfile.waist_cm,
          hip_cm: userProfile.hip_cm,
          height_cm: userProfile.height_cm
        }, gender);
      }
    }

    // Prepare the prompt with user data
    const prompt = STYLLA_PROMPT_TEMPLATE
      .replace('{eventName}', userProfile.eventName || 'brunch')
      .replace('{occasionCategory}', getOccasionCategory(userProfile.eventName || 'brunch'))
      .replace('{gender}', userProfile.gender || 'Male')
      .replace('{age}', userProfile.age || '28')
      .replace('{height}', userProfile.height || '179')
      .replace('{weight}', userProfile.weight || '75')
      .replace('{bodyShape}', bodyShapeData ? `${bodyShapeData.geometricShape} (${bodyShapeData.buildCategory})` : (userProfile.bodyShape || 'Apple'))
      .replace('{buildProportions}', bodyShapeData ? `${bodyShapeData.heightCategory} height, ${bodyShapeData.buildCategory} build` : (userProfile.buildProportions || 'Slender build, lean and streamlined frame'))
      .replace('{fitPreferences}', bodyShapeData ? getFitPreferences(bodyShapeData, gender) : 'Tailored')
      .replace('{brandPreferences}', userProfile.brandPreferences || 'Uniqlo, Zara, H&M, thrifting, Jack and Jones, Levis')
      .replace('{personalStyle}', userProfile.personalStyle || 'minimalist-classic, casual, streetwear, preppy')
      .replace('{skinTone}', userProfile.skinTone || 'Wheatish')
      .replace('{undertone}', userProfile.undertone || 'neutral undertone or low contrast')
      .replace('{hairColor}', userProfile.hairColor || 'black')
      .replace('{location}', userProfile.location || 'New Delhi, India')
      .replace('{weatherSeason}', userProfile.weatherSeason || 'Hot and humid day')
      .replace('{profession}', userProfile.profession || 'Professional')
      .replace('{budgetRange}', userProfile.budgetRange || 'mid market')
      .replace('{outfitCount}', userProfile.outfitCount || 3);

    console.log('📤 Sending request to OpenAI API...');
    console.log('📝 Prompt length:', prompt.length);
    
    console.log('🎯 OUTFIT GENERATION PROMPT:');
    console.log('='.repeat(80));
    console.log(prompt);
    console.log('='.repeat(80));
    
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are Stylla, a world-class AI fashion consultant. Provide detailed, practical outfit recommendations with explanations."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 3000,
      temperature: 0.7
    });

    console.log('✅ OpenAI API response received');
    console.log('📊 Response usage:', response.usage);
    
    return {
      success: true,
      outfits: response.choices[0].message.content,
      usage: response.usage
    };

  } catch (error) {
    console.error('❌ Error generating outfits:', error);
    console.error('🔍 Error details:', {
      message: error.message,
      type: error.type,
      code: error.code
    });
    
    let errorMessage = 'Failed to generate outfits. Please try again.';
    
    if (error.code === 'insufficient_quota') {
      errorMessage = 'OpenAI API quota exceeded. Please try again later.';
    } else if (error.code === 'invalid_api_key') {
      errorMessage = 'Invalid OpenAI API key. Please check your configuration.';
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return {
      success: false,
      error: errorMessage,
      outfits: null
    };
  }
};

export default openai; 