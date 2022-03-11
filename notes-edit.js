'use strict'

const titleElement = document.querySelector('#note-title')
const updateElement = document.querySelector('#last-edit')
const bodyElement = document.querySelector('#note-body')
const deleteButton = document.querySelector('#delete-btn')
const noteID = location.hash.substring(1)
let notes = []

checkSaved()


let note = notes.find((note) => note.id === noteID)

if (!note){
    location.assign("/index.html")
} 

titleElement.value = note.title
bodyElement.value = note.body
updateElement.textContent = updateMessage(note.updatedAt)

titleElement.addEventListener('input', function (e){
    note.title = e.target.value
    note.updatedAt = currentTimestamp()
    updateElement.textContent = updateMessage(note.updatedAt)
    saveNotes()
})

bodyElement.addEventListener('input', function (e){
    note.body = e.target.value
    note.updatedAt = currentTimestamp()
    updateElement.textContent = updateMessage(note.updatedAt)
    saveNotes()
})

deleteButton.addEventListener('click', function (){
    const noteIndex = notes.findIndex((note) => note.id === noteID)
    notes.splice(noteIndex, 1)
    saveNotes()
    location.assign('/index.html')
})

window.addEventListener('storage', function (e){
    if (e.key === 'notes'){
        notes = JSON.parse(e.newValue)
        note = notes.find((note) => note.id === noteID)

        if (!note){
            location.assign('/index.html')
        }
        
        e.target.document.querySelector('#note-title').value = note.title
        e.target.document.querySelector('#note-body').value = note.body
        e.target.document.querySelector('#last-edit').textContent = updateMessage(note.updatedAt)
    }
    
})

