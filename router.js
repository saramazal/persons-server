const Persons = require('./persons')

module.exports = (app) => {

    app.get('/persons', (req, res) => {
        res.send(Persons.read(req.query))
    })

    app.post('/persons', (req, res) => {
        try {
            res.send(Persons.create(req.body))
        } catch (error) {
            res.send({
                code: 400,
                message: error
            })
        }
    })

    app.put('/persons/:id', (req, res) => {
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

    app.delete('/persons/:id', (req, res) => {
        const {
            id
        } = req.params
        res.send(Persons.delete(id))
    })
}