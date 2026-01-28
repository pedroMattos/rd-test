import RecommendationListEmptyState from './components/RecomendationListEmptyState';
import RecomendationItem from './components/RecomendationItem';

const RecommendationList = ({ recommendations }) => {

  if (recommendations.length === 0) {
    return <RecommendationListEmptyState data-testid="empty-state" />;
  }

  return (
    <div className="space-y-6" data-testid="recommendations-list">
      {recommendations.map((recommendation) => (
        <RecomendationItem 
          key={recommendation.id}
          recommendation={recommendation}
          data-testid={`recommendation-item-${recommendation.id}`}
        />
      ))}
    </div>
  );
}

export default RecommendationList;
