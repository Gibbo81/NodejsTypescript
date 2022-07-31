const fs = require('fs')
const fileName = 'noteRepo.json'

function arrayPosition(title, notes){
    var result =[]
    for (i=0; i<notes.length; i++){
        if (notes[i].title===title){
            result.push(i)
        }
    }
    return result
}

const save = function(title, body){
    var notes = loadAll()
    if (arrayPosition(title, notes).length>0){
        return
    }    
    notes.push({
        title : title,
        body : body
    })
    saveNote(notes)
}

const remove = function(title){
    var notes = loadAll()
    var position =arrayPosition(title, notes)
    position.forEach(element => {
        notes.splice(element, 1);
    });
    saveNote(notes)  
}

const saveNote = function(notes){
    fs.writeFileSync(fileName, JSON.stringify(notes))
}

const loadAll = () => {
    try{
        const dataBuffer = fs.readFileSync(fileName)
        const string = dataBuffer.toString()
        return JSON.parse(string)
    }
    catch(e){
        console.log('error reading file ' + fileName)
        return [];
    }
}

const readSingleNote = (title) =>{
    var notes = loadAll()
    var note = notes.find( (x) => x.title === title)    
    if (note){
        console.log("title: "+ note.title+ " -- body: "+ note.body)
    } else {
        console.log("note: "+ title+ " not found!!!!")
    }    
}

module.exports = {
    saveNote : save,
    removeNote : remove,
    readAllNote : loadAll,
    readNote : readSingleNote
}