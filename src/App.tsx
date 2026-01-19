import { useEffect, useState } from "react";
import "./App.css";
import { NoteForm } from "./NoteForm";
import { SavedNotes } from "./SavedNotes";
import type { Note } from "./types";

const STORAGE_KEY = "mini-workflow-notes";

function App() {
  const [notes, setNotes] = useState<Note[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    try {
      return JSON.parse(stored) as Note[];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = (values: { title: string; text: string }) => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: values.title,
      text: values.text,
      status: "pending",
    };

    setNotes((prev) => [newNote, ...prev]);
  };

  const handleToggleStatus = (id: string) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? {
              ...note,
              status: note.status === "pending" ? "approved" : "pending",
            }
          : note,
      ),
    );
  };

  const handleDeleteNote = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  return (
    <main>
      <NoteForm onSubmit={handleAddNote} />
      <SavedNotes
        notes={notes}
        onToggleStatus={handleToggleStatus}
        onDelete={handleDeleteNote}
      />
    </main>
  );
}

export default App;
