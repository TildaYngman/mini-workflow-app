import { useState } from "react";
import type { Note } from "./types";
import styles from "./SavedNotes.module.css";
import { TITLE_MAX, TEXT_MAX, validateText, validateTitle } from "./validation";

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

  const [touchedTitle, setTouchedTitle] = useState(false);
  const [touchedText, setTouchedText] = useState(false);

  if (notes.length === 0) {
    return <p>No notes yet — add one above.</p>;
  }

  const startEdit = (note: Note) => {
    setEditingId(note.id);
    setDraftTitle(note.title);
    setDraftText(note.text);
    setTouchedTitle(false);
    setTouchedText(false);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setDraftTitle("");
    setDraftText("");
    setTouchedTitle(false);
    setTouchedText(false);
  };

  const trimmedDraftTitle = draftTitle.trim();
  const trimmedDraftText = draftText.trim();

  const draftTitleError = validateTitle(trimmedDraftTitle);
  const draftTextError = validateText(trimmedDraftText);

  const canSave = Boolean(editingId) && !draftTitleError && !draftTextError;

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
                    <div className={styles.labelRow}>
                      <label htmlFor={`edit-title-${note.id}`}>Title</label>
                      <span className={styles.counter}>
                        {trimmedDraftTitle.length}/{TITLE_MAX}
                      </span>
                    </div>

                    <input
                      id={`edit-title-${note.id}`}
                      type="text"
                      className={styles.input}
                      value={draftTitle}
                      onChange={(e) => {
                        setDraftTitle(e.target.value);
                        setTouchedTitle(true);
                      }}
                      aria-invalid={touchedTitle && Boolean(draftTitleError)}
                    />

                    {touchedTitle && draftTitleError ? (
                      <p className={styles.error}>{draftTitleError}</p>
                    ) : null}
                  </div>

                  <div className={styles.field}>
                    <div className={styles.labelRow}>
                      <label htmlFor={`edit-text-${note.id}`}>Text</label>
                      <span className={styles.counter}>
                        {trimmedDraftText.length}/{TEXT_MAX}
                      </span>
                    </div>

                    <textarea
                      id={`edit-text-${note.id}`}
                      rows={4}
                      className={styles.textarea}
                      value={draftText}
                      onChange={(e) => {
                        setDraftText(e.target.value);
                        setTouchedText(true);
                      }}
                      aria-invalid={touchedText && Boolean(draftTextError)}
                    />

                    {touchedText && draftTextError ? (
                      <p className={styles.error}>{draftTextError}</p>
                    ) : null}
                  </div>

                  <div className={styles.actions}>
                    <button
                      type="button"
                      className={`${styles.button} ${styles.primary}`}
                      disabled={!canSave}
                      onClick={() => {
                        if (!canSave) return;

                        onUpdate(note.id, {
                          title: trimmedDraftTitle,
                          text: trimmedDraftText,
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
