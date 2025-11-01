<template>
  <div class="mb-8">
    <!-- Chatbot Toggle Button -->
    <div class="fixed bottom-6 right-6 z-50">
      <button 
        @click="toggleChatbot" 
        class="btn btn-circle btn-primary btn-lg shadow-lg hover:shadow-xl transition-all duration-300"
        :class="{ 'btn-outline': isChatbotOpen }"
      >
        <svg v-if="!isChatbotOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Chatbot Window -->
    <div 
      v-show="isChatbotOpen" 
      class="fixed bottom-24 right-6 w-96 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 z-40 flex flex-col"
    >
      <!-- Header -->
      <div class="bg-blue-600 text-white p-4 rounded-t-lg">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h3 class="font-semibold">ASTINA Assistant</h3>
              <p class="text-xs opacity-90">Asisten Virtual ASTINA</p>
            </div>
          </div>
          <button @click="toggleChatbot" class="text-white hover:text-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Chat Messages -->
      <div class="flex-1 p-4 overflow-y-auto space-y-4" ref="chatContainer">
        <div 
          v-for="(message, index) in chatMessages" 
          :key="index"
          class="flex"
          :class="message.type === 'user' ? 'justify-end' : 'justify-start'"
        >
          <div 
            class="max-w-xs px-4 py-2 rounded-lg"
            :class="message.type === 'user' 
              ? 'bg-blue-600 text-white ml-4' 
              : 'bg-gray-100 text-gray-800 mr-4'"
          >
            <p class="text-sm" v-html="message.content"></p>
            <span class="text-xs opacity-75 block mt-1">{{ message.time }}</span>
          </div>
        </div>

        <!-- Typing indicator -->
        <div v-if="isTyping" class="flex justify-start">
          <div class="bg-gray-100 text-gray-800 max-w-xs px-4 py-2 rounded-lg mr-4">
            <div class="flex space-x-1">
              <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
              <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- FAQ Menu -->
      <div v-if="showFAQMenu" class="p-3 border-t border-gray-200 bg-gray-50 max-h-32 overflow-y-auto">
        <p class="text-xs text-gray-600 mb-2 font-semibold">💡 Pilih Pertanyaan FAQ:</p>
        <div class="space-y-1">
          <button 
            v-for="question in faqQuestions" 
            :key="question.id"
            @click="selectFAQ(question)"
            class="w-full text-left px-3 py-2 text-xs bg-white hover:bg-blue-50 border border-gray-200 rounded-lg transition-colors duration-200 flex items-center space-x-2"
          >
            <span class="text-blue-600">{{ question.icon }}</span>
            <span class="text-gray-700">{{ question.short }}</span>
          </button>
        </div>
      </div>

      <!-- Input Area -->
      <div class="p-4 border-t border-gray-200">
        <!-- Show FAQ Button -->
        <div v-if="!showFAQMenu && chatMessages.length > 1" class="mb-2">
          <button 
            @click="showFAQMenu = true"
            class="btn btn-xs btn-outline btn-info w-full"
          >
            💡 Tampilkan FAQ
          </button>
        </div>
        
        <div class="flex space-x-2">
          <input 
            v-model="userInput"
            @keyup.enter="sendMessage"
            type="text" 
            placeholder="Ketik pertanyaan atau pilih FAQ..."
            class="input input-sm input-bordered flex-1 text-sm"
            :disabled="isTyping"
          />
          <button 
            @click="sendMessage"
            :disabled="!userInput.trim() || isTyping"
            class="btn btn-sm btn-primary"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// State
const isChatbotOpen = ref(false)
const chatMessages = ref([])
const userInput = ref('')
const isTyping = ref(false)
const showFAQMenu = ref(true)
const chatContainer = ref(null)

// FAQ questions about ASTINA application - ready to select
const faqQuestions = [
  {
    id: 1,
    icon: "🏢",
    short: "Apa itu ASTINA?",
    full: "Apa itu sistem ASTINA?",
    answer: "🏢 <strong>ASTINA (Analisis Statistik Produk Pembelajaran)</strong><br/><br/>ASTINA adalah sistem dashboard monitoring dan visualisasi produk pembelajaran dari pelatihan kepemimpinan. Sistem ini membantu:<br/>• 📊 Menganalisis data alumni dan peserta<br/>• 📚 Memantau publikasi ilmiah di Google Scholar<br/>• 🎯 Visualisasi pencapaian SDGs (Sustainable Development Goals)<br/>• 💰 Analisis dampak ekonomi program pelatihan<br/>• 🔍 Monitoring kata kunci dari proyek alumni"
  },
  {
    id: 2,
    icon: "📊",
    short: "Fitur Dashboard",
    full: "Apa saja fitur yang tersedia di dashboard?",
    answer: "📊 <strong>Fitur Dashboard ASTINA</strong><br/><br/>Dashboard menyediakan berbagai fitur analitik:<br/>• 📈 <strong>Statistik Alumni:</strong> Data gender, usia, program, provinsi<br/>• 🎓 <strong>Google Scholar:</strong> Pencarian publikasi ilmiah alumni<br/>• 🌍 <strong>SDGs Monitoring:</strong> Visualisasi pencapaian tujuan pembangunan<br/>• 💼 <strong>Economic Impact:</strong> Analisis dampak ekonomi program<br/>• 🔤 <strong>Keyword Analysis:</strong> Analisis kata kunci proyek<br/>• 🗺️ <strong>Peta Interaktif:</strong> Distribusi geografis data"
  },
  {
    id: 3,
    icon: "👥",
    short: "Data Alumni",
    full: "Bagaimana cara melihat data alumni?",
    answer: "👥 <strong>Mengakses Data Alumni</strong><br/><br/>Anda dapat melihat data alumni melalui:<br/>• 📋 <strong>Statistik Cards:</strong> Overview total alumni per kategori<br/>• 📊 <strong>Charts Interaktif:</strong> Visualisasi berdasarkan gender, usia, program<br/>• 🗺️ <strong>Peta Provinsi:</strong> Distribusi alumni per wilayah<br/>• 🔍 <strong>Google Scholar:</strong> Cari publikasi berdasarkan nama alumni<br/>• 📈 <strong>Filter & Export:</strong> Filter data dan export ke Excel/PDF"
  },
  {
    id: 4,
    icon: "📤",
    short: "Upload Proyek",
    full: "Bagaimana cara upload proyek?",
    answer: "📤 <strong>Panduan Upload Proyek</strong><br/><br/>Langkah-langkah upload proyek:<br/>1. 🚪 Masuk ke halaman <strong>Upload Proyek</strong><br/>2. 📁 Pilih kategori proyek yang sesuai<br/>3. ✍️ Isi formulir dengan data lengkap<br/>4. 📎 Upload file pendukung (PDF, DOC, XLS)<br/>5. ☁️ Sistem mendukung Dropbox & Google Drive<br/>6. ✅ Proyek masuk sistem approval sebelum dipublikasi<br/>7. 📧 Notifikasi status approval via email"
  },
  {
    id: 5,
    icon: "🏆",
    short: "Monitoring PROPER",
    full: "Apa itu monitoring PROPER?",
    answer: "🏆 <strong>Monitoring PROPER</strong><br/><br/>PROPER (Program Penilaian Peringkat Kinerja Perusahaan):<br/>• 🥇 <strong>Peringkat:</strong> Emas, Hijau, Biru, Merah, Hitam<br/>• 📍 <strong>Lokasi:</strong> Monitoring per provinsi dan kabupaten<br/>• 🏢 <strong>Instansi:</strong> Analisis per kategori instansi<br/>• 📈 <strong>Trend:</strong> Perkembangan peringkat historis<br/>• 📊 <strong>Dashboard:</strong> Visualisasi real-time performa PROPER<br/>• 🎯 <strong>Target:</strong> Monitoring pencapaian target lingkungan"
  },
  {
    id: 6,
    icon: "�",
    short: "SIPENDAR",
    full: "Apa itu SIPENDAR dan bagaimana integrasinya dengan ASTINA?",
    answer: "� <strong>SIPENDAR (Sistem Informasi Pendidikan dan Pelatihan)</strong><br/><br/>SIPENDAR adalah sistem terintegrasi dengan ASTINA:<br/>• 🎓 <strong>Data Alumni:</strong> Sinkronisasi data peserta pelatihan kepemimpinan<br/>• 📚 <strong>Program Diklat:</strong> Informasi lengkap program pendidikan dan pelatihan<br/>• � <strong>Instansi Asal:</strong> Data instansi dan kategori peserta<br/>• 📊 <strong>Sertifikasi:</strong> Tracking sertifikat dan kompetensi alumni<br/>• � <strong>Integrasi Real-time:</strong> Data SIPENDAR otomatis masuk ke dashboard ASTINA<br/>• � <strong>Analytics:</strong> Analisis progres dan dampak pelatihan<br/>• 🎯 <strong>Monitoring:</strong> Pantau perkembangan karir alumni pasca-diklat"
  },
  {
    id: 7,
    icon: "🎯",
    short: "Program Diklat",
    full: "Apa saja program diklat yang dipantau dalam sistem?",
    answer: "🎯 <strong>Program Diklat yang Dipantau</strong><br/><br/>Berbagai program pelatihan kepemimpinan:<br/>• 👑 <strong>PKA (Pendidikan Kepemimpinan Administrator):</strong> Program untuk pejabat administrator<br/>• 🏛️ <strong>PKN Tk. I:</strong> Pendidikan Kepemimpinan Nasional Tingkat I<br/>• 🏢 <strong>PKN Tk. II:</strong> Pendidikan Kepemimpinan Nasional Tingkat II<br/>• 🎓 <strong>PIM (Pendidikan dan Pelatihan Kepemimpinan):</strong> Program kepemimpinan umum<br/>• 📈 <strong>Tracking Alumni:</strong> Monitoring karir dan kontribusi alumni<br/>• 🌟 <strong>Dampak Program:</strong> Evaluasi efektivitas setiap program diklat<br/>• � <strong>Statistik Kelulusan:</strong> Data tingkat keberhasilan per program"
  },
  {
    id: 8,
    icon: "�",
    short: "Tracking Alumni",
    full: "Bagaimana sistem melakukan tracking alumni dari SIPENDAR?",
    answer: "📊 <strong>Tracking Alumni SIPENDAR</strong><br/><br/>Sistem tracking komprehensif untuk alumni:<br/>• 👤 <strong>Profil Alumni:</strong> Data lengkap dari registrasi hingga kelulusan<br/>• 🏢 <strong>Mutasi Jabatan:</strong> Tracking perubahan posisi dan karir alumni<br/>• 📈 <strong>Progress Karir:</strong> Monitoring perkembangan karir pasca-diklat<br/>• 🎯 <strong>Pencapaian:</strong> Dokumentasi prestasi dan kontribusi alumni<br/>• 📚 <strong>Proyek Perubahan:</strong> Monitoring implementasi proyek alumni<br/>• 🌐 <strong>Jejaring Alumni:</strong> Network dan kolaborasi antar alumni<br/>• 📋 <strong>Evaluasi Dampak:</strong> Assess kontribusi alumni terhadap organisasi<br/>• 🔄 <strong>Update Berkala:</strong> Sistem update otomatis dari berbagai sumber"
  },
  {
    id: 9,
    icon: "�🛠️",
    short: "Bantuan Teknis",
    full: "Mengalami masalah teknis?",
    answer: "🛠️ <strong>Bantuan Teknis</strong><br/><br/>Jika mengalami masalah:<br/>• 🔄 <strong>Refresh:</strong> Coba refresh halaman (Ctrl+F5)<br/>• 🌐 <strong>Browser:</strong> Gunakan Chrome, Firefox, atau Edge terbaru<br/>• 📶 <strong>Koneksi:</strong> Pastikan koneksi internet stabil<br/>• 🗂️ <strong>Cache:</strong> Hapus cache dan cookies browser<br/>• 📧 <strong>Support:</strong> Hubungi administrator sistem<br/>• 📞 <strong>Hotline:</strong> Tersedia support teknis 24/7<br/>• 📖 <strong>Manual:</strong> Panduan lengkap tersedia di menu Help"
  }
]

// Initialize chatbot with welcome message
onMounted(() => {
  chatMessages.value = [{
    type: 'bot',
    content: `🤖 <strong>Halo! Saya ASTINA Assistant</strong><br/><br/>
      Selamat datang di sistem ASTINA! 👋<br/><br/>
      Saya siap membantu Anda dengan:<br/>
      • 📊 Informasi tentang dashboard dan fitur<br/>
      • 👥 Data alumni dan statistik<br/>
      • 📤 Panduan upload proyek<br/>
      • 🏆 Monitoring PROPER<br/>
      • � Integrasi dengan SIPENDAR<br/>
      • 🎯 Program diklat dan tracking alumni<br/>
      • 🛠️ Bantuan teknis<br/><br/>
      💡 <strong>Pilih salah satu FAQ di bawah</strong> untuk mendapat informasi lengkap!`,
    time: getCurrentTime()
  }]
})

// Functions
function toggleChatbot() {
  isChatbotOpen.value = !isChatbotOpen.value
  if (isChatbotOpen.value) {
    nextTick(() => {
      scrollToBottom()
    })
  }
}

function selectFAQ(faq) {
  // Add user message
  chatMessages.value.push({
    type: 'user',
    content: faq.full,
    time: getCurrentTime()
  })

  // Hide FAQ menu after selection
  showFAQMenu.value = false
  
  // Show typing indicator
  isTyping.value = true
  scrollToBottom()

  // Simulate bot thinking time
  setTimeout(() => {
    // Add bot response
    chatMessages.value.push({
      type: 'bot',
      content: faq.answer,
      time: getCurrentTime()
    })
    
    isTyping.value = false
    scrollToBottom()
  }, 800)
}

async function sendMessage(customMessage = null) {
  const message = customMessage || userInput.value.trim()
  if (!message) return

  // Add user message
  chatMessages.value.push({
    type: 'user',
    content: message,
    time: getCurrentTime()
  })

  // Clear input
  if (!customMessage) {
    userInput.value = ''
  }

  // Hide FAQ menu after first typed interaction
  showFAQMenu.value = false

  // Show typing indicator
  isTyping.value = true
  scrollToBottom()

  // Simulate bot thinking time
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Generate bot response
  const response = generateBotResponse(message)
  
  chatMessages.value.push({
    type: 'bot',
    content: response,
    time: getCurrentTime()
  })

  isTyping.value = false
  scrollToBottom()
}

function generateBotResponse(userMessage) {
  const message = userMessage.toLowerCase()

  // Check for exact matches with FAQ questions
  const exactMatch = faqQuestions.find(q => 
    message.includes(q.full.toLowerCase()) || 
    message.includes(q.short.toLowerCase())
  )
  
  if (exactMatch) {
    return exactMatch.answer
  }

  // Keyword-based responses
  if (message.includes('astina') || message.includes('apa itu')) {
    return faqQuestions[0].answer
  }
  
  if (message.includes('fitur') || message.includes('dashboard') || message.includes('menu')) {
    return faqQuestions[1].answer
  }
  
  if (message.includes('alumni') || message.includes('data alumni') || message.includes('peserta')) {
    return faqQuestions[2].answer
  }
  
  if (message.includes('upload') || message.includes('proyek') || message.includes('file')) {
    return faqQuestions[3].answer
  }
  
  if (message.includes('proper') || message.includes('peringkat') || message.includes('monitoring')) {
    return faqQuestions[4].answer
  }
  
  if (message.includes('sipendar') || message.includes('sistem informasi') || message.includes('pendidikan pelatihan')) {
    return faqQuestions[5].answer
  }

  if (message.includes('program diklat') || message.includes('pka') || message.includes('pkn') || message.includes('pim')) {
    return faqQuestions[6].answer
  }

  if (message.includes('tracking') || message.includes('alumni') || message.includes('mutasi') || message.includes('karir')) {
    return faqQuestions[7].answer
  }

  // Navigation help
  if (message.includes('navigasi') || message.includes('halaman') || message.includes('menu')) {
    return 'Navigasi sistem ASTINA:<br/>• <strong>Dashboard:</strong> Halaman utama dengan overview statistik<br/>• <strong>Upload Proyek:</strong> Form upload dan manajemen proyek<br/>• <strong>Monitoring:</strong> Pantau status PROPER dan pencapaian<br/>• <strong>Statistik:</strong> Analisis mendalam data alumni<br/>• <strong>Peta:</strong> Visualisasi geografis data'
  }

  // Technical help
  if (message.includes('error') || message.includes('masalah') || message.includes('tidak bisa') || message.includes('bantuan')) {
    return faqQuestions[8].answer
  }

  // Default response with FAQ suggestions
  return `🤔 <strong>Maaf, saya belum memahami pertanyaan Anda.</strong><br/><br/>
    Silakan pilih dari <strong>FAQ yang tersedia</strong> atau coba tanyakan tentang:<br/>
    • 🏢 Sistem ASTINA dan fitur-fiturnya<br/>
    • 📊 Dashboard dan visualisasi data<br/>
    • 👥 Data alumni dan statistik<br/>
    • 📤 Cara upload proyek<br/>
    • 🏆 Monitoring PROPER<br/>
    • � Integrasi SIPENDAR<br/>
    • 🎯 Program diklat dan tracking alumni<br/>
    • 🛠️ Bantuan teknis<br/><br/>
    💡 <strong>Tip:</strong> Gunakan menu FAQ di bawah untuk jawaban yang lebih lengkap!`
}

function getCurrentTime() {
  return new Date().toLocaleTimeString('id-ID', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

function scrollToBottom() {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  })
}

// Watch for new messages to auto-scroll
watch(() => chatMessages.value.length, () => {
  scrollToBottom()
})
</script>

<style scoped>
@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

.animate-bounce {
  animation: bounce 1.4s infinite ease-in-out both;
}

/* Custom scrollbar for chat */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .fixed.bottom-24.right-6 {
    width: calc(100vw - 3rem);
    right: 1.5rem;
    left: 1.5rem;
  }
}
</style>