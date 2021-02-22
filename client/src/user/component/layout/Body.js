import React, { Fragment, useContext, useEffect } from "react";
import Paypal from "../../utils/Paypal";
import Navbar from "./Navbar";
import Spinner from "./Spinner";


import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";


import AuthContext from "../../context/auth/authContext";

const Body = (props) => {

  const authContext = useContext(AuthContext);

  const { isAuthenticated, clearErrors, loading } = authContext;

  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push("/user");
    }
    //loading user
    

    //get user
    
    //clear all errors
    clearErrors();
    // eslint-disable-next-line
  }, [isAuthenticated, props.history]);
  if (loading) {
    return <Spinner />;
  }


  return (
    <Fragment>
      <Navbar />
      <section>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12 col-lg-9 col-md-8 ml-auto fixed-sides">
              <div className="card card-common">
                <div className="card-body">
                <div className="col-xl-12 col-lg-9 col-md-8 ml-auto">
                <Carousel>
                <div
                  id="slides"
                  className="carousel slide"
                  data-ride="carousel"
                >
                  <ul className="carousel-indicators">
                    <li
                      data-target="#slides"
                      data-slide-to="0"
                      className="active"
                    ></li>
                    <li data-target="#slides" data-slide-to="1"></li>
                    <li data-target="#slides" data-slide-to="2"></li>
                  </ul>
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img
                        src="/images/background2.jpg"
                        alt=""
                      />
                      <div className="carousel-caption">
                        <h1 className="display-2">Pay Online</h1>
                        
                        <Paypal>
                          
                        </Paypal>
                        
                      </div>
                    </div>
                    <div className="carousel-item">
                      <img
                        src="/images/background.jpg"
                        alt=""
                      />
                    </div>
                    <div className="carousel-item">
                      <img
                        src="/images/background3.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </Carousel>
          </div>


          
          <div className="container-fluid">
            <div className="row jumbotron">
              <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-10">
                <p className="lead">
                  Garissa Water and Sewage Company has a fast and easy way to pay for water bills.
                  You will have our connection within 30 days.
                  call-07274660218 for queries.
                </p>
              </div>
              
            </div>
          </div>


        
          <div className="container-fluid padding">
            <div className="row text-center padding">
              <div className="col-12">
                <h2>Connect</h2>
              </div>
              <div className="col-12 social padding">
                <a href="#">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#">
                  <i className="fab fa-youtube"></i>
                </a>
                <a href="#">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#">
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
            </div>
          </div>


          
          <footer>
            <div className="container-fluid padding">
              <div className="row text-center">
                <div className="col-md-4">
                <img src="/images/tap4.png" alt=""/>
                  <hr className="light" />
                  <p>072-746-0218</p>
                  <p>kado@mba.com</p>
                  <p>300 Street Name</p>
                  <p>Garissa County,007</p>
                </div>
                <div className="col-md-4">
                  <hr className="light" />
                  <h5>Our Hours</h5>
                  <hr className="light" />
                  <p>Monday: 8am - 4pm</p>
                  <p>Thursday: 10am - 3pm</p>
                  <p>Friday: closed</p>
                </div>
                <div className="col-md-4">
                  <hr className="light" />
                  <h5>Service Area</h5>
                  <hr className="light" />
                  <p>Garissa, County, 0007</p>
                  <p>City, County, 0000</p>
                  <p>City, County, 0000</p>
                  <p>City, County, 0000</p>
                </div>
                <div className="col-12">
                  <hr className="light-100" />
                  <h5>&copy; khadarow.com</h5>
                </div>
              </div>
            </div>
          </footer>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default Body;
