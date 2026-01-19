import { useState } from "react";
import type { FormEvent } from "react";
import styles from "./NoteForm.module.css";

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit({
      title: title.trim(),
      text: text.trim(),
    });

    setTitle("");
    setText("");
  };

  const isDisabled = title.trim() === "" || text.trim() === "";

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          className={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="text">Text</label>
        <textarea
          id="text"
          className={styles.textarea}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your note"
          rows={4}
        />
      </div>

      <button className={styles.button} type="submit" disabled={isDisabled}>
        Add note
      </button>
    </form>
  );
}
