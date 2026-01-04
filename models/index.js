const User = require('./userModel')
const Appointment = require('./appointModel')
const Doctor = require('./doctorModel')
// Patient → Appointment
User.hasMany(Appointment, { foreignKey: 'createdBy' })
Appointment.belongsTo(User, { foreignKey: 'createdBy', as: 'patient' })

// Doctor → Appointment
User.hasMany(Appointment, { foreignKey: 'doctorId' })
Appointment.belongsTo(User, { foreignKey: 'doctorId', as: 'doctor' })


Appointment.hasMany(User, { foreignKey: 'createdBy' })
User.belongsTo(Appointment, { foreignKey: 'doctorId', as: 'doctorUser' })

// Updated By → User
Appointment.belongsTo(User, { foreignKey: 'updatedBy', as: 'updatedByUser' })

User.belongsTo(Doctor, { foreignKey: "createdBy" })
Doctor.belongsTo(User, { foreignKey: "createdBy", as: "createdUser" })


module.exports = { User, Appointment, Doctor }

