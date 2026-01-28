import React from 'react';

function Checkbox({ children, ...props }) {
  return (
    <label className="flex items-center cursor-pointer hover:text-rd-gray-800 transition-colors">
      <input 
        type="checkbox" 
        className="form-checkbox h-5 w-5 text-rd-blue-500 border-rd-gray-300 rounded focus:ring-rd-blue-500 focus:border-rd-blue-500" 
        {...props} 
      />
      <span className="ml-3 text-rd-gray-700 select-none">{children}</span>
    </label>
  );
}

export default Checkbox;
