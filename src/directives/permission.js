import useUserStore from "../store/userStore.js";

const permissionDirective = {
  // 父子节点都挂载完成后调用
  mounted(el, binding) {
    const roleStore = useUserStore()
    if (!binding.value.includes(roleStore.role)) {
      el.parentNode.removeChild(el)
    }
  }
}

export default permissionDirective
