import { useState } from "react";
import type { FormEvent } from "react";
import styles from "./NoteForm.module.css";
import { TITLE_MAX, TEXT_MAX, validateText, validateTitle } from "./validation";

type NoteFormValues = {
  title: string;
  text: string;
};

type NoteFormProps = {
  onSubmit: (values: NoteFormValues) => void;
};

export function NoteForm({ onSubmit }: NoteFormProps) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const [touchedTitle, setTouchedTitle] = useState(false);
  const [touchedText, setTouchedText] = useState(false);

  const trimmedTitle = title.trim();
  const trimmedText = text.trim();

  const titleError = validateTitle(trimmedTitle);
  const textError = validateText(trimmedText);

  const isDisabled = Boolean(titleError || textError);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isDisabled) return;

    onSubmit({
      title: trimmedTitle,
      text: trimmedText,
    });

    setTitle("");
    setText("");
    setTouchedTitle(false);
    setTouchedText(false);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.field}>
        <div className={styles.labelRow}>
          <label htmlFor="title">Title</label>
          <span className={styles.counter}>
            {trimmedTitle.length}/{TITLE_MAX}
          </span>
        </div>

        <input
          id="title"
          type="text"
          className={styles.input}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setTouchedTitle(true);
          }}
          placeholder="Enter title"
          aria-invalid={touchedTitle && Boolean(titleError)}
        />

        {touchedTitle && titleError ? (
          <p className={styles.error}>{titleError}</p>
        ) : null}
      </div>

      <div className={styles.field}>
        <div className={styles.labelRow}>
          <label htmlFor="text">Text</label>
          <span className={styles.counter}>
            {trimmedText.length}/{TEXT_MAX}
          </span>
        </div>

        <textarea
          id="text"
          className={styles.textarea}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setTouchedText(true);
          }}
          placeholder="Write your note"
          rows={4}
          aria-invalid={touchedText && Boolean(textError)}
        />

        {touchedText && textError ? (
          <p className={styles.error}>{textError}</p>
        ) : null}
      </div>

      <button className={styles.button} type="submit" disabled={isDisabled}>
        Add note
      </button>
    </form>
  );
}
