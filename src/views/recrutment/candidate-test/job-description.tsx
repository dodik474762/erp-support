import ApiServices from "@/services/api.services";
import moment from "moment-timezone";
import router from "next/router";
import { useEffect, useState } from "react";

const JobDescription = (props: any) => {
  const { job, job_test_schedule } = props;
  const [namaJob, setNamaJob] = useState(``);
  const [dateTest, setDateTest]: any = useState(``);

  const moduleJobTestApi = "/recrutment/candidate-test";

  const fetchDataJob = async () => {
    const req: any = await ApiServices.get(
      moduleJobTestApi,
      "/getDetailJob?id=" + job_test_schedule
    );
    if (req.is_valid == true) {
      const data = req.data;
      const startDate = moment(data.start_date.replace("T", " ").replace("Z", ""))
        .tz("Asia/Jakarta")
        .format("YYYY-MM-DD HH:mm");
      const endDate = moment(data.end_date.replace("T", " ").replace("Z", ""))
        .tz("Asia/Jakarta")
        .format("YYYY-MM-DD HH:mm");
      setNamaJob(data.nama_job);
      setDateTest(startDate + " - " + endDate);
    }
  };

  useEffect(() => {
    fetchDataJob();
  }, []);

  return (
    <div className="bg-warning-subtle position-relative">
      <div className="card-body p-5 auth-one-bg">
        <div className="text-center">
          <br />
          <div
            className="text-center "
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <div
              className="text-center bg-danger"
              style={{
                padding: "8px",
                borderRadius: "6px",
                boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.16)",
              }}
            >
              <h3 className="text-white" style={{ fontWeight: "500" }}>
                Welcome Candidate {namaJob} for Satoria Group
              </h3>
            </div>
          </div>
          <div
            className="text-center"
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <div
              className="mt-3"
              style={{
                maxWidth: "350px",
                backgroundColor: "white",
                padding: "5px",
                borderRadius: "6px",
                boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.16)",
              }}
            >
              <p
                className="mb-0 text-muted"
                style={{ fontSize: "14px", fontWeight: "500" }}
              >
                Date Test: {dateTest}
              </p>
              
            </div>
          </div>
        </div>
      </div>
      <div className="shape"></div>
    </div>
  );
};

export default JobDescription;
