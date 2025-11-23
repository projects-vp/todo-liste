      document.addEventListener("DOMContentLoaded", () => {
        let todos = JSON.parse(localStorage.getItem("aufgaben")) || [];
        const td_liste = document.getElementById("todo-list");
        const input = document.getElementById("aufgabe");
        const btn = document.getElementById("btn-add");
        const btnDelete = document.getElementById("liste-entf");

        // ToDo Liste vorbereiten
        function renderTodoList() {
          td_liste.innerHTML = "";
          todos.forEach((eintrag, index) => {
            const li = document.createElement("li");
            const text = document.createElement("p");
            text.textContent = eintrag;
            td_liste.append(li);
            li.append(text);

            const eintragWeg = document.createElement("button");
            eintragWeg.textContent = "✓";
            li.appendChild(eintragWeg);

            // Entfernen Button Klick
            eintragWeg.addEventListener("click", () => {
              //Eintrag aus Array entfernen
              todos.splice(index, 1);

              //Array aktualisieren
              localStorage.setItem("aufgaben", JSON.stringify(todos));

              // Liste neu rendern -> Indizes stimmen wieder
              renderTodoList();
            });
          });
        }
        //Todo Liste rendern
        renderTodoList();

        //"Liste löschen" Link anzeigen
        if (todos.length > 0) {
          btnDelete.classList.remove("hide");
        }
        //Neue Aufgabe hinzufügen
        function addTask() {
          const aufgabeText = input.value.trim();

          if (aufgabeText !== "") {
            todos.push(aufgabeText);
            localStorage.setItem("aufgaben", JSON.stringify(todos));

            input.value = "";
            btnDelete.classList.remove("hide");
          }
          renderTodoList();
        }

        //neue Aufgabe bei Klick ergänzen
        btn.addEventListener("click", addTask);
        // neue Aufgabe mit Entertaste ergänzen
        input.addEventListener("keydown", (x) => {
          if (x.key === "Enter") {
            addTask();
          }
        });

        //ganze Liste entfernen
        btnDelete.addEventListener("click", () => {
          todos = [];
          localStorage.removeItem("aufgaben");
          td_liste.innerHTML = "";
          btnDelete.classList.add("hide");
        });
      });