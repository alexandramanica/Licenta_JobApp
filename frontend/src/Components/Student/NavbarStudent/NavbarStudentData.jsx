import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import SettingsIcon from '@mui/icons-material/Settings';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import SchoolIcon from '@mui/icons-material/School';

export const NavbarStudentData = Object.freeze([
    {
        path:"/Dashboard",
        name:"Dashboard",
        icon:<HomeIcon/>
    },
    {
        path:"/CV",
        name:"CV",
        icon:<AssignmentIndIcon/>
    },
    {
        path:"/AppliedJobs",
        name:"Applied Jobs",
        icon:<BookmarkBorderIcon/>
    },
    {
        path:"/LearningPath",
        name:"Learning Path",
        icon:<SchoolIcon/>
    },{
        path:"/Settings",
        name:"Account Settings",
        icon:<SettingsIcon/>
    }
])