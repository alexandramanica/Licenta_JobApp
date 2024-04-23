import CV from "./Views/Student/CVPage/CV";
import Settings from "./Views/Student/SettingsPage/Settings";
import Dashboard from "./Views/Student/DashboardPage/Dashboard";   
import LearningPath from "./Views/Student/LearningPath/LearningPath.jsx"; 
import JobsPage from "./Views/Student/JobsPage/JobsPage.jsx";
import QuizPage from'./Views/Student/QuizPage/QuizPage.jsx';

import DashboardRecruiter from "./Views/Company/DashboardRecruiter/DashboardRecruiter.jsx";
import SettingsRecruiter from "./Views/Company/SettingsRecruiter/SettingsRecruiter.jsx";
import JobsRecruiter from "./Views/Company/JobsRecruiter/JobsRecruiter.jsx";
import CandidatesRecruiter from "./Views/Company/CandidatesRecruiter/CandidatesRecruiter.jsx";
import RecruiterProfile from "./Views/Company/RecruiterProfile/RecruiterProfile.jsx";

import SignUp from "./Views/Common/Signup/SignUp";
import Login from "./Views/Common/Login/Login";
import Home from "./Views/Common/Home/Home";


export const routes=Object.freeze([
{
    path:"/CV",
    component:CV,
    name:"CV"
},
{
    path:"/Settings",
    component:Settings,
    name:"Settings"
},
{
    path:"/JobsPage",
    component:JobsPage,
    name:"Jobs"
},
{
    path:"/Dashboard",
    component:Dashboard,
    name:"Dashboard"
},
{
    path:"/LearningPath",
    component:LearningPath,
    name:"LearningPath"
},{
    path:"/QuizPage",
    component:QuizPage,
    name:"QuizPage"
},{
    path:"/SignUp",
    component:SignUp,
    name:"SignUp"
},
{
    path:"/Login",
    component:Login,
    name:"Login"
},
{
    path:"/",
    component:Home,
    name:"Home"
},
{
    path:"/DashboardRecruiter",
    component:DashboardRecruiter,
    name:"DashboardRecruiter"
},
{
    path:"/SettingsRecruiter",
    component:SettingsRecruiter,
    name:"Account Settings"
},{
    path:"/JobsRecruiter",
    component:JobsRecruiter,
    name:"Jobs"
},
{
    path:"/CandidatesRecruiter",
    component:CandidatesRecruiter,
    name:"Candidates"
},{
    path:"/RecruiterProfile",
    component:RecruiterProfile,
    name:"Your profile"
}
]);