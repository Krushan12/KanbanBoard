import React from 'react';

export default function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  onSubmit, 
  submitLabel = 'Submit', 
  cancelLabel = 'Cancel' 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        
        {children}
        
        <div className="flex space-x-2 mt-4">
          <button 
            onClick={onSubmit}
            className="flex-1 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            {submitLabel}
          </button>
          <button 
            onClick={onClose}
            className="flex-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>
  );
}