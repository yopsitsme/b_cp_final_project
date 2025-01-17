const Repository = require("./Repository");
const connection = process.env.CONNECTION_URL;
const CanceledAppointmentModel = require("./models/CanceledAppointment.model");
class AppointmentRepository extends Repository {
    constructor(connection, model) {
        super(connection, model);
    }
    async readAll() {
        const response = await this.model.find({});
        return response;

    }
    async read(user_id) {
        const a=await this.model.findOne({ user_id: user_id });
        console.log(a,"a");     
         return await this.model.findOne({ user_id: user_id });
    }

    async delete(user_id, date) {
        return await this.model.deleteOne({ user_id: user_id, date: date });
    }
    async update(canceledAppointmentsUpdated) {
        try {
            console.log(canceledAppointmentsUpdated);
            await this.model.deleteMany({});
            const a = await this.model.find({});
            console.log(a,"a");
            await this.model.insertMany(canceledAppointmentsUpdated);
            const b = await this.model.find({});
            console.log(b,"b");
            return { statusCode: 200 }
        }
        catch (error) {
            return { statusCode: 500 }
        }

    }
}

module.exports = new AppointmentRepository(connection, CanceledAppointmentModel);
