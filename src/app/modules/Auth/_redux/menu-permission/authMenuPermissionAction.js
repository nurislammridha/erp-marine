import axios from "axios";
import { getVesselId } from "../authCrud";
import * as Types from "../authTypes";

export const GetMenuListsByPermission = () => async (dispatch) => {
  let menuList = [
    /**
        | Module : Hr Management
        */
    {
      moduleName: "HR",
      moduleRouteUrl: "/employee",
      moduleImageIcon: "/media/svg/icons/Code/Compiling.svg",
      subModules: [
        {
          subModuleName: "Employee",
          subModuleRouteUrl: "/employee/employee-list",
          subModuleIcon: "menu-bullet menu-bullet-dot",
          features: [
            {
              featureName: "All Employees",
              featureRouteUrl: "/employee/employee-list",
              featureIcon: "menu-bullet menu-bullet-dot",
            },

            {
              featureName: "Employee Create",
              featureRouteUrl: "/employee/employee-add",
              featureIcon: "menu-bullet menu-bullet-dot",
            },
            {
              featureName: "Employee Sign In/Out",
              featureRouteUrl: "/employee/employee-signing-list",
              featureIcon: "menu-bullet menu-bullet-dot",
            },

            {
              featureName: "Employee CR Report",
              featureRouteUrl: "/employee/employee-cr-report",
              featureIcon: "menu-bullet menu-bullet-dot",
            },
          ],
        },
      ],
    },

    {
      moduleName: "Expense",
      moduleRouteUrl: "/addition-deduction",
      moduleImageIcon: "/media/svg/icons/Code/Compiling.svg",
      subModules: [
        {
          subModuleName: "New Expense",
          subModuleRouteUrl: "/addition-deduction",
          subModuleIcon: "menu-bullet menu-bullet-dot",
          features: [
            {
              featureName: "Manual",
              featureRouteUrl: "/addition-deduction",
              featureIcon: "menu-bullet menu-bullet-dot",
            },
            {
              featureName: "Bulk",
              featureRouteUrl: "/addition-deduction/bulk",
              featureIcon: "menu-bullet menu-bullet-dot",
            },
            {
              featureName: "Currency Conversion",
              featureRouteUrl: "/currency-conversion",
              featureIcon: "menu-bullet menu-bullet-dot",
            },
          ],
        },
      ],
    },

    /**
        | Module : Vessel
        */
    {
      moduleName: "Vessel",
      moduleRouteUrl: "/vessels/list",
      moduleImageIcon: "/media/svg/icons/Code/Compiling.svg",
      subModules: [
        {
          subModuleName: "Vessel",
          subModuleRouteUrl: "/vessel-list",
          subModuleIcon: "menu-bullet menu-bullet-dot",
          features: [
            {
              featureName: "Vessel List",
              featureRouteUrl: "/vessels/list",
              featureIcon: "menu-bullet menu-bullet-dot",
            },
            {
              featureName: "Create Vessel",
              featureRouteUrl: "/vessels/add",
              featureIcon: "menu-bullet menu-bullet-dot",
            },
            {
              featureName: "Vessel Account",
              featureRouteUrl: "/vessels/vessel-account",
              featureIcon: "menu-bullet menu-bullet-dot",
            },
          ],
        },
        {
          subModuleName: "Vessel Items",
          subModuleRouteUrl: "/vessel-items/list",
          subModuleIcon: "menu-bullet menu-bullet-dot",
          features: [
            {
              featureName: "Item List",
              featureRouteUrl: "/vessel-items/list",
              featureIcon: "menu-bullet menu-bullet-dot",
            },
          ],
        },
      ],
    },

    {
      moduleName: "Certificate",
      moduleRouteUrl: "/certificates/list",
      moduleImageIcon: "/media/svg/icons/Code/Compiling.svg",
      subModules: [
        {
          subModuleName: "Detail",
          subModuleRouteUrl: "/certificates-main/list",
          subModuleIcon: "menu-bullet menu-bullet-dot",
          features: [
            {
              featureName: "New Certificate",
              featureRouteUrl: "/certificates-main/create",
              featureIcon: "menu-bullet menu-bullet-dot",
            },
            {
              featureName: "Certificate List",
              featureRouteUrl: "/certificates-main/list",
              featureIcon: "menu-bullet menu-bullet-dot",
            },
          ],
        },
        {
          subModuleName: "Configure",
          subModuleRouteUrl: "/certificate/configure/list",
          subModuleIcon: "menu-bullet menu-bullet-dot",
          features: [
            {
              featureName: "Master Certificate",
              featureRouteUrl: "/certificate/configure/master-certificate",
              featureIcon: "menu-bullet menu-bullet-dot",
            },
            {
              featureName: "Categories",
              featureRouteUrl: "/certificate/configure/categories",
              featureIcon: "menu-bullet menu-bullet-dot",
            },
            {
              featureName: "Issuing Authority",
              featureRouteUrl: "/certificate/configure/issuing-authority",
              featureIcon: "menu-bullet menu-bullet-dot",
            },
            {
              featureName: "Types",
              featureRouteUrl: "/certificate/configure/types",
              featureIcon: "menu-bullet menu-bullet-dot",
            },
          ],
        },
      ],
    },
    {
      moduleName: "Procurement",
      moduleRouteUrl: "/vessels/list",
      moduleImageIcon: "/media/svg/icons/Code/Compiling.svg",
      subModules: [
        {
          subModuleName: "Procurement",
          subModuleRouteUrl: "/supply-chain/procurement",
          subModuleIcon: "menu-bullet menu-bullet-dot",
          features: [
            {
              featureName: "Purchase Requisition (Indent)",
              featureRouteUrl: "/supply-chain/procurement/purchase-requisition",
              featureIcon: "menu-bullet menu-bullet-dot",
            },
            {
              featureName: "Cargo Booking",
              featureRouteUrl: "/supply-chain/procurement/demand-entry",
              featureIcon: "menu-bullet menu-bullet-dot",
            },
            {
              featureName: "Pending Top Sheet",
              featureRouteUrl: "/supply-chain/procurement/top-sheet",
              featureIcon: "menu-bullet menu-bullet-dot",
            },
            {
              featureName: "Cargo Pending Details",
              featureRouteUrl:
                "/supply-chain/procurement/cargo-pending-details",
              featureIcon: "menu-bullet menu-bullet-dot",
            },
            {
              featureName: "Approve Top Sheet",
              featureRouteUrl: "/supply-chain/procurement/aprv-top-sheet",
              featureIcon: "menu-bullet menu-bullet-dot",
            },
            {
              featureName: "Booking Update Detaills",
              featureRouteUrl:
                "/supply-chain/procurement/booking-unpdate-details",
              featureIcon: "menu-bullet menu-bullet-dot",
            },
          ],
        },
      ],
    },

    {
      moduleName: "Voyage",
      moduleRouteUrl: "/voyage",
      moduleImageIcon: "/media/svg/icons/Code/Compiling.svg",
      subModules: [
        {
          subModuleName: "Voyage",
          subModuleRouteUrl: "/voyage/list",
          subModuleIcon: "menu-bullet menu-bullet-dot",
          features: [
            {
              featureName: "Voyage List",
              featureRouteUrl: "/voyage/list",
              featureIcon: "menu-bullet menu-bullet-dot",
            },
            // {
            //   featureName: "Voyage Create",
            //   featureRouteUrl: "/voyage/create",
            //   featureIcon: "menu-bullet menu-bullet-dot",
            // },
          ],
        },
        {
          subModuleName: "Noon Report",
          subModuleRouteUrl: "/voyage/voyage-activity",
          subModuleIcon: "menu-bullet menu-bullet-dot",
          features: [
            {
              featureName: "Noon Report List",
              featureRouteUrl: "/voyage/voyage-activity",
              featureIcon: "menu-bullet menu-bullet-dot",
            },
            // {
            //   featureName: "Voyage Activity Create",
            //   featureRouteUrl: "/voyage/voyage-activity/create",
            //   featureIcon: "menu-bullet menu-bullet-dot",
            // },
          ],
        },
      ],
    },

    /**
         | Module :Report
         */
    {
      moduleName: "Reports",
      moduleRouteUrl: "/report",
      moduleImageIcon: "/media/svg/icons/Shopping/Gift.svg",
      subModules: [
        {
          subModuleName: "Voyage Report",
          subModuleRouteUrl: "/report/noon-report",
          subModuleIcon: "menu-bullet menu-bullet-dot",
          features: [
            {
              featureName: "Noon Report",
              featureRouteUrl: "/report/noon-report",
              featureIcon: "menu-bullet menu-bullet-dot",
            },
          ],
        },

        {
          subModuleName: "Wages Report",
          subModuleRouteUrl: "/report/salary-report",
          subModuleIcon: "menu-bullet menu-bullet-dot",
          features: [
            {
              featureName: "Salary Form Generate",
              featureRouteUrl: "/report/salary-report-form",
              featureIcon: "menu-bullet menu-bullet-dot",
            },
            {
              featureName: "Salary Report",
              featureRouteUrl: "/report/salary-report",
              featureIcon: "menu-bullet menu-bullet-dot",
            },

            {
              featureName: "Salary Check Report",
              featureRouteUrl: "/report/salary-report-check",
              featureIcon: "menu-bullet menu-bullet-dot",
            },

            {
              featureName: "Salary Generate",
              featureRouteUrl: "/report/salary-generate",
              featureIcon: "menu-bullet menu-bullet-dot",
            },

            {
              featureName: "BEFTN Report",
              featureRouteUrl: "/report/beftn-report",
              featureIcon: "menu-bullet menu-bullet-dot",
            },
            {
              featureName: "FCBEFTN Report",
              featureRouteUrl: "/report/beftn-report-fc",
              featureIcon: "menu-bullet menu-bullet-dot",
            },
          ],
        },
        {
          subModuleName: "Certificate Report",
          subModuleRouteUrl: "/report/certificate-report",
          subModuleIcon: "menu-bullet menu-bullet-dot",
          features: [
            {
              featureName: "All Report",
              featureRouteUrl: "/report/all-report",
              featureIcon: "menu-bullet menu-bullet-dot",
            },
            {
              featureName: "Day Report",
              featureRouteUrl: "/report/day-report",
              featureIcon: "menu-bullet menu-bullet-dot",
            },
          ],
        },
      ],
    },
  ];

  const vesselId = await getVesselId();
  if (typeof vesselId !== undefined && vesselId !== null && vesselId !== "") {
    menuList = [
      {
        moduleName: "HR",
        moduleRouteUrl: "/employee",
        moduleImageIcon: "/media/svg/icons/Code/Compiling.svg",
        subModules: [
          {
            subModuleName: "Employee Management",
            subModuleRouteUrl: "/employee/employee-list",
            subModuleIcon: "menu-bullet menu-bullet-dot",
            features: [
              {
                featureName: "All Employees",
                featureRouteUrl: "/employee/employee-list",
                featureIcon: "menu-bullet menu-bullet-dot",
              },
            ],
          },
        ],
      },
      {
        moduleName: "Expense",
        moduleRouteUrl: "/addition-deduction",
        moduleImageIcon: "/media/svg/icons/Code/Compiling.svg",
        subModules: [
          {
            subModuleName: "New Expense",
            subModuleRouteUrl: "/addition-deduction",
            subModuleIcon: "menu-bullet menu-bullet-dot",
            features: [
              {
                featureName: "Manual",
                featureRouteUrl: "/addition-deduction",
                featureIcon: "menu-bullet menu-bullet-dot",
              },
              {
                featureName: "Bulk",
                featureRouteUrl: "/addition-deduction/bulk",
                featureIcon: "menu-bullet menu-bullet-dot",
              },
            ],
          },
        ],
      },
      {
        moduleName: "Vessel",
        moduleRouteUrl: "/vessels/list",
        moduleImageIcon: "/media/svg/icons/Code/Compiling.svg",
        subModules: [
          {
            subModuleName: "Vessel Items",
            subModuleRouteUrl: "/vessel-items/list",
            subModuleIcon: "menu-bullet menu-bullet-dot",
            features: [
              {
                featureName: "Item List",
                featureRouteUrl: "/vessel-items/list",
                featureIcon: "menu-bullet menu-bullet-dot",
              },
            ],
          },
        ],
      },
      {
        moduleName: "Reports",
        moduleRouteUrl: "/report",
        moduleImageIcon: "/media/svg/icons/Shopping/Gift.svg",
        subModules: [
          {
            subModuleName: "Noon Report",
            subModuleRouteUrl: "/report/noon-report",
            subModuleIcon: "menu-bullet menu-bullet-dot",
            features: [
              {
                featureName: "Noon Report",
                featureRouteUrl: "/report/noon-report",
                featureIcon: "menu-bullet menu-bullet-dot",
              },
            ],
          },

          {
            subModuleName: "Wages Report",
            subModuleRouteUrl: "/report/salary-report",
            subModuleIcon: "menu-bullet menu-bullet-dot",
            features: [
              {
                featureName: "Salary Check Report",
                featureRouteUrl: "/report/salary-report-check",
                featureIcon: "menu-bullet menu-bullet-dot",
              },
              {
                featureName: "BEFTN Report",
                featureRouteUrl: "/report/beftn-report",
                featureIcon: "menu-bullet menu-bullet-dot",
              },
              {
                featureName: "FCBEFTN Report",
                featureRouteUrl: "/report/beftn-report-fc",
                featureIcon: "menu-bullet menu-bullet-dot",
              },
            ],
          },
        ],
      },
      {
        moduleName: "Voyage",
        moduleRouteUrl: "/voyage",
        moduleImageIcon: "/media/svg/icons/Code/Compiling.svg",
        subModules: [
          {
            subModuleName: "Voyage",
            subModuleRouteUrl: "/voyage/list",
            subModuleIcon: "menu-bullet menu-bullet-dot",
            features: [
              {
                featureName: "Voyage List",
                featureRouteUrl: "/voyage/list",
                featureIcon: "menu-bullet menu-bullet-dot",
              },
              // {
              //   featureName: "Voyage Create",
              //   featureRouteUrl: "/voyage/create",
              //   featureIcon: "menu-bullet menu-bullet-dot",
              // },
            ],
          },
          {
            subModuleName: "Noon Report",
            subModuleRouteUrl: "/voyage/voyage-activity",
            subModuleIcon: "menu-bullet menu-bullet-dot",
            features: [
              {
                featureName: "Noon Report List",
                featureRouteUrl: "/voyage/voyage-activity",
                featureIcon: "menu-bullet menu-bullet-dot",
              },
              // {
              //   featureName: "Voyage Activity Create",
              //   featureRouteUrl: "/voyage/voyage-activity/create",
              //   featureIcon: "menu-bullet menu-bullet-dot",
              // },
            ],
          },
        ],
      },
    ];
  }

  dispatch({ type: Types.GET_MENU_LIST, payload: menuList });
};

/** Dummy Axios call for Example */
export const DummyAxiosCall = () => async (dispatch) => {
  await axios.get(`https://testapi.com/?AccountId=1`).then((res) => {
    // dispatch({ type: Types.GET_EMPLOYEE_INFO, payload: res.data });
    console.log("res", res);
  });
  // dispatch({ type: Types.GET_BLOOD_GROUP_LIST, payload: "data" });
};
