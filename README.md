# Mini Workflow App

A small React + TypeScript app that lets a user collect short notes and review them.

The goal of this task was to focus on clarity, good UX, and clean code rather than visual polish, using React + TypeScript with no backend.

## Features

- Create notes with title and text
- Edit and delete notes
- Mark notes as pending or approved
- Validation feedback when notes are too short or too long
  - Actions are disabled when input is invalid
  - Errors are shown only after the user starts typing
- Notes are saved automatically using localStorage
- Clear empty state when no notes exist

## Getting started

### Prerequisites

- Node.js (LTS recommended)
- npm

### Install and run

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually http://localhost:5173).

```bash
Build
npm run build
```

## Design notes

Application state is owned by App.tsx and passed down via props.

Components are kept small and focused:

NoteForm handles note creation and validation feedback.

SavedNotes renders and manages existing notes.

TypeScript is used throughout with strict typing and no any.

Validation logic is shared and reused between create and edit flows.

Styling is scoped to components using CSS Modules, with minimal global base styles.

Notes are persisted using localStorage to survive page reloads.

Timebox

The task was timeboxed to 90 minutes.
I went approximately 20 minutes over the timebox to finalize documentation (README) and AI usage notes.
