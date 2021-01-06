export function getAdditionDeductionType(propsData) {
    let data = [];
    propsData &&
        propsData.forEach((item) => {
            let itemObject = {
                value: item.intID,
                label: item.strTypeName,
                ysnAddition: item.ysnAddition
            };
            data.push(itemObject);
        });
    return data;
}