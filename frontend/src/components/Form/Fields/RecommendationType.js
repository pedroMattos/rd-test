import React from 'react';
import Checkbox from '../../shared/Checkbox';

function RecommendationType({ onRecommendationTypeChange }) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-3 text-rd-gray-800">Tipo de Recomendação:</h2>
      <div className="flex items-center gap-6">
        <Checkbox
          type="radio"
          name="recommendationType"
          value="SingleProduct"
          onChange={() => onRecommendationTypeChange('SingleProduct')}
          className="mr-2"
        />
        <label htmlFor="SingleProduct" className="text-rd-gray-700 font-medium">Produto Único</label>
        <Checkbox
          type="radio"
          name="recommendationType"
          value="MultipleProducts"
          onChange={() => onRecommendationTypeChange('MultipleProducts')}
          className="mr-2"
        />
        <label htmlFor="MultipleProducts" className="text-rd-gray-700 font-medium">Múltiplos Produtos</label>
      </div>
    </div>
  );
}

export default RecommendationType;
