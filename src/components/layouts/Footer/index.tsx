const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <p className="mb-0">
                &copy;
                <script>{new Date().getFullYear()}</script>.
                Crafted with <i className="mdi mdi-heart text-danger"></i> by
                IT Satoria Group
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
