import { useState } from "react";
import "./App.css";
import { NoteForm } from "./NoteForm";
import { SavedNotes } from "./SavedNotes";
import type { Note } from "./types";

function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  const handleAddNote = (values: { title: string; text: string }) => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: values.title,
      text: values.text,
      status: "pending",
    };

    setNotes((prev) => [newNote, ...prev]);
  };

  return (
    <main>
      <NoteForm onSubmit={handleAddNote} />

      <SavedNotes notes={notes} />
    </main>
  );
}

export default App;
