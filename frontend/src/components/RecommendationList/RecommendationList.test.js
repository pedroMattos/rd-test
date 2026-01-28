import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecommendationList from './RecommendationList';

jest.mock('./components/RecomendationListEmptyState', () => {
  return function MockEmptyState(props) {
    return <div {...props}>Nenhuma recomendação encontrada.</div>;
  };
});

jest.mock('./components/RecomendationItem', () => {
  return function MockRecomendationItem({ recommendation, ...props }) {
    return (
      <div {...props}>
        <span>{recommendation.name}</span>
        <span>{recommendation.category}</span>
      </div>
    );
  };
});

describe('Testa o componente RecommendationList', () => {
  const mockRecommendations = [
    {
      id: 1,
      name: 'RD Station Marketing',
      category: 'Marketing',
      score: 3,
      relevanceLevel: 'Média',
      relevanceColor: 'indigo'
    },
    {
      id: 2,
      name: 'RD Station CRM',
      category: 'CRM',
      score: 4,
      relevanceLevel: 'Alta',
      relevanceColor: 'blue'
    }
  ];

  test('deve renderizar estado vazio quando não há recomendações', () => {
    render(<RecommendationList recommendations={[]} />);
    
    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
    expect(screen.getByText('Nenhuma recomendação encontrada.')).toBeInTheDocument();
  });

  test('deve renderizar lista de recomendações quando há recomendações', () => {
    render(<RecommendationList recommendations={mockRecommendations} />);
    
    expect(screen.getByTestId('recommendations-list')).toBeInTheDocument();
    expect(screen.queryByTestId('empty-state')).not.toBeInTheDocument();
  });

  test('deve renderizar cada recomendação com data-testid correto', () => {
    render(<RecommendationList recommendations={mockRecommendations} />);
    
    expect(screen.getByTestId('recommendation-item-1')).toBeInTheDocument();
    expect(screen.getByTestId('recommendation-item-2')).toBeInTheDocument();
  });

  test('deve passar as propriedades corretas para RecomendationItem', () => {
    render(<RecommendationList recommendations={mockRecommendations} />);
    
    expect(screen.getByText('RD Station Marketing')).toBeInTheDocument();
    expect(screen.getByText('Marketing')).toBeInTheDocument();
    expect(screen.getByText('RD Station CRM')).toBeInTheDocument();
    expect(screen.getByText('CRM')).toBeInTheDocument();
  });

  test('deve renderizar número correto de itens', () => {
    render(<RecommendationList recommendations={mockRecommendations} />);
    
    const items = screen.getAllByTestId(/recommendation-item-/);
    expect(items).toHaveLength(2);
  });

  test('deve lidar com array vazio sem erros', () => {
    expect(() => {
      render(<RecommendationList recommendations={[]} />);
    }).not.toThrow();
  });
});
