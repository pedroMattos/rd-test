import RecommendationListEmptyState from './components/RecomendationListEmptyState';
import RecomendationItem from './components/RecomendationItem';

const RecommendationList = ({ recommendations }) => {

  if (recommendations.length === 0) {
    return <RecommendationListEmptyState />;
  }

  return (
    <div className="space-y-6">
      {recommendations.map((recommendation) => (
        <RecomendationItem 
          key={recommendation.id}
          recommendation={recommendation}
        />
      ))}
    </div>
  );
}

export default RecommendationList;
