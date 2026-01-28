import recommendationService, {
  RELEVANCE_LEVELS,
  getProductsWithScoreByMatch,
  getProductsByScore,
  getRelevanceByScore
} from './recommendation.service';
import mockProducts from '../mocks/mockProducts';


describe('Testa o service recommendationService', () => {
  describe('Testa o método getRelevanceByScore', () => {
    test('deve retornar relevância BAIXA para score 1', () => {
      const result = getRelevanceByScore(1);
      expect(result.relevanceLevel).toBe(RELEVANCE_LEVELS.LOW);
      expect(result.relevanceColor).toBe('gray');
    });

    test('deve retornar relevância MÉDIA para score 2', () => {
      const result = getRelevanceByScore(2);
      expect(result.relevanceLevel).toBe(RELEVANCE_LEVELS.MEDIUM);
      expect(result.relevanceColor).toBe('indigo');
    });

    test('deve retornar relevância MÉDIA para score 3', () => {
      const result = getRelevanceByScore(3);
      expect(result.relevanceLevel).toBe(RELEVANCE_LEVELS.MEDIUM);
      expect(result.relevanceColor).toBe('indigo');
    });

    test('deve retornar relevância ALTA para score 4', () => {
      const result = getRelevanceByScore(4);
      expect(result.relevanceLevel).toBe(RELEVANCE_LEVELS.HIGH);
      expect(result.relevanceColor).toBe('blue');
    });
  });

  describe('Testa o método getProductsWithScoreByMatch', () => {
    test('deve calcular score corretamente com preferências e features', () => {
      const selectedPreferences = ['Automação de marketing', 'Integração fácil com ferramentas de e-mail'];
      const selectedFeatures = ['Rastreamento de comportamento do usuário'];
      
      const result = getProductsWithScoreByMatch(
        mockProducts,
        selectedPreferences,
        selectedFeatures
      );

      expect(result[0]).toMatchObject({
        name: 'RD Station CRM',
        score: 1,
        relevanceLevel: RELEVANCE_LEVELS.LOW
      });

      expect(result[1]).toMatchObject({
        name: 'RD Station Marketing',
        score: 2,
        relevanceLevel: RELEVANCE_LEVELS.MEDIUM
      });

      expect(result[2]).toMatchObject({
        name: 'RD Conversas',
        score: 0,
        relevanceLevel: RELEVANCE_LEVELS.LOW
      });
    });

    test('deve retornar score 0 quando não há matches', () => {
      const result = getProductsWithScoreByMatch(
        mockProducts,
        ['inexistentPreference'],
        ['inexistentFeature']
      );

      result.forEach(product => {
        expect(product.score).toBe(0);
      });
    });

    test('deve lidar com arrays vazios', () => {
      const result = getProductsWithScoreByMatch(mockProducts, [], []);
      
      result.forEach(product => {
        expect(product.score).toBe(0);
      });
    });
  });

  describe('testa o método getProductsByScore', () => {
    const productsWithScore = [
      { name: 'Produto A', score: 0 },
      { name: 'Produto B', score: 1 },
      { name: 'Produto C', score: 2 },
      { name: 'Produto D', score: 3 }
    ];

    test('deve filtrar produtos com score >= 1', () => {
      const result = getProductsByScore(productsWithScore, 1);
      expect(result).toHaveLength(3);
      expect(result.map(p => p.name)).toEqual(['Produto B', 'Produto C', 'Produto D']);
    });

    test('deve filtrar produtos com score >= 2', () => {
      const result = getProductsByScore(productsWithScore, 2);
      expect(result).toHaveLength(2);
      expect(result.map(p => p.name)).toEqual(['Produto C', 'Produto D']);
    });

    test('deve retornar array vazio quando nenhum produto atende critério', () => {
      const result = getProductsByScore(productsWithScore, 10);
      expect(result).toHaveLength(0);
    });
  });

  describe('getRecommendations com mockProducts', () => {
    test('deve retornar recomendação correta para SingleProduct', () => {
      const formData = {
        selectedPreferences: ['Integração com chatbots'],
        selectedFeatures: ['Chat ao vivo e mensagens automatizadas'],
        selectedRecommendationType: 'SingleProduct',
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        mockProducts
      );

      expect(recommendations).toHaveLength(1);
      expect(recommendations[0].name).toBe('RD Conversas');
    });

    test('deve retornar recomendações corretas para MultipleProducts', () => {
      const formData = {
        selectedPreferences: [
          'Integração fácil com ferramentas de e-mail',
          'Personalização de funis de vendas',
          'Automação de marketing',
        ],
        selectedFeatures: [
          'Rastreamento de interações com clientes',
          'Rastreamento de comportamento do usuário',
        ],
        selectedRecommendationType: 'MultipleProducts',
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        mockProducts
      );

      expect(recommendations).toHaveLength(2);
      expect(recommendations.map((product) => product.name)).toEqual([
        'RD Station CRM',
        'RD Station Marketing',
      ]);
    });

  test('deve retornar apenas um produto para SingleProduct com mais de um produto de match', () => {
    const formData = {
      selectedPreferences: [
        'Integração fácil com ferramentas de e-mail',
        'Automação de marketing',
      ],
      selectedFeatures: [
        'Rastreamento de interações com clientes',
        'Rastreamento de comportamento do usuário',
      ],
      selectedRecommendationType: 'SingleProduct',
    };
    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );
    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Station Marketing');
  });

    test('deve retornar último produto em caso de empate para SingleProduct', () => {
      const formData = {
        selectedPreferences: ['Automação de marketing', 'Integração com chatbots'],
        selectedRecommendationType: 'SingleProduct',
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        mockProducts
      );

      expect(recommendations).toHaveLength(1);
      expect(recommendations[0].name).toBe('RD Conversas');
    });
  });

  describe('getRecommendations - Casos Edge', () => {
    test('deve retornar array vazio para produtos null', () => {
      const formData = {
        selectedPreferences: ['preference1'],
        selectedRecommendationType: 'MultipleProducts'
      };

      const result = recommendationService.getRecommendations(formData, null);
      expect(result).toEqual([]);
    });

    test('deve retornar array vazio para produtos undefined', () => {
      const formData = {
        selectedPreferences: ['pref1'],
        selectedRecommendationType: 'MultipleProducts'
      };

      const result = recommendationService.getRecommendations(formData, undefined);
      expect(result).toEqual([]);
    });

    test('deve retornar array vazio para array de produtos vazio', () => {
      const formData = {
        selectedPreferences: ['pref1'],
        selectedRecommendationType: 'MultipleProducts'
      };

      const result = recommendationService.getRecommendations(formData, []);
      expect(result).toEqual([]);
    });

    test('deve retornar array vazio quando não há produtos com match', () => {
      const formData = {
        selectedPreferences: ['inexistente'],
        selectedFeatures: ['inexistente'],
        selectedRecommendationType: 'MultipleProducts'
      };

      const result = recommendationService.getRecommendations(formData, mockProducts);
      expect(result).toEqual([]);
    });
  });

  describe('getRecommendations - Validação de Scores e Relevância', () => {
    test('deve adicionar propriedades score, relevanceLevel e relevanceColor', () => {
      const formData = {
        selectedPreferences: ['preference1'],
        selectedFeatures: ['feature1'],
        selectedRecommendationType: 'MultipleProducts'
      };

      const result = recommendationService.getRecommendations(formData, mockProducts);
      
      result.forEach(product => {
        expect(product).toHaveProperty('score');
        expect(product).toHaveProperty('relevanceLevel');
        expect(product).toHaveProperty('relevanceColor');
        expect(typeof product.score).toBe('number');
        expect(typeof product.relevanceLevel).toBe('string');
        expect(typeof product.relevanceColor).toBe('string');
      });
    });

    test('deve calcular scores corretos baseado em matches', () => {
      const formData = {
        selectedPreferences: ['Automação de marketing', 'Integração fácil com ferramentas de e-mail'],
        selectedFeatures: ['Rastreamento de comportamento do usuário'],
        selectedRecommendationType: 'MultipleProducts'
      };

      const result = recommendationService.getRecommendations(formData, mockProducts);
      
      const rdMarketing = result.find(p => p.name === 'RD Station Marketing');
      const rdCRM = result.find(p => p.name === 'RD Station CRM');
      
      expect(rdMarketing.score).toBe(2);
      expect(rdCRM.score).toBe(1);
    });
  });
});
