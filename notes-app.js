'use strict'

let notes = []


const filters = {
    searchText:'',
    sortBy:'byEdited'
}



checkSaved()
renderNotes(notes, filters)




document.querySelector('#create-note').addEventListener('click', function (e) {
    const noteID = uuidv4()
    const timestamp = currentTimestamp()

    notes.push({
        id: noteID,
        title:'',
        body:'',
        createdAt: timestamp,
        updatedAt: timestamp,
    })
    saveNotes()
    location.assign(`/edit.html#${noteID}`)
})


document.querySelector('#search-text').addEventListener('input', function(e) {
    filters.searchText = e.target.value
    renderNotes(notes, filters)
})

document.querySelector('#filter-by').addEventListener('change', function (e){
   filters.sortBy = e.target.value
   renderNotes(notes,filters)
})

// Allows for data sync across different open tabs
window.addEventListener('storage', function (e){
    if (e.key === 'notes'){
        notes = JSON.parse(e.newValue)
        renderNotes(notes, filters)
    }
})


// const now = moment()
// console.log(now.toString())

// console.log(now.toString())

// console.log(now.minute())
// console.log(now.minutes())

// const birthday = moment().year(1999).month(9).date(28)
// console.log(birthday.format('MMM D, YYYY'))


// DOM - Document Object Model
// -----------------------------
// Document object that models the HTML file that is displayed in the browser

// // Query and remove
// // ---------------------
// const p = document.querySelector('p')
// p.remove()

// // Query all and remove (creates an array with all the contents of each paragraph tag in the HTML doc )
// // --------------------------------------------------
// const ps = document.querySelectorAll('p')
// ps.forEach( paragraph => {
//     // assigns text content of paragraphs the string '******'
//     paragraph.textContent = '********'
   
//     // prints text content of paragraphs into console
//     console.log(paragraph.textContent)
    
//     // removes the paragraphs in the html doc
//     paragraph.remove()
// });

// // Add a new element
// // -------------------------------------
// // 1. creating a new element
// const newParagraph = document.createElement('p')
// // 2. filling the new element with some data
// newParagraph.textContent = 'Quotes to remember'
// // 3. placing the new element somewhere
// document.querySelector('body').appendChild(newParagraph)




