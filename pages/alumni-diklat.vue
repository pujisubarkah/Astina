<template>
	<div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
		<div class="max-w-7xl mx-auto">
			<!-- Header -->
			<div class="mb-6">
				<h1 class="text-4xl font-bold text-blue-900 mb-2">Alumni Diklat Kepemimpinan</h1>
				<p class="text-blue-700">Ringkasan alumni pelatihan PKN / PKA / PKP (2020 — 2025)</p>
			</div>



			<!-- Stat cards (dashboard style) -->
			<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
				<div class="card bg-white shadow-lg">
					<div class="card-body">
						<div class="flex items-center justify-between">
							<div>
								<p class="text-sm text-gray-600">Total PKN 1</p>
								<p class="text-2xl font-bold text-blue-600">{{ totals.pkn1 }}</p>
							</div>
							<div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
								<svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20v-2a4 4 0 00-3-3.87" />
								</svg>
							</div>
						</div>
					</div>
				</div>

				<div class="card bg-white shadow-lg">
					<div class="card-body">
						<div class="flex items-center justify-between">
							<div>
								<p class="text-sm text-gray-600">Total PKN 2</p>
								<p class="text-2xl font-bold text-purple-600">{{ totals.pkn2 }}</p>
							</div>
							<div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
								<svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2l9 4.5-9 4.5-9-4.5L12 2z" />
								</svg>
							</div>
						</div>
					</div>
				</div>

				<div class="card bg-white shadow-lg">
					<div class="card-body">
						<div class="flex items-center justify-between">
							<div>
								<p class="text-sm text-gray-600">Total PKA</p>
								<p class="text-2xl font-bold text-green-600">{{ totals.pka }}</p>
							</div>
							<div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
								<svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.1 6.46" />
								</svg>
							</div>
						</div>
					</div>
				</div>

				<div class="card bg-white shadow-lg">
					<div class="card-body">
						<div class="flex items-center justify-between">
							<div>
								<p class="text-sm text-gray-600">Total PKP</p>
								<p class="text-2xl font-bold text-yellow-600">{{ totals.pkp }}</p>
							</div>
							<div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
								<svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 21v-2a4 4 0 00-3-3.87" />
								</svg>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Charts (dashboard style cards) -->
			<!-- Gender chart + Map side-by-side -->
			<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
				<div class="card bg-white shadow-lg md:col-span-1">
					<div class="card-body">
						<h3 class="font-semibold mb-2 text-gray-800">Distribusi Jenis Kelamin</h3>
						<client-only>
							<div v-if="genderSeries && genderSeries.length">
								<apexchart type="donut" :options="genderOptions" :series="genderSeries" height="280" />
							</div>
							<div v-else class="h-64 flex items-center justify-center">
								<div class="loading loading-spinner loading-lg"></div>
							</div>
						</client-only>
						<div class="mt-4 flex items-center gap-2">
							<button :class="['btn btn-sm', selectedGender === 'Pria' ? 'btn-primary' : 'btn-ghost']" @click="setGender('Pria')">Pria</button>
							<button :class="['btn btn-sm', selectedGender === 'Wanita' ? 'btn-pink' : 'btn-ghost']" @click="setGender('Wanita')">Wanita</button>
							<button v-if="selectedGender" class="btn btn-sm btn-outline" @click="setGender(undefined)">Clear</button>
						</div>
						<!-- legend -->
						<div class="mt-4 flex items-center gap-3 justify-center">
							<div v-for="(b, i) in legendBuckets" :key="i" class="flex items-center gap-2">
								<div :style="{ width: '28px', height: '18px', background: b.color, border: '1px solid #e6eef8' }" class="rounded-sm"></div>
								<div class="text-xs text-gray-600">{{ b.label }}</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Map sits beside the gender chart on md+ -->
				<div class="card bg-white shadow-lg md:col-span-2">
					<div class="card-body">
						<h3 class="font-semibold mb-2 text-gray-800">Peta Sebaran Alumni per Provinsi</h3>
					
						<div class="w-full overflow-auto">
							<div class="relative bg-slate-50 p-4 rounded">
								<div class="w-full flex justify-center">
									<svg v-if="provinsiList.length" :viewBox="svgViewBox" class="max-w-full h-96" preserveAspectRatio="xMidYMid meet">
										<g>
											<path v-for="(prov, idx) in provinsiList" :key="prov.name" :d="prov.svgPathClean" :fill="getColorForTotal(prov.total)" stroke="#333" stroke-width="0.4" @mouseenter="showProvTip($event, prov)" @mouseleave="hideProvTip" @click="selectProv(prov)"/>
										</g>
									</svg>
									<div v-else class="h-48 flex items-center justify-center">Memuat peta...</div>
								</div>
								<!-- tooltip -->
								<div v-if="provTip.visible" :style="provTip.style" class="absolute z-50 bg-white p-3 rounded-lg shadow-lg text-sm w-64 border">
									<div class="flex items-center justify-between">
										<div class="font-semibold text-gray-800">{{ provTip.name }}</div>
										<button class="btn btn-xs btn-ghost" @click="navigateProv(provTip.name)">Lihat</button>
									</div>
									<div class="mt-1 text-xs text-gray-600">Total: <span class="font-medium text-gray-800">{{ formatNumber(provTip.total) }}</span></div>
									<div class="text-xs text-gray-600">Pria: <span class="font-medium text-gray-800">{{ formatNumber(provTip.pria) }}</span> • Wanita: <span class="font-medium text-gray-800">{{ formatNumber(provTip.wanita) }}</span></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>


		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, computed, getCurrentInstance } from 'vue'

// Local small SummaryCard component
const SummaryCard = {
	props: ['title', 'value', 'color', 'icon', 'spark'],
	data() {
		return { displayValue: 0, rafId: null }
	},
	template: `
		<div :class="['p-4 rounded-lg shadow-md text-white flex items-center gap-4', bgClass]">
			<div class="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
				<svg v-if="icon==='users'" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20v-2a4 4 0 00-3-3.87"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20v-2a4 4 0 013-3.87"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 7a4 4 0 100-8 4 4 0 000 8z"/></svg>
				<svg v-else-if="icon==='layers'" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2l9 4.5-9 4.5-9-4.5L12 2z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 13.5l9 4.5-9 4.5-9-4.5 9-4.5z"/></svg>
				<svg v-else-if="icon==='star'" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.1 6.46a1 1 0 00.95.69h6.8c.969 0 1.371 1.24.588 1.81l-5.51 3.99a1 1 0 00-.364 1.118l2.1 6.46c.3.921-.755 1.688-1.54 1.118l-5.51-3.99a1 1 0 00-1.176 0l-5.51 3.99c-.785.57-1.84-.197-1.54-1.118l2.1-6.46a1 1 0 00-.364-1.118L2.56 11.887c-.783-.57-.38-1.81.588-1.81h6.8a1 1 0 00.95-.69l2.1-6.46z"/></svg>
				<svg v-else class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2l3 6 6 .5-4.5 4 1 6-5-3-5 3 1-6L3 8.5 9 8 12 2z"/></svg>
			</div>
			<div class="flex-1">
				<div class="text-sm opacity-90">{{ title }}</div>
				<div class="text-2xl font-bold">{{ formatNumber(displayValue) }}</div>
				<div class="flex items-center justify-between mt-1">
					<div class="text-xs opacity-80">Periode 2020 - 2025</div>
					<svg v-if="spark && spark.length" :width="80" height="28" viewBox="0 0 80 28" class="ml-2">
						<polyline :points="sparkPoints" fill="none" stroke="rgba(255,255,255,0.85)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
				</div>
			</div>
		</div>
	`,
	computed: {
		bgClass() {
			switch (this.color) {
				case 'green': return 'bg-gradient-to-r from-green-500 to-green-400'
				case 'amber': return 'bg-gradient-to-r from-yellow-500 to-amber-400'
				case 'rose': return 'bg-gradient-to-r from-rose-500 to-rose-400'
				default: return 'bg-gradient-to-r from-indigo-500 to-indigo-400'
			}
		},
		sparkPoints() {
			if (!this.spark || !this.spark.length) return ''
			const w = 80, h = 28, pad = 4
			const arr = this.spark.slice()
			const max = Math.max(...arr)
			const min = Math.min(...arr)
			const range = max - min || 1
			const step = (w - pad * 2) / (arr.length - 1 || 1)
			return arr.map((v, i) => {
				const x = pad + i * step
				const y = pad + (1 - (v - min) / range) * (h - pad * 2)
				return `${x},${y}`
			}).join(' ')
		}
	},
	watch: {
		value(newVal) { this.animateTo(newVal) }
	},
	mounted() {
		this.displayValue = 0
		this.animateTo(this.value)
	},
	methods: {
		formatNumber(n) { return n === undefined || n === null ? '0' : Number(n).toLocaleString('id-ID') },
		animateTo(target) {
			if (this.rafId) cancelAnimationFrame(this.rafId)
			const start = this.displayValue || 0
			const end = Number(target) || 0
			const duration = 900
			const startTime = performance.now()
			const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)
			const step = (now) => {
				const t = Math.min(1, (now - startTime) / duration)
				this.displayValue = Math.round(start + (end - start) * easeOutCubic(t))
				if (t < 1) this.rafId = requestAnimationFrame(step)
			}
			this.rafId = requestAnimationFrame(step)
		}
	}
}

const yearRange = ref('2020-2025')
const totals = ref({ pkn1: 0, pkn2: 0, pka: 0, pkp: 0 })
const totalAlumni = computed(() => (totals.value.pkn1 || 0) + (totals.value.pkn2 || 0) + (totals.value.pka || 0) + (totals.value.pkp || 0))

const pieSeries = ref([])
const pieOptions = ref({ labels: [], legend: { position: 'bottom' } })

// Gender chart
const genderSeries = ref([])
const genderOptions = ref({
	labels: ['Pria', 'Wanita'],
	legend: { position: 'bottom' },
	colors: ['#2563EB', '#EC4899']
})

const barSeries = ref([])
const barOptions = ref({ chart: { toolbar: { show: false } }, xaxis: { categories: [] } })

const pyramidSeries = ref([])
const pyramidOptions = ref({ chart: { stacked: true }, plotOptions: { bar: { horizontal: true } }, xaxis: { categories: [] } })

const sparks = ref({ pkn1: [], pkn2: [], pka: [], pkp: [] })

const formatNumber = (n) => (n || n === 0) ? Number(n).toLocaleString('id-ID') : '0'

// Province map state

// Province map state
const provinsiRaw = ref({})
const provinsiList = ref([])
const svgViewBox = ref('0 0 1000 800')

// simple in-memory cache for master province geometry to avoid refetching
const provinsiMasterCache = { data: null, ts: 0 }

const provTip = ref({ visible: false, name: '', total: 0, pria: 0, wanita: 0, style: { left: '0px', top: '0px' } })

// loading flags and abort controllers
const provinsiLoading = ref(false)
let provAbortController = null

const genderLoading = ref(false)
let genderAbortController = null
let genderDebounceTimer = null

const maxProvinceTotal = computed(() => {
	const arr = provinsiList.value.map(p => Number(p.total) || 0)
	return Math.max(...arr, 1)
})

function getColorForTotal(total) {
	// simple interpolation from light to dark blue
	const t = Math.max(0, Math.min(1, Number(total) / (maxProvinceTotal.value || 1)))
	const start = [229, 246, 253] // #E5F6FD
	const end = [13, 60, 160] // #0D3CA0
	const mix = (a, b) => Math.round(a + (b - a) * t)
	return `rgb(${mix(start[0], end[0])}, ${mix(start[1], end[1])}, ${mix(start[2], end[2])})`
}

// Legend: create 5 buckets from 0..max
const legendBuckets = computed(() => {
	const max = maxProvinceTotal.value || 1
	const steps = 5
	const buckets = []
	for (let i = 0; i < steps; i++) {
		const low = Math.round((i / steps) * max)
		const high = Math.round(((i + 1) / steps) * max)
		const mid = Math.round((low + high) / 2)
		buckets.push({ label: `${formatNumber(low)} - ${formatNumber(high)}`, color: getColorForTotal(mid) })
	}
	return buckets
})

function showProvTip(ev, prov) {
	provTip.value.visible = true
	provTip.value.name = prov.name
	provTip.value.total = prov.total
	provTip.value.pria = prov.pria
	provTip.value.wanita = prov.wanita
	// position tooltip near mouse
	const rect = ev.currentTarget.ownerSVGElement.getBoundingClientRect()
	provTip.value.style = { left: (ev.clientX - rect.left + 12) + 'px', top: (ev.clientY - rect.top + 12) + 'px' }
}

function hideProvTip() {
	provTip.value.visible = false
}

function selectProv(prov) {
	// set as selected and scroll to details (if any)
	// for now, just briefly highlight via tooltip
	provTip.value.visible = true
	provTip.value.name = prov.name
}

// Fetch provinsi geometry (master) and alumni counts. Accepts optional gender filter.
const fetchProvinsi = async (gender) => {
	// cancel previous request if any
	try {
		if (provAbortController) provAbortController.abort()
	} catch (e) {}
	provAbortController = new AbortController()
	const signal = provAbortController.signal

	provinsiLoading.value = true
	try {
		// use cached master geometry if fresh (5m)
		let master = provinsiMasterCache.data
		const now = Date.now()
		if (!master || (now - provinsiMasterCache.ts) > 1000 * 60 * 5) {
			const mres = await fetch('/api/provinsi', { signal })
			const mjson = await mres.json().catch(() => null)
			master = (mjson && mjson.success && Array.isArray(mjson.data)) ? mjson.data : []
			provinsiMasterCache.data = master
			provinsiMasterCache.ts = Date.now()
		}

		// fetch alumni counts (can be filtered by gender)
		const url = gender ? `/api/alumni/provinsi?gender=${encodeURIComponent(gender)}` : '/api/alumni/provinsi'
		const ares = await fetch(url, { signal })
		const ajson = await ares.json().catch(() => null)
		const alumniData = (ajson && ajson.success && ajson.data) ? ajson.data : {}

		// normalize alumni keys for matching
		const alumniMap = new Map()
		for (const k of Object.keys(alumniData)) {
			if (!k) continue
			alumniMap.set(String(k).trim().toUpperCase(), alumniData[k])
		}

		provinsiRaw.value = { master, alumni: alumniData }

		provinsiList.value = master.map((p) => {
			const name = p.nama || p.name || p.nama_provinsi || ''
			const key = String(name || '').trim().toUpperCase()
			const counts = alumniMap.get(key) || { total: 0, pria: 0, wanita: 0, svgPath: p.svgPath }
			// prefer geometry svgPath from master, fallback to alumni-provided svgPath
			let raw = p.svgPath || counts.svgPath || ''
			raw = String(raw).replace(/^\s*"|"\s*$/g, '')
			return { name: name || key, total: counts.total || 0, pria: counts.pria || 0, wanita: counts.wanita || 0, svgPathRaw: raw, svgPathClean: raw }
		})
		provinsiLoading.value = false
	} catch (e) {
		if (e && e.name === 'AbortError') {
			// aborted - keep previous data
			provinsiLoading.value = false
			return
		}
		provinsiList.value = []
		provinsiLoading.value = false
	}
}

function slugify(text) {
	return String(text).toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

function navigateProv(name) {
	const slug = slugify(name)
	// try to use router if available
	try {
		const inst = getCurrentInstance()
		const router = inst && inst.appContext && inst.appContext.config.globalProperties.$router
		if (router && typeof router.push === 'function') {
			router.push(`/provinsi/${slug}`)
			return
		}
	} catch (e) {
		// ignore
	}
	// fallback to window location
	window.location.href = `/provinsi/${slug}`
}

const refresh = () => {
	// keep available: when ready to use real API, call fetchData()
	fetchData(selectedGender.value)
}

// selected gender filter for charts
const selectedGender = ref(undefined)

function setGender(g) {
	// debounce rapid toggles
	selectedGender.value = g
	if (genderDebounceTimer) clearTimeout(genderDebounceTimer)
	genderDebounceTimer = setTimeout(() => {
		// refetch both stats and charts with selected gender
		fetchStatCards()
		fetchGender()
		fetchData(selectedGender.value)
		// refresh province map for selected gender
		fetchProvinsi(selectedGender.value)
	}, 250)
}

const fetchStatCards = async () => {
  try {
    const res = await fetch('/api/alumni/program')
    const json = await res.json()
    if (json && json.success && json.data) {
      // Map API keys to stat card fields
      totals.value = {
        pkp: json.data['Pelatihan Kepemimpinan Pengawas (PKP)'] || 0,
        pka: json.data['Pelatihan Kepemimpinan Administrator (PKA)'] || 0,
        pkn2: json.data['Pelatihan Kepemimpinan Nasional (PKN) Tingkat II'] || 0,
        pkn1: json.data['Pelatihan Kepemimpinan Nasional (PKN) Tingkat I'] || 0
      }
      return
    }
  } catch (e) {
    // fallback to mock
    totals.value = { pkn1: 120, pkn2: 90, pka: 50, pkp: 30 }
  }
}

const fetchGender = async () => {
	// cancel previous gender fetch
	try { if (genderAbortController) genderAbortController.abort() } catch (e) {}
	genderAbortController = new AbortController()
	const signal = genderAbortController.signal
	genderLoading.value = true
	try {
		const res = await fetch('/api/alumni/gender', { signal })
		const json = await res.json()
		if (json && json.success && json.data) {
			const pria = Number(json.data['Pria'] || 0)
			const wanita = Number(json.data['Wanita'] || 0)
			genderSeries.value = [pria, wanita]
			genderLoading.value = false
			return
		}
	} catch (e) {
		if (e && e.name === 'AbortError') { genderLoading.value = false; return }
		// fallback
		genderSeries.value = [51778, 23528]
		genderLoading.value = false
	}
}

const fetchData = async (gender) => {
	// This function is intentionally non-blocking — by default we use mock data.
	// When you want to enable the real API, call `refresh()` or `fetchData()`.
	try {
		// append gender filter when present
		const url = gender ? `/api/alumni?gender=${encodeURIComponent(gender)}` : '/api/alumni'
		const res = await fetch(url)
		const json = await res.json()
		if (json && json.success && json.data) {
			const { totals: t = {}, byInstitution = [], byCategory = [], agePyramid = [] } = json.data
			totals.value = { pkn1: t.pkn1 || 0, pkn2: t.pkn2 || 0, pka: t.pka || 0, pkp: t.pkp || 0 }

			pieOptions.value.labels = byCategory.map(c => c.name)
			pieSeries.value = byCategory.map(c => c.count)

			barOptions.value.xaxis.categories = byInstitution.map(i => i.name)
			barSeries.value = [{ name: 'Alumni', data: byInstitution.map(i => i.count) }]

			pyramidOptions.value.xaxis.categories = agePyramid.map(a => a.ageRange)
			pyramidSeries.value = [ { name: 'Male', data: agePyramid.map(a => a.male) }, { name: 'Female', data: agePyramid.map(a => a.female) } ]
			return
		}
	} catch (e) {
		// ignore: we will use mock data below
	}
}

// Default mock data (used immediately; no API required) - set to latest API values as fallback
totals.value = { pkn1: 735, pkn2: 9018, pka: 30901, pkp: 36406 }
sparks.value = {
	pkn1: [60,70,80,90,100,110,120],
	pkn2: [40,50,60,70,80,85,90],
	pka: [20,25,30,35,40,45,50],
	pkp: [10,12,15,18,22,26,30]
}
const byCategory = [{ name: 'PKN 1', count: 120 }, { name: 'PKN 2', count: 90 }, { name: 'PKA', count: 50 }, { name: 'PKP', count: 30 }]
pieOptions.value.labels = byCategory.map(c => c.name)
pieSeries.value = byCategory.map(c => c.count)

const byInstitution = [{ name: 'Kementerian A', count: 80 }, { name: 'Provinsi B', count: 100 }, { name: 'Kabupaten C', count: 60 }]
barOptions.value.xaxis.categories = byInstitution.map(i => i.name)
barSeries.value = [{ name: 'Alumni', data: byInstitution.map(i => i.count) }]

const mockPyramid = [ { ageRange: '18-25', male: 40, female: 30 }, { ageRange: '26-35', male: 60, female: 70 }, { ageRange: '36-45', male: 30, female: 20 }, { ageRange: '46+', male: 10, female: 5 } ]
pyramidOptions.value.xaxis.categories = mockPyramid.map(a => a.ageRange)
pyramidSeries.value = [ { name: 'Male', data: mockPyramid.map(a => a.male) }, { name: 'Female', data: mockPyramid.map(a => a.female) } ]

// Note: we intentionally do not call fetchData() on mount so the page shows mock data instantly.
onMounted(() => {
	fetchStatCards()
	fetchGender()
	fetchProvinsi()
})

// Page metadata
useHead({
  title: 'Alumni Pelatihan | ASTINA',
  meta: [
    { name: 'description', content: 'Halaman ini menampilkan informasi dan statistik terkait alumni program pelatihan kepemimpinan.' }
  ]
})
</script>

<style scoped>
.card { background: #fff; border-radius: 8px; box-shadow: 0 6px 18px rgba(15, 23, 42, 0.06); }
.select { min-width: 160px }
</style>


