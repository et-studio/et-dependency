
const PROPERTIY_SET = {
  'INPUT': ['value', 'checked'],
  'TEXTAREA': ['value']
}

export function isProperty (node: Element, key: string) {
  return chargeProperty(node.nodeName, key)
}

function chargeProperty (nodeName: string, key: string) {
  let propertiesList = PROPERTIY_SET[nodeName.toLocaleUpperCase()] || []
  return !!~propertiesList.indexOf(key)
}
