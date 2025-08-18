import { google } from "googleapis"

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"), // balikin newline
  },
  projectId: process.env.GOOGLE_PROJECT_ID,
  scopes: ["https://www.googleapis.com/auth/drive.file"],
})

const drive = google.drive({ version: "v3", auth })

export default defineEventHandler(async (event) => {
  const fileMetadata = {
    name: "hello.txt",
    parents: ["1lw3lBfYYvfv4ZQPFJXD1eStgN0zh0Z55"], // Folder Astina
  }

  const media = {
    mimeType: "text/plain",
    body: "Hello Astina from Nuxt!",
  }

  const response = await drive.files.create({
    requestBody: fileMetadata,
    media,
    fields: "id, name, parents",
  })

  return response.data
})

