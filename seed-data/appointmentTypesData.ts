import AppointmentTypeId from "../enums/AppointmentTypeId";

const appointmentTypesData = [
  {
    id: AppointmentTypeId.MedicalRecordReview,
    nameEn: "Medical Record Review",
    nameAr: "مراجعة السجل الطبي",
  },
  {
    id: AppointmentTypeId.MagingConsultation,
    nameEn: "Maging Consultation",
    nameAr: "إجراء استشارة",
  },
  {
    id: AppointmentTypeId.CaseConsultion,
    nameEn: "Case Consultion",
    nameAr: "استشارة الفحص الصوتي للقلب",
  },
];

export default appointmentTypesData;
