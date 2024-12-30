const ButtonLoading = ({
    message="Loading...",
    w100=false,
    smallButton = false
}) => {
  return (
    <button className={"btn btn-outline-primary btn-load" + (w100 ? " w-100" : "") + (smallButton ? " btn-sm" : "")} disabled>
      <span className="d-flex align-items-center">
        <span className="spinner-border flex-shrink-0" role="status">
          <span className="visually-hidden">{message}</span>
        </span>
        <span className="flex-grow-1 ms-2">{message}</span>
      </span>
    </button>
  );
};

export default ButtonLoading;
