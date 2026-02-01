import { useState } from 'react';
import { ShowcaseScene } from './ShowcaseScene';
import { DesignSelector } from './DesignSelector';
import { categories } from './data';
import type { CeramicCategory, CeramicVariant } from './types';
import './DesignSelector.css';

export function CeramicShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<CeramicCategory>(categories[0]);
  const [selectedVariant, setSelectedVariant] = useState<CeramicVariant>(categories[0].variants[0]);

  const handleSelectCategory = (category: CeramicCategory) => {
    setSelectedCategory(category);
    // Auto-select first variant
    setSelectedVariant(category.variants[0]);
  };

  const handleSelectVariant = (variant: CeramicVariant) => {
    setSelectedVariant(variant);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <ShowcaseScene design={selectedVariant} />
      
      <div style={{ 
          position: 'absolute', 
          bottom: '0', 
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          pointerEvents: 'none' // Allow pass through
      }}>
        <div style={{ pointerEvents: 'auto', width: '100%' }}>
            <DesignSelector 
              categories={categories}
              selectedCategoryId={selectedCategory.id}
              selectedVariantId={selectedVariant.id}
              onSelectCategory={handleSelectCategory}
              onSelectVariant={handleSelectVariant}
            />
        </div>
      </div>
      
      {/* Title / Header Overlay */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        background: 'rgba(255,255,255,0.8)',
        padding: '10px 20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        zIndex: 10
      }}>
        <h1 style={{ margin: 0, fontSize: '1.2rem', color: '#333' }}>Ceramic Floor Studio</h1>
        <p style={{ margin: '5px 0 0', fontSize: '0.9rem', color: '#666' }}>
          {selectedCategory.name} - {selectedVariant.name}
        </p>
      </div>
    </div>
  );
}
