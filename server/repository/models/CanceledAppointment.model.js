const mongoose = require("mongoose");

const CanceledAppointmentSchema = mongoose.Schema({
    user_id: {
        type: 'string',
        required: true,
    },
    date:{
        type: 'string',
        required: true,
    },
    hour:{
        type: 'string',
        required: true,
    },
    canceledBy:{
        type: 'string',
        required: true,
        // validate: {
        //     validator: function(v) {
        //       return v === 'manager' || v === 'client';
        //     },
        //     message: props => `${props.value} is not the specific string!`
        //   }
    }
});
module.exports = mongoose.model('canceled appointments', CanceledAppointmentSchema);