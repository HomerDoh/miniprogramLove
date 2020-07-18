class Auth {
  getAuth(scope) {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: (res) => {
          console.log('test', res, 'scope', scope)
          if (res.authSetting[scope]) {
            resolve(res)
          } else {
            wx.authorize({
              scope: scope,
              success: (res) => {
                resolve(res)
              },
              fail: (res) => {
                reject(res)
              }
            })
          }
        },
        fail: (res) => {
          reject(res)
        }
      })
    })
  }

}

export {
  Auth
}