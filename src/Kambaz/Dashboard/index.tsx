import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link" >
                    <img src="/images/reactjs.png" width={200} />
                    <div>
                        <h5> CS1234 React JS </h5>
                        <p className="wd-dashboard-course-title">
                            Full Stack software developer  
                        </p>
                        <button> Go </button>
                    </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
            <Link to="/Kambaz/Courses/1220/Home"
                className="wd-dashboard-course-link" >
                    <img src="/images/angular.jpg" width={200} />
                    <div>
                        <h5> CS1220 Angular</h5>
                        <p className="wd-dashboard-course-title">
                            Reactive web apps                           
                        </p>
                        <button> Go</button>
                    </div>
                </Link>
        </div>
        
        <div className="wd-dashboard-course">
            <Link to="/Kambaz/Courses/4390/Home"
                className="wd-dashboard-course-link" >
                    <img src="/images/csharpgame.jpg" width={200} />
                    <div>
                        <h5> CS4390 C# Unity</h5>
                        <p className="wd-dashboard-course-title">
                            Unity C# game developer                         
                        </p>
                        <button> Go</button>
                    </div>
                </Link>
        </div>

        <div className="wd-dashboard-course">
            <Link to="/Kambaz/Courses/3500/Home"
                className="wd-dashboard-course-link" >
                    <img src="/images/iosswift.jpg" width={200} />
                    <div>
                        <h5> CS3500 iOS & Swift</h5>
                        <p className="wd-dashboard-course-title">
                            iOS App Developer                        
                        </p>
                        <button> Go</button>
                    </div>
                </Link>
        </div>

         <div className="wd-dashboard-course">
            <Link to="/Kambaz/Courses/4550/Home"
                className="wd-dashboard-course-link" >
                    <img src="/images/unrealengine.jpg" width={200} />
                    <div>
                        <h5> CS3500 Unreal Engine 5</h5>
                        <p className="wd-dashboard-course-title">
                            Epic Games C++ developer                       
                        </p>
                        <button> Go</button>
                    </div>
                </Link>
        </div>

        <div className="wd-dashboard-course">
            <Link to="/Kambaz/Courses/3200/Home"
                className="wd-dashboard-course-link" >
                    <img src="/images/sql.jpg" width={200} />
                    <div>
                        <h5> CS3500 SQL & MySQL</h5>
                        <p className="wd-dashboard-course-title">
                            Data engineer                      
                        </p>
                        <button> Go</button>
                    </div>
                </Link>
        </div>

        <div className="wd-dashboard-course">
            <Link to="/Kambaz/Courses/1500/Home"
                className="wd-dashboard-course-link" >
                    <img src="/images/java.jpg" width={200} />
                    <div>
                        <h5> CS1500 Java</h5>
                        <p className="wd-dashboard-course-title">
                            Java and OOP expert                     
                        </p>
                        <button> Go</button>
                    </div>
                </Link>
        </div>
      </div>
    </div>
);}
