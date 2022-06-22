const { Schema, model } = require('mongoose')

const TempSchema = Schema({
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

TempSchema.methods.toJSON = function() {
    const { __v, password, ...temp } = this.toObject()
    return temp
}

module.exports = model('Temp', TempSchema)