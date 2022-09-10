//command to execute directly without converting  'ts-node index.ts' only for debugging
//command to convert the file "tsc index.ts"

import axios from 'axios'

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

const url = 'https://jsonplaceholder.typicode.com/todos/1'

axios.get(url)
     .then(response => {
        const todo = response.data as Todo
        const ID = todo.id
        const title = todo.title
        const finished = todo.completed
        toLog(ID, title, finished)
     })

const toLog = (ID: number, title: string, finished: boolean) => {
    console.log(`   
    The tod with ID: ${ID}
    has a title of: ${title}
    It it finished? ${finished}`)    
    //backtick (`) characters is alt + 96  
}