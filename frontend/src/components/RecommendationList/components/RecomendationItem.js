import Tooltip from "../../shared/Tooltip";
import { getRelevanceStyles } from "../styles/RecomentationItem.style";
import RecomendationDetails from "./RecomendationDetails";

const RecomendationItem = ({ recommendation }) => {
  if (!recommendation) {
    return null;
  }

  const styles = getRelevanceStyles(recommendation.relevanceColor);

  return (
    <div 
      className={`border-2 rounded-xl p-6 ${styles.bg} ${styles.border}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className={`font-bold text-xl leading-tight ${styles.title}`}>
            {recommendation.name}
          </h3>
          <p className={`text-sm font-medium mt-1 ${styles.category}`}>
            {recommendation.category}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2 ml-4">
          <Tooltip content="A relevância é baseada na quantidade de preferências e funcionalidades atendidas">              
            <span className={`px-3 py-1.5 rounded-full text-xs font-bold tracking-wide pointer-events-none ${styles.badge}`}>
              {recommendation.relevanceLevel} Relevância
            </span>
          </Tooltip>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <RecomendationDetails
          details={recommendation.preferences}
          title="Preferências Atendidas"
        />
        <RecomendationDetails
          details={recommendation.features}
          title="Funcionalidades Disponíveis"
        />
      </div>
    </div>
  )
}

export default RecomendationItem
