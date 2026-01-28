import React, { useState } from 'react';
import Form from './components/Form/Form';
import RecommendationList from './components/RecommendationList/RecommendationList';

function App() {
  const [recommendations, setRecommendations ] = useState([])

  const handleRecommendationsChange = (newRecommendations) => {
    setRecommendations(newRecommendations);
  };

  return (
    <div className="bg-rd-gray-50 min-h-screen flex flex-col justify-center items-center py-8">
      <h1 className="text-4xl font-bold mb-12 text-rd-blue-700">Recomendador de Produtos RD Station</h1>
      <div className="bg-white p-8 rounded-xl shadow-lg border border-rd-gray-200 w-full md:w-3/4 lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="col-span-2 mb-6">
          <p className="text-lg text-rd-gray-700 leading-relaxed">
            Bem-vindo ao Recomendador de Produtos RD Station. Aqui você pode encontrar uma variedade de produtos da RD Station, cada um projetado para atender às necessidades específicas do seu negócio. De CRM a Marketing, de Conversas a Inteligência Artificial, temos uma solução para ajudar você a alcançar seus objetivos. Use o formulário abaixo para selecionar suas preferências e funcionalidades desejadas e receba recomendações personalizadas de produtos que melhor atendam às suas necessidades.
          </p>
        </div>
        <div>
          <Form onRecommendationsChange={handleRecommendationsChange} />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-6 text-rd-gray-800">Lista de Recomendações:</h2>
          <RecommendationList recommendations={recommendations} />
        </div>
      </div>
    </div>
  );
}

export default App;
