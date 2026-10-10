
const prefix = "/admin";
export const AdminRoutes=   [
    {
      title: "User Management",
      
      items: [
        {
          title: "overview",
          url:  `${prefix}`,
        },
        {
          title: "Users",
          url: `${prefix}/user-management`,
        },
        {
            title: "Roles",
            url: `${prefix}/roles`,
        }
      ],
    },
    {
      title: "Infrastructure",
      url: "#",
      items: [
        {
          title: "Infrastructure Overview",
          url: `${prefix}/Infrastructure`,
        },
        {
          title: "Announcements",
          url: `${prefix}/announcements`,
          isActive: true,
        },
        {
          title: "Job Posts",
          url: `${prefix}/job-posts`,
          isActive: true,
        },
        {
          title: "Areas",
          url: `${prefix}/areas`,
          isActive: true,
        },
         
        
      ],
    },
     
  ]