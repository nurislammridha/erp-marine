
export function getFeaturesPermissionData() {
  let rolePermissionData = (localStorage.getItem('rolePermissionData')) || 'none';
  return rolePermissionData;
}

export function checkFeaturePermission(permissionName) {
  let featureData = getFeaturesPermissionData().split(",");
  console.log('featureData', featureData);

  const filters = featureData.filter(
    (element) => element == permissionName,
  );
  
  if (filters.length > 0) {
    return true;
  }
  return false;
}
