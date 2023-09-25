import http from "./http";

const getAllAppointmentTypes = () => {
  return http.get(`/appointment-types`);
};

const appointmentTypeService = {
  getAllAppointmentTypes,
};

export default appointmentTypeService;
