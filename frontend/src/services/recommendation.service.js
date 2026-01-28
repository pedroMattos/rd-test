export const RELEVANCE_LEVELS = Object.freeze({
  LOW: 'Baixa',
  MEDIUM: 'Média',
  HIGH: 'Alta',
});

const getProductsWithScoreByMatch = (products, selectedPreferences, selectedFeatures) => {
  return products.map(product => {
    let score = 0;

    selectedPreferences.forEach(preference => {
      if (product.preferences.includes(preference)) {
        score += 1;
      }
    });

    selectedFeatures.forEach(feature => {
      if (product.features.includes(feature)) {
        score += 1;
      }
    });

    const { relevanceLevel, relevanceColor } = getRelevanceByScore(score);

    return {
      ...product,
      score,
      relevanceLevel,
      relevanceColor,
    };
  });
}

const getProductsByScore = (products, score) => {
  return products.filter(product => product.score >= score);
}

const getRelevanceByScore = (score) => {
  let relevanceLevel = RELEVANCE_LEVELS.LOW;
  let relevanceColor = 'gray';

    
  if (score >= 4) {
    relevanceLevel = RELEVANCE_LEVELS.HIGH;
    relevanceColor = 'blue';
    return { relevanceLevel, relevanceColor };
  } else if (score >= 2) {
    relevanceLevel = RELEVANCE_LEVELS.MEDIUM;
    relevanceColor = 'indigo';
    return { relevanceLevel, relevanceColor };
  }

  return { relevanceLevel, relevanceColor };
}

const getRecommendations = (
  formData = { selectedPreferences: [], selectedFeatures: [] },
  products
) => {
  if (!products || products.length === 0) {
    return [];
  }

  const { selectedPreferences = [], selectedFeatures = [], selectedRecommendationType } = formData;

  const productsWithScore = getProductsWithScoreByMatch(products, selectedPreferences, selectedFeatures);

  const matchedProducts = getProductsByScore(productsWithScore, 1);

  if (matchedProducts.length === 0) {
    return [];
  }

  const sortedProducts = matchedProducts.sort((a, b) => a.score - b.score);

  if (selectedRecommendationType === 'SingleProduct') {
    const sortedScoreList = sortedProducts.map(product => product.score);
    const maxScore = Math.max(...sortedScoreList);
    const productsWithMaxScore = sortedProducts.filter(product => product.score === maxScore);
    return [productsWithMaxScore.at(-1)];
  }

  return sortedProducts.sort((a, b) => b.score - a.score);
};

export { getProductsWithScoreByMatch, getProductsByScore, getRelevanceByScore };

const recommendationService = { getRecommendations };
export default recommendationService;
