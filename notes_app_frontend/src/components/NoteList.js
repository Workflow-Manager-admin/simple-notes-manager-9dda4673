import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography, Paper } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

const NoteList = ({ notes, onEditNote, onDeleteNote }) => {
  if (!notes.length) {
    return (
      <Paper sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="body1" color="textSecondary">
          No notes found. Create your first note!
        </Typography>
      </Paper>
    );
  }

  return (
    <List>
      {notes.map((note) => (
        <ListItem
          key={note.id}
          component={Paper}
          sx={{
            mb: 1,
            '&:hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.04)',
            },
          }}
        >
          <ListItemText
            primary={note.title}
            secondary={
              <>
                <Typography
                  component="span"
                  variant="body2"
                  color="textSecondary"
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {note.content}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Last updated: {new Date(note.updatedAt).toLocaleDateString()}
                </Typography>
              </>
            }
          />
          <ListItemSecondaryAction>
            <IconButton edge="end" onClick={() => onEditNote(note)} color="primary" sx={{ mr: 1 }}>
              <EditIcon />
            </IconButton>
            <IconButton edge="end" onClick={() => onDeleteNote(note.id)} color="error">
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default NoteList;
