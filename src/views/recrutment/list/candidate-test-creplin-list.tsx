const CandidateTestCreplinList = (props: any) => {
  const { data = [], handleChangeAnswer = () => {} } = props;
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
                  <h5>Soal</h5>
                  {item.questions.map((items: any, indexs: number) => {
                    return (
                      <>
                        <div className="row">
                          <div className="col-md-3">
                            <p className="text-muted fw-medium mb-0 mt-2 text-uppercase fs-20">
                              [{items.questions.questions}]
                            </p>
                          </div>
                          <div className="col-md-4">
                            <div className="mb-3">
                              <label
                                htmlFor="exampleFormControlInput1"
                                className="form-label"
                              >
                                Jawaban
                              </label>
                              <input
                                autoFocus={indexs == 0 ? true : false}
                                type="number"
                                className="form-control input-answer"
                                id={'field-'+indexs}
                                placeholder="Jawaban"
                                maxLength={1}
                                name={
                                  items.questions.id +
                                  "-" +
                                  items.questions.remarks +
                                  "-" +
                                  indexs
                                }
                                onInput={handleChangeAnswer}
                              />
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

export default CandidateTestCreplinList;
