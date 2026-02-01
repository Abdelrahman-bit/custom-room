import type { CeramicCategory, CeramicVariant } from './types';
import './DesignSelector.css';

interface DesignSelectorProps {
  categories: CeramicCategory[];
  selectedCategoryId: string;
  selectedVariantId: string;
  onSelectCategory: (category: CeramicCategory) => void;
  onSelectVariant: (variant: CeramicVariant) => void;
}

export function DesignSelector({ 
  categories, 
  selectedCategoryId, 
  selectedVariantId,
  onSelectCategory,
  onSelectVariant
}: DesignSelectorProps) {

  const activeCategory = categories.find(c => c.id === selectedCategoryId) || categories[0];

  return (
    <div className="design-selector-wrapper">
      {/* Category Tabs */}
      <div className="category-list">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`category-btn ${selectedCategoryId === cat.id ? 'active' : ''}`}
            onClick={() => onSelectCategory(cat)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Variant Grid */}
      <div className="variant-list">
        {activeCategory.variants.map((variant) => (
          <button
            key={variant.id}
            className={`variant-btn ${selectedVariantId === variant.id ? 'active' : ''}`}
            onClick={() => onSelectVariant(variant)}
            title={variant.name}
          >
             {variant.thumbnailUrl ? (
              <img src={variant.thumbnailUrl} alt={variant.name} className="variant-thumbnail" />
            ) : (
              <div 
                className="variant-preview"
                style={{ backgroundColor: variant.color || '#ccc' }}
              />
            )}
            <span className="variant-name">{variant.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
