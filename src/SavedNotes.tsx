import { useState } from "react";
import type { Note } from "./types";
import styles from "./SavedNotes.module.css";

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
    <section className={styles.section}>
      <h2 className={styles.heading}>Notes</h2>

      <ul className={styles.list}>
        {notes.map((note) => {
          const isEditing = editingId === note.id;

          return (
            <li key={note.id} className={styles.note}>
              {isEditing ? (
                <div className={styles.editGrid}>
                  <div className={styles.field}>
                    <label htmlFor={`edit-title-${note.id}`}>Title</label>
                    <input
                      id={`edit-title-${note.id}`}
                      type="text"
                      className={styles.input}
                      value={draftTitle}
                      onChange={(e) => setDraftTitle(e.target.value)}
                    />
                  </div>

                  <div className={styles.field}>
                    <label htmlFor={`edit-text-${note.id}`}>Text</label>
                    <textarea
                      id={`edit-text-${note.id}`}
                      rows={4}
                      className={styles.textarea}
                      value={draftText}
                      onChange={(e) => setDraftText(e.target.value)}
                    />
                  </div>

                  <div className={styles.actions}>
                    <button
                      type="button"
                      className={`${styles.button} ${styles.primary}`}
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

                    <button
                      type="button"
                      className={`${styles.button} ${styles.secondary}`}
                      onClick={cancelEdit}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className={styles.header}>
                    <strong className={styles.title}>{note.title}</strong>

                    <div className={styles.headerActions}>
                      <span
                        className={`${styles.status} ${
                          note.status === "pending"
                            ? styles.statusPending
                            : styles.statusApproved
                        }`}
                      >
                        {note.status}
                      </span>

                      <button
                        type="button"
                        className={styles.delete}
                        aria-label="Delete note"
                        onClick={() => {
                          const ok = window.confirm("Delete this note?");
                          if (ok) onDelete(note.id);
                        }}
                      >
                        ×
                      </button>
                    </div>
                  </div>

                  <p className={styles.text}>{note.text}</p>

                  <div className={styles.actions}>
                    <button
                      type="button"
                      className={`${styles.button} ${styles.primary}`}
                      onClick={() => onToggleStatus(note.id)}
                    >
                      {note.status === "pending"
                        ? "Mark as approved"
                        : "Mark as pending"}
                    </button>

                    <button
                      type="button"
                      className={`${styles.button} ${styles.secondary}`}
                      onClick={() => startEdit(note)}
                    >
                      Edit
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
