document.addEventListener("DOMContentLoaded", function() {
    
    let textArea = document.getElementById("text-area");
    let saveButton = document.getElementById("save-btn");
    let savedNotesContainer = document.getElementById("saved-notes");
    let modal = document.getElementById("myModal");
    let confirmDeleteBtn = document.getElementById("confirm-delete");
    let cancelDeleteBtn = document.getElementById("cancel-delete");
    let notes = []; // Array para almacenar las notas
    let noteToDeleteIndex; // Índice de la nota que se va a borrar

    // Cargar contenido guardado al cargar la página
    if(localStorage.getItem("notes")) {
        notes = JSON.parse(localStorage.getItem("notes"));
        notes.forEach(function(noteContent) {
            addNoteElement(noteContent);
        });
    }

    // Función para agregar una nueva nota al contenedor
    function addNoteElement(noteContent) {
        let noteElement = document.createElement("div");
        noteElement.textContent = noteContent;
        noteElement.classList.add("note-entry"); // Agregar la clase para aplicar el estilo
        
        // Botón para borrar la nota
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "X";
        deleteButton.classList.add("delete-btn");
        deleteButton.addEventListener("click", function() {
            noteToDeleteIndex = notes.indexOf(noteContent);
            noteToDelete = noteElement;
            modal.style.display = "block"; // Mostrar el modal al hacer clic en el botón de borrar
        });

        // Mostrar el contenido completo de la nota al hacer clic en ella
        noteElement.addEventListener("click", function() {
            noteElement.classList.toggle("expand");
        });
        
        // Añadir el botón de borrar a la nota
        noteElement.insertBefore(deleteButton, noteElement.firstChild);
        
        // Añadir la nota al contenedor
        savedNotesContainer.appendChild(noteElement);
    }

    // Guardar contenido en el localStorage al hacer clic en el botón de guardar
    saveButton.addEventListener("click", function() {
        let noteContent = textArea.value;
        addNoteElement(noteContent);
        
        // Agregar la nueva nota al array
        notes.push(noteContent);
        
        // Guardar el array actualizado en el localStorage
        localStorage.setItem("notes", JSON.stringify(notes));
        
        textArea.value = ""; // Vaciar el área de texto después de guardar
    });

    // Cuando se confirme el borrado en el modal
    confirmDeleteBtn.addEventListener("click", function() {
        savedNotesContainer.removeChild(noteToDelete);
        notes.splice(noteToDeleteIndex, 1);
        localStorage.setItem("notes", JSON.stringify(notes));
        modal.style.display = "none"; // Ocultar el modal
    });

    // Cuando se cancele el borrado en el modal
    cancelDeleteBtn.addEventListener("click", function() {
        modal.style.display = "none"; // Ocultar el modal
    });

    // Cuando se haga clic en cualquier lugar fuera del modal, cerrar el modal
    window.addEventListener("click", function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
});