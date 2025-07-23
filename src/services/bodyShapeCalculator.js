/**
 * Body Shape Calculator Service
 * Provides sophisticated body shape analysis based on measurements
 */

export const calculateBodyShape = (measurements, gender = 'Male') => {
  const { bust_cm, waist_cm, hip_cm, height_cm, shoulder_cm } = measurements;
  
  // Calculate ratios
  const bust_hip_ratio = bust_cm / hip_cm;
  const hip_bust_ratio = hip_cm / bust_cm;
  const waist_bust_ratio = waist_cm / bust_cm;
  const waist_hip_ratio = waist_cm / hip_cm;
  const whtr = waist_cm / height_cm; // Waist-to-Height Ratio
  
  // Calculate shoulder ratios for male body shapes
  const shoulder_hip_ratio = shoulder_cm / hip_cm;
  const hip_shoulder_ratio = hip_cm / shoulder_cm;
  const waist_shoulder_ratio = waist_cm / shoulder_cm;
  
  if (gender === 'Male') {
    // Male height categories
    let heightCategory = 'Average';
    if (height_cm < 170) {
      heightCategory = 'Short';
    } else if (height_cm > 183) {
      heightCategory = 'Tall';
    }
    
    // Male build categories
    let buildCategory = 'Average';
    if (whtr <= 0.43) {
      buildCategory = 'Very Slender';
    } else if (whtr <= 0.49) {
      buildCategory = 'Slender';
    } else if (whtr <= 0.57) {
      buildCategory = 'Average';
    } else if (whtr <= 0.62) {
      buildCategory = 'Slightly Full';
    } else {
      buildCategory = 'Full-Figured';
    }
    
    // Add plus-size modifier for males
    if (waist_cm > 100) {
      buildCategory += ' (Plus-Size)';
    }
    
    // Determine male geometric shape
    let geometricShape = 'Rectangle (H-Shape)'; // Default
    
    if (shoulder_hip_ratio > 1.05 && waist_shoulder_ratio < 0.75) {
      geometricShape = 'Inverted Triangle (V-Shape)';
    } else if (hip_shoulder_ratio > 1.05 && waist_hip_ratio < 0.75) {
      geometricShape = 'Triangle (A-Shape)';
    } else if (shoulder_hip_ratio >= 0.95 && shoulder_hip_ratio <= 1.05 && waist_hip_ratio >= 0.75 && waist_hip_ratio <= 0.90) {
      geometricShape = 'Rectangle (H-Shape)';
    } else if (waist_hip_ratio > 0.90) {
      geometricShape = 'Oval (O-Shape / Apple)';
    } else if (shoulder_hip_ratio >= 0.95 && shoulder_hip_ratio <= 1.05 && waist_hip_ratio < 0.75) {
      geometricShape = 'X-Shape (Hourglass-Like)';
    } else if (shoulder_hip_ratio > 1.20 && waist_hip_ratio < 0.75) {
      geometricShape = 'Athletic';
    } else if (shoulder_hip_ratio >= 0.95 && shoulder_hip_ratio <= 1.05 && waist_hip_ratio >= 0.90 && waist_hip_ratio <= 1.05) {
      geometricShape = 'Column (I-Shape)';
    } else if (waist_hip_ratio > 1.05 && waist_shoulder_ratio > 1.05) {
      geometricShape = 'Diamond';
    }
    
    return {
      heightCategory,
      buildCategory,
      geometricShape,
      ratios: { shoulder_hip_ratio, hip_shoulder_ratio, waist_hip_ratio, waist_shoulder_ratio, whtr }
    };
  } else {
    // Female height categories
    let heightCategory = 'Moderate';
    if (height_cm <= 162) {
      heightCategory = 'Petite';
    } else if (height_cm >= 176) {
      heightCategory = 'Tall';
    }
    
    // Female build categories
    let buildCategory = 'Average';
    if (whtr <= 0.41) {
      buildCategory = 'Very Slender';
    } else if (whtr <= 0.46) {
      buildCategory = 'Slender';
    } else if (whtr <= 0.52) {
      buildCategory = 'Average';
    } else if (whtr <= 0.57) {
      buildCategory = 'Slightly Full';
    } else {
      buildCategory = 'Full-Figured';
    }
    
    // Add plus-size modifier for females
    if (waist_cm > 90) {
      buildCategory += ' (Plus-Size)';
    }
    
    // Determine female geometric shape
    let geometricShape = 'Rectangle'; // Default
    
    if (bust_hip_ratio >= 0.95 && bust_hip_ratio <= 1.05 && waist_hip_ratio < 0.75) {
      geometricShape = 'Hourglass';
    } else if (bust_hip_ratio > 1.05 && waist_bust_ratio < 0.75) {
      geometricShape = 'Top Hourglass';
    } else if (hip_bust_ratio > 1.05 && waist_hip_ratio < 0.75) {
      geometricShape = 'Bottom Hourglass';
    } else if (hip_bust_ratio > 1.05 && waist_hip_ratio >= 0.75) {
      geometricShape = 'Pear (Triangle)';
    } else if (bust_hip_ratio > 1.05 && waist_bust_ratio >= 0.75) {
      geometricShape = 'Apple (Inverted Triangle)';
    } else if (bust_hip_ratio >= 0.95 && bust_hip_ratio <= 1.05 && waist_hip_ratio >= 0.75) {
      geometricShape = 'Rectangle';
    } else if (waist_bust_ratio > 1 && waist_hip_ratio > 1) {
      geometricShape = 'Diamond';
    } else if (bust_hip_ratio >= 0.95 && bust_hip_ratio <= 1.05 && waist_hip_ratio >= 0.90) {
      geometricShape = 'Column';
    } else if (bust_hip_ratio >= 0.95 && bust_hip_ratio <= 1.05 && waist_hip_ratio < 0.65) {
      geometricShape = 'Cornet Silhouette';
    } else if (hip_bust_ratio >= 1.25) {
      geometricShape = 'Teardrop';
    } else if (bust_hip_ratio >= 1.20 && waist_bust_ratio >= 0.75) {
      geometricShape = 'Athletic Frame';
    } else if (bust_hip_ratio >= 1.20 && waist_cm <= 75 && hip_cm <= 95) {
      geometricShape = 'Lollipop Silhouette';
    }
    
    return {
      heightCategory,
      buildCategory,
      geometricShape,
      ratios: { bust_hip_ratio, hip_bust_ratio, waist_bust_ratio, waist_hip_ratio, whtr }
    };
  }
};

export const getFitPreferences = (bodyShapeData, gender = 'Male') => {
  const { geometricShape, buildCategory } = bodyShapeData;
  
  if (gender === 'Male') {
    // Male fit preferences based on body shape
    if (geometricShape.includes('Inverted Triangle') || geometricShape.includes('Athletic')) {
      return 'Tailored'; // V-shape and athletic builds work well with tailored fits
    } else if (geometricShape.includes('Rectangle') || geometricShape.includes('Column')) {
      return 'Tailored'; // Straight silhouettes work well with tailored fits
    } else if (geometricShape.includes('Oval') || geometricShape.includes('Diamond')) {
      return 'Relaxed'; // Fuller midsections benefit from relaxed fits
    } else if (geometricShape.includes('Triangle')) {
      return 'Tailored'; // A-shape works well with tailored fits
    } else if (geometricShape.includes('X-Shape')) {
      return 'Tailored to Relaxed'; // Hourglass-like shapes can handle both
    }
    return 'Tailored'; // Default for males
  } else {
    // Female fit preferences (existing logic)
    if (geometricShape.includes('Athletic') || geometricShape.includes('Column') || 
        geometricShape.includes('Rectangle') || geometricShape.includes('Lollipop')) {
      return 'Tailored';
    }
    
    if (geometricShape.includes('Hourglass') || geometricShape.includes('Cornet')) {
      return 'Tailored to Relaxed';
    }
    
    if (geometricShape.includes('Apple') || geometricShape.includes('Diamond')) {
      return 'Relaxed';
    }
    
    if (geometricShape.includes('Pear') || geometricShape.includes('Teardrop')) {
      return 'Tailored';
    }
    
    return 'Tailored'; // Default
  }
};

export const getStylingRecommendations = (bodyShapeData, gender = 'Male') => {
  const { geometricShape, heightCategory, buildCategory } = bodyShapeData;
  
  const recommendations = {
    necklines: [],
    silhouettes: [],
    patterns: [],
    accessories: [],
    fitAdvice: []
  };
  
  if (gender === 'Male') {
    // Male styling recommendations
    if (geometricShape.includes('Inverted Triangle')) {
      recommendations.necklines.push('V-neck', 'Crew neck', 'Henley');
      recommendations.silhouettes.push('Fitted tops', 'Straight-leg pants', 'Structured jackets');
      recommendations.patterns.push('Vertical stripes', 'Solid colors');
      recommendations.fitAdvice.push('Emphasize your V-shape', 'Choose fitted tops and straight pants');
    }
    
    if (geometricShape.includes('Rectangle')) {
      recommendations.necklines.push('V-neck', 'Crew neck', 'Polo');
      recommendations.silhouettes.push('Layered looks', 'Belted styles', 'Structured pieces');
      recommendations.patterns.push('Horizontal stripes', 'Bold prints');
      recommendations.fitAdvice.push('Add definition with layering', 'Use belts to create shape');
    }
    
    if (geometricShape.includes('Oval')) {
      recommendations.necklines.push('V-neck', 'Crew neck', 'Button-down');
      recommendations.silhouettes.push('Structured tops', 'Straight-leg pants', 'Fitted jackets');
      recommendations.patterns.push('Dark colors', 'Vertical stripes');
      recommendations.fitAdvice.push('Choose structured pieces', 'Opt for darker colors on top');
    }
    
    if (geometricShape.includes('Triangle')) {
      recommendations.necklines.push('Crew neck', 'V-neck', 'Henley');
      recommendations.silhouettes.push('Structured tops', 'Straight-leg pants', 'Fitted jackets');
      recommendations.patterns.push('Bold patterns on top', 'Solid colors on bottom');
      recommendations.fitAdvice.push('Balance your proportions', 'Emphasize your upper body');
    }
    
    if (geometricShape.includes('Athletic')) {
      recommendations.necklines.push('V-neck', 'Crew neck', 'Henley');
      recommendations.silhouettes.push('Fitted tops', 'Straight-leg pants', 'Structured pieces');
      recommendations.patterns.push('Solid colors', 'Subtle patterns');
      recommendations.fitAdvice.push('Showcase your athletic build', 'Choose fitted, structured pieces');
    }
    
    if (geometricShape.includes('Column')) {
      recommendations.necklines.push('V-neck', 'Crew neck', 'Polo');
      recommendations.silhouettes.push('Layered looks', 'Belted styles', 'Structured pieces');
      recommendations.patterns.push('Bold patterns', 'Horizontal stripes');
      recommendations.fitAdvice.push('Add visual interest with layering', 'Use belts and accessories');
    }
    
    // Height adjustments for males
    if (heightCategory === 'Short') {
      recommendations.fitAdvice.push('Choose high-waisted pants', 'Opt for monochromatic looks');
      recommendations.accessories.push('Smaller watches', 'Fitted accessories');
    }
    
    if (heightCategory === 'Tall') {
      recommendations.fitAdvice.push('You can carry bold patterns', 'Long silhouettes work well');
      recommendations.accessories.push('Statement watches', 'Bold accessories');
    }
  } else {
    // Female styling recommendations (existing logic)
    if (geometricShape.includes('Hourglass')) {
      recommendations.necklines.push('V-neck', 'Sweetheart', 'Scoop neck');
      recommendations.silhouettes.push('Fitted', 'A-line', 'Wrap styles');
      recommendations.patterns.push('Vertical stripes', 'Small prints');
      recommendations.fitAdvice.push('Embrace your curves with fitted styles', 'Define your waist');
    }
    
    if (geometricShape.includes('Apple')) {
      recommendations.necklines.push('V-neck', 'Scoop neck', 'Off-shoulder');
      recommendations.silhouettes.push('A-line', 'Empire waist', 'Structured tops');
      recommendations.patterns.push('Dark colors on top', 'Vertical stripes');
      recommendations.fitAdvice.push('Draw attention to your legs', 'Choose structured tops');
    }
    
    if (geometricShape.includes('Pear')) {
      recommendations.necklines.push('Crew neck', 'Boat neck', 'Square neck');
      recommendations.silhouettes.push('A-line skirts', 'Structured tops', 'Wide-leg pants');
      recommendations.patterns.push('Bold patterns on top', 'Dark colors on bottom');
      recommendations.fitAdvice.push('Balance your proportions', 'Emphasize your upper body');
    }
    
    if (geometricShape.includes('Rectangle')) {
      recommendations.necklines.push('V-neck', 'Cowl neck', 'Asymmetric');
      recommendations.silhouettes.push('Layered looks', 'Belted styles', 'Peplum tops');
      recommendations.patterns.push('Horizontal stripes', 'Bold prints');
      recommendations.fitAdvice.push('Create curves with layering', 'Add definition with belts');
    }
    
    // Height adjustments for females
    if (heightCategory === 'Petite') {
      recommendations.fitAdvice.push('Choose high-waisted styles', 'Opt for monochromatic looks');
      recommendations.accessories.push('Smaller bags', 'Delicate jewelry');
    }
    
    if (heightCategory === 'Tall') {
      recommendations.fitAdvice.push('You can carry bold patterns', 'Long silhouettes work well');
      recommendations.accessories.push('Statement bags', 'Bold jewelry');
    }
  }
  
  return recommendations;
};

export const validateMeasurements = (measurements, gender = 'Male') => {
  const { bust_cm, waist_cm, hip_cm, height_cm, shoulder_cm } = measurements;
  const errors = [];
  
  if (gender === 'Male') {
    // Male measurement validation
    if (!shoulder_cm || shoulder_cm < 40 || shoulder_cm > 60) {
      errors.push('Shoulder measurement should be between 40-60 cm');
    }
    
    if (!waist_cm || waist_cm < 60 || waist_cm > 150) {
      errors.push('Waist measurement should be between 60-150 cm');
    }
    
    if (!hip_cm || hip_cm < 80 || hip_cm > 140) {
      errors.push('Hip measurement should be between 80-140 cm');
    }
    
    if (!height_cm || height_cm < 150 || height_cm > 220) {
      errors.push('Height should be between 150-220 cm');
    }
  } else {
    // Female measurement validation
    if (!bust_cm || bust_cm < 60 || bust_cm > 150) {
      errors.push('Bust measurement should be between 60-150 cm');
    }
    
    if (!waist_cm || waist_cm < 50 || waist_cm > 140) {
      errors.push('Waist measurement should be between 50-140 cm');
    }
    
    if (!hip_cm || hip_cm < 70 || hip_cm > 160) {
      errors.push('Hip measurement should be between 70-160 cm');
    }
    
    if (!height_cm || height_cm < 140 || height_cm > 200) {
      errors.push('Height should be between 140-200 cm');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export default {
  calculateBodyShape,
  getFitPreferences,
  getStylingRecommendations,
  validateMeasurements
}; 