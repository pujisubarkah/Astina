<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 class="text-4xl font-bold text-blue-900 mb-2">Statistik & Analisis</h1>
            <p class="text-blue-700">Analisis mendalam dan tren historis produk pembelajaran berbasis data</p>
          </div>
          <div class="flex gap-2">
            <select class="select select-bordered" v-model="selectedPeriod">
              <option value="ytd">Year to Date 2024</option>
              <option value="2023">Tahun 2023</option>
              <option value="2022">Tahun 2022</option>
              <option value="all">Semua Periode</option>
            </select>
            <select class="select select-bordered" v-model="selectedAnalysis">
              <option value="overview">Overview</option>
              <option value="performance">Performance</option>
              <option value="comparison">Perbandingan</option>
              <option value="trends">Tren Analisis</option>
            </select>
            <button class="btn btn-primary" @click="exportReport">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-4-4m4 4l4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Export Laporan
            </button>
          </div>
        </div>
      </div>

      <!-- Key Performance Indicators -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="card bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
          <div class="card-body">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="card-title text-white text-lg">Total Proyek</h2>
                <div class="text-3xl font-bold">{{ stats.totalProjects }}</div>
                <div class="flex items-center gap-1 mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span class="text-sm">+{{ stats.projectGrowth }}% vs tahun lalu</span>
                </div>
              </div>
              <div class="text-4xl opacity-80">📊</div>
            </div>
          </div>
        </div>

        <div class="card bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg">
          <div class="card-body">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="card-title text-white text-lg">Success Rate</h2>
                <div class="text-3xl font-bold">{{ stats.successRate }}%</div>
                <div class="flex items-center gap-1 mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span class="text-sm">+{{ stats.successGrowth }}% improvement</span>
                </div>
              </div>
              <div class="text-4xl opacity-80">🎯</div>
            </div>
          </div>
        </div>

        <div class="card bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg">
          <div class="card-body">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="card-title text-white text-lg">Avg Duration</h2>
                <div class="text-3xl font-bold">{{ stats.avgDuration }}</div>
                <div class="flex items-center gap-1 mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span class="text-sm">{{ stats.durationTrend }} vs target</span>
                </div>
              </div>
              <div class="text-4xl opacity-80">⏱️</div>
            </div>
          </div>
        </div>

        <div class="card bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg">
          <div class="card-body">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="card-title text-white text-lg">ROI Impact</h2>
                <div class="text-3xl font-bold">{{ stats.roiImpact }}x</div>
                <div class="flex items-center gap-1 mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span class="text-sm">Return on Investment</span>
                </div>
              </div>
              <div class="text-4xl opacity-80">💰</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Analytics Section -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <!-- Historical Trends -->
        <div class="lg:col-span-2">
          <div class="card bg-white shadow-lg">
            <div class="card-body">
              <div class="flex items-center justify-between mb-4">
                <h2 class="card-title text-lg font-semibold text-gray-800">Tren Historis Proyek</h2>
                <div class="flex gap-2">
                  <button 
                    class="btn btn-sm" 
                    :class="chartView === 'monthly' ? 'btn-primary' : 'btn-outline'"
                    @click="chartView = 'monthly'"
                  >
                    Bulanan
                  </button>
                  <button 
                    class="btn btn-sm" 
                    :class="chartView === 'quarterly' ? 'btn-primary' : 'btn-outline'"
                    @click="chartView = 'quarterly'"
                  >
                    Kuartalan
                  </button>
                  <button 
                    class="btn btn-sm" 
                    :class="chartView === 'yearly' ? 'btn-primary' : 'btn-outline'"
                    @click="chartView = 'yearly'"
                  >
                    Tahunan
                  </button>
                </div>
              </div>
              <div ref="trendsChart" class="w-full h-80"></div>
            </div>
          </div>
        </div>

        <!-- Category Distribution -->
        <div>
          <div class="card bg-white shadow-lg">
            <div class="card-body">
              <h2 class="card-title text-lg font-semibold text-gray-800 mb-4">Distribusi Kategori</h2>
              <div ref="categoryChart" class="w-full h-80"></div>
              
              <!-- Category Details -->
              <div class="mt-4 space-y-3">
                <div v-for="category in categoryStats" :key="category.name" class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <div class="w-3 h-3 rounded-full" :style="`background-color: ${category.color}`"></div>
                    <span class="text-sm font-medium">{{ category.name }}</span>
                  </div>
                  <div class="text-right">
                    <div class="text-sm font-bold">{{ category.count }}</div>
                    <div class="text-xs text-gray-500">{{ category.percentage }}%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Performance Analysis -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- Success Rate by Institution -->
        <div class="card bg-white shadow-lg">
          <div class="card-body">
            <h2 class="card-title text-lg font-semibold text-gray-800 mb-4">Success Rate per Instansi</h2>
            <div ref="institutionChart" class="w-full h-64"></div>
          </div>
        </div>

        <!-- Media Coverage Performance -->
        <div class="card bg-white shadow-lg">
          <div class="card-body">
            <h2 class="card-title text-lg font-semibold text-gray-800 mb-4">Media Coverage per Kategori</h2>
            <div ref="mediaChart" class="w-full h-64"></div>
          </div>
        </div>
      </div>

      <!-- Media Analysis Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- Media Partners Analysis -->
        <div class="card bg-white shadow-lg">
          <div class="card-body">
            <h2 class="card-title text-lg font-semibold text-gray-800 mb-4">Top Media Partners</h2>
            <div class="space-y-4">
              <div v-for="media in topMediaPartners" :key="media.name" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div class="flex items-center gap-3">
                  <div class="avatar placeholder">
                    <div class="bg-blue-500 text-white rounded-full w-10 h-10">
                      <span class="text-xs font-bold">{{ media.name.charAt(0) }}</span>
                    </div>
                  </div>
                  <div>
                    <div class="font-semibold text-sm">{{ media.name }}</div>
                    <div class="text-xs text-gray-500">{{ media.type }} • {{ media.reach }} pembaca</div>
                  </div>
                </div>
                <div class="text-right">
                  <div class="font-bold text-blue-600">{{ media.articles }}</div>
                  <div class="text-xs text-gray-500">artikel</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Media Timeline & Trends -->
        <div class="card bg-white shadow-lg">
          <div class="card-body">
            <h2 class="card-title text-lg font-semibold text-gray-800 mb-4">Tren Publikasi Media</h2>
            <div ref="mediaTimelineChart" class="w-full h-48"></div>
            
            <div class="mt-4 grid grid-cols-2 gap-4">
              <div class="text-center p-3 bg-green-50 rounded-lg">
                <div class="text-2xl font-bold text-green-600">{{ mediaMetrics.weeklyIncrease }}%</div>
                <div class="text-sm text-green-700">Peningkatan mingguan</div>
              </div>
              <div class="text-center p-3 bg-blue-50 rounded-lg">
                <div class="text-2xl font-bold text-blue-600">{{ mediaMetrics.avgEngagement }}</div>
                <div class="text-sm text-blue-700">Rata-rata engagement</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Detailed Analytics Tables -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- Top Performers -->
        <div class="card bg-white shadow-lg">
          <div class="card-body">
            <h2 class="card-title text-lg font-semibold text-gray-800 mb-4">Top Performers</h2>
            <div class="overflow-x-auto">
              <table class="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Peserta</th>
                    <th>Instansi</th>
                    <th>Success Rate</th>
                    <th>Proyek</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(performer, index) in topPerformers" :key="performer.id">
                    <td>
                      <div class="flex items-center gap-2">
                        <div class="badge" :class="getRankBadgeClass(index + 1)">{{ index + 1 }}</div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div class="font-bold text-sm">{{ performer.name }}</div>
                        <div class="text-xs text-gray-500">{{ performer.email }}</div>
                      </div>
                    </td>
                    <td>
                      <div class="badge badge-outline badge-sm">{{ performer.institution }}</div>
                    </td>
                    <td>
                      <div class="flex items-center gap-2">
                        <div class="radial-progress text-xs" 
                             :style="`--value:${performer.successRate}; --size:2rem; --thickness: 3px;`"
                             :class="getSuccessRateClass(performer.successRate)">
                          <span class="text-xs font-bold">{{ performer.successRate }}%</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="text-center">
                        <div class="font-semibold">{{ performer.completedProjects }}</div>
                        <div class="text-xs text-gray-500">dari {{ performer.totalProjects }}</div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Project Categories Analysis -->
        <div class="card bg-white shadow-lg">
          <div class="card-body">
            <h2 class="card-title text-lg font-semibold text-gray-800 mb-4">Analisis Kategori Proyek</h2>
            <div class="space-y-4">
              <div v-for="category in detailedCategoryStats" :key="category.name" class="p-4 bg-gray-50 rounded-lg">
                <div class="flex items-center justify-between mb-2">
                  <h3 class="font-semibold text-gray-800">{{ category.name }}</h3>
                  <div class="badge badge-primary">{{ category.totalProjects }} proyek</div>
                </div>
                
                <div class="grid grid-cols-3 gap-4 text-sm">
                  <div class="text-center">
                    <div class="text-green-600 font-bold text-lg">{{ category.completed }}</div>
                    <div class="text-gray-500">Selesai</div>
                  </div>
                  <div class="text-center">
                    <div class="text-blue-600 font-bold text-lg">{{ category.ongoing }}</div>
                    <div class="text-gray-500">Berjalan</div>
                  </div>
                  <div class="text-center">
                    <div class="text-orange-600 font-bold text-lg">{{ category.avgDuration }}</div>
                    <div class="text-gray-500">Rata-rata (hari)</div>
                  </div>
                </div>
                
                <div class="mt-3">
                  <div class="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Success Rate</span>
                    <span>{{ category.successRate }}%</span>
                  </div>
                  <progress class="progress" :class="getProgressClass(category.successRate)" :value="category.successRate" max="100"></progress>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Advanced Analytics -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <!-- Time to Completion Analysis -->
        <div class="card bg-white shadow-lg">
          <div class="card-body">
            <h2 class="card-title text-lg font-semibold text-gray-800 mb-4">Analisis Waktu Penyelesaian</h2>
            <div ref="timeCompletionChart" class="w-full h-48"></div>
            
            <div class="mt-4 space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600">Rata-rata:</span>
                <span class="font-semibold">{{ timeAnalysis.average }} hari</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Tercepat:</span>
                <span class="font-semibold text-green-600">{{ timeAnalysis.fastest }} hari</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Terlama:</span>
                <span class="font-semibold text-red-600">{{ timeAnalysis.slowest }} hari</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Median:</span>
                <span class="font-semibold">{{ timeAnalysis.median }} hari</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Resource Utilization -->
        <div class="card bg-white shadow-lg">
          <div class="card-body">
            <h2 class="card-title text-lg font-semibold text-gray-800 mb-4">Utilisasi Sumber Daya</h2>
            
            <div class="space-y-4">
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span>Pelatihan Digitalisasi</span>
                  <span>{{ resourceUtilization.digitalization }}%</span>
                </div>
                <progress class="progress progress-primary" value="85" max="100"></progress>
              </div>
              
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span>SAKIP & Reformasi</span>
                  <span>{{ resourceUtilization.sakip }}%</span>
                </div>
                <progress class="progress progress-secondary" value="72" max="100"></progress>
              </div>
              
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span>Manajemen Perubahan</span>
                  <span>{{ resourceUtilization.management }}%</span>
                </div>
                <progress class="progress progress-accent" value="68" max="100"></progress>
              </div>
              
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span>Inovasi</span>
                  <span>{{ resourceUtilization.innovation }}%</span>
                </div>
                <progress class="progress progress-info" value="55" max="100"></progress>
              </div>
            </div>

            <div class="mt-4 p-3 bg-blue-50 rounded-lg">
              <h4 class="font-semibold text-blue-800 mb-2">Rekomendasi</h4>
              <ul class="text-sm text-blue-700 space-y-1">
                <li>• Tingkatkan program inovasi</li>
                <li>• Optimalisasi SAKIP training</li>
                <li>• Focus digitalization excellence</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Media Coverage Analytics -->
        <div class="card bg-white shadow-lg">
          <div class="card-body">
            <h2 class="card-title text-lg font-semibold text-gray-800 mb-4">Analisis Media Coverage</h2>
            
            <div class="space-y-4">
              <div class="p-3 bg-green-50 rounded-lg">
                <h4 class="font-semibold text-green-800">Total Publikasi Media</h4>
                <div class="text-2xl font-bold text-green-600">{{ mediaStats.totalPublications }}</div>
                <div class="text-sm text-green-700">artikel dipublikasikan</div>
              </div>
              
              <div class="p-3 bg-blue-50 rounded-lg">
                <h4 class="font-semibold text-blue-800">Media Reach</h4>
                <div class="text-2xl font-bold text-blue-600">{{ mediaStats.totalReach }}</div>
                <div class="text-sm text-blue-700">pembaca tercapai</div>
              </div>
              
              <div class="p-3 bg-purple-50 rounded-lg">
                <h4 class="font-semibold text-purple-800">Media Partners</h4>
                <div class="text-sm text-purple-700 space-y-1">
                  <div>• Media Online: {{ mediaStats.onlineMedia }}</div>
                  <div>• Media Cetak: {{ mediaStats.printMedia }}</div>
                  <div>• Media TV/Radio: {{ mediaStats.broadcastMedia }}</div>
                </div>
              </div>

              <!-- Media Type Breakdown -->
              <div class="mt-4">
                <h5 class="font-semibold text-gray-700 mb-3">Jenis Media Coverage</h5>
                <div class="space-y-2">
                  <div class="flex items-center justify-between text-sm">
                    <div class="flex items-center gap-2">
                      <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span>Berita Utama</span>
                    </div>
                    <span class="font-semibold">{{ mediaBreakdown.headline }}%</span>
                  </div>
                  <div class="flex items-center justify-between text-sm">
                    <div class="flex items-center gap-2">
                      <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span>Feature Story</span>
                    </div>
                    <span class="font-semibold">{{ mediaBreakdown.feature }}%</span>
                  </div>
                  <div class="flex items-center justify-between text-sm">
                    <div class="flex items-center gap-2">
                      <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Press Release</span>
                    </div>
                    <span class="font-semibold">{{ mediaBreakdown.pressRelease }}%</span>
                  </div>
                  <div class="flex items-center justify-between text-sm">
                    <div class="flex items-center gap-2">
                      <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span>Interview</span>
                    </div>
                    <span class="font-semibold">{{ mediaBreakdown.interview }}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Comparative Analysis -->
      <div class="card bg-white shadow-lg mb-8">
        <div class="card-body">
          <div class="flex items-center justify-between mb-6">
            <h2 class="card-title text-lg font-semibold text-gray-800">Media Impact & Engagement</h2>
            <div class="flex gap-2">
              <select class="select select-bordered select-sm" v-model="mediaAnalysisType">
                <option value="reach">Media Reach</option>
                <option value="engagement">Engagement Rate</option>
                <option value="sentiment">Sentiment Analysis</option>
                <option value="virality">Viral Content</option>
              </select>
            </div>
          </div>
          
          <div class="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
            <div class="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
              <div class="text-3xl font-bold text-blue-600">{{ mediaImpact.totalViews }}</div>
              <div class="text-sm text-blue-700">Total Views</div>
            </div>
            <div class="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
              <div class="text-3xl font-bold text-green-600">{{ mediaImpact.socialShares }}</div>
              <div class="text-sm text-green-700">Social Shares</div>
            </div>
            <div class="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
              <div class="text-3xl font-bold text-purple-600">{{ mediaImpact.comments }}</div>
              <div class="text-sm text-purple-700">Comments</div>
            </div>
            <div class="text-center p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
              <div class="text-3xl font-bold text-orange-600">{{ mediaImpact.sentimentScore }}</div>
              <div class="text-sm text-orange-700">Sentiment Score</div>
            </div>
          </div>

          <!-- Media Channel Performance -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 class="font-semibold text-gray-800 mb-4">Performance by Media Channel</h3>
              <div class="space-y-3">
                <div v-for="channel in mediaChannels" :key="channel.name" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" :style="`background-color: ${channel.color}`">
                      {{ channel.icon }}
                    </div>
                    <div>
                      <div class="font-semibold text-sm">{{ channel.name }}</div>
                      <div class="text-xs text-gray-500">{{ channel.articles }} artikel</div>
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="font-bold" :class="getEngagementClass(channel.engagement)">{{ channel.engagement }}%</div>
                    <div class="text-xs text-gray-500">engagement</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 class="font-semibold text-gray-800 mb-4">Media Content Types</h3>
              <div class="space-y-3">
                <div v-for="content in contentTypes" :key="content.type" class="p-3 bg-gray-50 rounded-lg">
                  <div class="flex justify-between items-center mb-2">
                    <span class="font-medium text-sm">{{ content.type }}</span>
                    <span class="text-sm font-bold">{{ content.count }} artikel</span>
                  </div>
                  <div class="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Performance</span>
                    <span>{{ content.performance }}%</span>
                  </div>
                  <progress class="progress progress-primary" :value="content.performance" max="100"></progress>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Original Comparative Analysis -->
      <div class="card bg-white shadow-lg">
        <div class="card-body">
          <div class="flex items-center justify-between mb-6">
            <h2 class="card-title text-lg font-semibold text-gray-800">Analisis Perbandingan</h2>
            <div class="flex gap-2">
              <select class="select select-bordered select-sm" v-model="comparisonType">
                <option value="year">Tahun ke Tahun</option>
                <option value="quarter">Kuartal ke Kuartal</option>
                <option value="institution">Antar Instansi</option>
                <option value="region">Antar Wilayah</option>
              </select>
            </div>
          </div>
          
          <div ref="comparisonChart" class="w-full h-96"></div>
          
          <!-- Comparison Insights -->
          <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
              <h4 class="font-semibold text-green-800 mb-2">🏆 Best Performance</h4>
              <div class="text-lg font-bold text-green-600">{{ comparisonInsights.best.name }}</div>
              <div class="text-sm text-green-700">{{ comparisonInsights.best.metric }}</div>
            </div>
            
            <div class="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
              <h4 class="font-semibold text-blue-800 mb-2">📈 Highest Growth</h4>
              <div class="text-lg font-bold text-blue-600">{{ comparisonInsights.growth.name }}</div>
              <div class="text-sm text-blue-700">+{{ comparisonInsights.growth.percentage }}% improvement</div>
            </div>
            
            <div class="p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
              <h4 class="font-semibold text-orange-800 mb-2">🎯 Needs Attention</h4>
              <div class="text-lg font-bold text-orange-600">{{ comparisonInsights.attention.name }}</div>
              <div class="text-sm text-orange-700">{{ comparisonInsights.attention.issue }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'

// Page metadata
useHead({
  title: 'Statistik & Analisis - Astina',
  meta: [
  { name: 'description', content: 'Analisis mendalam dan statistik produk pembelajaran berbasis data' }
  ]
})

// Reactive data
const selectedPeriod = ref('ytd')
const selectedAnalysis = ref('overview')
const chartView = ref('monthly')
const comparisonType = ref('year')
const mediaAnalysisType = ref('reach')

// Chart refs
const trendsChart = ref(null)
const categoryChart = ref(null)
const institutionChart = ref(null)
const mediaChart = ref(null)
const mediaTimelineChart = ref(null)
const regionalChart = ref(null)
const timeCompletionChart = ref(null)
const comparisonChart = ref(null)

// Statistics data
const stats = reactive({
  totalProjects: 324,
  projectGrowth: 28,
  successRate: 87,
  successGrowth: 12,
  avgDuration: '4.2 bulan',
  durationTrend: '-15% faster',
  roiImpact: 3.4
})

const categoryStats = ref([
  { name: 'Digitalisasi', count: 142, percentage: 44, color: '#3B82F6' },
  { name: 'SAKIP & Reformasi', count: 89, percentage: 27, color: '#10B981' },
  { name: 'Manajemen Perubahan', count: 65, percentage: 20, color: '#F59E0B' },
  { name: 'Inovasi', count: 28, percentage: 9, color: '#8B5CF6' }
])

const detailedCategoryStats = ref([
  {
    name: 'Digitalisasi',
    totalProjects: 142,
    completed: 98,
    ongoing: 44,
    avgDuration: 120,
    successRate: 89
  },
  {
    name: 'SAKIP & Reformasi',
    totalProjects: 89,
    completed: 72,
    ongoing: 17,
    avgDuration: 95,
    successRate: 91
  },
  {
    name: 'Manajemen Perubahan',
    totalProjects: 65,
    completed: 48,
    ongoing: 17,
    avgDuration: 140,
    successRate: 84
  },
  {
    name: 'Inovasi',
    totalProjects: 28,
    completed: 18,
    ongoing: 10,
    avgDuration: 180,
    successRate: 78
  }
])

const topPerformers = ref([
  {
    id: 1,
    name: 'Dr. Budi Santoso',
    email: 'budi.santoso@kemendagri.go.id',
    institution: 'Kemendagri',
    successRate: 95,
    completedProjects: 12,
    totalProjects: 13
  },
  {
    id: 2,
    name: 'Maya Sari, M.Kom',
    email: 'maya.sari@kemdikbud.go.id',
    institution: 'Kemdikbud',
    successRate: 92,
    completedProjects: 11,
    totalProjects: 12
  },
  {
    id: 3,
    name: 'Ahmad Rahman',
    email: 'ahmad.rahman@bpkp.go.id',
    institution: 'BPKP',
    successRate: 90,
    completedProjects: 9,
    totalProjects: 10
  },
  {
    id: 4,
    name: 'Sari Dewi',
    email: 'sari.dewi@kemenkes.go.id',
    institution: 'Kemenkes',
    successRate: 88,
    completedProjects: 14,
    totalProjects: 16
  },
  {
    id: 5,
    name: 'Rudi Hartono',
    email: 'rudi.hartono@kementan.go.id',
    institution: 'Kementan',
    successRate: 85,
    completedProjects: 8,
    totalProjects: 10
  }
])

const timeAnalysis = reactive({
  average: 125,
  fastest: 45,
  slowest: 285,
  median: 115
})

const resourceUtilization = reactive({
  digitalization: 85,
  sakip: 72,
  management: 68,
  innovation: 55
})

const mediaStats = reactive({
  totalPublications: 156,
  totalReach: '2.3M',
  onlineMedia: 89,
  printMedia: 34,
  broadcastMedia: 23
})

const mediaBreakdown = reactive({
  headline: 35,
  feature: 28,
  pressRelease: 25,
  interview: 12
})

const topMediaPartners = ref([
  {
    name: 'Kompas.com',
    type: 'Media Online',
    reach: '15M',
    articles: 23
  },
  {
    name: 'Detik.com',
    type: 'Media Online',
    reach: '12M',
    articles: 19
  },
  {
    name: 'Republika',
    type: 'Media Cetak',
    reach: '5M',
    articles: 15
  },
  {
    name: 'Metro TV',
    type: 'Media TV',
    reach: '8M',
    articles: 12
  },
  {
    name: 'Antara News',
    type: 'Media Online',
    reach: '6M',
    articles: 18
  }
])

const mediaMetrics = reactive({
  weeklyIncrease: 12,
  avgEngagement: '85%'
})

const mediaImpact = reactive({
  totalViews: '4.8M',
  socialShares: '124K',
  comments: '15.2K',
  sentimentScore: '8.3'
})

const mediaChannels = ref([
  {
    name: 'Online News Portal',
    articles: 89,
    engagement: 92,
    color: '#3B82F6',
    icon: '🌐'
  },
  {
    name: 'Social Media',
    articles: 156,
    engagement: 87,
    color: '#10B981',
    icon: '📱'
  },
  {
    name: 'Print Media',
    articles: 34,
    engagement: 75,
    color: '#F59E0B',
    icon: '📰'
  },
  {
    name: 'TV/Radio',
    articles: 23,
    engagement: 85,
    color: '#8B5CF6',
    icon: '📺'
  }
])

const contentTypes = ref([
  {
    type: 'Press Release',
    count: 45,
    performance: 88
  },
  {
    type: 'Feature Article',
    count: 32,
    performance: 94
  },
  {
    type: 'Interview',
    count: 28,
    performance: 76
  },
  {
    type: 'Opinion/Editorial',
    count: 15,
    performance: 82
  }
])

const predictions = reactive({
  q1Projects: 45,
  successTrend: 89,
  resourceNeeds: {
    trainers: 3,
    specialists: 2,
    coaches: 4
  }
})

const comparisonInsights = reactive({
  best: {
    name: 'Kemendagri',
    metric: '95% success rate'
  },
  growth: {
    name: 'Kemenkes',
    percentage: 35
  },
  attention: {
    name: 'Kementan',
    issue: 'Low completion rate'
  }
})

// Methods
const getRankBadgeClass = (rank) => {
  if (rank === 1) return 'badge-success'
  if (rank === 2) return 'badge-info'
  if (rank === 3) return 'badge-warning'
  return 'badge-neutral'
}

const getSuccessRateClass = (rate) => {
  if (rate >= 90) return 'text-success'
  if (rate >= 80) return 'text-info'
  if (rate >= 70) return 'text-warning'
  return 'text-error'
}

const getProgressClass = (value) => {
  if (value >= 90) return 'progress-success'
  if (value >= 80) return 'progress-info'
  if (value >= 70) return 'progress-warning'
  return 'progress-error'
}

const getEngagementClass = (value) => {
  if (value >= 90) return 'text-green-600'
  if (value >= 80) return 'text-blue-600'
  if (value >= 70) return 'text-yellow-600'
  return 'text-red-600'
}

const exportReport = () => {
  console.log('Exporting statistical report...')
}

// Chart initialization
const initCharts = () => {
  // Historical Trends Chart
  if (trendsChart.value) {
    const chart1 = echarts.init(trendsChart.value)
    chart1.setOption({
      title: {
        text: 'Tren Proyek Per Bulan',
        textStyle: { fontSize: 14 }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'cross' }
      },
      legend: {
        data: ['Proyek Baru', 'Selesai', 'Success Rate'],
        bottom: 0
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      yAxis: [
        {
          type: 'value',
          name: 'Jumlah Proyek',
          position: 'left'
        },
        {
          type: 'value',
          name: 'Success Rate (%)',
          position: 'right',
          max: 100
        }
      ],
      series: [
        {
          name: 'Proyek Baru',
          type: 'bar',
          data: [12, 15, 18, 22, 25, 28, 32, 35, 30, 28, 25, 22],
          itemStyle: { color: '#3B82F6' }
        },
        {
          name: 'Selesai',
          type: 'bar',
          data: [8, 12, 16, 19, 23, 26, 29, 32, 28, 26, 23, 20],
          itemStyle: { color: '#10B981' }
        },
        {
          name: 'Success Rate',
          type: 'line',
          yAxisIndex: 1,
          data: [67, 80, 89, 86, 92, 93, 91, 91, 93, 93, 92, 91],
          itemStyle: { color: '#F59E0B' },
          lineStyle: { width: 3 }
        }
      ]
    })
  }

  // Category Distribution Chart
  if (categoryChart.value) {
    const chart2 = echarts.init(categoryChart.value)
    chart2.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      series: [{
        name: 'Kategori',
        type: 'pie',
        radius: '70%',
        data: categoryStats.value,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        label: {
          show: false
        }
      }]
    })
  }

  // Institution Performance Chart
  if (institutionChart.value) {
    const chart3 = echarts.init(institutionChart.value)
    chart3.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ['Kemendagri', 'Kemdikbud', 'Kemenkes', 'BPKP', 'Kementan', 'Kemenkeu']
      },
      yAxis: {
        type: 'value',
        max: 100
      },
      series: [{
        name: 'Success Rate',
        type: 'bar',
        data: [95, 92, 88, 90, 75, 82],
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#3B82F6' },
            { offset: 1, color: '#1E40AF' }
          ])
        }
      }]
    })
  }

  // Media Coverage Chart
  if (mediaChart.value) {
    const chart4 = echarts.init(mediaChart.value)
    chart4.setOption({
      title: {
        text: 'Media Coverage by Category',
        textStyle: { fontSize: 14 }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      legend: {
        data: ['Online Media', 'Print Media', 'Broadcast Media'],
        bottom: 0
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ['Digitalisasi', 'SAKIP', 'Manajemen', 'Inovasi']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Online Media',
          type: 'bar',
          stack: 'total',
          data: [45, 32, 28, 15],
          itemStyle: { color: '#3B82F6' }
        },
        {
          name: 'Print Media',
          type: 'bar',
          stack: 'total',
          data: [15, 12, 10, 8],
          itemStyle: { color: '#10B981' }
        },
        {
          name: 'Broadcast Media',
          type: 'bar',
          stack: 'total',
          data: [8, 6, 5, 3],
          itemStyle: { color: '#F59E0B' }
        }
      ]
    })
  }

  // Media Timeline Chart
  if (mediaTimelineChart.value) {
    const chart5 = echarts.init(mediaTimelineChart.value)
    chart5.setOption({
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Publikasi',
          type: 'line',
          data: [12, 15, 18, 22, 25, 28],
          itemStyle: { color: '#3B82F6' },
          lineStyle: { width: 3 },
          symbol: 'circle',
          symbolSize: 6
        }
      ]
    })
  }

  // Time Completion Distribution
  if (timeCompletionChart.value) {
    const chart6 = echarts.init(timeCompletionChart.value)
    chart6.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ['< 60 hari', '60-90 hari', '90-120 hari', '120-180 hari', '> 180 hari']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        name: 'Jumlah Proyek',
        type: 'bar',
        data: [15, 45, 78, 52, 18],
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#10B981' },
            { offset: 1, color: '#059669' }
          ])
        }
      }]
    })
  }

  // Comparison Chart
  if (comparisonChart.value) {
    const chart6 = echarts.init(comparisonChart.value)
    chart6.setOption({
      title: {
        text: 'Perbandingan Kinerja Tahunan',
        textStyle: { fontSize: 14 }
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['2022', '2023', '2024'],
        bottom: 0
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ['Q1', 'Q2', 'Q3', 'Q4']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '2022',
          type: 'line',
          data: [45, 52, 48, 55],
          itemStyle: { color: '#EF4444' }
        },
        {
          name: '2023',
          type: 'line',
          data: [58, 65, 62, 68],
          itemStyle: { color: '#F59E0B' }
        },
        {
          name: '2024',
          type: 'line',
          data: [72, 78, 75, 82],
          itemStyle: { color: '#10B981' }
        }
      ]
    })
  }
}

// Lifecycle
onMounted(() => {
  nextTick(() => {
    initCharts()
  })
})

// Watch for chart view changes
watch(chartView, () => {
  initCharts()
})
</script>

<style scoped>
.card {
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.radial-progress {
  transition: all 0.3s ease;
}
</style>
