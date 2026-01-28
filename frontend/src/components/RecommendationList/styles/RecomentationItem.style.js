export const getRelevanceStyles = (relevanceColor) => {
  const styles = {
    blue: {
      bg: 'bg-gradient-to-br from-blue-50 to-blue-100',
      border: 'border-blue-200',
      title: 'text-blue-900',
      badge: 'bg-blue-600 text-white',
      category: 'text-blue-700'
    },
    indigo: {
      bg: 'bg-gradient-to-br from-indigo-50 to-indigo-100', 
      border: 'border-indigo-200',
      title: 'text-indigo-900',
      badge: 'bg-indigo-500 text-white',
      category: 'text-indigo-700'
    },
    slate: {
      bg: 'bg-gradient-to-br from-slate-50 to-gray-100',
      border: 'border-slate-200', 
      title: 'text-slate-800',
      badge: 'bg-slate-500 text-white',
      category: 'text-slate-600'
    }
  };
  return styles[relevanceColor] || styles.slate;
};