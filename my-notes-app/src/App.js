import TextField from '@material-ui/core/TextField'
import './App.css'
import {React, useState} from 'react'
import Button from '@material-ui/core/Button'
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(2),
      width: theme.spacing(23),
      height: theme.spacing(20),
    },
  },
}));


function App() {
  const classes = useStyles()
  const [noteText, setNoteText] = useState('')
  const [notes, setNotes] = useState([
    {
      content: "Test content for notes",
      title: "Test Title for test content for notes",
      id: 1
    },
    {
      content: "Note 2 content",
      title: "Note 2 title",
      id: 2
    }
  ]) 

  const updateNoteText = (evt) => {
    setNoteText(evt.target.value)
    console.log(noteText)
  }

  const submitNote = (evt) => {
    evt.preventDefault();
    const newNote = {
      content: noteText
    }
    setNotes(notes.concat(newNote))
    setNoteText('')
  }


  return (
    <div class='notesEntry'>
    <form onSubmit={submitNote}>
    New Note: <TextField
      multiline
      rows="5"
      id="enterNotes"
      value={noteText}
      onChange={updateNoteText} />
    <Button
        variant="contained"
        color="default"
        size="large"
        startIcon={<NoteAddIcon />}
        type='submit'
      >
        Add Note
      </Button>

    </form>
    <div className={classes.root}>
      {notes.map((note) =>{
        return (
          <Paper id={note.id} elevation={10} class='noteDisplay' variant="outlined"  >{note.content}</Paper>      
        )
      })}
      </div>
    </div>
      
    
  );
}

export default App;
