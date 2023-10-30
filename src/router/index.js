import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../pages/Login.vue'
import Dashboard from '../pages/Dashboard.vue'
import GantiPassword from '../pages/GantiPassword.vue'

import PendingTask from '../pages/Task/PendingTask.vue'
import PTEmpDetail from '../pages/Task/PTEmpDetail.vue'

import Admin from '../pages/MainData/Admin.vue'
import AdminRole from '../pages/MainData/AdminRole.vue'

import SysParam from '../pages/Employee/SysParam.vue'
import Employee from '../pages/Employee/Employee.vue'
import EmpDetail from '../pages/Employee/EmpDetail.vue'
import EmpAddEdit from '../pages/Employee/EmpAddEdit.vue'
import EmployeeTerminasi from '../pages/Employee/EmployeeTerminasi.vue'

import Loan from '../pages/Payroll/Loan.vue'
import Reimbursement from '../pages/Payroll/Reimbursement.vue'
import Salary from '../pages/Payroll/Salary.vue'

import JobSeekerProfile from '../pages/Recruitment/JobSeekerProfile.vue'
import OpenRecruitment from '../pages/Recruitment/OpenRecruitment.vue'
import ScheduleRecruitment from '../pages/Recruitment/ScheduleRecruitment.vue'
import ScheduleDetail from '../pages/Recruitment/ScheduleRecruitmentDetail.vue'
import SelectionResult from '../pages/Recruitment/SelectionResult.vue'
import ResultDetail from '../pages/Recruitment/ResultRecruitmentDetail.vue'

import Demosi from '../pages/Utilities/Demosi.vue'
import GajiKaryawan from '../pages/Utilities/GajiKaryawan.vue'
import KontrakKaryawan from '../pages/Utilities/KontrakKaryawan.vue'
import MutasiKaryawan from '../pages/Utilities/MutasiKaryawan.vue'
import PenugasanKaryawan from '../pages/Utilities/PenugasanKaryawan.vue'
import PromosiKaryawan from '../pages/Utilities/PromosiKaryawan.vue'
import StatusKaryawan from '../pages/Utilities/StatusKaryawan.vue'
import SuratPeringatan from '../pages/Utilities/SuratPeringatan.vue'
import TerminasiKaryawan from '../pages/Utilities/TerminasiKaryawan.vue'

import AttendanceSetting from '../pages/TimeAttendance/AttendanceSetting.vue'
import DailyAttendance from '../pages/TimeAttendance/DailyAttendance.vue'
import HistoryAttendace from '../pages/TimeAttendance/HistoryAttendace.vue'
import EmployeePermit from '../pages/TimeAttendance/EmployeePermit.vue'
import EmployeeOvertime from '../pages/TimeAttendance/EmployeeOvertime.vue'

import TrainingRequest from '../pages/Training/TrainingRequest.vue'
import TrainingOnGoing from '../pages/Training/TrainingOngoing.vue'
import TrainingEvaluation from '../pages/Training/TrainingEvaluation.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },{
    path: '/Uploads',
    name: 'Login',
    component: Login
  },
  {
    path: '/GantiPassword',
    name: 'GantiPassword',
    component: GantiPassword
  },
  {
    path: '/Dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/Admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/AdminRole',
    name: 'AdminRole',
    component: AdminRole
  }, 
 
  {
    path: '/PendingTask',
    name: 'PendingTask',
    component: PendingTask
  },
  {
    path: '/PTEmpDetail',
    name: 'PTEmpDetail',
    component: PTEmpDetail
  },

  {
    path: '/SysParam',
    name: 'SysParam',
    component: SysParam
  },
  {
    path: '/Employee',
    name: 'Employee',
    component: Employee
  },
  {
    path: '/EmpDetail',
    name: 'EmpDetail',
    component: EmpDetail
  },
  {
    path: '/EmpAddEdit',
    name: 'EmpAddEdit',
    component: EmpAddEdit
  },
  {
    path: '/EmployeeTerminasi',
    name: 'EmployeeTerminasi',
    component: EmployeeTerminasi
  },

  {
    path: '/Loan',
    name: 'Loan',
    component: Loan
  },

  {
    path: '/Reimbursement',
    name: 'Reimbursement',
    component: Reimbursement
  },

  {
    path: '/Salary',
    name: 'Salary',
    component: Salary
  },

  {
    path: '/JobSeekerProfile',
    name: 'JobSeekerProfile',
    component: JobSeekerProfile
  },

  {
    path: '/OpenRecruitment',
    name: 'OpenRecruitment',
    component: OpenRecruitment
  },
  
  {
    path: '/ScheduleRecruitment',
    name: 'ScheduleRecruitment',
    component: ScheduleRecruitment
  },
  {
    path: '/ScheduleDetail',
    name: 'ScheduleDetail',
    component: ScheduleDetail
  },
  
  {
    path: '/SelectionResult',
    name: 'SelectionResult',
    component: SelectionResult
  },
  {
    path: '/ResultDetail',
    name: 'ResultDetail',
    component: ResultDetail
  },

  {
    path: '/AttendanceSetting',
    name: 'AttendanceSetting',
    component: AttendanceSetting
  },
  {
    path: '/DailyAttendance',
    name: 'DailyAttendance',
    component: DailyAttendance
  },

  {
    path: '/HistoryAttendace',
    name: 'HistoryAttendace',
    component: HistoryAttendace
  },

  {
    path: '/EmployeePermit',
    name: 'EmployeePermit',
    component: EmployeePermit
  },

  {
    path: '/EmployeeOvertime',
    name: 'EmployeeOvertime',
    component: EmployeeOvertime
  },

  {
    path: '/TrainingRequest',
    name: 'TrainingRequest',
    component: TrainingRequest
  },

  {
    path: '/TrainingOnGoing',
    name: 'TrainingOnGoing',
    component: TrainingOnGoing
  },
  {
    path: '/TrainingEvaluation',
    name: 'TrainingEvaluation',
    component: TrainingEvaluation
  },
  
  {
    path: '/Demosi',
    name: 'Demosi',
    component: Demosi
  },
  {
    path: '/GajiKaryawan',
    name: 'GajiKaryawan',
    component: GajiKaryawan
  },
  {
    path: '/KontrakKaryawan',
    name: 'KontrakKaryawan',
    component: KontrakKaryawan
  },
  {
    path: '/MutasiKaryawan',
    name: 'MutasiKaryawan',
    component: MutasiKaryawan
  },
  {
    path: '/PenugasanKaryawan',
    name: 'PenugasanKaryawan',
    component: PenugasanKaryawan
  },
  {
    path: '/PromosiKaryawan',
    name: 'PromosiKaryawan',
    component: PromosiKaryawan
  },
  {
    path: '/StatusKaryawan',
    name: 'StatusKaryawan',
    component: StatusKaryawan
  },
  {
    path: '/SuratPeringatan',
    name: 'SuratPeringatan',
    component: SuratPeringatan
  },
  {
    path: '/TerminasiKaryawan',
    name: 'TerminasiKaryawan',
    component: TerminasiKaryawan
  },
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
