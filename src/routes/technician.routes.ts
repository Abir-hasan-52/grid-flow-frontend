

const prefix = "/technician";
export const TechnicianRoutes=   [
    {
      title: "Management",
      
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