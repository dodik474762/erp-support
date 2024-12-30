import Image from "next/image";
import Link from "next/link";

const DataJobVacancyCandidate = (props: any) => {
  const {
    errors,
    namaLengkap,
    jobName,
    dateApplied,
    nik,
    fotoCandidate = "",
    base_url = '',
    id = "",
    seekCandidate = () => {},
  } = props;
  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className="card mt-n4 mx-n4">
            <div
              className="bg-warning-subtle"
              style={{ backgroundColor: "#fef4e4" }}
            >
              <div className="card-body pb-0 px-4">
                {errors == null ? null : (
                  <>
                    <div className="alert alert-danger mb-xl-0" role="alert">
                      {errors.message} <strong> Harus Diisi! </strong>
                    </div>
                    <br />
                  </>
                )}
                <div className="row mb-3">
                  <div className="col-md-12 text-end">
                    <button className="btn btn-sm btn-primary" onClick={seekCandidate.bind(this, 'prev')}><i className="ri-arrow-left-s-line"></i></button>
                    &nbsp;
                    <button className="btn btn-sm btn-primary" onClick={seekCandidate.bind(this, 'next')}><i className="ri-arrow-right-s-line"></i></button>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md">
                    <div className="row align-items-center g-3">
                      <div className="col-md-auto">
                        <div className="avatar-md">
                          <div className="avatar-title bg-white rounded-circle">
                            {fotoCandidate == "" ? (
                              <Image
                                src="/assets/images/brands/slack.png"
                                alt=""
                                className="avatar-xs"
                                width={32}
                                height={32}
                              />
                            ) : (
                              <Image
                                src={fotoCandidate}
                                alt=""
                                className="avatar-xs"
                                width={32}
                                height={32}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-md">
                        <div>
                          <h4 className="fw-bold">
                            {namaLengkap.toUpperCase()} /{" "}
                            {jobName.toUpperCase()}
                          </h4>
                          <div className="hstack gap-3 flex-wrap">
                            <div>
                              <i className="ri-building-line align-bottom me-1"></i>{" "}
                              Applied
                            </div>
                            <div className="vr"></div>
                            <div>
                              at :{" "}
                              <span className="fw-medium">{dateApplied}</span>
                            </div>
                            <div className="vr"></div>
                            <div>
                              NIK : <span className="fw-medium">{nik}</span>
                            </div>
                            <div className="vr"></div>
                            <div className="badge rounded-pill bg-info fs-12">
                              New
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-auto">
                    <div className="hstack gap-1 flex-wrap">
                      <Link
                        href={base_url+"/document/"+nik +"/"+id}
                        className="btn py-0 fs-16 text-body"
                      >
                        <i className="ri-share-line"></i>
                      </Link>
                      <Link
                        href={base_url+"/document/"+nik +"/"+id}
                        target="_blank"
                        className="btn py-0 fs-16 text-body"
                      >
                        <i className="ri-download-2-line"></i>
                      </Link>
                    </div>
                  </div>
                </div>

                <ul
                  className="nav nav-tabs-custom border-bottom-0"
                  role="tablist"
                >
                  <li className="nav-item">
                    <a
                      className="nav-link active fw-semibold"
                      data-bs-toggle="tab"
                      href="#overview-cfit"
                      role="tab"
                    >
                      CFIT
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link fw-semibold"
                      data-bs-toggle="tab"
                      href="#overview-personal"
                      role="tab"
                    >
                      DISC
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link fw-semibold"
                      data-bs-toggle="tab"
                      href="#overview-ist"
                      role="tab"
                    >
                      IST
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link fw-semibold"
                      data-bs-toggle="tab"
                      href="#overview-creplin"
                      role="tab"
                    >
                      Kraeplin
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link fw-semibold"
                      data-bs-toggle="tab"
                      href="#overview-form-hrd"
                      role="tab"
                    >
                      Resume Hasil Test
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DataJobVacancyCandidate;
