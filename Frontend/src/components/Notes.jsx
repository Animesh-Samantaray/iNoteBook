import React, { useContext } from 'react';
import NoteContext from '../contexts/notes/NoteContext';
import NoteItem from './NoteItem';

const Notes = () => {
  const { note } = useContext(NoteContext);

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 p-4">
      {note.map((n) => (
        <NoteItem key={n._id} note={n} />
      ))}
    </div>
  );
};

export default Notes;
