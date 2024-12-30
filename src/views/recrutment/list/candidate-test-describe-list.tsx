const CandidateTestDescribeList = (props: any) => {
  const { data = [], handleChangeMost = () => {}, handleChangeLeast = () => {} } = props;
  return (
    <>
      {data.map((item: any, index: number) => {
        const no = index + 1;
        return (
          <>
            <div className="border border-dashed card-body">
              <div className="d-flex">
                <div className="flex-shrink-0 me-3">
                  <i className="text-success bx bx-check-circle fs-20"></i>
                </div>
                <div className="flex-grow-1">
                  <h5>Soal No. {no}</h5>
                  {item.answers.map((items: any, indexs: number) => {
                    return (
                      <>
                        <div className="row">
                          <div className="col-md-3">
                            <p className="text-muted">[{items.type}]</p>
                          </div>
                          <div className="col-md-4">
                            <p className="text-muted"> : {items.answer}</p>
                          </div>
                          <div className="col-md-2">
                            <div
                              className="form-check form-switch mb-3"
                              dir="ltr"
                            >
                              <input
                                type="radio"
                                className="form-check-input"
                                id={"most-radio-"+item.id}
                                name={"most-radio-"+item.id}
                                value={items.id+"_"+items.most+"_"+items.answer}
                                onInput={handleChangeMost}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={"most-radio-"+item.id}
                              >
                                Most
                              </label>
                            </div>
                          </div>
                          <div className="col-md-2 text-start">
                            <div
                              className="form-check form-switch mb-3"
                              dir="ltr"
                            >
                              <input
                                type="radio"
                                className="form-check-input"
                                id={"least-radio-"+item.id}
                                name={"least-radio-"+item.id}
                                value={items.id+"_"+items.least+"_"+items.answer}
                                onInput={handleChangeLeast}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={"least-radio-"+item.id}
                              >
                                Least
                              </label>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};

export default CandidateTestDescribeList;
