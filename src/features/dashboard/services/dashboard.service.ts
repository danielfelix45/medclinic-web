import { api } from "../../../services/api/client";

interface PaginatedResponse {
  total: number;
}

export interface DashboardStats {
  patients: number;
  doctors: number;
  scheduledAppointments: number;
  completedAppointments: number;
}

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    const [patients, doctors, scheduled, completed] = await Promise.all([
      api.get<PaginatedResponse>("/patients", {
        params: { page: 1, limit: 1 },
      }),

      api.get<PaginatedResponse>("/doctors", {
        params: { page: 1, limit: 1 },
      }),

      api.get<PaginatedResponse>("/consultas", {
        params: {
          page: 1,
          limit: 1,
          status: "AGENDADA",
        },
      }),

      api.get<PaginatedResponse>("/consultas", {
        params: {
          page: 1,
          limit: 1,
          status: "REALIZADA",
        },
      }),
    ]);

    return {
      patients: patients.data.total,
      doctors: doctors.data.total,
      scheduledAppointments: scheduled.data.total,
      completedAppointments: completed.data.total,
    };
  },
};
