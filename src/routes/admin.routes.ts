
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
          title: "Feeder",
          url: `${prefix}/feeder`,
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