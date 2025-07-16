import React, { useState } from 'react';
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  TextField,
  Box,
  Fab,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import NoteList from './components/NoteList';
import NoteEditor from './components/NoteEditor';
import { getAllNotes, addNote, updateNote, deleteNote, searchNotes } from './utils/notesUtils';
import './App.css';

function App() {
  const [notes, setNotes] = useState(getAllNotes());
  const [searchQuery, setSearchQuery] = useState('');
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    setNotes(query ? searchNotes(query) : getAllNotes());
  };

  const handleAddNote = () => {
    setEditingNote(null);
    setEditorOpen(true);
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setEditorOpen(true);
  };

  const handleSaveNote = (title, content) => {
    if (editingNote) {
      updateNote(editingNote.id, title, content);
    } else {
      addNote(title, content);
    }
    setNotes(getAllNotes());
  };

  const handleDeleteNote = (noteId) => {
    deleteNote(noteId);
    setNotes(getAllNotes());
  };

  return (
    <div className="App">
      <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Notes App
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={handleSearch}
            sx={{ backgroundColor: 'white' }}
          />
        </Box>

        <NoteList
          notes={notes}
          onEditNote={handleEditNote}
          onDeleteNote={handleDeleteNote}
        />

        <Fab
          color="primary"
          aria-label="add"
          onClick={handleAddNote}
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            backgroundColor: '#ff7043',
            '&:hover': {
              backgroundColor: '#f4511e',
            },
          }}
        >
          <AddIcon />
        </Fab>

        <NoteEditor
          open={editorOpen}
          onClose={() => setEditorOpen(false)}
          onSave={handleSaveNote}
          initialNote={editingNote}
        />
      </Container>
    </div>
  );
}

export default App;
