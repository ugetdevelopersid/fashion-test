import React from 'react';
import './GeneratedOutfits.css';

const GeneratedOutfits = ({ outfits, isLoading, error, onRegenerate, userProfile }) => {
  if (isLoading) {
    return (
      <div className="outfits-loading">
        <div className="loading-spinner"></div>
        <p>Stylla is crafting your perfect outfits...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="outfits-error">
        <h3>Oops! Something went wrong</h3>
        <p>{error}</p>
        <button className="retry-button" onClick={onRegenerate}>
          Try Again
        </button>
      </div>
    );
  }

  if (!outfits) {
    return null;
  }

  // Parse the outfits text into structured data
  const parseOutfits = (outfitsText) => {
    console.log('Raw outfits text:', outfitsText);
    
    // Handle case where outfitsText is not a string (e.g., when it includes generatedImage)
    let textToParse = outfitsText;
    if (typeof outfitsText === 'object' && outfitsText !== null) {
      // If it's an object with generatedImage, extract the text content
      if (outfitsText.generatedImage) {
        // Find the text content by excluding the generatedImage property
        const { generatedImage, ...textContent } = outfitsText;
        // Convert the remaining properties to string or use a default
        textToParse = typeof textContent === 'string' ? textContent : JSON.stringify(textContent);
      } else {
        // If it's an object but no generatedImage, try to convert to string
        textToParse = typeof outfitsText === 'string' ? outfitsText : JSON.stringify(outfitsText);
      }
    } else if (typeof outfitsText !== 'string') {
      console.error('outfitsText is not a string:', typeof outfitsText, outfitsText);
      return [];
    }
    
    // Handle JSON object with character codes (like {"0":"\ud83d","1":"\udc54"...})
    if (textToParse.startsWith('{') && textToParse.includes('":"')) {
      try {
        const parsedObj = JSON.parse(textToParse);
        // Convert character codes back to string
        textToParse = Object.values(parsedObj).join('');
        console.log('Converted character codes to string:', textToParse);
      } catch (error) {
        console.error('Failed to parse character codes:', error);
        return [];
      }
    }
    
    // Split by outfit markers - handle both formats
    let outfitBlocks = textToParse.split('👗 Outfit #').filter(block => block.trim());
    
    // If no 👗 markers found, try splitting by ** markers
    if (outfitBlocks.length <= 1) {
      outfitBlocks = textToParse.split('**').filter(block => block.trim());
    }
    
    console.log('Outfit blocks found:', outfitBlocks.length);
    
    return outfitBlocks.map((block, index) => {
      const lines = block.split('\n').filter(line => line.trim());
      console.log(`Parsing block ${index + 1}:`, lines);
      
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

      console.log('Parsed outfit:', outfit);
      return outfit;
    });
  };

  const parsedOutfits = parseOutfits(outfits);

  return (
    <div className="generated-outfits">
      <div className="outfits-header">
        <h2>Your Personalized Outfits</h2>
        <p>Crafted by Stylla, your AI fashion consultant</p>
      </div>
      
      {/* Generated Image Display - Show first if available */}
      {outfits && outfits.generatedImage && outfits.generatedImage.imageUrl && (
        <div className="generated-image-container">
          <h3>🎨 Your Generated Outfit Image</h3>
          <div className="image-wrapper">
            <img 
              src={outfits.generatedImage.imageUrl} 
              alt="Generated outfit visualization" 
              className="generated-outfit-image"
            />
          </div>
          <div className="image-actions">
            <button 
              className="download-image-button"
              onClick={() => {
                const link = document.createElement('a');
                link.href = outfits.generatedImage.imageUrl;
                link.download = 'generated-outfit.png';
                link.click();
              }}
            >
              Download Image
            </button>
            <button 
              className="regenerate-image-button"
              onClick={onRegenerate}
            >
              Generate New Outfits & Image
            </button>
          </div>
        </div>
      )}
      
      {/* Outfits with Explanations */}
      <div className="single-outfit-card">
        {parsedOutfits.map((outfit, index) => (
          <div key={outfit.id} className="outfit-section">
            <div className="outfit-header">
              <h3>{outfit.title}</h3>
              <span className="outfit-number">#{outfit.id}</span>
            </div>
            
            <div className="outfit-items">
              {outfit.items.top && (
                <div className="outfit-item">
                  <span className="item-label">Top:</span>
                  <span className="item-description">{outfit.items.top}</span>
                </div>
              )}
              
              {outfit.items.bottom && (
                <div className="outfit-item">
                  <span className="item-label">Bottom:</span>
                  <span className="item-description">{outfit.items.bottom}</span>
                </div>
              )}
              
              {outfit.items.layer && (
                <div className="outfit-item">
                  <span className="item-label">Layer:</span>
                  <span className="item-description">{outfit.items.layer}</span>
                </div>
              )}
              
              {outfit.items.footwear && (
                <div className="outfit-item">
                  <span className="item-label">Footwear:</span>
                  <span className="item-description">{outfit.items.footwear}</span>
                </div>
              )}
              
              {outfit.items.accessories && (
                <div className="outfit-item">
                  <span className="item-label">Accessories:</span>
                  <span className="item-description">{outfit.items.accessories}</span>
                </div>
              )}
            </div>
            
            {outfit.reasoning.length > 0 && (
              <div className="outfit-reasoning">
                <h4>Why This Works:</h4>
                <ul>
                  {outfit.reasoning.map((reason, index) => (
                    <li key={index}>{reason}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {index < parsedOutfits.length - 1 && <hr className="outfit-divider" />}
          </div>
        ))}
      </div>
      
      <div className="outfits-actions">
        <button className="regenerate-button" onClick={onRegenerate}>
          Generate New Outfits
        </button>
      </div>
      
      {/* Image Generation Loading */}
      {outfits && !outfits.generatedImage && (
        <div className="image-generation-loading">
          <div className="loading-spinner"></div>
          <p>Generating your outfit image...</p>
          <p className="loading-note">This may take 30-60 seconds</p>
        </div>
      )}

      {/* Image Generation Error */}
      {outfits && outfits.generatedImage && outfits.generatedImage.error && (
        <div className="image-generation-error">
          <h3>❌ Image Generation Failed</h3>
          <p>{outfits.generatedImage.error}</p>
          <button 
            className="retry-button"
            onClick={onRegenerate}
          >
            Generate New Outfits & Image
          </button>
        </div>
      )}


    </div>
  );
};

export default GeneratedOutfits; 