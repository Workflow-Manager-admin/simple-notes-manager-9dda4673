// In-memory storage for notes (in a real app, this would be replaced with API calls)
let notes = [];
let nextId = 1;

export const getAllNotes = () => notes;

export const addNote = (title, content) => {
  const newNote = {
    id: nextId++,
    title,
    content,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  notes = [newNote, ...notes];
  return newNote;
};

export const updateNote = (id, title, content) => {
  notes = notes.map(note => 
    note.id === id 
      ? { ...note, title, content, updatedAt: new Date().toISOString() }
      : note
  );
  return notes.find(note => note.id === id);
};

export const deleteNote = (id) => {
  notes = notes.filter(note => note.id !== id);
};

export const searchNotes = (query) => {
  const searchTerm = query.toLowerCase();
  return notes.filter(note => 
    note.title.toLowerCase().includes(searchTerm) ||
    note.content.toLowerCase().includes(searchTerm)
  );
};
