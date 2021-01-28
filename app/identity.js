const { DefaultAzureCredential } = require('@azure/identity')

async function example () {
  const cred = new DefaultAzureCredential()

  try {
    console.log('Asking for token ...')
    const token = await cred.getToken('https://servicebus.azure.net/.default')
    console.log(token)
  } catch (e) {
    console.log('Failed to get token')
    console.log(e)
  }

  process.exit()
}

example()
