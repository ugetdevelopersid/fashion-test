import { generatePrompt, generateImagePrompt } from './promptHelper';
import OpenAI from 'openai';

export interface OutfitGenerationResult {
  outfitSuggestion: string;
  whyItWorks: string;
  imagePrompt: string;
  imageUrl?: string;
}

/**
 * Calls OpenAI API for outfit generation
 * @param prompt - The generated fashion prompt
 * @returns The response from OpenAI
 */
export async function callChatGPT(prompt: string): Promise<string> {
  try {
    const response = await fetch('/api/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, type: 'text' }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to call OpenAI API');
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw error;
  }
}

/**
 * Calls OpenAI API for image generation using gpt-image-1 model
 * @param prompt - The image generation prompt
 * @returns The image URL from OpenAI
 */
export async function generateImage(prompt: string): Promise<string> {
  try {
    const response = await fetch('/api/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, type: 'image' }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate image');
    }

    const data = await response.json();
    return data.imageUrl;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
}

/**
 * Extracts outfit suggestion and "Why it works" from ChatGPT JSON response
 * @param chatGptResponse - The response from ChatGPT
 * @returns Object containing outfit suggestion and explanation
 */
export function extractOutfitAndExplanation(chatGptResponse: string): { outfitSuggestion: string; whyItWorks: string } {
  try {
    // Try to parse as JSON first
    const jsonResponse = JSON.parse(chatGptResponse);
    
    if (jsonResponse.outfits && jsonResponse.outfits.length > 0) {
      const firstOutfit = jsonResponse.outfits[0];
      
      // Build outfit suggestion string from first outfit
      const outfitParts = [];
      if (firstOutfit.header) outfitParts.push(firstOutfit.header);
      if (firstOutfit.top) outfitParts.push(`Top: ${firstOutfit.top}`);
      if (firstOutfit.bottom) outfitParts.push(`Bottom: ${firstOutfit.bottom}`);
      if (firstOutfit.footwear) outfitParts.push(`Footwear: ${firstOutfit.footwear}`);
      if (firstOutfit.outerwear) outfitParts.push(`Outerwear: ${firstOutfit.outerwear}`);
      if (firstOutfit.accessories) outfitParts.push(`Accessories: ${firstOutfit.accessories}`);
      
      const outfitSuggestion = outfitParts.join('\n');
      const whyItWorks = jsonResponse.whyItWorks || '';
      
      return { outfitSuggestion, whyItWorks };
    }
  } catch (error) {
    console.warn('Failed to parse JSON response, falling back to text parsing:', error);
    
    // Fallback to original text parsing for backward compatibility
    const outfitMatch = chatGptResponse.match(/Top:[\s\S]*?Why it works:[\s\S]*?(?=\n|$)/);
    
    if (outfitMatch) {
      const fullOutfit = outfitMatch[0];
      const whyItWorksMatch = fullOutfit.match(/Why it works: ([\s\S]*?)(?=\n|$)/);
      
      if (whyItWorksMatch) {
        const outfitSuggestion = fullOutfit.replace(/Why it works:[\s\S]*/, '').trim();
        const whyItWorks = whyItWorksMatch[1].trim();
        
        return { outfitSuggestion, whyItWorks };
      }
    }
  }
  
  return { outfitSuggestion: '', whyItWorks: '' };
}

/**
 * Generates step-by-step inpainting instructions from outfits array
 * @param outfits - Array of outfit objects
 * @returns Formatted step-by-step inpainting string
 */
export function generateStepByStepInpainting(outfits: any[]): string {
  const mannequinPrompts = outfits.map((outfit, index) => {
    const mannequinNumber = index + 1;
    const header = outfit.header || `Mask Mannequin #${mannequinNumber} with the Wheatish skintone and apply:`;
    
    const outfitParts = [];
    if (outfit.top) outfitParts.push(`Top: ${outfit.top}`);
    if (outfit.bottom) outfitParts.push(`Bottom: ${outfit.bottom}`);
    if (outfit.footwear) outfitParts.push(`Footwear: ${outfit.footwear}`);
    if (outfit.outerwear) outfitParts.push(`Outerwear: ${outfit.outerwear} (if needed)`);
    if (outfit.accessories) outfitParts.push(`Accessories: ${outfit.accessories} (if any), avoid sunglasses`);
    
    return `${header}\n${outfitParts.join('\n')}`;
  });
  
  return mannequinPrompts.join('\n\n');
}

/**
 * Generates outfit suggestion using two-step process
 * Step 1: Call ChatGPT with fashion prompt
 * Step 2: Generate image prompt with extracted outfit
 * @param profile - User profile data
 * @param eventString - Event/occasion string
 * @param noOfSuggestions - Number of suggestions
 * @returns Complete outfit generation result
 */
export async function generateOutfitSuggestion(
  profile: any, 
  eventString: string, 
  noOfSuggestions: number
): Promise<OutfitGenerationResult> {
  // Step 1: Generate fashion prompt and call ChatGPT
  const fashionPrompt = generatePrompt(profile, eventString, noOfSuggestions);
  const chatGptResponse = await callChatGPT(fashionPrompt);
  
  // Extract outfit suggestion and explanation
  const { outfitSuggestion, whyItWorks } = extractOutfitAndExplanation(chatGptResponse);
  
  // Step 2: Parse JSON response to get outfits array for image prompt generation
  let stepByStepInpainting = '';
  try {
    const jsonResponse = JSON.parse(chatGptResponse);
    if (jsonResponse.outfits && jsonResponse.outfits.length > 0) {
      stepByStepInpainting = generateStepByStepInpainting(jsonResponse.outfits);
    }
  } catch (error) {
    console.warn('Failed to parse JSON for image prompt generation:', error);
  }
  
  // Step 3: Generate image prompt using the existing generateImagePrompt function
  const imagePrompt = generateImagePrompt(profile, noOfSuggestions, stepByStepInpainting);
  
  // Step 4: Generate image using the image prompt
  let imageUrl: string | undefined;
  try {
    imageUrl = await generateImage(imagePrompt);
  } catch (error) {
    console.warn('Failed to generate image:', error);
  }
  
  return {
    outfitSuggestion,
    whyItWorks,
    imagePrompt,
    imageUrl
  };
} 