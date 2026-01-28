import { useMemo } from 'react';
import { Preferences, Features, RecommendationType } from './Fields';
import { SubmitButton } from './SubmitButton';
import useProducts from '../../hooks/useProducts';
import useForm from '../../hooks/useForm';
import useRecommendations from '../../hooks/useRecommendations';

function Form({ onRecommendationsChange }) {
  const { preferences, features, products } = useProducts();
  const { formData, handleChange } = useForm({
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: '',
  });

  const { getRecommendations } = useRecommendations(products);

  const isValidForm = useMemo(() => {
    return formData.selectedRecommendationType && (formData.selectedPreferences.length > 0 || formData.selectedFeatures.length > 0);
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataRecommendations = getRecommendations(formData);
    
    onRecommendationsChange(dataRecommendations || []);
  };

  return (
    <form
      className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg border border-rd-gray-200"
      onSubmit={handleSubmit}
    >
      <Preferences
        preferences={preferences}
        onPreferenceChange={(selected) =>
          handleChange('selectedPreferences', selected)
        }
      />
      <Features
        features={features}
        onFeatureChange={(selected) =>
          handleChange('selectedFeatures', selected)
        }
      />
      <RecommendationType
        onRecommendationTypeChange={(selected) =>
          handleChange('selectedRecommendationType', selected)
        }
      />
      <SubmitButton disabled={!isValidForm} text="Obter recomendação" />
    </form>
  );
}

export default Form;
