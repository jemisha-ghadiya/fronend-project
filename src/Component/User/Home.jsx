import React from "react";
import { Link } from "react-router-dom";

function Home(){
    return(
        <div className="container">
         <div className="form-container">
            <form>
                <h1><Link to='/user/login'> Welcome to the home Page</Link></h1>
            </form>
        </div>
        </div>

    )
}
export default Home;