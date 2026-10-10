
const prefix = "/zone-manager";
export const ZoneManagerRoutes=   [
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
          title: "Outages",
          url: `${prefix}/outages`,
        },
        {
          title: "Load Shedding Schedules",
          url: `${prefix}/schedules`,
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