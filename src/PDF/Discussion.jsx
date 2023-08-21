import Solution from "./Solution";
const parse = require("html-react-parser");

function Discussion(props) {
    var solution_hin = props.solution_hin
    return (
        <>
            {
                <div style={shortAnswerBody} className="">
                    <hr style={{ borderTop: '1px dashed black', color: "transparent" }} />
                    <p style={fontStyle} contentEditable={true}>Discussion</p>
                    <div  className="container-content ">
                        {
                            props.answer.map((itm, index) => {
                                return (<>
                                    <div style={{display:"flex"}}>
                                        <p style={{display:"flex"}}>
                                            <span style={{marginRight:"4px"}}>{itm.question_no}</span> (<span style={{ fontSize: "14px" }}>{itm.answer})</span>
                                        </p>
                                        <Solution  solution_hin={parse(itm.solution_hin)} />
                                    </div>
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
    justifyContent: "start",
    justifyContentSize: "start",
    padding: "4px",
    margin: "4px",
    fontFamily:"Poppins"
};
const shortAnswerBody = {
    // breakInside: "avoid",
    marginTop:"10px",
    opacity: 1,
    width: "100%",
};
const singleAnswer = {
    // border: "1px solid black",
    padding: "0px 2px",
    fontFamily: "Times New Roman",
    margin: "2px",
    width: "69.5px",
    textAlign: "center",
    breakInside: "avoid",
    fontWeight: "bold",
    borderRadius: "2px"
};
export default Discussion;
