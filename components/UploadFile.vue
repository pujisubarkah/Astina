<script setup>
async function uploadFile(e) {
  const file = e.target.files[0]
  const formData = new FormData()
  formData.append("file", file)

  const res = await $fetch("/api/upload", {
    method: "POST",
    body: formData,
  })

  alert("✅ File berhasil diupload:\n" + res.link)
}
</script>

<template>
  <div class="p-4">
    <input type="file" @change="uploadFile" />
  </div>
</template>
