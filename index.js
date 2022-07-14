const notesContainer = document.querySelector(".notes-container")
const textarea = document.getElementById("textarea");

const createBtn = document.querySelector(".create-btn").addEventListener("click", createNote);

const objetosLocalStorage = JSON.parse(localStorage.getItem("objetos"))

const objetos = JSON.parse(localStorage.getItem("objetos")) || [];

function createNote(e) {
    e.preventDefault();
    let date = new Date();
    
    const options = {
        weekday: "long",
        day:"numeric",
        month:"long",
        year:"numeric"
    }

    let timeofyear = date.toLocaleString("es-AR", options)

    const objeto = {
        id: objetos.length > 0 ? objetos[objetos.length - 1].id - 1 : 1 ,
        note: textarea.value,
        time: timeofyear
    }

    objetos.push(objeto)
    localStorage.setItem("objetos", JSON.stringify(objetos))
    

    document.querySelector(".form").reset();

    showObjetos()
}

function showObjetos() {
    notesContainer.innerHTML = ""
    for(let i = 0; i < objetos.length; i++) {
        notesContainer.innerHTML += `            
        <div class="note">
            <div class="flex">
                <h3>${objetos[i].time}</h3>
                <span class="delete" onclick="deleteObjeto(${objetos[i].id})">X</span>
            </div>
            <p>${objetos[i].note}</p>
        </div>
        `
    }
}

function deleteObjeto (id) {
    for(let i = 0; i < objetos.length; i++) {
        if(objetos[i].id == id) {
            objetos.splice(i, 1)
        }
    }

    localStorage.setItem("objetos", JSON.stringify(objetos));
    showObjetos()
}

showObjetos()