import { Component } from "react";
import { Link } from "react-router-dom";

import Header from '../Header'
import Footer from '../Footer'
import './index.css'

class Home extends Component{
    render(){
        return(
            <div>
             <Header/>
             <div className="home-container">
               <Link to="/tasks-page"> <button className="tasks-button">Assessments Tasks</button></Link>
                <img src="https://thumbs.dreamstime.com/b/checklist-magnifying-assessment-flat-design-icon-checklist-
                magnifying-assessment-flat-design-icon-eps-vector-design-104302404.jpg" className="task-image" alt="task"/>
             </div>
             <Footer/>
             </div>
        )
    }
}

export default Home