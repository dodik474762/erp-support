
const AlertMessage = ({
    message = "Error",
}) => {
    return (
        <>
        <div className="alert alert-danger mb-xl-0" role="alert">
            {message}
          </div>
          <br />
        </>
    );
};

export default AlertMessage;