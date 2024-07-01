const { Controller } = require("./Controller");
const AppointmentService = require('../../services/Appointment.service');
class AppointmentController extends Controller {
    constructor(service) {
        super(service)
    }
    async read(req, res, next) {
        let params = {};
        if (req.params.userName != undefined) {
            params.userName = req.params.userName
        };
        if (req.params.filter1) params.filter1 = req.params.filter1;
        if (req.params.filter2) params.filter2= req.params.filter2;

        try {
            console.log("controler",req.params.filter1, req.params.filter2, params);
            const response = await this.service.read(params);
            return res.status(response.statusCode).json(response.dateNextAppointment);
        } catch (error) {
            next(error);
        }
    }
    async delete(req, res, next) {
        try {
            const response = await this.service.delete(req.params);
            console.log("co", response.statusCode);
            return res.status(response.statusCode).json(response.json);
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new AppointmentController(AppointmentService);