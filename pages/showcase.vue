<template>
  <div class="netflix-bg">
    <!-- Header -->
    <div class="text-center py-12">
      <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4 shadow-lg">
        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      </div>
      <h1 class="netflix-title">Produk Pembelajaran Showcase</h1>
      <hr class="netflix-divider">
    </div>

    <div class="showcase-wrapper">
      <div class="expo-grid">
        <template v-if="type === 'pkn2'">
          <div v-for="(item, index) in pkn2Data" :key="item.img" class="netflix-card">
            <div class="relative w-full h-full">
              <img :src="item.img" :alt="item.title || `PKN II Item ${index + 1}`" class="netflix-poster-full" @click="window.open(item.link, '_blank')" />
              
              <!-- Rating Overlay on Image -->
              <div class="absolute top-3 left-3 bg-black bg-opacity-70 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
                <svg class="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span class="text-white text-sm font-semibold">{{ getAverageRating(`pkn2_${index}`) || '0.0' }}</span>
                <span class="text-gray-300 text-xs">({{ getRatingCount(`pkn2_${index}`) }})</span>
              </div>

              <!-- Three Dots Menu -->
              <div class="absolute top-3 right-3">
                <button 
                  @click.stop="openRatingModal({
                    id: `pkn2_${index}`,
                    title: `PKN Tingkat II - Inovasi ${index + 1}`,
                    author: 'Alumni PKN II',
                    instansi: 'Program Kepemimpinan Nasional Tingkat II',
                    image: item.img,
                    link: item.link
                  })"
                  class="bg-black bg-opacity-70 backdrop-blur-sm rounded-full p-2 hover:bg-opacity-90 transition-all duration-200 group"
                >
                  <svg class="w-4 h-4 text-white group-hover:text-yellow-400 transition-colors duration-200" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
              </div>

              <!-- Title Overlay at Bottom -->
              <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-3">
                <h3 @click="window.open(item.link, '_blank')" class="cursor-pointer hover:text-yellow-400 text-white font-bold text-sm mb-1 transition-colors duration-200">PKN Tingkat II - Inovasi {{ index + 1 }}</h3>
                <p class="text-gray-300 text-xs">Alumni PKN II - Program Kepemimpinan Nasional</p>
              </div>
            </div>
          </div>
        </template>
        <template v-else-if="type === 'pka'">
          <div v-for="(item, index) in pkaData" :key="item.img" class="netflix-card">
            <div class="relative w-full h-full">
              <img :src="item.img" :alt="item.title || `PKA Item ${index + 1}`" class="netflix-poster-full" @click="window.open(item.img, '_blank')" />
              
              <!-- Rating Overlay on Image -->
              <div class="absolute top-3 left-3 bg-black bg-opacity-70 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
                <svg class="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span class="text-white text-sm font-semibold">{{ getAverageRating(`pka_${index}`) || '0.0' }}</span>
                <span class="text-gray-300 text-xs">({{ getRatingCount(`pka_${index}`) }})</span>
              </div>

              <!-- Three Dots Menu -->
              <div class="absolute top-3 right-3">
                <button 
                  @click.stop="openRatingModal({
                    id: `pka_${index}`,
                    title: `PKA Innovation - Program ${index + 1}`,
                    author: 'Alumni PKA',
                    instansi: 'Program Kepemimpinan Administrator',
                    image: item.img
                  })"
                  class="bg-black bg-opacity-70 backdrop-blur-sm rounded-full p-2 hover:bg-opacity-90 transition-all duration-200 group"
                >
                  <svg class="w-4 h-4 text-white group-hover:text-yellow-400 transition-colors duration-200" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
              </div>

              <!-- Title Overlay at Bottom -->
              <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-3">
                <h3 @click="window.open(item.img, '_blank')" class="cursor-pointer hover:text-yellow-400 text-white font-bold text-sm mb-1 transition-colors duration-200">PKA Innovation - Program {{ index + 1 }}</h3>
                <p class="text-gray-300 text-xs">Alumni PKA - Program Kepemimpinan Administrator</p>
              </div>
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
    <div v-if="showRatingModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white/95 backdrop-blur-xl border border-blue-200/50 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-pulse-neon">
        <!-- Modal Header -->
        <div class="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 text-white p-6 border-b border-blue-100">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <h3 class="text-xl font-bold mb-2 bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent">{{ selectedItem?.title }}</h3>
              <p class="text-cyan-200/80 text-sm font-medium">{{ selectedItem?.author }} - {{ selectedItem?.instansi }}</p>
            </div>
            <button 
              @click="closeRatingModal"
              class="text-white/90 hover:text-cyan-300 text-2xl font-bold ml-4 transition-all duration-300 hover:scale-110 hover:rotate-90"
            >
              ×
            </button>
          </div>
        </div>

        <!-- Modal Content -->
        <div class="p-6 max-h-[calc(90vh-140px)] overflow-y-auto bg-white">
          <!-- Rating Section -->
          <div class="mb-8">
            <h4 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-yellow-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span class="bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500 bg-clip-text text-transparent font-bold">Berikan Rating</span>
            </h4>
            
            <div class="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/50 rounded-2xl p-6 hover:from-blue-100 hover:to-indigo-100 transition-all duration-500 hover:border-blue-300/70 hover:shadow-lg hover:shadow-blue-400/20">
              <div class="text-center mb-6">
                <div class="flex justify-center items-center gap-3 mb-6">
                  <span 
                    v-for="star in 5" 
                    :key="star"
                    @click="rateItem(selectedItem.id, star)"
                    @mouseover="hoverRating(selectedItem.id, star)"
                    @mouseleave="hoverRating(selectedItem.id, 0)"
                    class="cursor-pointer text-5xl transition-all duration-300 hover:scale-125 hover:rotate-12 filter drop-shadow-lg hover:drop-shadow-2xl"
                    :class="getStarClass(selectedItem.id, star)"
                    :style="getStarClass(selectedItem.id, star).includes('text-yellow-400') ? 'text-shadow: 0 0 20px #fbbf24, 0 0 40px #f59e0b, 0 0 60px #d97706;' : ''"
                  >
                    ★
                  </span>
                </div>
                <div class="bg-gradient-to-r from-white/70 to-blue-50/70 backdrop-blur-sm border border-blue-200/50 rounded-xl p-4">
                  <div class="text-gray-700 text-sm">
                    Rating rata-rata: <span class="font-bold text-xl bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent animate-pulse">{{ getAverageRating(selectedItem.id) }}/5</span>
                    dari <span class="text-blue-600 font-semibold">{{ getRatingCount(selectedItem.id) }}</span> pengguna
                  </div>
                </div>
              </div>

              <!-- Rating Breakdown -->
              <div class="space-y-3">
                <div v-for="rating in [5,4,3,2,1]" :key="rating" class="flex items-center gap-4 group hover:bg-blue-50/70 p-2 rounded-lg transition-all duration-300">
                  <span class="text-sm text-gray-700 w-3 font-bold">{{ rating }}</span>
                  <svg class="w-4 h-4 text-yellow-500 group-hover:animate-spin transition-all duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <div class="flex-1 bg-gray-200 backdrop-blur-sm rounded-full h-3 overflow-hidden border border-gray-300">
                    <div 
                      class="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 h-3 rounded-full transition-all duration-1000 ease-out shadow-lg shadow-yellow-400/50"
                      :style="`width: ${getRatingPercentage(selectedItem.id, rating)}%; box-shadow: 0 0 15px rgba(251, 191, 36, 0.4);`"
                    ></div>
                  </div>
                  <span class="text-sm text-blue-600 w-8 font-semibold">{{ getRatingCount(selectedItem.id, rating) }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Comments Section -->
          <div>
            <h4 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-blue-500 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd" />
              </svg>
              <span class="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent font-bold">Komentar</span>
              <span class="bg-gradient-to-r from-blue-500 to-purple-500 px-3 py-1 rounded-full text-white text-sm font-bold shadow-lg shadow-blue-500/30 animate-pulse">({{ getCommentsCount(selectedItem.id) }})</span>
            </h4>

            <!-- Add Comment Form -->
            <div v-if="isLoggedIn" class="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/50 rounded-2xl p-6 mb-6 hover:from-blue-100 hover:to-indigo-100 transition-all duration-500 hover:border-blue-300/70 hover:shadow-lg hover:shadow-blue-400/20">
              <textarea 
                v-model="newComment[selectedItem.id]"
                placeholder="Tulis komentar Anda..."
                class="w-full p-4 bg-white/80 backdrop-blur-lg border border-blue-300/50 rounded-xl resize-none text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-300"
                rows="3"
              ></textarea>
              <div class="flex justify-end mt-4">
                <button 
                  @click="addComment(selectedItem.id)"
                  :disabled="!newComment[selectedItem.id]?.trim()"
                  class="px-8 py-3 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-cyan-400 hover:via-blue-400 hover:to-purple-400 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/30 active:scale-95"
                >
                  ✨ Kirim Komentar
                </button>
              </div>
            </div>

            <!-- Login Required Message -->
            <div v-else class="bg-gradient-to-r from-yellow-50 via-orange-50 to-amber-50 border border-yellow-200/70 rounded-2xl p-6 mb-6 shadow-lg shadow-yellow-300/20">
              <div class="flex items-center gap-4">
                <svg class="w-6 h-6 text-yellow-600 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
                <div>
                  <p class="text-gray-800 font-semibold text-lg mb-2">🔐 Silakan login untuk memberikan komentar</p>
                  <button 
                    @click="openLoginModal"
                    class="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white font-medium px-6 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-400/30"
                  >
                    ✨ Login sekarang →
                  </button>
                </div>
              </div>
            </div>

            <!-- Comments List -->
            <div class="space-y-4">
              <div 
                v-for="comment in getComments(selectedItem?.id)" 
                :key="comment.id"
                class="bg-gradient-to-br from-white/90 to-blue-50/60 backdrop-blur-lg border border-blue-200/50 rounded-2xl p-5 hover:from-blue-50/80 hover:to-indigo-50/70 hover:border-blue-300/70 hover:shadow-lg hover:shadow-blue-400/20 transition-all duration-500 group"
              >
                <div class="flex items-start justify-between mb-3">
                  <div class="flex items-center gap-4">
                    <div class="w-10 h-10 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:animate-pulse">
                      {{ comment.author.charAt(0).toUpperCase() }}
                    </div>
                    <div>
                      <div class="font-bold text-gray-800 text-lg">{{ comment.author }}</div>
                      <div class="text-xs text-blue-600 font-medium">{{ formatDate(comment.date) }}</div>
                    </div>
                  </div>
                </div>
                <div class="text-gray-700 ml-14 text-base leading-relaxed">{{ comment.text }}</div>
              </div>
              
              <div v-if="getComments(selectedItem?.id).length === 0" class="text-center py-12 bg-gradient-to-br from-blue-50/80 to-indigo-50/60 border border-blue-200/50 rounded-2xl">
                <svg class="w-16 h-16 mx-auto mb-6 text-blue-500 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <p class="text-xl font-bold mb-3 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">💬 Belum ada komentar</p>
                <p class="text-gray-600 text-base">Jadilah yang pertama memberikan komentar!</p>
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
    img: "https://res.cloudinary.com/dqlfyyigk/image/upload/v1762000375/ta8aut2ni68m2n8ylhyf.png",
    link: "https://drive.google.com/file/d/1qRz7gsm3SxDHjvewMt8WPGBairGqLHda/view?usp=sharing"
  },
  {
    img: "https://res.cloudinary.com/dqlfyyigk/image/upload/v1762000375/uaerrtumvsxxrpm5mpbz.png",
    link: "https://drive.google.com/file/d/1fQOtxUvEVU-3iP5hLG02-l1Mj_u0mxsl/view?usp=sharing"
  },
  {
    img: "https://res.cloudinary.com/dqlfyyigk/image/upload/v1762000375/fz3weppo3o9hxjpvepmk.png",
    link: "https://drive.google.com/file/d/1hFv41o2yZhVgg86IGVw5AcBMmrpkbql0/view?usp=sharing"
  },
  {
    img: "https://res.cloudinary.com/dqlfyyigk/image/upload/v1762000374/eyiupn3dp2ohzye6wy9u.png",
    link: "https://drive.google.com/file/d/1LmtX2e-VJs49Wr4f1JAJj1vknJ5ujqHf/view?usp=sharing"
  },
  {
    img: "https://res.cloudinary.com/dqlfyyigk/image/upload/v1762000374/fsibofqeup9w1vdpih89.png",
    link: "https://drive.google.com/file/d/1sR1NgCV5FGMEUdbHZRGHKcQV7mmgo6ue/view?usp=sharing"
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
  if (!itemId) return []
  
  // Try both string and number versions of the ID
  let commentsForId = comments.value[itemId] || 
                     comments.value[itemId.toString()] || 
                     comments.value[parseInt(itemId)]
  
  // If no specific comments found, use default fallback
  if (!commentsForId || commentsForId.length === 0) {
    commentsForId = comments.value['default'] || []
  }
  
  console.log(`Getting comments for ID ${itemId}:`, commentsForId)
  return commentsForId
}

const getCommentsCount = (itemId) => {
  if (!itemId) return 0
  
  const commentsForId = getComments(itemId)
  console.log(`Comment count for ID ${itemId}:`, commentsForId.length)
  return commentsForId.length
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
    
    // Add dummy data if no saved data exists
    if (Object.keys(comments.value).length === 0) {
      loadDummyData()
    }
  } catch (error) {
    console.error('Error loading saved data:', error)
    loadDummyData()
  }
}

// Load dummy data for demonstration
const loadDummyData = () => {
  console.log('Loading dummy data...')
  
  // Add dummy ratings for first few items - using both string and number keys to ensure compatibility
  ratings.value = {
    // PKN I ratings
    1: [5, 4, 5, 3, 4, 5, 4, 3, 5, 4],
    2: [4, 5, 3, 4, 5, 4, 3, 5, 4, 4],
    3: [5, 5, 4, 5, 3, 4, 5, 4, 5, 3],
    '1': [5, 4, 5, 3, 4, 5, 4, 3, 5, 4],
    '2': [4, 5, 3, 4, 5, 4, 3, 5, 4, 4],
    '3': [5, 5, 4, 5, 3, 4, 5, 4, 5, 3],
    
    // PKN II ratings
    'pkn2_0': [4, 5, 4, 5, 3, 4, 5, 4, 4, 5],
    'pkn2_1': [5, 4, 5, 4, 5, 3, 4, 5, 4, 5],
    'pkn2_2': [4, 4, 5, 3, 4, 5, 5, 4, 3, 4],
    'pkn2_3': [5, 5, 4, 4, 5, 4, 3, 5, 4, 5],
    'pkn2_4': [4, 5, 5, 4, 4, 5, 4, 3, 5, 4],
    
    // PKA ratings
    'pka_0': [5, 4, 4, 5, 4, 3, 5, 4, 5, 3],
    'pka_1': [4, 5, 4, 4, 5, 4, 5, 3, 4, 5],
    'pka_2': [5, 5, 3, 4, 4, 5, 4, 5, 4, 3],
    'pka_3': [4, 4, 5, 5, 3, 4, 5, 4, 4, 5],
    'pka_4': [5, 3, 4, 5, 4, 5, 4, 4, 5, 3]
  }
  
  // Add dummy comments for various IDs - create a fallback system
  const baseDummyComments = [
    {
      id: 1,
      text: "Proyek yang sangat inspiratif! Implementasinya sangat inovatif dan bisa diterapkan di berbagai daerah. Semoga bisa menjadi best practice untuk instansi lain.",
      author: "Dr. Ahmad Suryadi",
      date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() // 2 hours ago
    },
    {
      id: 2,
      text: "Luar biasa! Pendekatan digitalnya sangat modern dan user-friendly. Data yang disajikan juga sangat komprehensif dan mudah dipahami.",
      author: "Siti Nurhaliza, M.Si",
      date: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString() // 5 hours ago
    },
    {
      id: 3,
      text: "Metodologi yang digunakan sangat solid. Hasil analisisnya memberikan insight yang valuable untuk pengambilan keputusan strategis. 👏",
      author: "Budi Santoso",
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // 1 day ago
    }
  ]
  
  const additionalComments = [
    {
      id: 4,
      text: "Konsep yang brilliant! Integrasi teknologi dengan pelayanan publik sangat well-executed. Dampaknya terhadap efisiensi pelayanan sangat signifikan.",
      author: "Prof. Maria Indrawati",
      date: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString() // 3 hours ago
    },
    {
      id: 5,
      text: "Presentasi yang sangat menarik dan informatif. Design thinking approach-nya patut diacungi jempol! 🚀",
      author: "Rizki Pratama, S.T",
      date: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString() // 8 hours ago
    },
    {
      id: 6,
      text: "Solusi yang sangat kreatif untuk masalah klasik! Implementation roadmap-nya juga sangat detailed dan realistic. Sukses selalu!",
      author: "Dina Marlina, M.Pd",
      date: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString() // 4 hours ago
    },
    {
      id: 7,
      text: "Impressed dengan level inovasi yang ditunjukkan. Sustainability aspect-nya juga sudah dipertimbangkan dengan baik. Great work! 💪",
      author: "Eko Prasetyo",
      date: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString() // 12 hours ago
    },
    {
      id: 8,
      text: "Collaboration approach yang digunakan sangat inspiring. Stakeholder engagement-nya comprehensive dan well-structured.",
      author: "Lestari Wulandari, S.E",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
    }
  ]
  
  // PKN II specific comments
  const pkn2Comments = [
    {
      id: 101,
      text: "Program PKN II ini memberikan dampak yang luar biasa! Transformasi kepemimpinan di tingkat nasional sangat terasa. Metodologi yang digunakan sangat aplikatif dan mudah diimplementasikan.",
      author: "Dr. Ratna Sari, M.M",
      date: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString() // 1 hour ago
    },
    {
      id: 102,
      text: "Inovasi yang ditampilkan alumni PKN II benar-benar inspiring! Pendekatan holistik dalam penyelesaian masalah publik patut diapresiasi. Great leadership exemplified! 🌟",
      author: "Prof. Bambang Wijaya",
      date: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString() // 3 hours ago
    },
    {
      id: 103,
      text: "Sebagai sesama alumni PKN, saya sangat bangga dengan pencapaian ini. Kolaborasi lintas sektor yang ditunjukkan sangat excellent dan sustainable. Keep up the great work!",
      author: "Dra. Siti Aminah, M.Si",
      date: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString() // 6 hours ago
    },
    {
      id: 104,
      text: "Outstanding! Implementasi strategic thinking di PKN II level ini memang different. Digital transformation approach-nya sangat well-structured dan measurable. 💪",
      author: "Ir. Agus Prasetyo, M.T",
      date: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString() // 10 hours ago
    }
  ]

  // PKA specific comments
  const pkaComments = [
    {
      id: 201,
      text: "Program PKA ini sangat comprehensive! Pendekatan administratif yang modern dan strategic sangat membantu dalam pengelolaan birokrasi. Excellent program design! 🎯",
      author: "Dr. Indira Sari, M.AP",
      date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() // 2 hours ago
    },
    {
      id: 202,
      text: "Innovation in public administration ini benar-benar game-changer! Systematic approach dan evidence-based decision making sangat well-implemented. Truly inspiring!",
      author: "Drs. Hendra Kusuma, M.PA",
      date: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString() // 4 hours ago
    },
    {
      id: 203,
      text: "Administrative leadership yang ditunjukkan alumni PKA sangat remarkable. Digital governance approach-nya modern dan sustainable. Keep innovating! 💡",
      author: "Prof. Dr. Maya Sari, M.Si",
      date: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString() // 7 hours ago
    }
  ]

  // Create comments for all possible IDs (both the original few and fallback for any ID)
  const dummyComments = {
    // PKN I - Specific items with their own comments
    1: baseDummyComments,
    2: [additionalComments[0], additionalComments[1]],
    3: [additionalComments[2], additionalComments[3], additionalComments[4]],
    
    // PKN II comments
    'pkn2_0': [pkn2Comments[0], pkn2Comments[1]],
    'pkn2_1': [pkn2Comments[1], pkn2Comments[2], pkn2Comments[3]],
    'pkn2_2': [pkn2Comments[0], pkn2Comments[3]],
    'pkn2_3': [pkn2Comments[2], pkn2Comments[0]],
    'pkn2_4': [pkn2Comments[3], pkn2Comments[1], pkn2Comments[0]],
    
    // PKA comments
    'pka_0': [pkaComments[0], pkaComments[1]],
    'pka_1': [pkaComments[1], pkaComments[2]],
    'pka_2': [pkaComments[0], pkaComments[2]],
    'pka_3': [pkaComments[2], pkaComments[0]],
    'pka_4': [pkaComments[1], pkaComments[0], pkaComments[2]],
    
    // Fallback - any other ID will get a subset of comments
    'default': baseDummyComments.slice(0, 2) // First 2 comments as fallback
  }
  
  // Set comments with both string and number keys
  comments.value = {}
  Object.keys(dummyComments).forEach(key => {
    comments.value[key] = dummyComments[key]
    if (key !== 'default') {
      comments.value[key.toString()] = dummyComments[key]
    }
  })
  
  // Set default fallback
  comments.value['default'] = dummyComments['default']
  
  console.log('Dummy data loaded:', { ratings: ratings.value, comments: comments.value })
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

/* Neon Animation Effects */
@keyframes pulse-neon {
  0%, 100% {
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.2), 0 0 40px rgba(147, 51, 234, 0.15), 0 0 60px rgba(6, 182, 212, 0.1);
    border-color: rgba(59, 130, 246, 0.3);
  }
  50% {
    box-shadow: 0 0 30px rgba(59, 130, 246, 0.3), 0 0 60px rgba(147, 51, 234, 0.2), 0 0 90px rgba(6, 182, 212, 0.15);
    border-color: rgba(59, 130, 246, 0.4);
  }
}

.animate-pulse-neon {
  animation: pulse-neon 3s ease-in-out infinite;
}

/* Glassmorphism Modal Enhancements */
.modal-glassmorphism {
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

/* Star Neon Effect */
.star-neon {
  filter: drop-shadow(0 0 10px currentColor) drop-shadow(0 0 20px currentColor) drop-shadow(0 0 30px currentColor);
}

/* Animated Gradient Text */
@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-gradient {
  background-size: 400% 400%;
  animation: gradient-shift 3s ease infinite;
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