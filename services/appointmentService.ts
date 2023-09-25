import http from "./http";

const addAppointment = (data: any) => {
  return http.post("/appointments", data);
};

const appointmentService = {
  addAppointment,
};

export default appointmentService;
