import { boot } from 'quasar/wrappers'
import { keycloakController } from 'src/services/auth/keycloakController'
import { userController } from 'src/services/userConfig/userController'
// "async" is optional;

const { init,user } = keycloakController()
const { setCurrentUser } = userController()
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async (/* { app, router, ... } */) => {
  await init()
  if(user.value.uid)
  await setCurrentUser(user.value.uid)
})
