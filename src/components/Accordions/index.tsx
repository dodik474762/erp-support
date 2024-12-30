const Accordions = (props: any) => {
  const { id, title, children } = props;
  return (
    <div
      className="accordion custom-accordionwithicon accordion-border-box"
      id={id || "accordionnesting"}
    >
      <div className="accordion-item">
        <h2 className="accordion-header" id="accordionnestingExample1">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#accor_nestingExamplecollapse1"
            aria-expanded="false"
            aria-controls="accor_nestingExamplecollapse1"
          >
            {title}
          </button>
        </h2>
        <div
          id="accor_nestingExamplecollapse1"
          className="accordion-collapse collapse"
          aria-labelledby="accordionnestingExample1"
          data-bs-parent="#accordionnesting"
        >
          <div className="accordion-body">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordions;
