const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    {
      "id": 1,
      "name": "Arto Hellas",
      "number": "040-123456"
    },
    {
      "id": 2,
      "name": "Ada Lovelace",
      "number": "39-44-5323523"
    },
    {
      "id": 3,
      "name": "Dan Abramov",
      "number": "12-43-234345"
    },
    {
      "id": 4,
      "name": "Mary Poppendieck",
      "number": "39-23-6423122"
    }
]
//路由
app.get('/api/persons',(request,response)=>{
    response.json(persons)
})

app.get('/api/persons/:id',(request,response)=>{
    const id =Number(request.params.id)
    const person = persons.find(person=>person.id === id)

    if (person){
        response.json(person)
    }
    else{response.status(404).end()}
})

app.get('/info',(request,response)=>{
    const currentTime = new Date().toLocaleString()
    response.setHeader('Content-Type', 'text/html')
    response.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${currentTime}</p>
    `)
})

//增加联系人
app.post('api/persons',(request,response)=>{
    const body = request.body

    if(!body.name || !body.number){
        return response.status(400).json({error: 'name or number is missing'})
    }

    if (persons.find(person=>person.name === body.name)){
        return response.status(400).json({error:'name must be unique'})
    }
    const newPerson={
        id: persons.length +1,
        name:body.name,
        number:body.number
    }
    persons= persons.concat(newPerson)
    response.status(201).json(newPerson)
})
//删除联系人
app.delete('/api/persons',(request,express,response)=>{
    const id = request.params.id
    persons= persons.filter(person=>person.id !==id)

    response.status(204).end()
})

const unknowEndPoint=(request,response)=>{
    response.status(404).json({error:'unknow endpoint'})
}

app.use(unknowEndPoint)

const PORT = 3001
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})