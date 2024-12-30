
const PageTitle = ({
    titlePage = "Page Title",
    subTitle = "Page Sub Title"
}) => {
    
    return (
        <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">{titlePage}</h4>

            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <a href="">{titlePage}</a>
                </li>
                <li className="breadcrumb-item active">{subTitle}</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    )
};

export default PageTitle;