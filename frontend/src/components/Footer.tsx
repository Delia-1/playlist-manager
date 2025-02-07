import React from "react";
import "../style/Footer.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Footer() {
  return (
    <div className="footer w-100 fixed-bottom">
      <div className="footer-links">
        <a href="https://github.com/Delia-1">
          <i className="fab fa-github"></i>
        </a>
        {/* <a href="#"><i className="fa-brands fa-facebook-f"></i></a> */}
        <a href="https://www.linkedin.com/in/délia-knoepfli">
          <i className="fab fa-linkedin"></i>
        </a>
      </div>
      <div className="footer-copyright">Playlist generator, made with 💖 by Délia</div>
    </div>
  );
}

export default Footer;
