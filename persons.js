const persons = []
let counter = 1

function read(filter) {
    if (Object.keys(filter).length)
        return persons.filter(p => {
            for (const key in filter) {
                if (p[key] != filter[key])
                    return false
            }
            return true
        })
    else
        return persons
}

function create(newPerson) {
    newPerson = validate(newPerson)
    newPerson.id = counter++
    persons.push(newPerson)
    return newPerson
}

function update(id, newData) {
    const index = getPersonIndexById(id)
    newData = validate(newData, 'update')
    delete newData.id
    if (index != -1) {
        persons[index] = { ...persons[index], ...newData }
        return persons[index]
    }
    else
        throw `person with id ${id} not exist`
}

function del(id) {
    const
        index = getPersonIndexById(id),
        deleted = persons[index]
    persons.splice(index, 1)
    return deleted
}

module.exports = {
    read,
    create,
    update,
    delete: del
}

function getPersonIndexById(id) {
    return persons.findIndex(p => p.id == id)
}

const keys = {
    firstName: 'string',
    lastName: 'string',
    age: 'number',
    city: 'string',
    eyeColor: 'string'
}

function validate(data, mode) {
    const validateData = {}
    for (const key in keys) {
        if (mode != 'update') {
            if (!data[key])
                throw `key '${key}' is required`
        }

        if (!isNaN(Number(data[key])))
            data[key] = Number(data[key])

        if (typeof data[key] != keys[key])
            throw `key '${key}' must be of type '${keys[key]}'`

        validateData[key] = data[key]
    }
    return validateData
}