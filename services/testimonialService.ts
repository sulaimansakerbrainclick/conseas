import http from "./http";
import deleteEmptyFields from "@/utils/deleteEmptyFields";

const getAllTestimonials = (token: string) => {
  return http.get(`/admin/testimonials`, {
    headers: {
      Authorization: token,
    },
  });
};

const getTestimonial = (id: string, token: string) => {
  return http.get(`/admin/testimonials/${id}`, {
    headers: {
      Authorization: token,
    },
  });
};

const addTestimonial = (data: any, token: string) => {
  const newData = deleteEmptyFields(data);

  return http.post(`/admin/testimonials`, newData, {
    headers: {
      Authorization: token,
    },
  });
};

const updateTestimonial = (data: any, token: string) => {
  const newData = deleteEmptyFields(data);

  return http.put(`/admin/testimonials/${data.id}`, newData, {
    headers: {
      Authorization: token,
    },
  });
};

const deleteTestimonial = (id: string, token: string) => {
  return http.delete(`/admin/testimonials/${id}`, {
    headers: {
      Authorization: token,
    },
  });
};

const getHomeTestimonials = () => {
  return http.get(`/testimonials`);
};

const testimonialService = {
  getAllTestimonials,
  addTestimonial,
  deleteTestimonial,
  getTestimonial,
  updateTestimonial,
  getHomeTestimonials,
};

export default testimonialService;
