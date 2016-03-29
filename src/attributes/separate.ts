
export function separateAttrs (attrs: Map<string, string | ((context: any, args: any[]) => string[] | string)>) {
  let resident: {key: string, value: string}[] = []
  let dynamic: {key: string, fn: (context: any, args: any[]) => string[] | string}[] = []

  if (attrs) {
    attrs.forEach((item, key) => {
      if (typeof item === 'function') {
        dynamic.push({key, fn: item})
      } else {
        resident.push({key, value: item})
      }
    })
  }
  return {resident, dynamic}
}
