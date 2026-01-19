import { useState } from "react";
import type { FormEvent } from "react";

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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
        />
      </div>

      <div>
        <label htmlFor="text">Text</label>
        <textarea
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your note"
          rows={4}
        />
      </div>

      <button type="submit" disabled={isDisabled}>
        Add note
      </button>
    </form>
  );
}
