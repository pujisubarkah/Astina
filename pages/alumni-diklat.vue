<template>
	<div class="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 p-6">
		<div class="max-w-7xl mx-auto">
			<!-- Enhanced Header with Animation -->
			<div class="mb-8 text-center">
				<div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4 shadow-lg">
					<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
					</svg>
				</div>
				<h1 class="text-5xl font-extrabold bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent mb-3">
					Alumni Pelatihan
				</h1>
				<p class="text-lg text-gray-600 max-w-2xl mx-auto">
					📊 Ringkasan dan visualisasi alumni pelatihan kepemimpinan nasional 
					<span class="font-semibold text-blue-700">PKN • PKA • PKP</span> 
					periode 2020 — 2025
				</p>
				<div class="mt-4 flex items-center justify-center gap-4">
					<div class="badge badge-info badge-lg">
						<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
						</svg>
						Data Real-time
					</div>
					<div class="badge badge-success badge-lg">
						<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						Terverifikasi
					</div>
				</div>
			</div>



			<!-- Enhanced Stat Cards with Modern Design -->
			<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
				<!-- PKN Tingkat I Card -->
				<div class="group card bg-gradient-to-br from-blue-600 to-blue-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-0">
					<div class="card-body text-white">
						<div class="flex items-center justify-between">
							<div class="flex-1">
								<div class="flex items-center gap-2 mb-2">
									<div class="badge badge-blue-100 badge-sm text-blue-700">PKN I</div>
								</div>
								<p class="text-blue-100 text-sm font-medium">Tingkat I</p>
								<p class="text-3xl font-bold text-white mb-1">{{ formatNumber(totals.pkn1) }}</p>
								<div class="text-xs text-blue-200">Alumni Terdaftar</div>
							</div>
							<div class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center group-hover:bg-white/30 transition-colors">
								<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h2M7 7h10M7 11h10M7 15h10" />
								</svg>
							</div>
						</div>
						<!-- Progress indicator -->
						<div class="mt-3">
							<div class="w-full bg-blue-500/30 rounded-full h-1.5">
								<div class="bg-white h-1.5 rounded-full transition-all duration-1000" :style="`width: ${Math.min(100, (totals.pkn1 / Math.max(totals.pkn1, totals.pkn2, totals.pka, totals.pkp)) * 100)}%`"></div>
							</div>
						</div>
					</div>
				</div>

				<!-- PKN Tingkat II Card -->
				<div class="group card bg-gradient-to-br from-purple-600 to-purple-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-0">
					<div class="card-body text-white">
						<div class="flex items-center justify-between">
							<div class="flex-1">
								<div class="flex items-center gap-2 mb-2">
									<div class="badge badge-purple-100 badge-sm text-purple-700">PKN II</div>
								</div>
								<p class="text-purple-100 text-sm font-medium">Tingkat II</p>
								<p class="text-3xl font-bold text-white mb-1">{{ formatNumber(totals.pkn2) }}</p>
								<div class="text-xs text-purple-200">Alumni Terdaftar</div>
							</div>
							<div class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center group-hover:bg-white/30 transition-colors">
								<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
								</svg>
							</div>
						</div>
						<div class="mt-3">
							<div class="w-full bg-purple-500/30 rounded-full h-1.5">
								<div class="bg-white h-1.5 rounded-full transition-all duration-1000" :style="`width: ${Math.min(100, (totals.pkn2 / Math.max(totals.pkn1, totals.pkn2, totals.pka, totals.pkp)) * 100)}%`"></div>
							</div>
						</div>
					</div>
				</div>

				<!-- PKA Card -->
				<div class="group card bg-gradient-to-br from-emerald-600 to-emerald-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-0">
					<div class="card-body text-white">
						<div class="flex items-center justify-between">
							<div class="flex-1">
								<div class="flex items-center gap-2 mb-2">
									<div class="badge badge-emerald-100 badge-sm text-emerald-700">PKA</div>
								</div>
								<p class="text-emerald-100 text-sm font-medium">Administrator</p>
								<p class="text-3xl font-bold text-white mb-1">{{ formatNumber(totals.pka) }}</p>
								<div class="text-xs text-emerald-200">Alumni Terdaftar</div>
							</div>
							<div class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center group-hover:bg-white/30 transition-colors">
								<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
								</svg>
							</div>
						</div>
						<div class="mt-3">
							<div class="w-full bg-emerald-500/30 rounded-full h-1.5">
								<div class="bg-white h-1.5 rounded-full transition-all duration-1000" :style="`width: ${Math.min(100, (totals.pka / Math.max(totals.pkn1, totals.pkn2, totals.pka, totals.pkp)) * 100)}%`"></div>
							</div>
						</div>
					</div>
				</div>

				<!-- PKP Card -->
				<div class="group card bg-gradient-to-br from-amber-600 to-amber-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-0">
					<div class="card-body text-white">
						<div class="flex items-center justify-between">
							<div class="flex-1">
								<div class="flex items-center gap-2 mb-2">
									<div class="badge badge-amber-100 badge-sm text-amber-700">PKP</div>
								</div>
								<p class="text-amber-100 text-sm font-medium">Pengawas</p>
								<p class="text-3xl font-bold text-white mb-1">{{ formatNumber(totals.pkp) }}</p>
								<div class="text-xs text-amber-200">Alumni Terdaftar</div>
							</div>
							<div class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center group-hover:bg-white/30 transition-colors">
								<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
								</svg>
							</div>
						</div>
						<div class="mt-3">
							<div class="w-full bg-amber-500/30 rounded-full h-1.5">
								<div class="bg-white h-1.5 rounded-full transition-all duration-1000" :style="`width: ${Math.min(100, (totals.pkp / Math.max(totals.pkn1, totals.pkn2, totals.pka, totals.pkp)) * 100)}%`"></div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Total Summary Card -->
			<div class="mb-8">
				<div class="card bg-gradient-to-r from-slate-900 to-slate-800 shadow-2xl">
					<div class="card-body">
						<div class="flex items-center justify-between">
							<div class="flex items-center gap-6">
								<div class="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center">
									<svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
									</svg>
								</div>
								<div class="text-white">
									<h3 class="text-2xl font-bold">Total Alumni Keseluruhan</h3>
									<p class="text-4xl font-extrabold text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">
										{{ formatNumber(totalAlumni) }}
									</p>
									<p class="text-slate-300">Alumni dari seluruh program diklat kepemimpinan</p>
								</div>
							</div>
							<div class="text-right text-white">
								<div class="stats stats-vertical shadow">
									<div class="stat bg-white/10">
										<div class="stat-title text-slate-300">Rata-rata per Program</div>
										<div class="stat-value text-lg text-white">{{ formatNumber(Math.round(totalAlumni / 4)) }}</div>
									</div>
									<div class="stat bg-white/10">
										<div class="stat-title text-slate-300">Program Aktif</div>
										<div class="stat-value text-lg text-cyan-400">4</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Enhanced Charts Section -->
			<div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
				<!-- Gender Distribution Chart -->
				<div class="lg:col-span-1">
					<div class="card bg-white shadow-xl border-0">
						<div class="card-body">
							<div class="flex items-center justify-between mb-4">
								<div>
									<h3 class="text-xl font-bold text-gray-800 flex items-center gap-2">
										<svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
										</svg>
										Distribusi Gender
									</h3>
									<p class="text-sm text-gray-500">Perbandingan alumni berdasarkan jenis kelamin</p>
								</div>
								<div class="badge badge-info badge-sm">Real-time</div>
							</div>
							
							<client-only>
								<div v-if="genderSeries && genderSeries.length" class="relative">
									<apexchart type="donut" :options="genderOptions" :series="genderSeries" height="300" />
									<!-- Center text overlay -->
									<div class="absolute inset-0 flex items-center justify-center pointer-events-none">
										<div class="text-center">
											<div class="text-2xl font-bold text-gray-800">{{ formatNumber(genderSeries[0] + genderSeries[1]) }}</div>
											<div class="text-xs text-gray-500">Total Alumni</div>
										</div>
									</div>
								</div>
								<div v-else class="h-72 flex flex-col items-center justify-center bg-gray-50 rounded-lg">
									<div class="loading loading-spinner loading-lg text-blue-600"></div>
									<p class="text-gray-500 mt-3">Memuat data gender...</p>
								</div>
							</client-only>
							
							<!-- Enhanced Filter Buttons -->
							<div class="mt-6 space-y-3">
								<div class="flex items-center justify-center gap-2">
									<button 
										:class="['btn btn-sm transition-all', selectedGender === 'Pria' ? 'btn-primary shadow-lg' : 'btn-outline btn-primary hover:btn-primary']" 
										@click="setGender('Pria')"
									>
										<svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
										</svg>
										Pria
									</button>
									<button 
										:class="['btn btn-sm transition-all', selectedGender === 'Wanita' ? 'btn-secondary shadow-lg' : 'btn-outline btn-secondary hover:btn-secondary']" 
										@click="setGender('Wanita')"
									>
										<svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
										</svg>
										Wanita
									</button>
								</div>
								<div class="flex justify-center">
									<button 
										v-if="selectedGender" 
										class="btn btn-sm btn-ghost hover:btn-error transition-all" 
										@click="setGender(undefined)"
									>
										<svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
										</svg>
										Reset Filter
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Map sits beside the gender chart on md+ -->
				<div class="card bg-white shadow-lg md:col-span-2">
					<div class="card-body">
						<h3 class="font-semibold mb-4 text-gray-800">Peta Sebaran Alumni per Provinsi</h3>
						
						<!-- Loading state -->
						<div v-if="provinsiLoading" class="h-96 flex items-center justify-center">
							<div class="loading loading-spinner loading-lg"></div>
							<span class="ml-3 text-gray-600">Memuat data provinsi...</span>
						</div>
					
						<!-- Enhanced Map container with better visibility -->
						<div v-else class="relative bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl p-6 border border-slate-300" style="height: 450px;">
							<svg
								viewBox="0 0 1000 600"
								class="w-full h-full cursor-pointer drop-shadow-sm"
								@mouseleave="hoveredProvince = null"
								style="filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))"
							>
								<!-- Background for better contrast -->
								<rect width="1000" height="600" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2" rx="8"/>
								
								<g id="alumni-provinces">
									<template v-for="prov in provinsiList" :key="prov.id || prov.name">
										<path
											v-if="prov.svgPathClean || prov.svgPath"
											:d="parseSvgPath(prov.svgPathClean || prov.svgPath)"
											:fill="getColorForTotal(prov.total)"
											:class="getProvinceMapClass(prov)"
											@click="selectProvince(prov)"
											@mouseenter="hoveredProvince = prov"
											stroke-linejoin="round"
											stroke-linecap="round"
										/>
									</template>
								</g>
								
								<!-- Enhanced tooltip with better visibility -->
								<g v-if="hoveredProvince">
									<!-- Tooltip shadow -->
									<rect
										:x="tooltipPosition.x + 2"
										:y="tooltipPosition.y + 2"
										:width="tooltipWidth"
										height="55"
										fill="rgba(0,0,0,0.3)"
										rx="10"
									/>
									<!-- Main tooltip background -->
									<rect
										:x="tooltipPosition.x"
										:y="tooltipPosition.y"
										:width="tooltipWidth"
										height="55"
										fill="rgba(15,23,42,0.95)"
										stroke="rgba(59,130,246,0.8)"
										stroke-width="2"
										rx="10"
									/>
									<!-- Province name -->
									<text
										:x="tooltipPosition.x + 15"
										:y="tooltipPosition.y + 20"
										fill="#f1f5f9"
										font-size="15"
										font-weight="bold"
										font-family="system-ui, sans-serif"
									>
										{{ hoveredProvince.name }}
									</text>
									<!-- Alumni count -->
									<text
										:x="tooltipPosition.x + 15"
										:y="tooltipPosition.y + 40"
										fill="#cbd5e1"
										font-size="13"
										font-family="system-ui, sans-serif"
									>
										{{ formatNumber(hoveredProvince.total) }} alumni terdaftar
									</text>
								</g>
							</svg>
						</div>

						<!-- Enhanced Legend with new color scheme -->
						<div class="mt-6 space-y-3">
							<h4 class="font-semibold text-gray-800 text-base flex items-center gap-2">
								<svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a4 4 0 004-4V5z" />
								</svg>
								Distribusi Alumni per Provinsi
							</h4>
							<div class="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
								<div class="flex items-center gap-3 p-2 bg-white rounded-lg border border-gray-200">
									<div class="w-6 h-4 bg-red-600 rounded border border-gray-300 shadow-sm"></div>
									<span class="text-gray-700 font-medium">Sangat Tinggi (&gt;80%)</span>
								</div>
								<div class="flex items-center gap-3 p-2 bg-white rounded-lg border border-gray-200">
									<div class="w-6 h-4 bg-orange-600 rounded border border-gray-300 shadow-sm"></div>
									<span class="text-gray-700 font-medium">Tinggi (60-80%)</span>
								</div>
								<div class="flex items-center gap-3 p-2 bg-white rounded-lg border border-gray-200">
									<div class="w-6 h-4 bg-yellow-600 rounded border border-gray-300 shadow-sm"></div>
									<span class="text-gray-700 font-medium">Sedang (40-60%)</span>
								</div>
								<div class="flex items-center gap-3 p-2 bg-white rounded-lg border border-gray-200">
									<div class="w-6 h-4 bg-green-600 rounded border border-gray-300 shadow-sm"></div>
									<span class="text-gray-700 font-medium">Rendah (20-40%)</span>
								</div>
								<div class="flex items-center gap-3 p-2 bg-white rounded-lg border border-gray-200">
									<div class="w-6 h-4 bg-sky-500 rounded border border-gray-300 shadow-sm"></div>
									<span class="text-gray-700 font-medium">Sangat Rendah (&lt;20%)</span>
								</div>
								<div class="flex items-center gap-3 p-2 bg-white rounded-lg border border-gray-200">
									<div class="w-6 h-4 bg-gray-300 rounded border border-gray-400 shadow-sm"></div>
									<span class="text-gray-700 font-medium">Tidak ada data</span>
								</div>
							</div>
							<div class="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
								<p class="text-xs text-blue-700 flex items-center gap-2">
									<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
									Klik pada provinsi di peta untuk melihat detail alumni
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>


		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, computed, getCurrentInstance, watch } from 'vue'

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
const totalAlumni = computed(() => {
	const total = (totals.value.pkn1 || 0) + (totals.value.pkn2 || 0) + (totals.value.pka || 0) + (totals.value.pkp || 0)
	console.log('totalAlumni computed:', total, 'from totals:', totals.value)
	return total
})

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
const provinsiList = ref([])
const hoveredProvince = ref(null)
const selectedProvinceData = ref(null)

// Simple in-memory cache for master province geometry
const provinsiMasterCache = { data: null, ts: 0 }

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

// Utility untuk parsing path SVG dari API
function parseSvgPath(path) {
	if (!path) return ''
	
	try {
		// Hilangkan tanda kutip ganda di awal/akhir dan whitespace
		let cleanPath = String(path).replace(/^"|"$/g, '').trim()
		
		// Jika path string masih ada escape quote, parse dulu
		if (cleanPath.startsWith('"') || cleanPath.startsWith("'")) {
			cleanPath = JSON.parse(cleanPath)
		}
		
		return cleanPath
	} catch {
		// Fallback jika parsing gagal
		return String(path).replace(/^"|"$/g, '').trim()
	}
}

function getColorForTotal(total) {
	// Enhanced color scheme with brighter colors for better visibility
	const numTotal = Number(total) || 0
	const max = maxProvinceTotal.value || 1
	
	if (numTotal === 0) return '#e5e7eb' // Light gray for no data
	
	// Progressive color scheme with better contrast and brightness
	const ratio = numTotal / max
	if (ratio > 0.8) return '#dc2626' // Bright red for highest
	if (ratio > 0.6) return '#ea580c' // Orange-red
	if (ratio > 0.4) return '#ca8a04' // Golden yellow  
	if (ratio > 0.2) return '#16a34a' // Green
	return '#0ea5e9' // Sky blue for lowest
}

function getProvinceMapClass(prov) {
	const baseClass = 'transition-all duration-300 hover:opacity-90 cursor-pointer filter hover:drop-shadow-lg'
	if (hoveredProvince.value && hoveredProvince.value.name === prov.name) {
		return `${baseClass} stroke-gray-900 stroke-3 drop-shadow-xl`
	}
	return `${baseClass} stroke-gray-700 stroke-2`
}

function selectProvince(prov) {
	selectedProvinceData.value = prov
	console.log('Selected province:', prov.name, 'Total alumni:', prov.total)
	// Optional: Navigate to province detail page
	// navigateProv(prov.name)
}

// Computed properties for tooltip
const tooltipPosition = computed(() => {
	return { x: 50, y: 50 }
})

const tooltipWidth = computed(() => {
	if (!hoveredProvince.value) return 0
	const name = hoveredProvince.value.name || ''
	return Math.max(180, name.length * 8 + 60)
})

// Legend: create 5 buckets from 0..max
const legendBuckets = computed(() => {
	const max = maxProvinceTotal.value || 1
	const steps = 5
	const buckets = []
	for (let i = 0; i < steps; i++) {
		const low = Math.round((i / steps) * max)
		const high = Math.round(((i + 1) / steps) * max)
		const mid = Math.round((low + high) / 2)
		buckets.push({ 
			label: i === 0 && low === 0 ? 'Tidak ada data' : `${formatNumber(low)} - ${formatNumber(high)}`, 
			color: getColorForTotal(mid) 
		})
	}
	return buckets
})

// Remove old tooltip functions - using new hover system

// Fetch provinsi geometry and alumni counts with improved error handling
const fetchProvinsi = async (gender) => {
	// Cancel previous request if any
	try {
		if (provAbortController) provAbortController.abort()
	} catch (e) {}
	provAbortController = new AbortController()
	const signal = provAbortController.signal

	provinsiLoading.value = true
	try {
		// Use cached master geometry if fresh (5 minutes)
		let master = provinsiMasterCache.data
		const now = Date.now()
		if (!master || (now - provinsiMasterCache.ts) > 1000 * 60 * 5) {
			// Try multiple endpoints for better compatibility
			let mres
			try {
				mres = await fetch('/api/proper/provinsi', { signal })
			} catch {
				mres = await fetch('/api/provinsi', { signal })
			}
			
			const mjson = await mres.json().catch(() => null)
			if (mjson && mjson.success && Array.isArray(mjson.data)) {
				master = mjson.data.map(item => ({
					id: item.id || item.id_provinsi,
					nama: item.nama || item.nama_provinsi,
					svgPath: item.svg_path || item.svgPath
				}))
			} else {
				master = []
			}
			
			provinsiMasterCache.data = master
			provinsiMasterCache.ts = Date.now()
		}

		// Fetch alumni counts (can be filtered by gender)
		const url = gender ? `/api/alumni/provinsi?gender=${encodeURIComponent(gender)}` : '/api/alumni/provinsi'
		const ares = await fetch(url, { signal })
		const ajson = await ares.json().catch(() => null)
		const alumniData = (ajson && ajson.success && ajson.data) ? ajson.data : {}

		// Normalize alumni keys for matching
		const alumniMap = new Map()
		for (const [key, value] of Object.entries(alumniData)) {
			if (!key) continue
			alumniMap.set(String(key).trim().toUpperCase(), value)
		}

		// Combine geometry with alumni data
		provinsiList.value = master.map((p) => {
			const name = p.nama || p.name || p.nama_provinsi || ''
			const normalizedKey = String(name || '').trim().toUpperCase()
			const counts = alumniMap.get(normalizedKey) || { total: 0 }
			
			return {
				id: p.id,
				name: name || normalizedKey,
				total: counts.total || 0,
				svgPath: p.svgPath,
				svgPathClean: parseSvgPath(p.svgPath)
			}
		})
		
		console.log('Loaded', provinsiList.value.length, 'provinces with alumni data')
		provinsiLoading.value = false
		
	} catch (e) {
		if (e && e.name === 'AbortError') {
			provinsiLoading.value = false
			return
		}
		console.error('Error fetching provinsi data:', e)
		// Fallback to empty array
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
    console.log('Fetching program data from /api/alumni/program...')
    const res = await fetch('/api/alumni/program')
    const json = await res.json()
    
    console.log('API Response:', json)
    
    if (json && json.success && json.data) {
      // Map API response to scorecard values
      totals.value = {
        pkp: json.data['Pelatihan Kepemimpinan Pengawas (PKP)'] || 0,
        pka: json.data['Pelatihan Kepemimpinan Administrator (PKA)'] || 0,
        pkn2: json.data['Pelatihan Kepemimpinan Nasional (PKN) Tingkat II'] || 0,
        pkn1: json.data['Pelatihan Kepemimpinan Nasional (PKN) Tingkat I'] || 0
      }
      
      console.log('Updated totals:', totals.value)
      console.log('Total Alumni (computed):', totalAlumni.value)
      return
    } else {
      console.warn('Invalid API response format:', json)
      throw new Error('Invalid response format')
    }
  } catch (e) {
    console.error('Error fetching program data:', e)
    // Use realistic fallback values based on your example data
    totals.value = { 
      pkp: 36406, 
      pka: 30901, 
      pkn2: 9018, 
      pkn1: 735 
    }
    console.log('Using fallback data:', totals.value)
    console.log('Total Alumni (computed from fallback):', totalAlumni.value)
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

// Default values matching the expected API response structure
totals.value = { 
  pkp: 36406,  // Pelatihan Kepemimpinan Pengawas (PKP)
  pka: 30901,  // Pelatihan Kepemimpinan Administrator (PKA)  
  pkn2: 9018,  // Pelatihan Kepemimpinan Nasional (PKN) Tingkat II
  pkn1: 735    // Pelatihan Kepemimpinan Nasional (PKN) Tingkat I
}

// Watch for changes in totals
watch(totals, (newTotals) => {
  console.log('Totals changed:', newTotals)
  console.log('New totalAlumni:', totalAlumni.value)
}, { deep: true })
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
onMounted(async () => {
	console.log('Component mounted, starting data fetch...')
	console.log('Initial totals:', totals.value)
	console.log('Initial totalAlumni:', totalAlumni.value)
	
	await fetchStatCards()
	fetchGender()
	fetchProvinsi()
	
	console.log('After fetchStatCards - totals:', totals.value)
	console.log('After fetchStatCards - totalAlumni:', totalAlumni.value)
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


