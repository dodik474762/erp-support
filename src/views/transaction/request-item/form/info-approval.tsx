const InfoApproval = (props: any) => {
  const { data } = props;
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <h5>Informasi</h5>
          </div>
          <div className="card-body">
            {data.acc_remarks != null && data.status == "REJECTED" ? (
              <div
                className="alert alert-danger alert-dismissible"
                role="alert"
              >
                <h6 className="alert-heading mb-1">
                  <i className="bx bx-xs bx-error align-top me-2"></i>
                </h6>
                <span>
                  Rejected By {data.acc_by_name} {data.acc_remarks}
                </span>
              </div>
            ) : (
              <>
                <div
                  className="alert alert-success alert-dismissible"
                  role="alert"
                >
                  <h6 className="alert-heading mb-1">
                    <i className="bx bx-xs bx-check align-top me-2"></i>
                  </h6>
                  <span>
                    {data.status == "COMPLETED" ? "Full " : ""} { data.acc_by == null ? 'SUBMITTED' : 'Approved By' } 
                    {data.acc_by_name}
                  </span>
                </div>
                <div className="text-end">
                  {data.status != "COMPLETED" ? (
                    <>
                      <p>
                        <i>PIC Next Approval {data.jabatan_acc}</i>
                      </p>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoApproval;
