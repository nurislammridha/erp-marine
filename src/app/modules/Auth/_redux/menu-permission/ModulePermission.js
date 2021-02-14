import { getVesselId } from '../authCrud';

export function getFeaturesPermissionData() {
  let userData = (localStorage.getItem('rolePermissionData')) || 'none';
  let dataParse = JSON.parse(userData);
  return dataParse.moduleLists;
}

export function checkFeaturePermission(moduleName) {
  const intVesselId = getVesselId();
  if(intVesselId == "")
    return true;
    
  let featureData = getFeaturesPermissionData();
  const filters = featureData.filter(
    (element) => console.log('element >> ', element),
    // (element) => element == moduleName,
  );
  
  if (filters.length > 0) {
    return true;
  }
  return false;
}
