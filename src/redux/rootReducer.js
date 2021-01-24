import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import * as auth from "../app/modules/Auth/_redux/authRedux";
import { customersSlice } from "../app/modules/ECommerce/_redux/customers/customersSlice";
import { productsSlice } from "../app/modules/ECommerce/_redux/products/productsSlice";
import { remarksSlice } from "../app/modules/ECommerce/_redux/remarks/remarksSlice";
import { specificationsSlice } from "../app/modules/ECommerce/_redux/specifications/specificationsSlice";

/** 
| Domain : DCO
*/
import authMenuPermissionReducer from "../app/modules/Auth/_redux/menu-permission/authMenuPermissionReducer";
import ControllingUnitReducer from "../domains/CCO/_redux/reducers/ControllingUnitReducer";
import EmployeeReducer from "../domains/CCO/_redux/reducers/EmployeeReducer";
import EmployeeEducationReducer from "../domains/CCO/_redux/reducers/EmployeeEducationReducer";
import EmployeeRecordReducer from "../domains/CCO/_redux/reducers/EmployeeRecordReducer";
import EmployeeDocumentReducer from "../domains/CCO/_redux/reducers/EmployeeDocumentReducer";
import EmployeeCertificateReducer from "../domains/CCO/_redux/reducers/EmployeeCertificateReducer";
import EmployeeBankDetailsReducer from "../domains/CCO/_redux/reducers/EmployeeBankDetailsReducer";
import EmployeeReferenceReducer from "../domains/CCO/_redux/reducers/EmployeeReferenceReducer";
import VesselReducer from "../domains/Vessel/_redux/reducers/VesselReducer";
import AdditionDeductionReducer from "../domains/CCO/_redux/reducers/AdditionDeductionReducer";
import EmployeeSigningReducer from "../domains/CCO/_redux/reducers/EmployeeSigningReducer";
import PurchaseRequisitionReducer from "../app/modules/SupplyChain/Procurement/_redux/reducers/PurchaseRequisitionReducer";
import EmployeePromotionReducer from "../domains/CCO/_redux/reducers/EmployeePromotionReducer";
import CurrencyReducer from "../domains/CCO/_redux/reducers/CurrencyReducer";
import DemandReducer from "../modules/demand-sheet/redux/reducers/DemandReducer";
import VesselItemReducer from "../domains/VesselItem/_redux/reducers/VesselItemReducer";
import VesselAccountReducer from "../domains/Vessel/_redux/reducers/VesselAccountReducer";
import VoyageReducer from "../modules/voyage/_redux/reducers/VoyageReducer";
import VoyageActivityReducer from "../modules/voyage/_redux/reducers/VoyageActivityReducer";
import VoyageActivityBoilerReducer from "../modules/voyage/_redux/reducers/VoyageActivityBoilerReducer";
import VoyageActivityAuxEngnReducer from "../modules/voyage/_redux/reducers/VoyageActivityAuxEngnReducer";
import VoyageActivityBunkerReducer from "../modules/voyage/_redux/reducers/VoyageActivityBunkerReducer";
import VoyageActivityOfficerReducer from "../modules/voyage/_redux/reducers/VoyageActivityOfficerReducer";
import VoyageActivityAuxEngn2Reducer from "../modules/voyage/_redux/reducers/VoyageActivityAuxEngn2Reducer";
import VoyageActivityAuxEngn3Reducer from "../modules/voyage/_redux/reducers/VoyageActivityAuxEngn3Reducer";
import CertificateMainReducer from "../modules/certificates/certificate-main/_redux/reducers/CertificateMainReducer";
import CertificateTypeReducer from "../modules/certificates/certificate-types/_redux/reducers/CertificateTypeReducer";
import CertificateIssueAuthorityReducer from "../modules/certificates/issue-authority/_redux/reducers/CertificateIssueAuthorityReducer";
import CertificateCategoryReducer from "../modules/certificates/certificate-category/_redux/reducers/CertificateCategoryReducer";
import CertificateListReducer from "../modules/certificates/certificate-master/_redux/reducers/CertificateListReducer";
import LaytimeInfoReducer from "../modules/voyage/laytime/_redux/reducers/LaytimeInfoReducer";
import LaytimeHeaderReducer from "../modules/voyage/laytime/_redux/reducers/LaytimeHeaderReducer";
import BankInfoReducer from "../modules/partners/bank-information/_redux/reducers/BankInfoReducer";
import PartnerAddressReducer from "../modules/partners/address/_redux/reducers/PartnerAddressReducer";
import LaytimeRowReducer from "../modules/voyage/laytime/_redux/reducers/LaytimeRowReducer";
import PartnerInfoReducer from "../modules/partners/basic-information/_redux/reducers/PartnerInfoReducer";
import OthersInfoReducer from "../modules/partners/others-information/_redux/reducers/OthersInfoReducer";
import SuppliersListReducer from "../modules/partners/suppliers-list/_redux/reducers/SuppliersListReducer";
import ItemReducer from "../modules/item/information/_redux/reducers/ItemReducer";

/** 
| Domain : CCO
*/
// import authMenuPermissionReducer from "../app/modules/Auth/_redux/menu-permission/authMenuPermissionReducer";

export const rootReducer = combineReducers({
  auth: auth.reducer,
  customers: customersSlice.reducer,
  products: productsSlice.reducer,
  remarks: remarksSlice.reducer,
  specifications: specificationsSlice.reducer,

  /** Menu Reducers */
  menu: authMenuPermissionReducer,

  /** CCO Reducers */
  controllingUnit: ControllingUnitReducer,

  /** CCO Reducers */
  employeeInfo: EmployeeReducer,
  employeeEducationInfo: EmployeeEducationReducer,
  employeeRecordInfo: EmployeeRecordReducer,
  employeeDocumentInfo: EmployeeDocumentReducer,
  employeeCertificateInfo: EmployeeCertificateReducer,
  employeeBankDetailsInfo: EmployeeBankDetailsReducer,
  employeeReferenceInfo: EmployeeReferenceReducer,
  vesselInfo: VesselReducer,
  voyageInfo: VoyageReducer,
  voyageData: VoyageReducer,
  voyageActivityInfo: VoyageActivityReducer,
  VoyageActivityOfficerReducer: VoyageActivityOfficerReducer,
  additionDeductionInfo: AdditionDeductionReducer,
  vesselItemInfo: VesselItemReducer,
  employeeSigningInfo: EmployeeSigningReducer,
  currencyInfo: CurrencyReducer,
  vesselAccountInfo: VesselAccountReducer,
  VoyageActivityBoilerReducer: VoyageActivityBoilerReducer,
  voyageAux1: VoyageActivityAuxEngnReducer,
  voyageAux2: VoyageActivityAuxEngn2Reducer,
  voyageAux3: VoyageActivityAuxEngn3Reducer,
  VoyageActivityBunkerReducer: VoyageActivityBunkerReducer,


  /** Laytime Reducers */
  laytimeHeaderInfo: LaytimeHeaderReducer,
  laytimeDetailInfo: LaytimeRowReducer,

  /** Partners Reducers */
  partnerInfo: PartnerInfoReducer,
  bankInfo: BankInfoReducer,
  partnerAddress: PartnerAddressReducer,
  partnerOthersInfo: OthersInfoReducer,

  /** Procurement Module Reducers */
  purchaseRequisition: PurchaseRequisitionReducer,
  demand: DemandReducer,

  /** Promotion */
  promotion: EmployeePromotionReducer,


  /**Certificates */
  certificateMainInfo: CertificateMainReducer,
  certificateIssueAuthorityInfo: CertificateIssueAuthorityReducer,
  CertificateCategoryReducer: CertificateCategoryReducer,
  CertificateListReducer: CertificateListReducer,
  certificateTypeInfo: CertificateTypeReducer,
  laytimeInfo: LaytimeInfoReducer,
  partnerInfo: PartnerInfoReducer,
  supplierList: SuppliersListReducer,
  itemList: ItemReducer
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
