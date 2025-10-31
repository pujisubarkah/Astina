<template>
  <div class="netflix-bg min-h-screen py-8">
    <h1 class="netflix-title">PROYEK PERUBAHAN {{ type === 'pkn2' ? 'PKN II' : '' }}</h1>
    <hr class="netflix-divider" />
    <div class="netflix-carousel-wrapper">
      <div class="expo-grid">
        <template v-if="type === 'pkn2'">
          <div v-for="item in pkn2Data" :key="item.img" class="netflix-card" @click="window.open(item.link, '_blank')">
            <img :src="item.img" alt="PKN II" class="netflix-poster" />
          </div>
        </template>
        <template v-else-if="type === 'pka'">
          <div v-for="item in pkaData" :key="item.img" class="netflix-card" @click="window.open(item.img, '_blank')">
            <img :src="item.img" alt="PKA" class="netflix-poster" />
          </div>
        </template>
        <template v-else>
          <div v-for="item in newsItems" :key="item.id" class="netflix-card" @click="handleItemClick(item.id)">
            <img :src="item.image" :alt="item.title" class="netflix-poster" />
            <div class="netflix-card-info">
              <h3>{{ item.title }}</h3>
              <p>{{ item.author }} - {{ item.instansi }}</p>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div v-if="type !== 'pkn2' && totalPages > 1" class="netflix-pagination">
      <button v-for="pageNumber in visiblePages" :key="pageNumber" @click="handlePageChange(pageNumber)"
        :class="['pagination-btn', currentPage === pageNumber ? 'active' : '']">
        {{ pageNumber }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
/**
 * @typedef {Object} NewsItem
 * @property {number} id
 * @property {string} title
 * @property {string} image
 * @property {string} author
 * @property {string} instansi
 * @property {string} date
 */

/** @type {import('vue').Ref<NewsItem[]>} */
const newsItems = ref([])
const currentPage = ref(1)
const itemsPerPage = 8
const totalPages = 20

const route = useRoute()
const type = computed(() => route.query.type || 'pkn1')
const pkn2Data = [
  {
    img: "https://lh3.googleusercontent.com/sitesv/AAzXCkeKUkq5Vgnxlv2tme3QukrIaumwComQTRFaUow5VTqOax0FqOqYsiyozIeV3DhBJtmgCa_ks1ZkacVqemBOl428vDY4CdYerdhZcWssuyVYcMMO5DTR0uJjPDmL_6hzNuLQ9sDqat53V76DsAwHcONtZp6N7gPImtCN3xX2cCEZsR2LzHVmWN_n5mN1sUF6V1dXfHPbnyunSW8RJFC19lb_cclKl3SSxDwh=w1280",
    link: "https://drive.google.com/file/d/1hFv41o2yZhVgg86IGVw5AcBMmrpkbql0/view?usp=sharing"
  },
  {
    img: "https://lh3.googleusercontent.com/sitesv/AAzXCke6v8AmT5CxDolWBday2Fy8TiuPi0i5Hh4VKC2HkoyrlOehVvmUUiU_ElyvAyujNSzJGs6gbIZ2eiqVXgqZnFUo6Pt0TJ12OacJBnN9ufQ1bO0oCz5oUhC7j-VZLaO16zJYH_XqYVNpRt1aMVolw5R2qMn0pUgFF6C0TnI8Q_KhD7WT4y3iO_7BQvYj3Qdm0QF2ycJBPQiotQmC5HVM2wAjuGkxTYyYR1zY=w1280",
    link: "https://drive.google.com/file/d/1LmtX2e-VJs49Wr4f1JAJj1vknJ5ujqHf/view?usp=sharing"
  },
  {
    img: "https://lh3.googleusercontent.com/sitesv/AAzXCkdyCF23rTke7LxKnJVCvE5Emg8WThJPhYMvLp5nHIRxQ6vcwMpxZWjckb7_HdsQGghJlneTO0gbfW6CVugC4rF0Q7oxA2-w_sVFJx5X7MjVzIKB90xvvCXUNYYXDkY88C67WNmdF-69PZGCIdjK9-dfZ1549C-913w_9pyU4qJcOTsegd3vBlluVmOnzg2ueoE7XFMUIDolLeNPRHvRJM5zBjYHMSzvJpM0=w1280",
    link: "https://drive.google.com/file/d/1sR1NgCV5FGMEUdbHZRGHKcQV7mmgo6ue/view?usp=sharing"
  },
  {
    img: "https://lh3.googleusercontent.com/sitesv/AAzXCkeEGdidicpS72Qm_CrjCXmmRg_ygj-luN5szM_ClwNosbCcrTfPbFO_BhgJWQFT5nHu4-LGBxUUk19AQcII8krVUWA1Yu42geXSbqUCvoS_ciwpTKhARkFmuKVyOfssNBjQDmEfmO-zpvgBt81udrOBaHtSrC6wTFlyQaWc6PN4b-q63Rj8HmirglK-I0k-b3nqt2oaExbio5K86mx08B8cQeb8e0kaIlhcS5g=w1280",
    link: "https://drive.google.com/file/d/1p3SYHwDYEYbVJ23qJBlvJlhIx7DMM-vf/view?usp=sharing"
  },
  {
    img: "https://lh3.googleusercontent.com/sitesv/AAzXCkeNd22_7HtNdTXxdhIr9Uy7tBtXfxwa6ayUAUfHXX5zCEyuflGMrVvoxRJ2cS11oGrexMbnkvjOtbA-hIpNkpJQ4NMjOQlSgaeZcFpo-SzrSoLvTwgZl_VNFcwZizmqx7jW37o7kIdsnw90g6R8zdOjj235fXG-rEXRbZ5ubwyBFgIdizr1IwPhRTNRb-VBLdX1uP68zzfeFV7zmzU81T-lb14NYJ4WhIsf=w1280",
    link: "https://drive.google.com/file/d/1KpYz8rqBA7SNzqdoZtxeb0mo1LTW4MLA/view?usp=sharing"
  },
  {
    img: "https://lh3.googleusercontent.com/sitesv/AAzXCkdLLedifsI8LmQC9n644g7w4t4KnZ6b0xxb46ZBVqeFC3XqChnOH8fTIf47ZCfmOjuQxnQije6Q1mTDCq54sgbvPhPd04egiovejTPW6NO8sqRjZgArjagiUUhOfLvUJ4kH22JNMieHv2Wj6KW0RhWXYGeaU7oPRRyZRmZRE8gjgnqxUfKoeW2inPifdI5KdUQF6bcNODEsCXzEQvZUsYMbsYEiP2OW1h0EAnE=w1280",
    link: "https://drive.google.com/file/d/1qRz7gsm3SxDHjvewMt8WPGBairGqLHda/view?usp=sharing"
  },
  {
    img: "https://lh3.googleusercontent.com/sitesv/AAzXCkddtwjwDwR-J24m5JgoewosJxZ9Y9gKGzQD7S6X9VqwR1j2f4GNG2bjdG3uhWJ0nuBxTyYH-8sOT4hFuggF63PibN-z4RxFBOSvcevYgsNq7oVPyXCs0irrLwE7Yi8-060oJF4F9J5uYY31q2J8s7tHh-OQt9nLQJ-fIRjshJW3w5nBhh84ErcVQHp55qOEVOj7YzGrOtYcqGs2CVlmG6Kw9MrYbEvzmXN3zpWk=w1280",
    link: "https://drive.google.com/file/d/1fQOtxUvEVU-3iP5hLG02-l1Mj_u0mxsl/view?usp=sharing"
  }
];

const pkaData = [
  { img: "https://lh3.googleusercontent.com/sitesv/AAzXCkeH3SnLdMAifc-1cMYvO22dfIvjXXgkItu4eXyXfIpTZQgz8g0vlXf32dH2s58cH4xvmnqZb0hAG9hECU4RjvUqpn6uCP-JJZYNOjrFOQJauL3HZOe0w2QkGAojlNd0_VxqdFE9jwPkYINUPrzwXXCcMI7ra2t3gLWLetKHa9ZQOqTbhYrA3KTdIMAHuvwAne5aNj2aZq8OzojCU-Ozrp1m347xEVs6YnYbqfo=w1280" },
  { img: "https://lh3.googleusercontent.com/sitesv/AAzXCkdQaQ2zalxH9Lg-Rmofkv6i-cfeBbdPQ6j6TNBZHYb-u1bdMGeIFK2RjyS38xd1i5yLButYXsHjWsC-kqNf58HDOeItOGfNW1kXj8SBFiQ-5vUayIqa26lVXJuqb255EDmRseD490cpKAf3wtogffw0ML9JSmZpQMUINm7LJNGadDZVPdBHnk12hoDARKR5oyX3ZuQWiCauQZg6TCA2CM_WkBxyUq9Xb2G8=w1280" },
  { img: "https://lh3.googleusercontent.com/sitesv/AAzXCkcUYsH1-WVSgJFe8x_ABnfrU900rhmNFsmwDVmQntm8VnMXGCIgoTTbJxl64d-PKR466BF9GCkkQJx2NfjgenqySk0mXxWPtiExJaYmpdMbWN7Yc9IBxs5398g0619urFvYlKVGdatPKX8Gl1VM2tRr1m-qcMYjclsGLgUlsokT_CK0UrDsrWhZbcsimqAv9tMPIrbXt87RWd0XWUgZ5lcCF1mS10n5kKSYK-w=w1280" },
  { img: "https://lh3.googleusercontent.com/sitesv/AAzXCkdqD9xiQOYlaS8x2WN8VdqoP3VhTFq-dh0i1DnPh345itLTtTPZ0dNM_LoTJvItmhYgc4NLIgakYoWcimVd3D45j7W8TULMEuOdtTZ3UHP8KpDPPCu7qH88jtxYC79pq86Ovk7qxjAxNfwRa3AZfIYmGnZhZxeiZ8i2QODA6riDwDogDNV4bax1P_TpzzNEh2FM8g_rZYQ1Z9etiD1opTbecKO7C-_oYieLCKc=w1280" },
  { img: "https://lh3.googleusercontent.com/sitesv/AAzXCkfOjAJZa7J58K6S4MkUzLaTSl12-5UsUC_xwhbSn4lWmAfVBOEuXoqjlXQL1UOOek9czYCljFRFu_RU2C4zdc6ooG-HSR5wB_5RbEqjmPVbSzLn4gZYzIaIf5CMbCYU9VkgjAi4zEHuvRqTpBR3JHjruOVmNJgHcJQ98OMB6iLErCkf70CElzRZDPwKolr9goOdlJSqa1FtlTHbQ7jcOoP-pFwWouAaEa6gf50=w1280" },
  { img: "https://lh3.googleusercontent.com/sitesv/AAzXCkfUyJhlVSVxGUcIXW6BA3Y3Kuj4BUQsORoI-H1WU8XD8Bb6C6iul9ixk8066h_pCBprs1GxI1aksTuuPr8VOMt_Tsy4a7qazmDHiqHgnnGDh5R4Pic1pZwqSwkt2LrqRAc4SUtgvd7XWoDNOOuvtgz1jOObTXyXWPtH5ErPqVJOKXXQmOvQsa7YO-_RGnQvm0aFQJLrA0oUQeIQZ7w0hy8aK8XPi3T07rnsoQE=w1280" },
  { img: "https://lh3.googleusercontent.com/sitesv/AAzXCkcCDaV0gREPQoZhSB2VR0m--jM9QpyzLClGCrZBLqys3euqkYtWFyO98pZp9o_YB32BgQXj_VzM5gRZRJSfjcjnvhX1NAyDDCzPuUN_VIRsjcKrWH9r4oPxzXB__zfSaywwJSPLM_qyK3z_r28htGK0eITtuNlgmlys0rYDu0LN6szoQF7ggqrfZfBfqhWrzMXLlcVTdN3xl1ErCEUpC6UoWp5GEQhf_o58zWg=w1280" },
  { img: "https://lh3.googleusercontent.com/sitesv/AAzXCkcCDaV0gREPQoZhSB2VR0m--jM9QpyzLClGCrZBLqys3euqkYtWFyO98pZp9o_YB32BgQXj_VzM5gRZRJSfjcjnvhX1NAyDDCzPuUN_VIRsjcKrWH9r4oPxzXB__zfSaywwJSPLM_qyK3z_r28htGK0eITtuNlgmlys0rYDu0LN6szoQF7ggqrfZfBfqhWrzMXLlcVTdN3xl1ErCEUpC6UoWp5GEQhf_o58zWg=w1280" },
  { img: "https://lh3.googleusercontent.com/sitesv/AAzXCke0RsxOToA1sYUvbtwmnAs4jqefA2u4AYgwcmLt20TMhZOqOhWVYI63yA-ALsH-eJuncRqxm4qhmnM4cJvDt2YZnXyM4kn9gCC1-UkeQgDJARg-u8dTcoL8R99ZHV4C5rd2W7g3LHesMmwG6ZhFJmeEC2GNfZhSdL0z8WCsdltWRbRj-2FOwcUsKTdRt-dAEHUWhSmDN1ahAAvtW_iKcyXF85ayuA_QXxtWs0M=w1280" },
  { img: "https://lh3.googleusercontent.com/sitesv/AAzXCkembOqOWt2XREcAvOVC3Lp2fHtFltom_QGDM9wpqCttEVRdX64aYOQqvJnLa4DHVnCogifaQ0F8G8-MkkpUn5xcVXDV2yNya8kLptXPB5rxTvdxdCOWgljS_Ji8qPCJ7tyQpe1dfyL_L64b7p98w9KBetFdm03F2z84snpmWqSd7Z6HQ8ca80VSFMEcgOl64KqBxwHPCNppjAmyD90CiXFWY5bmm9H8eQ_-4Gk=w1280" }
];

const visiblePages = computed(() => {
  const pages = []
  const maxPages = Math.min(totalPages, 5)
  
  for (let i = 0; i < maxPages; i++) {
    const pageNumber = currentPage.value > 3 ? currentPage.value - 2 + i : i + 1
    pages.push(pageNumber)
  }
  
  return pages
})

const handlePageChange = (newPage) => {
  currentPage.value = newPage
}

const fetchBeritaFromAPI = async () => {
  try {
    const { data } = await $fetch(
      `https://properexpo.lan.go.id/app/api/tx-proper?perPage=${itemsPerPage}&page=${currentPage.value}`
    )
    
    const responseData = data.data
    
    const formattedData = responseData.map((item) => ({
      id: item.id_proper,
      title: item.judul,
      image: `https://properexpo.lan.go.id/uploads/properexpo-lan/berkas_poster_landscape/${item.berkas_poster_landscape}`,
      author: item.nama,
      instansi: item.md_instansi?.nama,
      date: item.created_at,
    }))
    
    newsItems.value = formattedData
    
    console.log('api:', `https://properexpo.lan.go.id/app/api/tx-proper?perPage=${itemsPerPage}&page=${currentPage.value}`)
  } catch (error) {
    console.error('Error fetching news from API:', error)
  }
}

const handleItemClick = (id) => {
  window.open(`https://properexpo.lan.go.id/web/proper/detail/${id}`, '_blank')
}

// Watch for currentPage changes
watch(currentPage, () => {
  fetchBeritaFromAPI()
})

// Fetch data on component mount
onMounted(() => {
  fetchBeritaFromAPI()
})
</script>

<style scoped>
.netflix-title {
  font-family: 'Poppins', sans-serif;
  font-weight: bold;
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 0.5rem;
  letter-spacing: 2px;
}
.netflix-divider {
  width: 120px;
  border: none;
  height: 3px;
  background: linear-gradient(to right, #16578d, #fff, #16578d);
  margin: 0 auto 2rem auto;
}
.expo-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 320px;
  gap: 1.2rem;
  padding-bottom: 1rem;
  justify-content: center;
}
@media (min-width: 600px) {
  .expo-grid {
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 260px;
  }
}
@media (min-width: 1024px) {
  .expo-grid {
    grid-template-columns: repeat(7, 1fr);
    grid-auto-rows: 220px;
  }
}
.netflix-card {
  background: #fff;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,0.10);
  cursor: pointer;
  position: relative;
  transition: transform 0.18s, box-shadow 0.18s;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.netflix-card:hover {
  transform: translateY(-6px) scale(1.04);
  box-shadow: 0 8px 32px rgba(22,87,141,0.18);
  z-index: 2;
}
.netflix-poster {
  width: 100%;
  height: 70%;
  object-fit: cover;
  display: block;
}
.netflix-card-info {
  background: linear-gradient(0deg, #f5f6fa 90%, rgba(245,246,250,0.7) 100%);
  color: #222;
  padding: 0.7rem 0.6rem 0.5rem 0.6rem;
  min-height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.netflix-card-info h3 {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.18rem;
  line-height: 1.2;
  color: #16578d;
}
.netflix-card-info p {
  font-size: 0.85rem;
  color: #444;
  margin: 0;
}

.netflix-bg {
  background: #f5f6fa;
  color: #222;
  min-height: 100vh;
}
.netflix-carousel-wrapper {
  position: relative;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1400px;
}
.netflix-carousel {
  display: flex;
  overflow-x: auto;
  gap: 1.5rem;
  padding-bottom: 1rem;
  scrollbar-width: thin;
  scrollbar-color: #444 #222;
}
.netflix-carousel::-webkit-scrollbar {
  height: 8px;
}
.netflix-carousel::-webkit-scrollbar-thumb {
  background: #444;
  border-radius: 4px;
}
.netflix-card {
  min-width: 220px;
  max-width: 220px;
  background: #222;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.7);
  cursor: pointer;
  position: relative;
  transition: transform 0.2s, box-shadow 0.2s;
}
.netflix-card:hover {
  transform: scale(1.08);
  box-shadow: 0 8px 24px rgba(0,0,0,0.8);
  z-index: 2;
}
.netflix-poster {
  width: 100%;
  height: 320px;
  object-fit: cover;
  display: block;
}
.netflix-card-info {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(0deg, rgba(24,24,24,0.95) 80%, rgba(24,24,24,0.2) 100%);
  color: #fff;
  padding: 1rem 0.75rem 0.5rem 0.75rem;
  opacity: 0;
  transition: opacity 0.2s;
}
.netflix-card:hover .netflix-card-info {
  opacity: 1;
}
.netflix-card-info h3 {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
  line-height: 1.2;
}
.netflix-card-info p {
  font-size: 0.85rem;
  color: #b3b3b3;
  margin: 0;
}
.carousel-arrow {
  background: rgba(24,24,24,0.7);
  color: #fff;
  border: none;
  font-size: 2.5rem;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 3;
  cursor: pointer;
  transition: background 0.2s;
}
.carousel-arrow.left {
  left: -60px;
}
.carousel-arrow.right {
  right: -60px;
}
.carousel-arrow:hover {
  background: #16578d;
}
.netflix-pagination {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}
.pagination-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #222;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  transition: background-color 0.2s;
}
.pagination-btn:hover {
  background-color: #16578d;
}
.pagination-btn.active {
  background-color: #fff;
  color: #16578d;
}
@media (max-width: 900px) {
  .netflix-card, .netflix-card-info {
    min-width: 160px;
    max-width: 160px;
  }
  .netflix-poster {
    height: 200px;
  }
}
@media (max-width: 600px) {
  .netflix-title {
    font-size: 1.5rem;
    margin-left: 1rem;
  }
  .netflix-divider {
    margin-left: 1rem;
  }
  .netflix-carousel-wrapper {
    margin: 0 0.5rem;
  }
  .carousel-arrow.left {
    left: -30px;
  }
  .carousel-arrow.right {
    right: -30px;
  }
}
</style>
