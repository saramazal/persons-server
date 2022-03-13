function getAll() {
    axios.get('/person')
        .then(result => render(result.data))
}
getAll()

function render(arr) {
    document.querySelector('#list').innerHTML =
        arr.map(p => `<li>
            <i class="far fa-trash-alt x" onclick="deletePerson(${p.id})"></i>
            <strong>${p.firstName} ${p.lastName}</strong>
            <div class="details">
                <div>
                    <span>${p.age}</span>
                    <span>${p.city}</span>
                </div>
                <div>
                <div class='eyes' style="color: ${p.eyeColor};">
                    <i class="far fa-eye" ></i>
                    <i class="far fa-eye" ></i>
                </div>
                </div>
            </div>
        </li>`).join('')
}

document.querySelector('form')
    .onsubmit = (event) => {
        event.preventDefault()
        const values = getAllValues(event.target)
        addPerson(values)
        form.reset()
    }

function getAllValues(form) {
    return Object.values(form)
        .reduce((acc, curr) => {
            let { value, name } = curr
            return name ? { ...acc, [name]: value } : acc
        }, {})
}

function addPerson(values) {
    axios.post('/person', values)
        .then(() => getAll())
}

async function deletePerson(id) {
    if (window.confirm(`Are you sure?`)) {
        const result = await axios.delete(`/person/${id}`)
        getAll()
    }
}


/*function deletePerson(id) {
    if (window.confirm(`האם אתה בטוח?`))
        axios.delete(`/person/${id}`)
            .then(() => getAll())
}*/


/*document.querySelector('form')
    .onsubmit = (event) => {
        event.preventDefault()
        const form = event.target
        const valuesArr = Object.values(form)
        const valuesObj = {}
        valuesArr.forEach(inp => {
            const { value, name } = inp
            if (name) valuesObj[name] = value
        })
        console.log(valuesObj)
    }*/