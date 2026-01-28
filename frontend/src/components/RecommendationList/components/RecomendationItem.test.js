import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecomendationItem from './RecomendationItem';
import { getRelevanceStyles } from '../styles/RecomentationItem.style';

jest.mock('../styles/RecomentationItem.style', () => ({
  getRelevanceStyles: jest.fn()
}));

// Mock dos componentes filhos
jest.mock('../../shared/Tooltip', () => {
  return function MockTooltip({ children, content }) {
    return (
      <div title={content}>
        {children}
      </div>
    );
  };
});

jest.mock('./RecomendationDetails', () => {
  return function MockRecomendationDetails({ title, details, ...props }) {
    return (
      <div {...props}>
        <h4>{title}</h4>
        <ul>
          {details.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    );
  };
});

jest.mock('../styles/RecomentationItem.style', () => ({
  getRelevanceStyles: jest.fn()
}));

// Configurar mock padrão
beforeEach(() => {
  getRelevanceStyles.mockReturnValue({
    bg: 'bg-blue-50',
    border: 'border-blue-200', 
    title: 'text-blue-900',
    category: 'text-blue-700',
    badge: 'bg-blue-100 text-blue-800'
  });
});

describe('Testa o componente RecomendationItem', () => {
  const mockRecommendation = {
    id: 1,
    name: 'RD Station Marketing',
    category: 'Marketing',
    score: 4,
    relevanceLevel: 'Alta',
    relevanceColor: 'blue',
    preferences: ['Automação de marketing', 'Integração fácil com ferramentas de e-mail'],
    features: ['Rastreamento de comportamento do usuário', 'Relatórios de vendas personalizáveis']
  };

  test('deve renderizar nome da recomendação', () => {
    render(<RecomendationItem recommendation={mockRecommendation} />);
    
    const nameElement = screen.getByTestId('recommendation-name');
    expect(nameElement).toBeInTheDocument();
    expect(nameElement).toHaveTextContent('RD Station Marketing');
  });

  test('deve renderizar categoria da recomendação', () => {
    render(<RecomendationItem recommendation={mockRecommendation} />);
    
    const categoryElement = screen.getByTestId('recommendation-category');
    expect(categoryElement).toBeInTheDocument();
    expect(categoryElement).toHaveTextContent('Marketing');
  });

  test('deve renderizar badge de relevância', () => {
    render(<RecomendationItem recommendation={mockRecommendation} />);
    
    const badgeElement = screen.getByTestId('relevance-badge');
    expect(badgeElement).toBeInTheDocument();
    expect(badgeElement).toHaveTextContent('Alta Relevância');
  });

  test('deve renderizar seção de detalhes', () => {
    render(<RecomendationItem recommendation={mockRecommendation} />);
    expect(screen.getByTestId('recommendation-details')).toBeInTheDocument();
  });

  test('deve renderizar seções de preferências e funcionalidades', () => {
    render(<RecomendationItem recommendation={mockRecommendation} />);
    
    expect(screen.getByTestId('preferences-section')).toBeInTheDocument();
    expect(screen.getByTestId('features-section')).toBeInTheDocument();
    
    expect(screen.getByText('Preferências Atendidas')).toBeInTheDocument();
    expect(screen.getByText('Funcionalidades Disponíveis')).toBeInTheDocument();
  });

  test('deve passar preferências corretas para RecomendationDetails', () => {
    render(<RecomendationItem recommendation={mockRecommendation} />);
    
    expect(screen.getByText('Automação de marketing')).toBeInTheDocument();
    expect(screen.getByText('Integração fácil com ferramentas de e-mail')).toBeInTheDocument();
  });

  test('deve passar features corretas para RecomendationDetails', () => {
    render(<RecomendationItem recommendation={mockRecommendation} />);
    
    expect(screen.getByText('Rastreamento de comportamento do usuário')).toBeInTheDocument();
    expect(screen.getByText('Relatórios de vendas personalizáveis')).toBeInTheDocument();
  });

  test('deve chamar getRelevanceStyles com a cor correta', () => {
    render(<RecomendationItem recommendation={mockRecommendation} />);
    
    expect(getRelevanceStyles).toHaveBeenCalledWith('blue');
  });

  test('deve aplicar estilos retornados pelo getRelevanceStyles', () => {
    getRelevanceStyles.mockReturnValue({
      bg: 'bg-red-50',
      border: 'border-red-200',
      title: 'text-red-900', 
      category: 'text-red-700',
      badge: 'bg-red-100 text-red-800'
    });

    render(<RecomendationItem recommendation={mockRecommendation} />);
    
    const mainContainer = screen.getByTestId('recommendation-item-container');
    expect(mainContainer).toHaveClass('bg-red-50', 'border-red-200');
  });

  test('deve testar diferentes cores de relevância', () => {
    const grayRecommendation = {
      ...mockRecommendation,
      relevanceColor: 'gray'
    };

    render(<RecomendationItem recommendation={grayRecommendation} />);
    
    expect(getRelevanceStyles).toHaveBeenCalledWith('gray');
  });


  test('deve renderizar tooltip com conteúdo correto', () => {
    render(<RecomendationItem recommendation={mockRecommendation} />);
    
    const tooltipContainer = screen.getByTitle('A relevância é baseada na quantidade de preferências e funcionalidades atendidas');
    expect(tooltipContainer).toBeInTheDocument();
  });

  test('deve lidar com diferentes níveis de relevância', () => {
    const lowRelevanceRecommendation = {
      ...mockRecommendation,
      relevanceLevel: 'Baixa',
      relevanceColor: 'gray'
    };

    render(<RecomendationItem recommendation={lowRelevanceRecommendation} />);
    
    const badgeElement = screen.getByTestId('relevance-badge');
    expect(badgeElement).toHaveTextContent('Baixa Relevância');
  });
});
