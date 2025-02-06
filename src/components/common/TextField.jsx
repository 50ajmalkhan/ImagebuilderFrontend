import React from 'react';

const TextField = ({ 
  label, 
  id, 
  name, 
  type = 'text', 
  required = false, 
  value, 
  onChange, 
  placeholder,
  error
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        className="appearance-none rounded-md relative block w-full px-3 py-2 bg-[#1a1f2e] border border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm [&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_rgb(26,31,46)] [&:-webkit-autofill]:text-white [&:-webkit-autofill]:-webkit-text-fill-color-white [&:-internal-autofill-selected]:text-white [&:-internal-autofill-selected]:bg-[#1a1f2e] [&:-webkit-autofill]:!text-white [&:-webkit-autofill]:!bg-[#1a1f2e]"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          colorScheme: 'dark'
        }}
      />
      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
};

export default TextField; 