const mongoose = require('mongoose')

let newName = ''
let newNumber = ''

if (process.argv.length < 3) {
  console.log('Need more parameters')
  process.exit(1)
}
else if (process.argv.length > 5) {
  console.log('Too many parameters')
  process.exit(1)
}
else if (process.argv.length === 4) {
  console.log('Please input both name and number')
  process.exit(1)
}



const password = process.argv[2]

const url = `mongodb+srv://juhapekkaheino:${password}@testdatabase.4bpjrv3.mongodb.net/phonebook?retryWrites=true&w=majority&appName=testdatabase`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', noteSchema)

if(process.argv.length === 3) {
  console.log('Phonebook:')

  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })

}

else if (process.argv.length === 5) {
  newName = process.argv[3]
  newNumber = process.argv[4]
  const person = new Person ({
    name: newName,
    number: newNumber
  })
  person.save().then(result => {
    console.log(`Added ${newName} number ${newNumber} to phonebook`)
    mongoose.connection.close()
  })


}