import { type } from "@testing-library/user-event/dist/type";

function Solution(props) {
    var solution_hin = props.solution_hin
    return (
        <>
            <div className="Solution bg-transparent	" >
                <div>
                    <p style={{ fontSize: props.fontSize + "px", padding: "0px 2px 0px 8px" }} >{solution_hin}</p>
                </div>
                <p style={{ fontSize: props.fontSize + "px", padding: "0px 2px 0px 8px" }}  >{props.solution_eng == props.solution_hin ? false : props.solution_eng}</p>
            </div>
        </>
    );
}
export default Solution;
