import ButtonLoading from "@/components/layouts/ButtonLoading";
import AuthServices from "@/services/auth.services";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const LoginViews = () => {
  const router = useRouter();
  const [kodeLicense, setKodeLicense] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors]: any = useState({});
  const session: any = useSession();
  const callBackUrl: any = router.query.callbackUrl
    ? router.query.callbackUrl
    : "/dashboard";

  const postData = {
    kode_license: kodeLicense,
    username: username,
    password: password,
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    if (postData.username == "") {
      setErrors({ message: "Username Harus Diisi" });
      setLoading(false);
      return;
    }
    if (postData.password == "") {
      setErrors({ message: "Password Harus Diisi" });
      setLoading(false);
      return;
    }

    /*TEST API WORK */
    /*TEST API WORK */

    const reqAuth = await signIn("credentials", {
      redirect: false,
      username: postData.username,
      password: postData.password,
      nik: postData.username,
      callBackUrl,
    });

    if (!reqAuth?.error) {
      setLoading(false);
      router.push("/dashboard");
    } else {
      setErrors({ message: reqAuth.error + ", User Tidak Valid" });
      setLoading(false);
    }

    setLoading(false);
  };

  return (
    <>
      <div
        className="auth-page-content items-center overflow-hidden pt-lg-5"
        style={{ minHeight: "100vh" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="card overflow-hidden">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="p-lg-5 p-4 auth-one-bg h-100">
                      {/* <div className="bg-overlay"></div> */}
                      <div className="position-relative h-100 d-flex flex-column">
                        <div className="mb-4">
                          <Link href="/auth/login" className="d-block">
                            <div
                              style={{
                                maxWidth: "230px",
                                borderRadius: "10px",
                                backgroundColor: "white",
                                padding: "10px",
                                boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.16)",
                              }}
                            >
                              <Image
                                fetchPriority="high"
                                src={"/assets/images/logo_satoria.jpg"}
                                alt=""
                                width={200}
                                height={75}
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                          </Link>
                        </div>
                        <div className="mt-auto">
                          <div className="mb-3">
                            <i className="ri-double-quotes-l display-4 text-success"></i>
                          </div>

                          <div
                            id="qoutescarouselIndicators"
                            className="carousel slide"
                            data-bs-ride="carousel"
                          >
                            <div className="carousel-indicators">
                              <button
                                type="button"
                                data-bs-target="#qoutescarouselIndicators"
                                data-bs-slide-to="0"
                                className="active"
                                aria-current="true"
                                aria-label="Slide 1"
                              ></button>
                              <button
                                type="button"
                                data-bs-target="#qoutescarouselIndicators"
                                data-bs-slide-to="1"
                                aria-label="Slide 2"
                              ></button>
                              <button
                                type="button"
                                data-bs-target="#qoutescarouselIndicators"
                                data-bs-slide-to="2"
                                aria-label="Slide 3"
                              ></button>
                            </div>
                            <div className="carousel-inner text-center text-white-50 pb-5">
                              <div className="carousel-item active">
                                <p className="fs-15 fst-italic">
                                  Great! Maintainable Your HRD Psycotest System.
                                  Thanks very much!
                                </p>
                              </div>
                              <div className="carousel-item">
                                <p className="fs-15 fst-italic">
                                  Great! Maintainable Your HRD Psycotest System.
                                  Thanks very much!
                                </p>
                              </div>
                              <div className="carousel-item">
                                <p className="fs-15 fst-italic">
                                  Great! Maintainable Your HRD Psycotest System.
                                  Thanks very much!
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    {errors == null ? null : (
                      <>
                        <div
                          className="alert alert-danger mb-xl-0"
                          role="alert"
                        >
                          {errors.message} <strong> Harus Diisi! </strong>
                        </div>
                        <br />
                      </>
                    )}
                    <div className="p-lg-5 p-4">
                      <div>
                        <h5 className="text-primary">Welcome Back !</h5>
                        <p className="text-muted">
                          Sign in to continue to HRD Satoria Group.
                        </p>
                      </div>

                      <div className="mt-4">
                        <form onSubmit={handleLogin} action="">
                          <div className="mb-3">
                            <label htmlFor="username" className="form-label">
                              Username
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="username"
                              placeholder="Enter username"
                              onInput={(e: any) => setUsername(e.target.value)}
                            />
                          </div>

                          <div className="mb-3">
                            <label
                              className="form-label"
                              htmlFor="password-input"
                            >
                              Password
                            </label>
                            <div className="position-relative auth-pass-inputgroup mb-3">
                              <input
                                type="password"
                                className="form-control pe-5"
                                placeholder="Enter password"
                                id="password-input"
                                onInput={(e: any) =>
                                  setPassword(e.target.value)
                                }
                              />
                              <button
                                className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                                type="button"
                                id="password-addon"
                              >
                                <i className="ri-eye-fill align-middle"></i>
                              </button>
                            </div>
                          </div>

                          {/* <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="auth-remember-check"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="auth-remember-check"
                            >
                              Remember me
                            </label>
                          </div> */}

                          <div className="mt-4">
                            {loading == true ? (
                              <ButtonLoading message="Loading..." w100 />
                            ) : (
                              <button
                                className="btn btn-success w-100"
                                type="submit"
                              >
                                Sign In
                              </button>
                            )}
                          </div>

                          {/* <div className="mt-4 text-center">
                            <div className="signin-other-title">
                              <h5 className="fs-13 mb-4 title">Sign In with</h5>
                            </div>

                            <div>
                              <button
                                type="button"
                                className="btn btn-primary btn-icon waves-effect waves-light"
                              >
                                <i className="ri-facebook-fill fs-16"></i>
                              </button>
                              <button
                                type="button"
                                className="btn btn-danger btn-icon waves-effect waves-light"
                              >
                                <i className="ri-google-fill fs-16"></i>
                              </button>
                              <button
                                type="button"
                                className="btn btn-dark btn-icon waves-effect waves-light"
                              >
                                <i className="ri-github-fill fs-16"></i>
                              </button>
                              <button
                                type="button"
                                className="btn btn-info btn-icon waves-effect waves-light"
                              >
                                <i className="ri-twitter-fill fs-16"></i>
                              </button>
                            </div>
                          </div> */}
                        </form>
                      </div>

                      <div className="mt-5 text-center">
                        <p className="mb-0">
                          Dont have an account ?{" "}
                          <a
                            href="https://wa.me/6282244670886"
                            className="fw-semibold text-primary text-decoration-underline"
                          >
                            {" "}
                            Contact Admin
                          </a>{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginViews;
