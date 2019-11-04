import MyBread from '@/components/my-bread'
import Mychannel from '@/components/my-channel'
import Myimage from '@/components/my-image'

export default {

  install (Vue) {
    Vue.component('my-bread', MyBread)
    Vue.component('my-channel', Mychannel)
    Vue.component('my-image', Myimage)
  }
}
