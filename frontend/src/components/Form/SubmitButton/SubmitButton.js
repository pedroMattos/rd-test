
function SubmitButton({ text, disabled }) {
  return <button type="submit" className={`bg-blue-500 text-white font-bold py-2 px-4 rounded ${disabled ? 'cursor-not-allowed bg-blue-200' : 'hover:bg-blue-700 bg-blue-500'}`} disabled={disabled}>{text}</button>;
}

export default SubmitButton;
