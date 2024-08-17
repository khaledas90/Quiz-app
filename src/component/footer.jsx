import React from 'react';
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="footer bg-dark mt-5 text-dark">
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-md-4 mt-4 col-lg-3 text-center text-sm-start">
            <div className="information">
              <h6 className="footer-heading text-uppercase text-white fw-bold">Information</h6>
              <ul className="list-unstyled footer-link mt-4">
                <li className="mb-1"><a href="#" className="text-white text-decoration-none fw-semibold">Home</a></li>
                <li className="mb-1"><a href="#" className="text-white text-decoration-none fw-semibold">Quiz</a></li>
                <li className="mb-1"><a href="#" className="text-white text-decoration-none fw-semibold">Instructions</a></li>
                <li><a href="#" className="text-white text-decoration-none fw-semibold">New Launches</a></li>
              </ul>
            </div>
          </div>
          <div className="col-sm-6 col-md-4 mt-4 col-lg-3 text-center text-sm-start">
            <div className="resources">
              <h6 className="footer-heading text-uppercase text-white fw-bold">Resources</h6>
              <ul className="list-unstyled footer-link mt-4">
                <li className="mb-1"><a href="#" className="text-white text-decoration-none fw-semibold">API</a></li>
                <li className="mb-1"><a href="#" className="text-white text-decoration-none fw-semibold">Website Tutorials</a></li>
                <li className="mb-1"><a href="#" className="text-white text-decoration-none fw-semibold">Third Party</a></li>
                <li><a href="#" className="text-white text-decoration-none fw-semibold">Video Lectures</a></li>
              </ul>
            </div>
          </div>
          <div className="col-sm-6 col-md-4 mt-4 col-lg-2 text-center text-sm-start">
            <div className="social">
              <h6 className="footer-heading text-uppercase text-white fw-bold">Social</h6>
              <ul className="list-inline my-4">
                <li className="list-inline-item"><a href="#" className="text-white btn-sm btn btn-primary mb-2"><FaInstagram/></a></li>
                <li className="list-inline-item"><a href="#" className="text-danger btn-sm btn btn-light mb-2"><FaFacebook/></a></li>
                <li className="list-inline-item"><a href="#" className="text-white btn-sm btn btn-primary mb-2"><FaLinkedin/></a></li>
                <li className="list-inline-item"><a href="#" className="text-white btn-sm btn btn-success mb-2"><FaYoutube/></a></li>
              </ul>
            </div>
          </div>
          <div className="col-sm-6 col-md-6 mt-4 col-lg-4 text-center text-sm-start">
            <div className="contact">
              <h6 className="footer-heading text-uppercase text-white fw-bold">Contact Us</h6>
              <address className="mt-4 m-0 text-white mb-1"><i className="bi bi-pin-map fw-semibold"></i>Alexandria, Egypt
              </address>
              <a href="tel:+" className="text-white mb-1 text-decoration-none d-block fw-semibold"><i className="bi bi-telephone"></i> 01090898650</a>
              <a href="mailto:" className="text-white mb-1 text-decoration-none d-block fw-semibold"><i className="bi bi-envelope"></i> khaledah826@gmail.com</a>
              <a href="" className="text-white text-decoration-none fw-semibold"><i className="bi bi-skype"></i> Khaled ahmed</a>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center bg-dark text-white mt-4 p-1">
        <p className="mb-0 fw-bold">2025 © khaled Ahmed, All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
