
import { W3SSdk } from '@circle-fin/w3s-pw-web-sdk'

const sdk = new W3SSdk()

sdk.setAppSettings({
    appId: '<Your App Id>',
})
sdk.setAuthentication({
    userToken: '<Your user token>',
    encryptionKey: '<Your encryption key>',
})

sdk.execute(challengeId, (error, result) => {
    if (error) {
        console.log(
            `${error?.code?.toString() || "Unknown code"}: ${error?.message ?? 'Error!'
            }`
        )

        return
    }

    console.log(`Challenge: ${result.type}`)
    console.log(`status: ${result.status}`)

    if (result.data) {
        console.log(`signature: ${result.data?.signature}`)
    }
})