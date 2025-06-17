import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// Add new icons for the posts page: newspaper, edit, trash
import { 
  faHouse, faUsers, faCircleCheck, faBars, faMagnifyingGlass, 
  faCog, faSignOutAlt, faUserCircle, faNewspaper, faEdit, faTrash,
  faPlus, faFolder
} from '@fortawesome/free-solid-svg-icons'

config.autoAddCss = false

library.add(
  faHouse, faUsers, faCircleCheck, faBars, faMagnifyingGlass,
  faCog, faSignOutAlt, faUserCircle, faNewspaper, faEdit, faTrash,
  faPlus, faFolder
)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
});