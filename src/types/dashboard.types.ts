export interface StatusCount {
  status: string;
  _count: number;
}

export interface TypeCount {
  type: string;
  _count: number;
}

/* ========= ADMIN ========= */

export interface AdminDashboardData {
  users: {
    customers: number;
    technicians: number;
    zoneManagers: number;
    admins: number;
    newCustomersThisMonth: number;
    newTechniciansThisMonth: number;
  };
  infrastructure: {
    zones: number;
    substations: number;
    feeders: number;
    areas: number;
  };
  outages: {
    total: number;
    open: number;
    byStatus: StatusCount[];
    avgRestorationMinutes: number | null;
    slaBreachCount: number;
    topZonesByOutages: {
      zoneId: string;
      zoneName: string;
      outageCount: number;
    }[];
  };
  loadShedding: {
    total: number;
    byStatus: StatusCount[];
  };
  assignments: {
    total: number;
    byStatus: StatusCount[];
    acceptanceRatePercent: number | null;
  };
  priorityRestoration: {
    totalRequests: number;
    approvedRequests: number;
    totalRevenue: string;
  };
  jobs: {
    totalJobPosts: number;
    publishedJobPosts: number;
    totalApplications: number;
    pendingApplications: number;
  };
  announcements: {
    byStatus: StatusCount[];
    byType: TypeCount[];
  };
  systemHealth: {
    emailsByStatus: StatusCount[];
  };
}

/* ========= ZONE MANAGER ========= */

export interface ZoneManagerDashboardData {
  zone: { id: string; name?: string };
  infrastructure: {
    substations: number;
    feeders: number;
    areas: number;
    technicians: number;
  };
  outages: {
    total: number;
    open: number;
    byStatus: StatusCount[];
    avgRestorationMinutes: number | null;
    recentOutages: {
      id: string;
      status: string;
      createdAt: string;
      feeder: { name: string };
    }[];
  };
  loadShedding: {
    pendingApproval: number;
    approved: number;
  };
  assignments: {
    total: number;
    byStatus: StatusCount[];
  };
  priorityRestoration: {
    totalRequests: number;
    zoneRevenue: string;
  };
  announcementCount: number;
  technicianWorkload: {
    technicianId: string;
    name: string;
    activeAssignments: number;
  }[];
}

export interface ZoneManagerNoZoneError {
  error: string;
}

export type ZoneManagerDashboardResponse =
  | ZoneManagerDashboardData
  | ZoneManagerNoZoneError;

/* ========= TECHNICIAN ========= */

export interface TechnicianDashboardData {
  assignments: {
    byStatus: StatusCount[];
    priorityCount: number;
  };
  totalRepairUpdatesLogged: number;
  completedThisMonth: number;
  rejectionRatePercent: number | null;
  recentAssignments: {
    id: string;
    outage: {
      id: string;
      status: string;
      feeder: { name: string };
    };
  }[];
}

/* ========= CUSTOMER ========= */

export interface CustomerDashboardData {
  accountSummary: {
    name: string;
    email: string;
    phone: string | null;
    area: string | null;
    memberSince: string;
  };
  reports: { total: number };
  priorityRequests: { total: number; approved: number };
  totalSpent: string | number;
  paymentHistory: {
    id: string;
    amount: string;
    status: string;
    transactionId: string | null;
    createdAt: string;
  }[];
  currentAreaOutage: {
    id: string;
    status: string;
    createdAt: string;
  } | null;
  recentAnnouncements: {
    id: string;
    title: string;
    type: string;
    createdAt: string;
  }[];
  upcomingLoadShedding: {
    id: string;
    title: string;
    startTime: string;
    endTime: string;
    status: string;
  }[];
  technicianApplicationStatus: {
    id: string;
    status: string;
    createdAt: string;
    jobPost: { title: string };
  } | null;
}