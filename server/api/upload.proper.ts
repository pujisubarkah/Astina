import type { H3Event } from "h3";

export default defineEventHandler(async (event: H3Event) => {
  const form = await readMultipartFormData(event);
  const file = form?.[0];

  if (!file) {
    return { error: "No file uploaded" };
  }

  const res = await fetch("https://content.dropboxapi.com/2/files/upload", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.DROPBOX_ACCESS_TOKEN}`,
      "Dropbox-API-Arg": JSON.stringify({
        path: `/${file.filename}`,
        mode: "add",
        autorename: true,
        mute: false,
      }),
      "Content-Type": "application/octet-stream",
    },
    body: new Uint8Array(file.data),
  });

  const data = await res.json();
  return data;
});
