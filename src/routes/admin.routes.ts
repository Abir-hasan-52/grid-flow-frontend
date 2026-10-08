
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
      ],
    },
    {
      title: "Infrastructure",
      url: "#",
      items: [
        {
          title: "Zones",
          url: `${prefix}/zones`,
        },
        {
          title: "Substations",
          url: `${prefix}/substations`,
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