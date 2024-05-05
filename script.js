document.addEventListener("DOMContentLoaded", function() {
    
    var textArea = document.getElementById("text-area");
    var saveButton = document.getElementById("save-btn");
    var savedNotesContainer = document.getElementById("saved-notes");
    var modal = document.getElementById("myModal");
    var confirmDeleteBtn = document.getElementById("confirm-delete");
    var cancelDeleteBtn = document.getElementById("cancel-delete");
    var noteToDelete; // Variable para almacenar la nota que se va a borrar

    // Cargar contenido guardado al cargar la página
    if(localStorage.getItem("notes")) {
        var savedNotes = JSON.parse(localStorage.getItem("notes"));
        savedNotes.forEach(function(noteContent) {
            addNoteElement(noteContent);
        });
    }

    // Función para agregar una nueva nota al contenedor
    function addNoteElement(noteContent) {
        var noteElement = document.createElement("div");
        noteElement.textContent = noteContent;
        noteElement.classList.add("note-entry"); // Agregar la clase para aplicar el estilo
        
        // Botón para borrar la nota
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "X";
        deleteButton.classList.add("delete-btn");
        deleteButton.addEventListener("click", function() {
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
        var noteContent = textArea.value;
        addNoteElement(noteContent);
        
        // Guardar contenido en el localStorage
        var savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
        savedNotes.push(noteContent);
        localStorage.setItem("notes", JSON.stringify(savedNotes));
        
        textArea.value = ""; // Vaciar el área de texto después de guardar
    });

    // Cuando se confirme el borrado en el modal
    confirmDeleteBtn.addEventListener("click", function() {
        savedNotesContainer.removeChild(noteToDelete);
        var savedNotes = JSON.parse(localStorage.getItem("notes"));
        var index = savedNotes.indexOf(noteToDelete.textContent);
        savedNotes.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(savedNotes));
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