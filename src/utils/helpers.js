import {firebaseRef} from 'config'

export function tokenize(request) {
  const { token } = firebaseRef.getAuth()
  return new Promise((resolve, reject) => {
    request
      .set('token', token)
      .end((err, res) => {
        if (!!err) {
          reject(err.message)
        }
        else
          resolve(res.body)
      })
  })
}