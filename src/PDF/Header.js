import { useState, useEffect } from "react";
import logo from "./logo.jpeg"
function Header() {
  const [headerImage, setHeaderImage] = useState(["https://image.bigbooster.in/b3110392-f0fb-496d-a8c2-1e0878499501.png"]);
  const [organisationTitle, setOrganisationTitle] = useState([
    "Aash Publication",
  ]);
  const [instituted_by, setInstituted_by] = useState(["Teacher Name"]);

  const teacher = JSON.parse(localStorage.getItem("teacher")) || {};

  let activeColor = "";

  const toggleColor = () => {
    if (activeColor == "") {
      activeColor = "magenta";
    } else if (activeColor == "magenta") {
      activeColor = "black";
    } else if (activeColor == "black") {
      activeColor = "magenta";
    }

    if (activeColor == "magenta") {
      // moving to black
      let blackElements = document.querySelectorAll(".black");
      for (let i = 0; i < blackElements.length; i++) {
        const particularElement = blackElements[i];
        particularElement.style.opacity = "1";
      }

      let magentaElements = document.querySelectorAll(".magenta");
      for (let i = 0; i < magentaElements.length; i++) {
        const particularElement = magentaElements[i];
        particularElement.style.opacity = "0";
      }
    } else if (activeColor == "black") {
      // moving to magentza

      let magentaElements = document.querySelectorAll(".magenta");
      for (let i = 0; i < magentaElements.length; i++) {
        const particularElement = magentaElements[i];
        particularElement.style.opacity = "1";
      }

      let blackElements = document.querySelectorAll(".black");
      for (let i = 0; i < blackElements.length; i++) {
        const particularElement = blackElements[i];
        particularElement.style.opacity = "0";
      }
    }
  };

  useEffect(() => {
    if (teacher.teacher_name) setInstituted_by(`By ${teacher.teacher_name}`);
    if (teacher.institute_name) setOrganisationTitle(teacher.institute_name);
  }, []);

  return (
    <div>
      <div className="no-print ">
        <button className="cbtnv2" onClick={toggleColor}>
          Magenta Print
        </button>
      </div>
      <div className="Header black  bg-neutral" style={{}}>
        <div className="image-and-tagline ">
          <img
            src={
              teacher.logo_url ||
              logo
            }
            alt="logo"
            width="75px"
            height="75px"
            className="bg-base-100 company-logo"
          />
        </div>
        <div className="details">
          <div id="institution_name">
            <span contentEditable="true" style={{ fontSize: 30 }}>
              {organisationTitle}
            </span>
          </div>
          <hr className="hLine"/>
          <div id="other_header_details">
            <span contentEditable="true" id="pdf_name">
              PDF Name
            </span>
            {/*<span contentEditable="true" id="contact">*/}
            {/*  Contact Details*/}
            {/*</span>*/}
            <span contentEditable="true" id="instituted_by">
              {instituted_by}
            </span>
          </div>
        </div>
        <div className="image-and-tagline">
          <img
            src={
              teacher.logo_url ||
              logo
            }
            alt="logo"
            width="75px"
            height="75px"
            className="company-logo bg-base-100 mr-1"
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
