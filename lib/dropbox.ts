import { Dropbox } from 'dropbox'

// Dropbox configuration
const dropboxConfig = {
  accessToken: process.env.DROPBOX_ACCESS_TOKEN,
  clientId: process.env.DROPBOX_CLIENT_ID,
  clientSecret: process.env.DROPBOX_CLIENT_SECRET
}

// Initialize Dropbox client
const dbx = new Dropbox(dropboxConfig)

export { dbx, dropboxConfig }
