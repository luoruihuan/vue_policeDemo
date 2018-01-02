export function fullPathInclude(vm, str) {
  let path = vm.$route.fullPath
  return path.indexOf(str) > -1
}
