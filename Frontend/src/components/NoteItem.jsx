import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

const colors = [
  'bg-red-100 border-red-300',
  'bg-blue-100 border-blue-300',
  'bg-green-100 border-green-300',
  'bg-yellow-100 border-yellow-300',
  'bg-purple-100 border-purple-300',
  'bg-pink-100 border-pink-300',
];

const NoteItem = ({ note}) => {
  const colorClass = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div
      className={`p-5 rounded-xl shadow-md border ${colorClass} hover:shadow-lg transition-all duration-200 relative`}
    >
      {/* Action Buttons */}
      <div className="absolute top-3 right-3 flex gap-2 bg-white/70 backdrop-blur-sm rounded-lg px-2 py-1 shadow-sm">
        <button
          className="text-blue-600 hover:text-blue-800 transition-colors"
          title="Edit"
        >
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button
          
          className="text-red-600 hover:text-red-800 transition-colors"
          title="Delete"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>

      {/* Card Content */}
      <h2
        className="text-lg font-bold text-gray-800 mb-2 truncate"
        title={note.title}
      >
        {note.title}
      </h2>

      <p className="text-sm text-gray-700 mb-3 line-clamp-3 overflow-hidden">
        {note.description}
      </p>

      {/* Tag */}
      <span className="inline-block text-xs font-semibold text-white bg-blue-600 px-2 py-1 rounded-md">
        {note.tag}
      </span>
    </div>
  );
};

export default NoteItem;
