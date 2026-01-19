import { useState } from "react";
import type { Note } from "./types";

type SavedNotesProps = {
  notes: Note[];
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, values: { title: string; text: string }) => void;
};

export function SavedNotes({
  notes,
  onToggleStatus,
  onDelete,
  onUpdate,
}: SavedNotesProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftTitle, setDraftTitle] = useState("");
  const [draftText, setDraftText] = useState("");

  if (notes.length === 0) {
    return <p>No notes yet — add one above.</p>;
  }

  const startEdit = (note: Note) => {
    setEditingId(note.id);
    setDraftTitle(note.title);
    setDraftText(note.text);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setDraftTitle("");
    setDraftText("");
  };

  const canSave = draftTitle.trim() !== "" && draftText.trim() !== "";

  return (
    <section>
      <h2>Notes</h2>

      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {notes.map((note) => {
          const isEditing = editingId === note.id;

          return (
            <li
              key={note.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: 8,
                padding: 12,
                marginBottom: 12,
              }}
            >
              {isEditing ? (
                <>
                  <div style={{ display: "grid", gap: 8 }}>
                    <div>
                      <label htmlFor={`edit-title-${note.id}`}>Title</label>
                      <input
                        id={`edit-title-${note.id}`}
                        type="text"
                        value={draftTitle}
                        onChange={(e) => setDraftTitle(e.target.value)}
                      />
                    </div>

                    <div>
                      <label htmlFor={`edit-text-${note.id}`}>Text</label>
                      <textarea
                        id={`edit-text-${note.id}`}
                        rows={4}
                        value={draftText}
                        onChange={(e) => setDraftText(e.target.value)}
                      />
                    </div>

                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        type="button"
                        disabled={!canSave}
                        onClick={() => {
                          onUpdate(note.id, {
                            title: draftTitle.trim(),
                            text: draftText.trim(),
                          });
                          cancelEdit();
                        }}
                      >
                        Save
                      </button>

                      <button type="button" onClick={cancelEdit}>
                        Cancel
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
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

                  <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                    <button
                      type="button"
                      onClick={() => onToggleStatus(note.id)}
                    >
                      {note.status === "pending"
                        ? "Mark as approved"
                        : "Mark as pending"}
                    </button>

                    <button type="button" onClick={() => startEdit(note)}>
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const ok = window.confirm("Delete this note?");
                        if (ok) onDelete(note.id);
                      }}
                    >
                      X
                    </button>
                  </div>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
