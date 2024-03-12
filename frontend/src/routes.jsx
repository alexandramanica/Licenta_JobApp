import CV from "./Views/Student/CVPage/CV";
import Settings from "./Views/Student/SettingsPage/Settings";
import AppliedJobs from "./Views/Student/AppliedJobs";
import Dashboard from "./Views/Student/DashboardPage/Dashboard";   
import LearningPath from "./Views/Student/LearningPath"; 
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
    path:"/AppliedJobs",
    component:AppliedJobs,
    name:"AppliedJobs"
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
}
]);