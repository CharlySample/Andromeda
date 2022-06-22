const { Schema, model } = require('mongoose')

const HumiSchema = Schema({
    sensor: {
        type: String,
    },
    time: {
        type: String,
    },
    data: {
        type: String,
    },
    date: {
        type: String,
    },
    type: {
        type: String,
    },
})

HumiSchema.methods.toJSON = function() {
    const { __v, password, ...humi } = this.toObject()
    return humi
}

module.exports = model('Humi', HumiSchema)