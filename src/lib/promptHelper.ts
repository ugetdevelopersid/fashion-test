/**
 * Converts gender and height to a descriptive string based on height categories
 * @param gender - The gender ('Male' or 'Female')
 * @param heightCm - Height in centimeters
 * @returns A descriptive string about the person's height
 */
export function getHeightDescription(gender: string, heightCm: number): string {
  if (gender.toLowerCase() === 'male') {
    if (heightCm < 170) {
      return "His overall vertical line is short, under 170 cm.";
    } else if (heightCm >= 170 && heightCm <= 183) {
      return "His overall vertical line is moderate, between 170–183 cm.";
    } else {
      return "His overall vertical line is tall, over 183 cm.";
    }
  } else {
    if (heightCm <= 162) {
      return "Her overall vertical line is petite.";
    } else if (heightCm >= 163 && heightCm <= 175) {
      return "Her overall vertical line is moderate.";
    } else {
      return "Her overall vertical line is tall and statuesque.";
    }
  }
}

/**
 * Calculates build description based on WHtR (Waist-to-Height Ratio) and gender
 * @param gender - The gender ('Male' or 'Female')
 * @param waistCm - Waist measurement in centimeters
 * @param heightCm - Height in centimeters
 * @returns A descriptive string about the person's build
 */
export function getBuildDescription(gender: string, waistCm: number, heightCm: number): string {
  // Calculate WHtR (Waist-to-Height Ratio)
  const whtr = waistCm / heightCm;
  
  let buildDescription = '';
  
  if (gender.toLowerCase() === 'male') {
    if (whtr <= 0.43) {
      buildDescription = "He has a very slender build, with a particularly lean frame.";
    } else if (whtr >= 0.44 && whtr <= 0.49) {
      buildDescription = "He has a slender build, with a lean and streamlined frame.";
    } else if (whtr >= 0.50 && whtr <= 0.57) {
      buildDescription = "He has a balanced, average build, with moderate proportions.";
    } else if (whtr >= 0.58 && whtr <= 0.62) {
      buildDescription = "He has a slightly full build, with gentle, soft curves.";
    } else if (whtr > 0.62) {
      buildDescription = "He has a full-figured build, with prominent, rounded curves.";
    }
    
    // Check for plus-size condition (waist > 100cm)
    if (waistCm > 100) {
      buildDescription += " His frame is plus-size, with generous and soft proportions.";
    }
  } else {
    if (whtr <= 0.41) {
      buildDescription = "She has a very slender build, with a particularly lean and narrow frame.";
    } else if (whtr >= 0.42 && whtr <= 0.46) {
      buildDescription = "She has a slender build, with a lean and streamlined frame.";
    } else if (whtr >= 0.47 && whtr <= 0.52) {
      buildDescription = "She has a balanced, average build, with moderate proportions throughout her frame.";
    } else if (whtr >= 0.53 && whtr <= 0.57) {
      buildDescription = "She has a slightly full build, characterized by a softer frame with gentle curves.";
    } else if (whtr >= 0.58) {
      buildDescription = "She has a full-figured build, characterized by a soft, substantial frame with prominent and rounded curves.";
    }
    
    // Check for plus-size condition (waist > 90cm)
    if (waistCm > 90) {
      buildDescription += " Her overall frame can be described as plus-size, with generous and soft proportions.";
    }
  }
  
  return buildDescription;
}

/**
 * Formats skin tone from kebab-case to readable format
 * @param skinTone - The skin tone in kebab-case format
 * @returns A readable skin tone string
 */
export function formatSkinTone(skinTone: string): string {
  const skinToneMap: { [key: string]: string } = {
    'fitzpatrick-i': 'Very Fair',
    'fitzpatrick-ii': 'Fair',
    'fitzpatrick-iii': 'Medium',
    'fitzpatrick-iv': 'Olive',
    'fitzpatrick-v': 'Brown',
    'fitzpatrick-vi': 'Dark Brown'
  };
  
  return skinToneMap[skinTone];
}

/**
 * Generates an image prompt by replacing variables in the imagePrompt.txt template with user profile values
 * @param profile - The user profile containing all necessary data
 * @param noOfSuggestions - Number of outfit suggestions to generate
 * @param stepByStepInpainting - The step-by-step inpainting instructions for each mannequin
 * @returns A complete image prompt with all variables replaced
 */
export function generateImagePrompt(profile: any, noOfSuggestions: number, stepByStepInpainting: string): string {
  // Get height description
  const heightDescription = getHeightDescription(profile.gender, profile.height);
  
  // Get build description
  const buildDescription = getBuildDescription(profile.gender, profile.waist, profile.height);
  
  // Read the image prompt template
  const imagePromptTemplate = `Create an ***image*** with descriptions that follow. Create a single high-resolution composition showing {NO_OF_SUGGESTIONS} identical, featureless {GENDER} mannequins side by side, using inpainting mode with high guidance so that each step is executed sequentially and exactly as specified, with no facial features or additional accessories beyond those listed. Make sure the dressing and the mannequins look natural and realistic								
								
Composition & Models								
Figures Quantity: {NO_OF_SUGGESTIONS} mannequins, evenly spaced across the frame							
Height: {HEIGHT_DESCRIPTION}							
Build: {BUILD_DESCRIPTION}					
Skin tone: {SKIN_TONE}					
								
Pose & Environment								
Stance: natural, relaxed, feet shoulder-width apart								
Background: seamless light-gray studio backdrop								
Lighting: soft, dimensional lighting with subtle, even floor shadows								
								
Step-by-Step Inpainting								
{STEP_BY_STEP_INPAINTING}`;
  
  // Replace all variables in the template
  const generatedImagePrompt = imagePromptTemplate
    .replace(/{NO_OF_SUGGESTIONS}/g, noOfSuggestions.toString())
    .replace(/{GENDER}/g, profile.gender || 'Not specified')
    .replace(/{HEIGHT_DESCRIPTION}/g, heightDescription)
    .replace(/{BUILD_DESCRIPTION}/g, buildDescription)
    .replace(/{SKIN_TONE}/g, formatSkinTone(profile.skinTone))
    .replace(/{STEP_BY_STEP_INPAINTING}/g, stepByStepInpainting);
  
  return generatedImagePrompt;
}

/**
 * Generates a fashion prompt by replacing variables in the prompt template with user profile values
 * @param profile - The user profile containing all necessary data
 * @param eventString - The event/occasion for the outfit (e.g., "Casual", "Formal", "Office")
 * @param noOfSuggestions - Number of outfit suggestions to generate
 * @returns A complete fashion prompt with all variables replaced
 */
export function generatePrompt(profile: any, eventString: string, noOfSuggestions: number): string {
  // Get height description
  const heightDescription = getHeightDescription(profile.gender, profile.height);
  
  // Get build description
  const buildDescription = getBuildDescription(profile.gender, profile.waist, profile.height);
  
  // Get geometric body shape
  const bodyShapeDescription = getGeometricShape(profile.gender, profile.bust, profile.waist, profile.hip);
  
  // Format hair length - convert kebab-case to Title Case
  const formatHairLength = (hairLength: string): string => {
    // Example: "very-short" -> "Very Short"
    return hairLength.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };
  
  // Format hair color - convert kebab-case to Title Case
  const formatHairColor = (hairColor: string): string => {
    // Example: "dark-brown" -> "Dark Brown"
    return hairColor.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };
  
  // Format weather temperature - capitalize first letter
  const formatWeatherTemperature = (temp: string): string => {
    // Example: "warm" -> "Warm"
    return temp.charAt(0).toUpperCase() + temp.slice(1);
  };
  
  // Format weather condition - capitalize first letter
  const formatWeatherCondition = (condition: string): string => {
    // Example: "clear" -> "Clear"
    return condition.charAt(0).toUpperCase() + condition.slice(1);
  };
  
  // Create weather string
  const weatherString = `${formatWeatherTemperature(profile.weatherTemperature)} and ${formatWeatherCondition(profile.weatherCondition)}`;
  
  // Create location string
  const locationString = profile.locationCity && profile.locationCountry
    ? `${profile.locationCity}, ${profile.locationCountry}`
    : 'Not specified';
  
  // Create personal styles string
  const personalStylesString = profile.personalStyle;
  
  // Create brand preferences string
  const brandPreferencesString = profile.brand || 'Not specified';
  
  // Create notes string
  const notesString = profile.notes || 'Not specified';
  
  // Read the prompt template
  const promptTemplate = `ROLE: "You are to act as 'Stylla', a world-class AI fashion consultant.								
Your expertise is a synthesis of three domains:								
a master personal stylist with deep knowledge of body-shape styling and proportion;								
a fashion psychologist specializing in the theory of 'enclothed cognition';								
and a material science expert with knowledge of fabric performance and sustainability.								
Your advice is always insightful, empathetic, practical, and grounded in established principles.								
You communicate in a sophisticated, encouraging, and clear tone, avoiding overly casual slang but remaining accessible and inspiring.								
Your ultimate goal is to empower the user to feel confident and authentic."								
								
PRIMARY CONTEXT (Non-Negotiable Constraints):							
* **Event:** {EVENT}
* **Weather & Season:** {WEATHER}															
* **Personal Style:** {PERSONAL_STYLES}					
* ** Brand Preferences** {BRAND_PREFERENCE}
* ** Notes**	{NOTES}
* ** Location** {LOCATION}

USER PROFILE (Personal Attributes): 								
* **Gender:** {GENDER}							
* **Age:** {AGE}											
* **Body Description:**								
- Height: {HEIGHT_DESCRIPTION}						
- Build: {BUILD_DESCRIPTION}					
- Body Shape: {BODY_SHAPE_DESCRIPTION}					
- Skin tone: {SKIN_TONE}					
- Skin Undertone: {SKIN_UNDERTONE}						
- Hair: {HAIR_LENGTH}, {HAIR_COLOR}				
								
CORE TASK & RULES:								
1. Analyze all parameters above.								
2. Suggest {NO_OF_SUGGESTIONS} complete, head-to-toe outfit.								
3. Adhere to a strict hierarchy: The suggestion **must** be appropriate for the **PRIMARY CONTEXT** (Event, Weather & Season) and align with the user's **Personal Style**.								
4. Optimize for the USER PROFILE: Within context-appropriate options, the outfit must flatter the specified **Body Shape**, harmonize with the **Skin Tone** and **Hair**, and suit their **Age** and **Gender**.								
5. Provide a "Why it works" explanation: After listing the outfit items, add a brief paragraph explaining your choices. Reference the user's parameters directly (e.g., "This cropped bomber jacket adds a youthful edge fitting your 28-year-old style while defining your shoulders, balancing your fuller mid-section, and the muted olive hue complements your wheatish skin tone.").								
Please build **{NO_OF_SUGGESTIONS} head-to-toe outfit** using as many owned pieces as possible, filling any gaps with smart suggestions.								
In case the user enters the Owned items try in the suggestions to specify the outfit as much as possible so the outfit in the suggestions dont change as compared to what was given as the input								
Bullet-point the items (top, bottom, outerwear if needed, footwear, and any accessory), then add a **"Why it works"** explanation tied to my shape, coloring, age, gender, and climate.								
								
OUTPUT FORMAT: Respond with a valid JSON object in the following structure:

{
  "outfits": [
    {
      "header": "Mask Mannequin #1 with the Wheatish skintone and apply:",
      "top": "Description of the top item",
      "bottom": "Description of the bottom item", 
      "footwear": "Description of the footwear",
      "outerwear": "Description of outerwear (if needed, otherwise null)",
      "accessories": "Description of accessories (if any, otherwise null)"
    }
  ],
  "whyItWorks": "Combined explanation of why all these outfits work for the user's body shape, coloring, age, gender, and climate. This should reference the user's specific parameters and explain how the outfit choices complement their features and the given context."
}

Please ensure the JSON is properly formatted and valid. Generate the exact number of outfits requested. The whyItWorks should be a single comprehensive explanation covering all outfits together.`;
  
  // Replace all variables in the template
  const generatedPrompt = promptTemplate
    .replace(/{EVENT}/g, eventString)
    .replace(/{WEATHER}/g, weatherString)
    .replace(/{PERSONAL_STYLES}/g, personalStylesString)
    .replace(/{BRAND_PREFERENCE}/g, brandPreferencesString)
    .replace(/{NOTES}/g, notesString)
    .replace(/{LOCATION}/g, locationString)
    .replace(/{GENDER}/g, profile.gender || 'Not specified')
    .replace(/{AGE}/g, profile.age?.toString() || 'Not specified')
    .replace(/{HEIGHT_DESCRIPTION}/g, heightDescription)
    .replace(/{BUILD_DESCRIPTION}/g, buildDescription)
    .replace(/{BODY_SHAPE_DESCRIPTION}/g, bodyShapeDescription)
    .replace(/{SKIN_TONE}/g, formatSkinTone(profile.skinTone))
    .replace(/{SKIN_UNDERTONE}/g, 'Not specified') // This could be added to the profile in the future
    .replace(/{HAIR_LENGTH}/g, formatHairLength(profile.hairLength))
    .replace(/{HAIR_COLOR}/g, formatHairColor(profile.hairColor))
    .replace(/{NO_OF_SUGGESTIONS}/g, noOfSuggestions.toString());
  
  return generatedPrompt;
}

/**
 * Calculates geometric body shape based on bust/hip, waist/hip, and other ratios
 * @param gender - The gender ('Male' or 'Female')
 * @param bustCm - Bust/chest measurement in centimeters
 * @param waistCm - Waist measurement in centimeters
 * @param hipCm - Hip measurement in centimeters
 * @returns A descriptive string about the person's geometric body shape
 */
export function getGeometricShape(gender: string, bustCm: number, waistCm: number, hipCm: number): string {
  // Calculate ratios
  const bustHipRatio = bustCm / hipCm;
  const hipBustRatio = hipCm / bustCm;
  const waistHipRatio = waistCm / hipCm;
  const waistBustRatio = waistCm / bustCm;
  
  if (gender.toLowerCase() === 'female') {
    // Hourglass: bust_hip_ratio >= 0.95 && bust_hip_ratio <= 1.05 && waist_hip_ratio < 0.75
    if (bustHipRatio >= 0.95 && bustHipRatio <= 1.05 && waistHipRatio < 0.75) {
      return "Her geometric shape is a classic 'Hourglass', defined by a narrow waist with bust and hip measurements that are nearly identical, creating a balanced and symmetrical curved silhouette.";
    }
    
    // Top Hourglass: bust_hip_ratio > 1.05 && waist_bust_ratio < 0.75
    if (bustHipRatio > 1.05 && waistBustRatio < 0.75) {
      return "Her geometric shape is a 'Top Hourglass', with a full bust and a defined, narrow waist. Her hips are slightly narrower than her bust.";
    }
    
    // Bottom Hourglass: hip_bust_ratio > 1.05 && waist_hip_ratio < 0.75
    if (hipBustRatio > 1.05 && waistHipRatio < 0.75) {
      return "Her geometric shape is a 'Bottom Hourglass', with full hips and a defined, narrow waist. Her bust is slightly narrower than her hips.";
    }
    
    // Pear (Triangle): hip_bust_ratio > 1.05 && waist_hip_ratio >= 0.75
    if (hipBustRatio > 1.05 && waistHipRatio >= 0.75) {
      return "Her geometric shape is a 'Pear' (or Triangle), defined by hips that are structurally wider than her bust and shoulders. She has a defined waist that sits above her fuller hips.";
    }
    
    // Apple (Inverted Triangle): bust_hip_ratio > 1.05 && waist_bust_ratio >= 0.75
    if (bustHipRatio > 1.05 && waistBustRatio >= 0.75) {
      return "Her geometric shape is an 'Apple' (or Inverted Triangle), defined by a bust and torso that are broader than her hips, with less waist definition. Her legs are often a primary feature.";
    }
    
    // Rectangle: bust_hip_ratio >= 0.95 && bust_hip_ratio <= 1.05 && waist_hip_ratio >= 0.75
    if (bustHipRatio >= 0.95 && bustHipRatio <= 1.05 && waistHipRatio >= 0.75) {
      return "Her geometric shape is a 'Rectangle', characterized by bust, waist, and hip measurements that are relatively similar, creating a straight, athletic silhouette with minimal waist definition.";
    }
    
    // Diamond: waist_bust_ratio > 1 && waist_hip_ratio > 1
    if (waistBustRatio > 1 && waistHipRatio > 1) {
      return "Her geometric shape is a 'Diamond', characterized by hips that are broader than the shoulders and a waist that is the fullest point of the torso.";
    }
    
    // Spoon: hip_bust_ratio > 1.05 && waist_hip_ratio < 0.75 (note: high_hip_shelf not available in current data)
    if (hipBustRatio > 1.05 && waistHipRatio < 0.75) {
      return "Her geometric shape is a 'Spoon', similar to a Pear but characterized by a distinct 'shelf' where the hips extend from a defined waist.";
    }
    
    // Default case
    return "Her geometric shape has balanced proportions with moderate curves.";
    
  } else {
    // For males, we'll use shoulder measurements (approximated by bust for now)
    const shoulderHipRatio = bustCm / hipCm;
    const hipShoulderRatio = hipCm / bustCm;
    
    // Inverted Triangle (V-Shape): shoulder_hip_ratio > 1.05 && waist_shoulder_ratio < 0.75
    if (shoulderHipRatio > 1.05 && waistBustRatio < 0.75) {
      return "His geometric shape is an 'Inverted Triangle' (V-Shape), with broad shoulders tapering to narrower waist and hips.";
    }
    
    // Triangle (A-Shape): hip_shoulder_ratio > 1.05 && waist_hip_ratio < 0.75
    if (hipShoulderRatio > 1.05 && waistHipRatio < 0.75) {
      return "His geometric shape is a 'Triangle' (A-Shape), with hips broader than shoulders and a defined waist above them.";
    }
    
    // Rectangle (H-Shape): shoulder_hip_ratio >= 0.95 && shoulder_hip_ratio <= 1.05 && waist_hip_ratio >= 0.75 && waist_hip_ratio <= 0.90
    if (shoulderHipRatio >= 0.95 && shoulderHipRatio <= 1.05 && waistHipRatio >= 0.75 && waistHipRatio <= 0.90) {
      return "His geometric shape is a 'Rectangle' (H-Shape), with shoulders and hips aligned and moderate waist—an athletic, straight silhouette.";
    }
    
    // Oval (O-Shape / Apple): waist_hip_ratio > 0.90
    if (waistHipRatio > 0.90) {
      return "His geometric shape is an 'Oval' (O-Shape / Apple), with a fuller mid-section relative to hips; waist is the widest point.";
    }
    
    // X-Shape (Hourglass-Like): shoulder_hip_ratio >= 0.95 && shoulder_hip_ratio <= 1.05 && waist_hip_ratio < 0.75
    if (shoulderHipRatio >= 0.95 && shoulderHipRatio <= 1.05 && waistHipRatio < 0.75) {
      return "His geometric shape is an 'X-Shape' (Hourglass-Like), with balanced shoulders and hips and a distinctly narrow waist, rare in men but highly sculpted.";
    }
    
    // Default case
    return "His geometric shape has balanced proportions with moderate definition.";
  }
} 