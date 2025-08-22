const Patient = require("../models/registerModel.js"); 
const Appointment = require("../models/dashboardModel.js");

const totalShow = async (req, res) => {
  try {
    const todayStr = new Date().toISOString().split('T')[0];

    const [todaysAppointmentsCount, totalPatientsCount, completedAppointmentsCount, cancellationsCount] =
      await Promise.all([
        Appointment.countDocuments({ date: todayStr }),
        Patient.countDocuments(),
        Appointment.countDocuments({ status: 'Completed', date: todayStr }),
        Appointment.countDocuments({ status: 'Cancelled', date: todayStr })
      ]);

    res.json({
      todaysAppointments: todaysAppointmentsCount,
      totalPatients: totalPatientsCount,
      completedAppointments: completedAppointmentsCount,
      cancellations: cancellationsCount
    });
  } catch (err) {
    console.error("Error in totalShow:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

const upcomingShow = async (req, res) => {
  try {
    const dateParam = req.params.date;
    const todayDate = dateParam ? new Date(dateParam) : new Date();

    const upcomingAppointments = await Appointment.find({
      date: { $gte: todayDate.toISOString().split('T')[0] },
      status: { $in: ['Pending', 'Confirmed'] }
    })
      .populate('userId', 'name idProof') // populate proper fields
      .sort({ date: 1 }) // Ensure date stored as string in YYYY-MM-DD
      .limit(5);

    res.json(upcomingAppointments);
  } catch (err) {
    console.error("Error in upcomingShow:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { totalShow, upcomingShow };
