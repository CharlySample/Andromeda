const { Schema, model } = require('mongoose')

const PartSchema = Schema({
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

PartSchema.methods.toJSON = function() {
    const { __v, password, ...part } = this.toObject()
    return part
}

module.exports = model('Part', PartSchema)