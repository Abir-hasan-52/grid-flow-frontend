

const prefix = "/customer";
export const CustomerRoutes=   [
    {
      title: "tktk",
      
      items: [
        {
          title: "overview",
          url:  `${prefix}`,
        },
        {
          title: "Announcements",
          url: `${prefix}/announcements`,
        },
      ],
    },
    {
      title: "Infrastructure",
      url: "#",
      items: [
        {
          title: "My Applications",
          url: `${prefix}/my-applications`,
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