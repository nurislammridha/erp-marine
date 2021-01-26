import { getVesselId } from '../authCrud';

export function getModulePermissionData() {
  let userData = (localStorage.getItem('userData')) || 'none';
  let dataParse = JSON.parse(userData);
  return dataParse.moduleLists;
}

export function checkModulePermission(moduleName) {
  const intVesselId = getVesselId();
  if(intVesselId == "")
    return true;
    
  let permissionModule = getModulePermissionData();
  const filters = permissionModule.filter(
    (element) => element.strModuleShortName == moduleName,
  );
  
  if (filters.length > 0) {
    return true;
  }
  return false;
}
