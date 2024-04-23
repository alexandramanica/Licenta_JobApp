import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

export const BarCompanyData = Object.freeze([
    {
        path:"/DashboardRecruiter",
        name:"Dashboard",
        icon:<HomeIcon/>
    },
    {
        path:"/RecruiterProfile",
        name:"My Profile",
        icon:<AssignmentIndIcon/>
    },
    {
        path:"/JobsRecruiter",
        name:"Jobs",
        icon:<WorkIcon/>
    },
    {
        path:"/CandidatesRecruiter",
        name:"Candidates",
        icon:<PersonIcon/>
    },
    {
        path:"/SettingsRecruiter",
        name:"Account Settings",
        icon:<SettingsIcon/>
    },
])