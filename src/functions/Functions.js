import { Auth } from 'aws-amplify'

const functions = {
    async login (router, email, password) {
        try {
            const user = await Auth.signIn(email, password)
            console.log(user)
            router.push('calendar')
        } catch (error) {
            alert(error)
        }
    },
    loginCognito (router) { router.push('aws') }
}

export default functions