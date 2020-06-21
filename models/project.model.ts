const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    currentZIndex: {
        type: Number,
        required: [true, 'CurrentZIndex is required']
    },
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    id: {
        type: String,
        required: [true, 'Id is required']
    },
    pages: [{

        pageId: {
            type: String,
        },
        style: {
            type: Array
        },
        attribute: {
            type: Array
        },
        children: {
            type: Array
        }
    }]
});

const project = mongoose.model('project', ProjectSchema);
module.exports = project;