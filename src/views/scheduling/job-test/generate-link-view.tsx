import Message from "@/utility/message";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const GenerateLinkView = (props: any) => {
  const { base_url = "", akses = [], } = props;
  const router = useRouter();
  const { job = 1, job_test_schedule = 1 } = router.query;
  const recrutmentLink = `/recrutment/candidate-test?job=${job}&job_test_schedule=`+job_test_schedule+`&confirm=yes`;

  const copyLink = () => {
    navigator.clipboard.writeText(process.env.BASE_URL + recrutmentLink);
    Message.success("Link berhasil di copy");
  };
  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className="text-center mt-sm-5 mb-4 text-black-50">
            <p className="fs-15 fw-medium">
              Generate Link untuk pengisian data
              <br />
              biodata candidate dan confirm kehadiran
            </p>
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6 col-xl-5">
          <div className="card mt-4">
            <div className="card-body p-4 text-center">
              <div className="avatar-lg mx-auto mt-2">
                <div className="avatar-title bg-light text-success display-3 rounded-circle">
                  <i className="ri-checkbox-circle-fill"></i>
                </div>
              </div>
              <div className="mt-4 pt-2">
                <h4>Well done !</h4>
                <p className="text-muted mx-4">
                  {process.env.BASE_URL + recrutmentLink}
                  <span>
                    <i
                      onClick={copyLink}
                      className="bx bx-copy align-middle me-1 cursor-pointer fs-16 text-success"
                    ></i>
                  </span>
                </p>
                <div className="mt-4">
                  <Link href={base_url} className="btn btn-success w-100">
                    Kembali
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GenerateLinkView;
