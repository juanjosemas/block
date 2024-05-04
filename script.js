document.addEventListener("DOMContentLoaded", function() {
    
    var textArea = document.getElementById("text-area");
    var saveButton = document.getElementById("save-btn");
    var savedNotesContainer = document.getElementById("saved-notes");

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
            savedNotesContainer.removeChild(noteElement);
            var savedNotes = JSON.parse(localStorage.getItem("notes"));
            var index = savedNotes.indexOf(noteContent);
            savedNotes.splice(index, 1);
            localStorage.setItem("notes", JSON.stringify(savedNotes));
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
});
