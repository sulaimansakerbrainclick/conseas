import RequestStatusId from "../enums/RequestStatusId";

const requestStatusData = [
  {
    id: RequestStatusId.Draft,
    nameEn: "Draft",
    nameAr: "مسودة",
  },
  {
    id: RequestStatusId.Pending,
    nameEn: "Pending",
    nameAr: "قيد الانتظار",
  },
  {
    id: RequestStatusId.ReadyForAssign,
    nameEn: "ReadyForAssign",
    nameAr: "جاهز للتعيين",
  },
  {
    id: RequestStatusId.InProgress,
    nameEn: "InProgress",
    nameAr: "في تَقَدم",
  },
  {
    id: RequestStatusId.Done,
    nameEn: "Done",
    nameAr: "منتهي",
  },
];

export default requestStatusData;
