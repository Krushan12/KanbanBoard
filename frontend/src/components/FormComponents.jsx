import React from 'react';

export const FormInput = ({ 
  type = 'text', 
  name, 
  value, 
  onChange, 
  placeholder, 
  className = '',
  label,
  ...rest 
}) => {
  const baseClasses = "border p-2 rounded mt-2 w-full";
  
  return (
    <div>
      {label && (
        <label 
          className="block text-sm font-medium text-gray-700 mt-2"
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${baseClasses} ${className}`}
        {...rest}
      />
    </div>
  );
};

export const FormTextarea = ({ 
  name, 
  value, 
  onChange, 
  placeholder, 
  className = '', 
  rows = 2,
  ...rest 
}) => {
  const baseClasses = "border p-2 rounded mt-2 w-full";
  
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={`${baseClasses} ${className}`}
      {...rest}
    />
  );
};

export const FormSelect = ({ 
  name, 
  value, 
  onChange, 
  options, 
  className = '', 
  label,
  ...rest 
}) => {
  const baseClasses = "border p-2 rounded mt-2 w-full";
  
  return (
    <div>
      {label && (
        <label 
          className="block text-sm font-medium text-gray-700 mt-2"
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`${baseClasses} ${className}`}
        {...rest}
      >
        {options.map((option, index) => (
          <option 
            key={index} 
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};