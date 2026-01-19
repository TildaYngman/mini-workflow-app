import type { Note } from "./types";

type SavedNotesProps = {
  notes: Note[];
};

export function SavedNotes({ notes }: SavedNotesProps) {
  if (notes.length === 0) {
    return <p>No notes yet — add one above.</p>;
  }

  return (
    <section>
      <h2>Notes</h2>

      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {notes.map((note) => (
          <li
            key={note.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: 12,
              marginBottom: 12,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <strong>{note.title}</strong>
              <span>{note.status}</span>
            </div>

            <p style={{ margin: 0 }}>{note.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
