import { useState } from 'react';
import { Preferences, Features, RecommendationType } from './Fields';
import { SubmitButton } from './SubmitButton';
import useProducts from '../../hooks/useProducts';
import useForm from '../../hooks/useForm';
import useRecommendations from '../../hooks/useRecommendations';

function Form({ onRecommendationsChange }) {
  const { preferences, features, products } = useProducts();
  const [error, setError] = useState(null);
  const { formData, handleChange } = useForm({
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: '',
  });

  const { getRecommendations } = useRecommendations(products);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    
    if (!formData.selectedRecommendationType) {
      setError('Por favor, selecione o tipo de recomendação.');
      return;
    }

    if (formData.selectedPreferences.length === 0 && formData.selectedFeatures.length === 0) {
      setError('Por favor, selecione pelo menos uma preferência ou funcionalidade.');
      return;
    }

    const dataRecommendations = getRecommendations(formData);
    
    onRecommendationsChange(dataRecommendations || []);
  };

  return (
    <form
      className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md"
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
      {error && <p className="mb-2 text-red-500">{error}</p>}
      <SubmitButton text="Obter recomendação" />
    </form>
  );
}

export default Form;
