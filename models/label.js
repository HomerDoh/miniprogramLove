import {config} from '../config.js'
import {HTTP} from '../utils/http.js'
const http = new HTTP()
class Label{
  getLabel(){
    return http.request({
      url: config.api_base_url + 'labels'
    })
  }
}

export {Label}