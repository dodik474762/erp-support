import Image from "next/image";
import Link from "next/link";

const DataApplicant = (props: any) => {
  const { applicants, base_url } = props;

  return (
    <>
      {applicants.map((item: any, index: number) => {
        return (
          <>
            <div className="d-flex align-items-center">
              <div className="avatar-xs flex-shrink-0 me-3">
                <Image
                  src="/assets/images/ic_profile.png"
                  alt=""
                  className="img-fluid rounded-circle"
                  width={40}
                  height={40}
                />
              </div>
              <div className="flex-grow-1">
                <h5 className="fs-13 mb-0">
                  <a href="#" className="text-body d-block">
                    {item.nama_candidate.toUpperCase()}
                  </a>
                </h5>
              </div>
              <div className="flex-shrink-0">
                <div className="d-flex align-items-center gap-1">
                  <button type="button" className="btn btn-light btn-sm">
                    <i className="ri-mail-line"></i>
                  </button>
                  <div className="dropdown">
                    <button
                      className="btn btn-icon btn-sm fs-16 text-muted dropdown"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="ri-more-fill"></i>
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <Link className="dropdown-item" href={base_url+"/details?id="+item.id}>
                          <i className="ri-eye-fill text-muted me-2 align-bottom"></i>
                          View
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};


export default DataApplicant;