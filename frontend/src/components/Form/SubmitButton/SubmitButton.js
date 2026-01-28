
function SubmitButton({ text, disabled }) {
  return (
    <button 
      type="submit" 
      className={`w-full font-semibold py-3 px-6 rounded-lg transition-all duration-200 ${
        disabled 
          ? 'cursor-not-allowed bg-rd-gray-200 text-rd-gray-500' 
          : 'bg-rd-blue-500 hover:bg-rd-blue-600 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
      }`} 
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default SubmitButton;
