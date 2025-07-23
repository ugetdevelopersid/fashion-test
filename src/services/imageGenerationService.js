// Removed unused import to fix ESLint warning

export const generateImagePrompt = (outfits, userProfile) => {
  // Parse outfits if they're in text format
  const parseOutfits = (outfitsText) => {
    console.log('Raw outfits text for image generation:', outfitsText);
    
    // Split by outfit markers - handle both formats
    let outfitBlocks = outfitsText.split('👗 Outfit #').filter(block => block.trim());
    
    // If no 👗 markers found, try splitting by ** markers
    if (outfitBlocks.length <= 1) {
      outfitBlocks = outfitsText.split('**').filter(block => block.trim());
    }
    
    return outfitBlocks.map((block, index) => {
      const lines = block.split('\n').filter(line => line.trim());
      
      // Try to extract title from different formats
      let title = `Outfit ${index + 1}`;
      if (lines[0]) {
        const firstLine = lines[0].trim();
        // Remove markdown formatting
        const cleanTitle = firstLine.replace(/\*\*/g, '').replace(/^#\d+\s*/, '').trim();
        if (cleanTitle && cleanTitle !== '') {
          title = cleanTitle;
        }
      }
      
      const outfit = {
        id: index + 1,
        title: title,
        items: {},
        reasoning: []
      };

      let currentSection = 'items';
      
      lines.forEach(line => {
        const trimmedLine = line.trim();
        
        if (trimmedLine.startsWith('• Top:') || trimmedLine.startsWith('Top:')) {
          outfit.items.top = trimmedLine.replace(/^•\s*Top:\s*/, '').replace(/^Top:\s*/, '').trim();
        } else if (trimmedLine.startsWith('• Bottom:') || trimmedLine.startsWith('Bottom:')) {
          outfit.items.bottom = trimmedLine.replace(/^•\s*Bottom:\s*/, '').replace(/^Bottom:\s*/, '').trim();
        } else if (trimmedLine.startsWith('• Layer:') || trimmedLine.startsWith('Layer:')) {
          outfit.items.layer = trimmedLine.replace(/^•\s*Layer:\s*/, '').replace(/^Layer:\s*/, '').trim();
        } else if (trimmedLine.startsWith('• Footwear:') || trimmedLine.startsWith('Footwear:')) {
          outfit.items.footwear = trimmedLine.replace(/^•\s*Footwear:\s*/, '').replace(/^Footwear:\s*/, '').trim();
        } else if (trimmedLine.startsWith('• Accessories:') || trimmedLine.startsWith('Accessories:')) {
          outfit.items.accessories = trimmedLine.replace(/^•\s*Accessories:\s*/, '').replace(/^Accessories:\s*/, '').trim();
        } else if (trimmedLine === 'Why it Works:' || trimmedLine === 'Why This Works:') {
          currentSection = 'reasoning';
        } else if (currentSection === 'reasoning' && trimmedLine && !trimmedLine.startsWith('👗') && !trimmedLine.startsWith('**')) {
          outfit.reasoning.push(trimmedLine);
        }
      });

      return outfit;
    });
  };

  const parsedOutfits = typeof outfits === 'string' ? parseOutfits(outfits) : outfits;
  
  // Extract user profile data
  const gender = userProfile.gender || 'Male';
  const skinTone = userProfile.skinTone || 'Wheatish';
  const build = userProfile.buildProportions || 'Average height, Regular build';
  
  // Determine build description
  let buildDescription = 'Fuller mid-section relative to hips; waist is the widest point.';
  if (build.includes('Tall')) {
    buildDescription = 'Taller frame with moderate proportions.';
  } else if (build.includes('Athletic')) {
    buildDescription = 'Athletic build with defined shoulders and moderate waist.';
  } else if (build.includes('Slender')) {
    buildDescription = 'Slender build with lean proportions.';
  }

  // Generate the image prompt
  const imagePrompt = `Create a single high-resolution composition showing ${parsedOutfits.length} identical, featureless ${gender} mannequins side by side, using inpainting mode with high guidance so that each step is executed sequentially and exactly as specified, with no facial features or additional accessories beyond those listed. Make sure the dressing and the mannequins look natural and realistic

Composition & Models
Figures Quantity: ${parsedOutfits.length} mannequins, evenly spaced across the frame
Height: His overall vertical line is moderate, between 170–183 cm.
Build: ${buildDescription} He has a ${build.toLowerCase()}.
Skin tone: ${skinTone}
Facial features: none (smooth, featureless heads)

Pose & Environment
Stance: natural, relaxed, feet shoulder-width apart
Background: seamless light-gray studio backdrop
Lighting: soft, dimensional lighting with subtle, even floor shadows

### Rendering Notes

* **Textures & Fabrics:** emphasize breathable fabrics so outfits read comfortable in warm weather.
* **Brand Details:** show *discreet* logos or signature patterns but keep them legible.
* **Colors:** favor neutral tones with **one accent pop per outfit**.
* **Poses:** natural stance, feet shoulder‑width, arms relaxed slightly away from torso so silhouettes are clear.
* **Consistent Scale:** mannequins evenly spaced; each occupies an equal slice of the frame.
* **Focus:** no props other than the small‑scale accessories listed; background stays plain to keep attention on clothing.

Step-by-Step Inpainting
${parsedOutfits.map((outfit, index) => `
Mask Mannequin #${index + 1} with the ${skinTone} skintone and apply:
${outfit.title}
• Top: ${outfit.items.top || 'Not specified'}
• Bottom: ${outfit.items.bottom || 'Not specified'}
• Layer: ${outfit.items.layer || 'None'}
• Footwear: ${outfit.items.footwear || 'Not specified'}
• Accessories: ${outfit.items.accessories || 'None'}
`).join('\n')}`;

  console.log('🎨 IMAGE GENERATION PROMPT:');
  console.log('='.repeat(80));
  console.log(imagePrompt);
  console.log('='.repeat(80));

  return imagePrompt;
};

export const generateOutfitImage = async (outfits, userProfile) => {
  try {
    const imagePrompt = generateImagePrompt(outfits, userProfile);
    console.log('Generated image prompt:', imagePrompt);
    
    // Check if API key is configured
    if (!process.env.REACT_APP_OPENAI_API_KEY) {
      console.error('❌ OpenAI API key not configured for image generation');
      return {
        success: false,
        error: 'OpenAI API key not configured. Please create a .env.local file with REACT_APP_OPENAI_API_KEY=your_api_key'
      };
    }

    // Call OpenAI DALL-E API
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: imagePrompt,
        n: 1,
        size: '1024x1024',
        quality: 'standard',
        style: 'natural'
      })
    });

    const data = await response.json();
    console.log('OpenAI image generation response:', data);

    if (data.error) {
      console.error('OpenAI API error:', data.error);
      return {
        success: false,
        error: data.error.message || 'Failed to generate image'
      };
    }

    if (data.data && data.data[0] && data.data[0].url) {
      return {
        success: true,
        imageUrl: data.data[0].url,
        prompt: imagePrompt
      };
    } else {
      return {
        success: false,
        error: 'No image URL received from OpenAI'
      };
    }
  } catch (error) {
    console.error('Error generating image:', error);
    return {
      success: false,
      error: error.message || 'Failed to generate image'
    };
  }
}; 