"use client";
import React from 'react';

interface ActionButtonProps {
  onEdit: () => void;
  onDelete: () => void;
  onView: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ onEdit, onDelete, onView }) => {
  return (
    <div className="flex space-x-2">
      <button
        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={onEdit}
      >
        Edit
      </button>
      <button
        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700"
        onClick={onDelete}
      >
        Delete
      </button>
      <button
        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-700"
        onClick={onView}
      >
        View
      </button>
    </div>
  );
};

export default ActionButton;
