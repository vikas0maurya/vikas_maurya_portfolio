import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href="mailto:vikas707maurya@gmail.com" data-cursor="disable">
                vikas707maurya@gmail.com
              </a>
            </p>
            <h4>Phone</h4>
            <p>
              <a href="tel:+917522036304" data-cursor="disable">
                +91-7522036304
              </a>
            </p>
            <h4>Location</h4>
            <p style={{ marginTop: "5px" }}>Gurugram, Haryana, India</p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
              rel="noreferrer"
            >
              Linkedin <MdArrowOutward />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
              rel="noreferrer"
            >
              Instagram <MdArrowOutward />
            </a>
            <a
              href="mailto:vikas707maurya@gmail.com?subject=Portfolio%20Inquiry"
              data-cursor="disable"
              className="contact-social"
            >
              Get In Touch <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Graphic Designer & Video Editor <br /> by <span>Vikas Maurya</span>
            </h2>
            <h5>
              <MdCopyright /> 2026 Vikas Kumar Maurya
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
