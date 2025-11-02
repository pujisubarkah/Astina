<template>
  <div class="netflix-bg">
    <!-- Header -->
    <div class="text-center py-12">
      <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4 shadow-lg">
        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      </div>
      <h1 class="netflix-title">Showcase</h1>
      <hr class="netflix-divider">
      <p class="text-lg text-blue-700 mb-6">Galeri Inovasi Showcase</p>
    </div>

    <div class="showcase-wrapper">
      <div class="expo-grid">
        <template v-if="type === 'pkn2'">
          <div v-for="item in pkn2Data" :key="item.img" class="netflix-card" @click="window.open(item.link, '_blank')">
            <img :src="item.img" :alt="item.title" class="netflix-poster" />
            <div class="netflix-card-info">
              <h3>PKN Tingkat II</h3>
              <p>Inovasi dari alumni PKN II</p>
            </div>
          </div>
        </template>
        <template v-else-if="type === 'pka'">
          <div v-for="item in pkaData" :key="item.img" class="netflix-card" @click="window.open(item.img, '_blank')">
            <img :src="item.img" :alt="item.title" class="netflix-poster" />
            <div class="netflix-card-info">
              <h3>PKA Innovation</h3>
              <p>Program Kepemimpinan Administrator</p>
            </div>
          </div>
        </template>
        <template v-else>
          <div v-for="item in newsItems" :key="item.id" class="netflix-card">
            <div class="relative w-full h-full">
              <img :src="item.image" :alt="item.title" class="netflix-poster-full" @click="handleItemClick(item.id)" />
              
              <!-- Rating Overlay on Image -->
              <div class="absolute top-3 left-3 bg-black bg-opacity-70 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
                <svg class="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span class="text-white text-sm font-semibold">{{ getAverageRating(item.id) || '0.0' }}</span>
                <span class="text-gray-300 text-xs">({{ getRatingCount(item.id) }})</span>
              </div>

              <!-- Three Dots Menu -->
              <div class="absolute top-3 right-3">
                <button 
                  @click.stop="openRatingModal(item)"
                  class="bg-black bg-opacity-70 backdrop-blur-sm rounded-full p-2 hover:bg-opacity-90 transition-all duration-200 group"
                >
                  <svg class="w-4 h-4 text-white group-hover:text-yellow-400 transition-colors duration-200" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
              </div>

              <!-- Title Overlay at Bottom -->
              <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-3">
                <h3 @click="handleItemClick(item.id)" class="cursor-pointer hover:text-yellow-400 text-white font-bold text-sm mb-1 transition-colors duration-200">{{ item.title }}</h3>
                <p class="text-gray-300 text-xs">{{ item.author }} - {{ item.instansi }}</p>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- Enhanced Pagination -->
    <div v-if="type !== 'pkn2' && totalPages > 1" class="flex justify-center mt-12">
      <div class="join">
        <button class="join-item btn btn-sm" :disabled="currentPage === 1" @click="handlePageChange(currentPage - 1)">
          «
        </button>
        <button 
          v-for="pageNumber in visiblePages" 
          :key="pageNumber" 
          @click="handlePageChange(pageNumber)"
          :class="['join-item btn btn-sm', currentPage === pageNumber ? 'btn-active' : '']"
        >
          {{ pageNumber }}
        </button>
        <button class="join-item btn btn-sm" :disabled="currentPage === totalPages" @click="handlePageChange(currentPage + 1)">
          »
        </button>
      </div>
    </div>

    <!-- Rating & Comments Modal -->
    <div v-if="showRatingModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        <!-- Modal Header -->
        <div class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <h3 class="text-xl font-bold mb-2">{{ selectedItem?.title }}</h3>
              <p class="text-blue-100 text-sm">{{ selectedItem?.author }} - {{ selectedItem?.instansi }}</p>
            </div>
            <button 
              @click="closeRatingModal"
              class="text-white hover:text-gray-200 text-2xl font-bold ml-4"
            >
              ×
            </button>
          </div>
        </div>

        <!-- Modal Content -->
        <div class="p-6 max-h-[calc(90vh-140px)] overflow-y-auto">
          <!-- Rating Section -->
          <div class="mb-8">
            <h4 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Berikan Rating
            </h4>
            
            <div class="bg-gray-50 rounded-xl p-6">
              <div class="text-center mb-6">
                <div class="flex justify-center items-center gap-2 mb-4">
                  <span 
                    v-for="star in 5" 
                    :key="star"
                    @click="rateItem(selectedItem.id, star)"
                    @mouseover="hoverRating(selectedItem.id, star)"
                    @mouseleave="hoverRating(selectedItem.id, 0)"
                    class="cursor-pointer text-4xl transition-all duration-200 hover:scale-110"
                    :class="getStarClass(selectedItem.id, star)"
                  >
                    ★
                  </span>
                </div>
                <div class="text-sm text-gray-600">
                  Rating rata-rata: <span class="font-semibold text-lg">{{ getAverageRating(selectedItem.id) }}/5</span>
                  dari {{ getRatingCount(selectedItem.id) }} pengguna
                </div>
              </div>

              <!-- Rating Breakdown -->
              <div class="space-y-2">
                <div v-for="rating in [5,4,3,2,1]" :key="rating" class="flex items-center gap-3">
                  <span class="text-sm text-gray-600 w-2">{{ rating }}</span>
                  <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <div class="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      class="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                      :style="`width: ${getRatingPercentage(selectedItem.id, rating)}%`"
                    ></div>
                  </div>
                  <span class="text-sm text-gray-600 w-8">{{ getRatingCount(selectedItem.id, rating) }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Comments Section -->
          <div>
            <h4 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd" />
              </svg>
              Komentar ({{ getCommentsCount(selectedItem.id) }})
            </h4>

            <!-- Add Comment Form -->
            <div v-if="isLoggedIn" class="bg-blue-50 rounded-xl p-4 mb-6">
              <textarea 
                v-model="newComment[selectedItem.id]"
                placeholder="Tulis komentar Anda..."
                class="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="3"
              ></textarea>
              <div class="flex justify-end mt-3">
                <button 
                  @click="addComment(selectedItem.id)"
                  :disabled="!newComment[selectedItem.id]?.trim()"
                  class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Kirim Komentar
                </button>
              </div>
            </div>

            <!-- Login Required Message -->
            <div v-else class="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
              <div class="flex items-center gap-3">
                <svg class="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
                <div>
                  <p class="text-yellow-800 font-medium">Silakan login untuk memberikan komentar</p>
                  <button 
                    @click="openLoginModal"
                    class="text-blue-600 hover:text-blue-800 font-medium text-sm mt-1"
                  >
                    Login sekarang →
                  </button>
                </div>
              </div>
            </div>

            <!-- Comments List -->
            <div class="space-y-4">
              <div 
                v-for="comment in getComments(selectedItem.id)" 
                :key="comment.id"
                class="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow duration-200"
              >
                <div class="flex items-start justify-between mb-2">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {{ comment.author.charAt(0).toUpperCase() }}
                    </div>
                    <div>
                      <div class="font-semibold text-gray-800">{{ comment.author }}</div>
                      <div class="text-xs text-gray-500">{{ formatDate(comment.date) }}</div>
                    </div>
                  </div>
                </div>
                <div class="text-gray-700 ml-11">{{ comment.text }}</div>
              </div>
              
              <div v-if="getComments(selectedItem.id).length === 0" class="text-center py-8 text-gray-500">
                <svg class="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <p class="text-lg font-medium mb-2">Belum ada komentar</p>
                <p class="text-sm">Jadilah yang pertama memberikan komentar!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

// Basic state for pagination
const currentPage = ref(1)
const itemsPerPage = 8
const totalPages = 20

/** @type {import('vue').Ref<NewsItem[]>} */
const newsItems = ref([])
const route = useRoute()
const type = computed(() => route.query.type || 'pkn1')

// Rating and Comments State
const ratings = ref({}) // { itemId: [rating1, rating2, ...] }
const hoverRatings = ref({}) // { itemId: hoverValue }
const comments = ref({}) // { itemId: [comment1, comment2, ...] }
const newComment = ref({}) // { itemId: commentText }

// Modal State
const showRatingModal = ref(false)
const selectedItem = ref(null)

// Auth State (mock - replace with real auth)
const isLoggedIn = ref(false) // Change to true for testing

const pkn2Data = [
  {
    img: "https://lh3.googleusercontent.com/sitesv/AAzXCkdLLedifsI8LmQC9n644g7w4t4KnZ6b0xxb46ZBVqeFC3XqChnOH8fTIf47ZCfmOjuQxnQije6Q1mTDCq54sgbvPhPd04egiovejTPW6NO8sqRjZgArjagiUUhOfLvUJ4kH22JNMieHv2Wj6KW0RhWXYGeaU7oPRRyZRmZRE8gjgnqxUfKoeW2inPifdI5KdUQF6bcNODEsCXzEQvZUsYMbsYEiP2OW1h0EAnE=w1280",
    link: "https://drive.google.com/file/d/1qRz7gsm3SxDHjvewMt8WPGBairGqLHda/view?usp=sharing"
  },
  {
    img: "https://lh3.googleusercontent.com/sitesv/AAzXCkddtwjwDwR-J24m5JgoewosJxZ9Y9gKGzQD7S6X9VqwR1j2f4GNG2bjdG3uhWJ0nuBxTyYH-8sOT4hFuggF63PibN-z4RxFBOSvcevYgsNq7oVPyXCs0irrLwE7Yi8-060oJF4F9J5uYY31q2J8s7tHh-OQt9nLQJ-fIRjshJW3w5nBhh84ErcVQHp55qOEVOj7YzGrOtYcqGs2CVlmG6Kw9MrYbEvzmXN3zpWk=w1280",
    link: "https://drive.google.com/file/d/1fQOtxUvEVU-3iP5hLG02-l1Mj_u0mxsl/view?usp=sharing"
  },
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
];

const pkaData = [
  { img: "https://res.cloudinary.com/dqlfyyigk/image/upload/v1762000375/ta8aut2ni68m2n8ylhyf.png" },
  { img: "https://res.cloudinary.com/dqlfyyigk/image/upload/v1762000374/eyiupn3dp2ohzye6wy9u.png" },
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
      `https://properexpo.lan.go.id/app/api/tx-proper?perPage=${itemsPerPage}&page=${currentPage.value}&sort=created_at&order=desc`
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
    
    console.log('api:', `https://properexpo.lan.go.id/app/api/tx-proper?perPage=${itemsPerPage}&page=${currentPage.value}&sort=created_at&order=desc`)
  } catch (error) {
    console.error('Error fetching news from API:', error)
  }
}

const handleItemClick = (id) => {
  window.open(`https://properexpo.lan.go.id/web/proper/detail/${id}`, '_blank')
}

// Rating Functions
const rateItem = (itemId, rating) => {
  if (!ratings.value[itemId]) {
    ratings.value[itemId] = []
  }
  ratings.value[itemId].push(rating)
  
  // Save to localStorage
  localStorage.setItem('showcase-ratings', JSON.stringify(ratings.value))
}

const hoverRating = (itemId, rating) => {
  hoverRatings.value[itemId] = rating
}

const getStarClass = (itemId, starNumber) => {
  const hoverValue = hoverRatings.value[itemId] || 0
  const avgRating = parseFloat(getAverageRating(itemId))
  
  if (hoverValue > 0) {
    return starNumber <= hoverValue ? 'text-yellow-400' : 'text-gray-300'
  }
  return starNumber <= avgRating ? 'text-yellow-400' : 'text-gray-300'
}

const getAverageRating = (itemId) => {
  const itemRatings = ratings.value[itemId] || []
  if (itemRatings.length === 0) return '0.0'
  const sum = itemRatings.reduce((a, b) => a + b, 0)
  const average = sum / itemRatings.length
  return average.toFixed(1)
}



// Modal Functions
const openRatingModal = (item) => {
  selectedItem.value = item
  showRatingModal.value = true
  document.body.style.overflow = 'hidden'
}

const closeRatingModal = () => {
  showRatingModal.value = false
  selectedItem.value = null 
  document.body.style.overflow = 'auto'
}

const openLoginModal = () => {
  // Use global event to trigger login modal in navbar
  if (process.client) {
    window.dispatchEvent(new CustomEvent('open-login-modal'))
  }
}

// Comments Functions
const addComment = (itemId) => {
  if (!isLoggedIn.value) {
    openLoginModal()
    return
  }
  
  const commentText = newComment.value[itemId]?.trim()
  if (!commentText) return
  
  if (!comments.value[itemId]) {
    comments.value[itemId] = []
  }
  
  const comment = {
    id: Date.now(),
    text: commentText,
    author: 'John Doe', // In real app, get from auth user
    date: new Date().toISOString()
  }
  
  comments.value[itemId].push(comment)
  newComment.value[itemId] = ''
  
  // Save to localStorage
  localStorage.setItem('showcase-comments', JSON.stringify(comments.value))
}

// Rating breakdown functions
const getRatingCount = (itemId, specificRating = null) => {
  const itemRatings = ratings.value[itemId] || []
  if (specificRating) {
    return itemRatings.filter(rating => rating === specificRating).length
  }
  return itemRatings.length
}

const getRatingPercentage = (itemId, rating) => {
  const totalRatings = getRatingCount(itemId)
  if (totalRatings === 0) return 0
  const ratingCount = getRatingCount(itemId, rating)
  return Math.round((ratingCount / totalRatings) * 100)
}

const getComments = (itemId) => {
  return comments.value[itemId] || []
}

const getCommentsCount = (itemId) => {
  return comments.value[itemId]?.length || 0
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInMinutes = Math.floor((now - date) / (1000 * 60))
  
  if (diffInMinutes < 1) return 'Baru saja'
  if (diffInMinutes < 60) return `${diffInMinutes}m`
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`
  return `${Math.floor(diffInMinutes / 1440)}d`
}

// Load saved data from localStorage
const loadSavedData = () => {
  try {
    const savedRatings = localStorage.getItem('showcase-ratings')
    if (savedRatings) {
      ratings.value = JSON.parse(savedRatings)
    }
    
    const savedComments = localStorage.getItem('showcase-comments')
    if (savedComments) {
      comments.value = JSON.parse(savedComments)
    }
  } catch (error) {
    console.error('Error loading saved data:', error)
  }
}

// Watch for currentPage changes
watch(currentPage, () => {
  fetchBeritaFromAPI()
})

// Close modal on escape key
onMounted(() => {
  loadSavedData()
  fetchBeritaFromAPI()
  
  // Handle escape key
  const handleEscape = (e) => {
    if (e.key === 'Escape' && showRatingModal.value) {
      closeRatingModal()
    }
  }
  
  document.addEventListener('keydown', handleEscape)
  
  // Cleanup
  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape)
    document.body.style.overflow = 'auto'
  })
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
  grid-auto-rows: 400px;
  gap: 1.2rem;
  padding-bottom: 1rem;
  justify-content: center;
}
@media (min-width: 600px) {
  .expo-grid {
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 340px;
  }
}
@media (min-width: 1024px) {
  .expo-grid {
    grid-template-columns: repeat(6, 1fr);
    grid-auto-rows: 300px;
  }
}
.netflix-card {
  background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04);
  cursor: pointer;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border: 1px solid rgba(255,255,255,0.8);
  backdrop-filter: blur(10px);
}
.netflix-card:hover {
  transform: translateY(-8px) scale(1.02) rotateX(5deg);
  box-shadow: 0 20px 40px rgba(22,87,141,0.15), 0 8px 20px rgba(22,87,141,0.1);
  z-index: 10;
  border: 1px solid rgba(59, 130, 246, 0.3);
}
.netflix-poster {
  width: 100%;
  height: 85%;
  object-fit: cover;
  display: block;
}

.netflix-poster-full {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  cursor: pointer;
}
.netflix-card-info {
  background: linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.9) 100%);
  backdrop-filter: blur(12px);
  color: #1a202c;
  padding: 0.75rem;
  min-height: 15%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-top: 1px solid rgba(255,255,255,0.5);
  position: relative;
  overflow: hidden;
}

.netflix-card-info::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #f59e0b);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.netflix-card:hover .netflix-card-info::before {
  opacity: 1;
}
.netflix-card-info h3 {
  font-size: 0.85rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  line-height: 1.2;
  color: #1e40af;
  background: linear-gradient(135deg, #1e40af, #3b82f6);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: all 0.3s ease;
}

.netflix-card:hover .netflix-card-info h3 {
  transform: translateY(-2px);
  background: linear-gradient(135deg, #1d4ed8, #2563eb, #3b82f6);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.netflix-card-info p {
  font-size: 0.75rem;
  color: #444;
  margin: 0;
}

.netflix-bg {
  background: #ffffff;
  color: #1a202c;
  min-height: 100vh;
}

/* Full Frame Image Styling */
.netflix-card .relative {
  position: relative;
  overflow: hidden;
}

.netflix-card .relative::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, transparent 20%, transparent 60%, rgba(0,0,0,0.6) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: 1;
}

.netflix-card:hover .relative::before {
  opacity: 1;
}

/* Title overlay styling */
.netflix-card .absolute.bottom-0 {
  z-index: 2;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
}

.netflix-card:hover .absolute.bottom-0 {
  opacity: 1;
  transform: translateY(0);
}

/* Rating overlay on image */
.netflix-card .absolute {
  z-index: 2;
}

.netflix-card .absolute.top-3.left-3 {
  animation: fadeInScale 0.3s ease;
}

.netflix-card .absolute.top-3.right-3 button {
  transform: scale(0.9);
  transition: all 0.3s ease;
}

.netflix-card:hover .absolute.top-3.right-3 button {
  transform: scale(1);
  animation: pulse 2s infinite;
}

@keyframes fadeInScale {
  0% { 
    opacity: 0; 
    transform: scale(0.8); 
  }
  100% { 
    opacity: 1; 
    transform: scale(1); 
  }
}

@keyframes pulse {
  0%, 100% { 
    transform: scale(1); 
  }
  50% { 
    transform: scale(1.05); 
  }
}

/* Rating and Comments Styling */
.rating-section {
  border-top: 1px solid rgba(226, 232, 240, 0.6);
  padding-top: 0.75rem;
  margin-top: 0.5rem;
  position: relative;
}

.rating-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent);
}

.comments-section {
  background: linear-gradient(135deg, rgba(249, 250, 251, 0.8) 0%, rgba(243, 244, 246, 0.6) 100%);
  backdrop-filter: blur(8px);
  border-radius: 12px;
  padding: 1rem;
  margin-top: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.comment-item {
  font-size: 0.75rem;
  line-height: 1.5;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(248, 250, 252, 0.5) 100%);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  transition: all 0.2s ease;
}

.comment-item:hover {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.7) 100%);
  transform: translateX(4px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.add-comment textarea {
  font-size: 0.8rem;
  line-height: 1.5;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.8) 100%);
  backdrop-filter: blur(8px);
  border: 2px solid rgba(59, 130, 246, 0.2);
  transition: all 0.3s ease;
}

.add-comment textarea:focus {
  border-color: rgba(59, 130, 246, 0.5);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  outline: none;
}

.add-comment button {
  font-size: 0.8rem;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  border: none;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
  transition: all 0.3s ease;
}

.add-comment button:hover:not(:disabled) {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

/* Star rating hover effects */
.rating-section span {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
}

.rating-section span:hover {
  transform: scale(1.1);
  text-shadow: 0 2px 4px rgba(251, 191, 36, 0.5);
}

.rating-section span.text-yellow-400 {
  animation: starGlow 0.3s ease;
}

@keyframes starGlow {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .netflix-card-info {
    padding: 0.5rem;
  }
  
  .netflix-card-info h3 {
    font-size: 0.8rem;
  }
  
  .netflix-card-info p {
    font-size: 0.7rem;
  }
  
  .rating-section {
    font-size: 0.75rem;
  }
  
  .comment-item {
    font-size: 0.7rem;
  }
}
</style>