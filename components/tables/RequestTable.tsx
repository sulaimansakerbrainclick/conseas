import Table from "@mui/material/Table";
import {
  Button,
  MenuItem,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { Question, Request, RequestStatus, Service } from "@prisma/client";
import MessageIcon from "@mui/icons-material/Message";
import requestService from "@/services/requestService";
import AppContext from "../contexts/SessionContext";
import { useContext } from "react";
import showSuccessToast from "@/utils/showSuccessToast";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import UploadButton from "../reusable/upload-button/UploadButton";
import fileService from "@/services/fileService";

const RequestTable = ({
  requests,
  onQuestionsClick,
  requestStatuses,
}: {
  requests: (Request & { service: Service; questions: Question[] })[];
  onQuestionsClick: (id: string) => void;
  requestStatuses: RequestStatus[];
}) => {
  const { t } = useTranslation("common");

  const router = useRouter();

  const { token } = useContext(AppContext)!;

  const toggleStatus = (id: string, requestStatusId: string) => {
    requestService
      .changeRequestStatus(id, requestStatusId, token)
      .then((res) => {
        showSuccessToast(res.data.message);
        router.push(router.asPath);
      })
      .catch((e) => {});
  };

  const uploadMedicalReport = async (id: string, medicalReportFile: File) => {
    const uploadRes = await fileService.upload(medicalReportFile, token);

    let medicalReport = uploadRes.data.data;

    const uploadMedicalReportRes = await requestService.uploadMedicalReport(
      id,
      { medicalReport },
      token
    );

    showSuccessToast(uploadMedicalReportRes.data.message);
    router.push(router.asPath);
  };

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>{t("Name")}</TableCell>
          <TableCell>{t("Type")}</TableCell>
          <TableCell>{t("Status")}</TableCell>
          <TableCell>{t("User's medical report")}</TableCell>
          <TableCell>{t("Medical report")}</TableCell>
          <TableCell>{t("Questions")}</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {requests.map(
          ({ id, firstName, lastName, service, statusId, medicalReport, myMedicalReport }) => (
            <TableRow key={id}>
              <TableCell>{firstName + " " + lastName}</TableCell>

              <TableCell>{service.nameEn}</TableCell>

              <TableCell>
                <TextField
                  select
                  name="statusId"
                  value={statusId}
                  variant="outlined"
                  size="small"
                  onChange={(e) => toggleStatus(id, e.target.value as string)}
                >
                  {requestStatuses.map(({ id, nameEn, nameAr }) => (
                    <MenuItem key={id} value={id}>
                      {nameEn}
                    </MenuItem>
                  ))}
                </TextField>
              </TableCell>

              <TableCell>
                {myMedicalReport && <UploadButton fileUrl={myMedicalReport}></UploadButton>}
              </TableCell>

              <TableCell>
                <UploadButton
                  fileUrl={medicalReport}
                  onChange={(file: File) => uploadMedicalReport(id, file)}
                >
                  {t("Upload medical report")}
                </UploadButton>
              </TableCell>

              <TableCell>
                <Button variant="outlined" color="primary" onClick={() => onQuestionsClick(id)}>
                  <MessageIcon />
                </Button>
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
};

export default RequestTable;
