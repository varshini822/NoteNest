const container = document.getElementById("note-container");
const addBtn = document.getElementById("add-note");

function saveNotes() {
  const notes = [];
  document.querySelectorAll(".note textarea").forEach(note => {
    notes.push(note.value);
  });
  localStorage.setItem("notes", JSON.stringify(notes));
}

function createNote(text = "") {
  const note = document.createElement("div");
  note.classList.add("note");

  const textarea = document.createElement("textarea");
  textarea.value = text;

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "×";

  deleteBtn.addEventListener("click", () => {
    note.remove();
    saveNotes();
  });

  textarea.addEventListener("input", saveNotes);

  note.appendChild(deleteBtn);
  note.appendChild(textarea);
  container.appendChild(note);
}

addBtn.addEventListener("click", () => {
  createNote();
  saveNotes();
});

(function loadNotes() {
  const savedNotes = JSON.parse(localStorage.getItem("notes") || "[]");
  savedNotes.forEach(noteText => createNote(noteText));
})();
