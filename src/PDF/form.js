import { useState, useRef } from "react";
// import { RxCross2 } from "react-icons/rx";
import { useNavigate, useLocation } from "react-router-dom";

const FormPage = () => {
  const [id, setId] = useState();
  const [psw, setPsw] = useState();
  const [endpoint, setEndpoint] = useState();


  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const accessPdf = async (e) => {
    e.preventDefault();
    // setIsLoading(true)
    // let options = {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ set_id: id, set_password: psw, endpoint: endpoint }),
    // };
    // const response = await fetch(
    //   `https://teach-backend.bigbooster.in/app-to-web`,
    //   options
    // );
    // const data = await response.json();
    // // console.log(data["data"]);
    // setIsLoading(false)
    navigate('/pdf', { state: {data:{ set_id: id, set_password: psw, endpoint: endpoint }, path:location.pathname}});
  };

  return (
    <>


      <div className="hero center min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <form className="text-center" onSubmit={accessPdf}>
            <input
                type="text"
                placeholder="Set Id"
                className="input rounded-[5px] input-bordered text-sm  w-full m-2 !rounded-sm c-font1"
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
            /><br/>
            <input
                type="password"
                placeholder="Password"
                className="input input-bordered text-sm rounded-[5px] w-full m-2 !rounded-sm c-font1"
                value={psw}
                onChange={(e) => setPsw(e.target.value)}
                required
            /><br/>
            <input
                type="text"
                placeholder="end point... (optional)"
                className="input input-bordered text-sm rounded-[5px] w-full m-2 !rounded-sm c-font1"
                value={endpoint}
                onChange={(e) => setEndpoint(e.target.value)}
            /><br/>
            {

              !isLoading? <button type="submit"className="btn cbtn bg-neutral-800 text-white w-full m-2 !rounded-sm c-font1 normal-case">
                Submit
              </button>:<button type="submit" className="btn cbtn bg-neutral-800 text-white w-full m-2 !rounded-sm c-font1 normal-case loading btn-disabled" ></button>
            }
          </form>
          {/* <div>
            <h1 className="text-5xl font-bold">Access PDF</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            <button className="btn btn-primary">Get Started</button>
          </div> */}
        </div>
      </div>


    </>
  );
};
export default FormPage;
