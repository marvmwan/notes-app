'use strict'

// check local storage for notes
function checkSaved(){
    //Check for existing saved data
    const notesJSON = localStorage.getItem('notes')
    
    try {
        if (notesJSON) {
            notes = JSON.parse(notesJSON)
        } else {
            notes = []
        }
    } catch {
        notes = []
    }
}

// Save notes to local storage
function saveNotes(){
    localStorage.setItem('notes',JSON.stringify(notes))
}

// Removes note from notes array
function removeNote(noteID){
    const x = notes.findIndex((note) => note.id === noteID)

    if (x > -1){
        notes.splice(x,1) 
    }
}

// generate note DOM
function generateNoteDom(note){
    const noteBox = document.createElement('div')

    const deleteButton = document.createElement('button')
    deleteButton.textContent = 'x'
    noteBox.appendChild(deleteButton)
    deleteButton.addEventListener('click', function(){
        removeNote(note.id)
        saveNotes()
        renderNotes(notes, filters)
    })

    let noteEl = document.createElement('a')
    if (note.title.length > 0) {
         noteEl.textContent = note.title
         
    } else {
        noteEl.textContent = 'Unnamed Note'
    }

    noteEl.setAttribute('href',`/edit.html#${note.id}`)
    noteBox.appendChild(noteEl)
    
    return noteBox
}

// Filter notes array from input in text box
function filterNotes(notes){
    return notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))
}

// Clear div where notes are generated
function clearNotes(){
    document.querySelector('#notes').innerHTML = ''
}

// Sorts notes by one of the three ways
function sortNotes(notes, sortType){
    if (sortType === "alphabetical"){
        notes.sort(function (note1,note2){
            if (note1.title.toLowerCase() < note2.title.toLowerCase()){
                return -1
            } else if(note2.title.toLowerCase() < note1.title.toLowerCase()) {
                return 1
            } else {
                return 0
            }
            })
    } else if (sortType === 'byCreated'){
        notes.sort((note1, note2) => (note2.createdAt - note1.createdAt))
    } else if (sortType === "byEdited") {
        notes.sort((note1, note2) => (note2.updatedAt - note1.updatedAt))
    }
    return notes
}
// Render Notes in div
function renderNotes(notes, filters){
    notes = sortNotes(notes, filters.sortBy)
    const filtered = filterNotes(notes)
    clearNotes()
    filtered.forEach(note => {
        const x = generateNoteDom(note)
        document.querySelector('div').appendChild(x)
    });
}

// Timestamps the current date
function currentTimestamp(){
    const timestamp = moment().valueOf()
    return timestamp
}

// Generate last update message 
function updateMessage(timestamp){
    return `Last edited ${moment(timestamp).fromNow()}`
}