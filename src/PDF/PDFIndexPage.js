import "./style.css";
import { initMathJax } from "../math.js";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import ShortAnswer from "./ShortAnswer";

const parse = require("html-react-parser");

function PDFIndexPage() {

  const [isLoading,setIsLoading]=useState(false);

  const location = useLocation();
  let navigate = useNavigate();
  const teacher = JSON.parse(localStorage.getItem("teacher")) || {};
  const [pdfContent, setPDFState] = useState([]);
  let configData = location.state?.data;

  const pdfDataLoad = async () => {
    if (location.state.data.endpoint) {
      let options = {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer keyrPNFKcIz6BrXFR`,
        },
      };
      let resData = [];
      try {
        const response = await fetch(location.state.data.endpoint, options);
        resData = await response.json();
      } catch (e) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "error",
          title: "Something went Wrong",
        });
        return navigate(location.state?.path || "/"); //prev
      }

      let offset = resData?.offset || "";

      for (let index = 0; index < resData.records.length; index++) {
        let element = resData.records[index];
        resData.records[index] = { ...element, ...element.fields };
      }

      if (resData["status"] === 404) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "error",
          title: "No data found",
        });
        return navigate(location.state?.path || "/"); //prev
      }

      setPDFState(resData["records"]);

      // if (offset != "") {
      //     await getDataInLoop(location.state.data.endpoint, offset);
      // }
      initMathJax();
    } else {
      let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          set_id: configData.set_id,
          set_password: configData.set_password,
          endpoint: "",
        }),
      };
      const response = await fetch(
        `https://teach-backend.bigbooster.in/app-to-web`,
        options
      );
      const resData = await response.json();

      if (resData["status"] === 404) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "error",
          title: "No data found",
        });
        return navigate(location.state?.path || "/"); //prev
      }

      if (resData["data"]) {
        const excludesString = ["testbook.com", "googleapi.com"];
        for (const obj of resData["data"]) {
          const propertiesToCheck = [
            "question_hin",
            "question_eng",
            "option1_eng",
            "option2_eng",
            "option3_eng",
            "option4_eng",
            "option5_eng",
            "option1_hin",
            "option2_hin",
            "option3_hin",
            "option4_hin",
            "option5_hin",
          ];
          const isExcluded = propertiesToCheck.some((property) => {
            const value = obj[property];
            if (Array.isArray(value)) {
              return value.some((item) =>
                excludesString.includes(String(item))
              );
            }
            return excludesString.includes(String(value));
          });

          if (isExcluded) {
            propertiesToCheck.forEach((property) => {
              obj[property] = "This question is preparing";
            });
          }
        }
      }

      setPDFState(resData["data"]);
      setIsLoading(true);
      initMathJax();
    }
  };

  useEffect(() => {
    initMathJax();
    pdfDataLoad();
  }, []);

  return (
    <>

     <table>
     <Header/>
        <thead>
          <tr>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
          {
            !isLoading?<p style={{textAlign:"center", height:"500px", marginTop:"200px"}}>Loading...</p>:<td className="content pageCss printable-content">
            {pdfContent.map((question) => (
              <QuestionComponent key={question.question_no} question={question} />
            ))}
          </td>
          }
          </tr>
          <ShortAnswer answer={pdfContent} />
        </tbody>
        <tfoot>
          <tr>
            <td><Footer /></td>
          </tr>
        </tfoot>
      </table>

    </>
  );
}

export default PDFIndexPage;

function QuestionComponent({ question }) {
  return (
    <>
      <div style={{ display: "flex", alignItems: "baseline" }}>
        <div
          className="black "
          style={{ minWidth: "32px", textAlign: "center" }}
        >
          {`${question.question_no}` + "."}
        </div>
        <div>
          <div className="question magenta">
            {" "}
            {parse(question["question_hin"].replaceAll(`\\′`, `'`))}{" "}
          </div>
          {question.option1_hin.length +
            question.option2_hin.length +
            question.option3_hin.length +
            question.option4_hin.length <
          100 ? (
            <OptionComponentDoubleColumn
              key={question.question_no}
              question={question}
            />
          ) : (
            <OptionComponentSingleColumn
              key={question.question_no}
              question={question}
            />
          )}
          {/*<span>Answer: {question.answer}</span>*/}
        </div>
      </div>
    </>
  );
}

function OptionComponentSingleColumn({ question }) {
  return (
    <>
      <div className="options">
        <div
          className="singleColumnIndividualDiv black"
          style={{ display: "flex", alignItems: "baseline" }}
        >
          {" "}
          <span style={{ marginRight: "3px" }}>(a)</span>{" "}
          <div>{parse(question.option1_hin.replaceAll(`\\′`, `'`))}</div>
        </div>
        <div
          className="singleColumnIndividualDiv black"
          style={{ display: "flex", alignItems: "baseline" }}
        >
          {" "}
          <span style={{ marginRight: "3px" }}>(b)</span>{" "}
          <div>{parse(question.option2_hin.replaceAll(`\\′`, `'`))}</div>
        </div>
        <div
          className="singleColumnIndividualDiv black"
          style={{ display: "flex", alignItems: "baseline" }}
        >
          {" "}
          <span style={{ marginRight: "3px" }}>(c)</span>{" "}
          <div>{parse(question.option3_hin.replaceAll(`\\′`, `'`))}</div>
        </div>
        <div
          className="singleColumnIndividualDiv black"
          style={{ display: "flex", alignItems: "baseline" }}
        >
          {" "}
          <span style={{ marginRight: "3px" }}>(d)</span>{" "}
          <div>{parse(question.option4_hin.replaceAll(`\\′`, `'`))}</div>
        </div>
      </div>
    </>
  );
}

function OptionComponentDoubleColumn({ question }) {
  return (
    <>
      <div className="options" style={{ display: "flex" }}>
        <div style={{ marginRight: "10px", width: "20vw" }}>
          <p className="black" style={{ margin: "0px", padding: "0px" }}>
            (a) {parse(question.option1_hin.replaceAll(`\\′`, `'`))}
          </p>
          <p className="black" style={{ margin: "0px", padding: "0px" }}>
            (c) {parse(question.option3_hin.replaceAll(`\\′`, `'`))}
          </p>
        </div>
        <div>
          <p className="black" style={{ margin: "0px", padding: "0px" }}>
            (b) {parse(question.option2_hin.replaceAll(`\\′`, `'`))}
          </p>
          <p className="black" style={{ margin: "0px", padding: "0px" }}>
            (d) {parse(question.option4_hin.replaceAll(`\\′`, `'`))}
          </p>
        </div>
      </div>
    </>
  );
}
