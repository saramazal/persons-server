const Persons = require('./persons')

module.exports = (app) => {

    app.get('/person', (req, res) => {
        res.send(Persons.read(req.query))
    })

    app.post('/person', (req, res) => {
        try {
            res.send(Persons.create(req.body))
        } catch (error) {
            res.send({
                code: 400,
                message: error
            })
        }
    })

    app.put('/person/:id', (req, res) => {
        //const body = req.body
        const {
            body,
            params
        } = req
        try {
            res.send(Persons.update(params.id, body))
        } catch (error) {
            res.send({
                code: 400,
                message: error
            })
        }
    })

    app.delete('/person/:id', (req, res) => {
        const {
            id
        } = req.params
        res.send(Persons.delete(id))
    })
}