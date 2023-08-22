import Solution from "./Solution";
import Discussion from "./Discussion";
import React from "react";
const parse = require("html-react-parser");

function ShortAnswer(props) {
    var pdfContent = props
    return (
        <>
            {
                <div style={shortAnswerBody} className="shortAnswerBody">
                    <hr style={{ borderTop: '1px dashed black', color: "transparent" }} />
                    <p style={fontStyle} contentEditable={true}>Answer Key</p>
                    <div style={answerBox} className="answerBox">
                        {
                            props.answer.map((itm, index) => {
                                return (<>
                                    <div>
                                        <p className="c-answerBox">
                                            <span>{itm.question_no}</span> (<span style={{ fontSize: "14px" }}>{itm.answer})</span>
                                        </p>
                                    </div>
                                    {/*<div style={singleAnswer} className="singleAnswer">*/}
                                    {/*    /!*<p><span>{itm.question_no}</span><span>{itm.answer}</span></p>*!/*/}
                                    {/*    <p style={{ fontSize: "16px", color: 'black' }}>*/}
                                    {/*        <span>{itm.question_no}</span> (<span style={{ fontSize: "14px" }}>{itm.answer})</span>*/}
                                    {/*    </p>*/}
                                    {/*    /!*<Solution  solution_hin={parse(itm.solution_hin)} />*!/*/}
                                    {/*</div>*/}
                                </>)
                            })
                        }

                    </div>

                </div>

            }
        </>
    );

}

const fontStyle = {
    fontFamily: 'Poppins, cursive',
    textAlign: "center",
    color: "black",
    fontSize: "24px",
    fontWeight:"900"
};
const answerBox = {
    display: "flex",
    flexWrap: "wrap",
    marginBottom:"30px",
    justifyContent: "start",
    justifyContentSize: "start",
    // padding: "4px",
    // margin: "4px",
    fontFamily:"Poppins"
};
const shortAnswerBody = {
    breakInside: "avoid",
    opacity: 1,
    width: "100%",
};
const singleAnswer = {
    border: "1px solid black",
    padding: "0px 2px",
    fontFamily: "Times New Roman",
    margin: "2px",
    width: "69px",
    height:"30px",
    textAlign: "center",
    breakInside: "avoid",
    fontWeight: "bold",
    borderRadius: "2px"
};
export default ShortAnswer;
