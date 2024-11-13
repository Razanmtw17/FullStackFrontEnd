import React, { useState } from 'react';
import './footer.css';
import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';
import PinterestIcon from '@mui/icons-material/Pinterest';
import InstagramIcon from '@mui/icons-material/Instagram';
import logo from '../../images/white logo.png';

export default function Footer() {
  const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
  return (
    <div className="footer">
      <div className="sb_footer section_padding">
        <div className="sb_footer-links">
          <div className="sb_footer-links-div">
            <h4>
              <img src={logo} alt="logo" width="80px" />
            </h4>
            <p className="description">
              Habitant morbi tristique senectus et netus et malesuada. Amet
              volutpat consequat mauris nunc congue nisi vitae suscipit tellus.
              Id diam maecenas ultricies mi eget mauris pharetra et. Mi in nulla
              posuere sollicitudin aliquam ultrices sagittis orci
            </p>
            <div className="socialmedia">
              <span>
                <XIcon
                  sx={{ color: "white", "&:hover": { color: "#B17939" } }}
                />
              </span>
              <span>
                <FacebookIcon
                  sx={{ color: "white", "&:hover": { color: "#B17939" } }}
                />
              </span>
              <span>
                <PinterestIcon
                  sx={{ color: "white", "&:hover": { color: "#B17939" } }}
                />
              </span>
              <span>
                <InstagramIcon
                  sx={{ color: "white", "&:hover": { color: "#B17939" } }}
                />
              </span>
            </div>
          </div>
          <div className="sb_footer-links-div">
            <h4>Information</h4>
            <a className="sb_footer-links-a" href="/">
              <p>Order</p>
            </a>
            <a className="sb_footer-links-a" href="/">
              <p>Gallery</p>
            </a>
            <a className="sb_footer-links-a" href="/">
              <p>Store Location</p>
            </a>
            <a className="sb_footer-links-a" href="/">
              <p>Testimonials</p>
            </a>
            <a className="sb_footer-links-a" href="/">
              <p>Sitemap</p>
            </a>
          </div>
          <div className="sb_footer-links-div">
            <h4>Support</h4>
            <a className="sb_footer-links-a" href="/">
              <p>Search</p>
            </a>
            <a className="sb_footer-links-a" href="/">
              <p>Help</p>
            </a>
            <a className="sb_footer-links-a" href="/">
              <p>Delivery Information</p>
            </a>
            <a className="sb_footer-links-a" href="/">
              <p>Privacy Policy</p>
            </a>
            <a className="sb_footer-links-a" href="/">
              <p>Teerms & Conditions</p>
            </a>
            <a className="sb_footer-links-a" href="/">
              <p>Shipping Details</p>
            </a>
          </div>
          <div className="sb_footer-links-div">
            <h4>Contact Us</h4>
            <a className="sb_footer-links-a" href="/">
              <p>+966-123456789</p>
            </a>
          </div>
        </div>
        <hr />
        <hr />
        <div className="sb_footer-below">
          <div className="sb_footer-copyright">
            <p>@ Copyright, Modern Furnishure, {new Date().getFullYear()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
