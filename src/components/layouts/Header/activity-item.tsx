const ActivityItem = ({
    key = '',
    data = {} as any
}) => {
  return (
    <>
      <div key={key} className="text-reset notification-item d-block dropdown-item position-relative">
        <div className="d-flex">
          <div className="avatar-xs me-3">
            <span className="avatar-title bg-soft-info text-info rounded-circle fs-16">
              <i className="bx bx-badge-check"></i>
            </span>
          </div>
          <div className="flex-1">
            <a href="#!" className="stretched-link">
              <h6 className="mt-0 mb-2 lh-base">
                {data.remarks} {" "}
                <span className="text-secondary">{data.action} by </span>             
                {data.username}   
              </h6>                 
            </a>
            <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
              <span>
                <i className="mdi mdi-clock-outline"></i> At {data.created_at.substr(0, 16)}
              </span>
            </p>
          </div>
          <div className="px-2 fs-15">
            {/* <div className="form-check notification-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="all-notification-check01"
              />
              <label
                className="form-check-label"
                htmlFor="all-notification-check01"
              ></label>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ActivityItem;
