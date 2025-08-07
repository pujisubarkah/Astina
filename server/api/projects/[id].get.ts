export default defineEventHandler(async (event) => {
  try {
    const projectId = getRouterParam(event, 'id')
    
    if (!projectId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Project ID is required'
      })
    }

    // Mock data for single project detail - replace with real database query later
    const project = {
      id: parseInt(projectId),
      title: "Program Bantuan Sosial Terpadu 2024",
      description: "Program bantuan sosial terpadu untuk meningkatkan kesejahteraan masyarakat miskin dan rentan melalui pendekatan holistik yang meliputi bantuan tunai, pelatihan keterampilan, dan pemberdayaan ekonomi.",
      fullDescription: "Program Bantuan Sosial Terpadu 2024 merupakan inisiatif komprehensif yang dirancang untuk mengatasi kemiskinan multidimensional di Indonesia. Program ini mengintegrasikan berbagai jenis bantuan sosial dalam satu platform yang terkoordinasi, mencakup bantuan tunai langsung, program pelatihan keterampilan, akses terhadap layanan kesehatan dan pendidikan, serta dukungan untuk pengembangan usaha mikro.\n\nProgram ini menargetkan 500.000 keluarga penerima manfaat di 34 provinsi dengan fokus pada daerah dengan tingkat kemiskinan tinggi. Implementasi dilakukan melalui kerja sama antara pemerintah pusat, pemerintah daerah, dan organisasi masyarakat sipil.\n\nKomponen utama program meliputi:\n1. Bantuan Tunai Bersyarat (BTB) sebesar Rp 300.000 per bulan\n2. Program pelatihan keterampilan teknis dan kewirausahaan\n3. Akses ke layanan kesehatan gratis melalui Puskesmas\n4. Program beasiswa untuk anak-anak keluarga penerima\n5. Dukungan modal usaha mikro hingga Rp 5 juta\n\nMonitoring dan evaluasi dilakukan secara berkala dengan indikator keberhasilan meliputi peningkatan pendapatan keluarga, akses ke layanan dasar, dan tingkat kemandirian ekonomi.",
      category: "poverty_alleviation",
      status: "active",
      priority: "high",
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-12-31'),
      budget: "50000000000",
      spentBudget: "28500000000",
      institutionId: 1,
      institutionName: "Kementerian Sosial",
      coordinatorId: 1,
      coordinatorName: "Dr. Ahmad Sudrajat",
      location: "Nasional (34 Provinsi)",
      beneficiaries: 500000,
      currentBeneficiaries: 285000,
      objectives: [
        "Mengurangi angka kemiskinan ekstrem sebesar 2%",
        "Meningkatkan akses terhadap layanan dasar bagi 500.000 keluarga",
        "Menciptakan 50.000 usaha mikro baru",
        "Meningkatkan tingkat literasi dan numerasi anak-anak keluarga miskin"
      ],
      milestones: [
        {
          id: 1,
          title: "Fase Persiapan dan Sosialisasi",
          description: "Persiapan sistem, rekrutmen SDM, dan sosialisasi program",
          targetDate: new Date('2024-01-31'),
          actualDate: new Date('2024-01-28'),
          status: "completed",
          progress: 100
        },
        {
          id: 2,
          title: "Pendaftaran dan Verifikasi Penerima",
          description: "Proses pendaftaran dan verifikasi calon penerima bantuan",
          targetDate: new Date('2024-03-31'),
          actualDate: new Date('2024-03-25'),
          status: "completed", 
          progress: 100
        },
        {
          id: 3,
          title: "Implementasi Fase 1 (Semester 1)",
          description: "Penyaluran bantuan dan implementasi program tahap pertama",
          targetDate: new Date('2024-06-30'),
          actualDate: new Date('2024-06-28'),
          status: "completed",
          progress: 100
        },
        {
          id: 4,
          title: "Evaluasi Tengah Periode",
          description: "Evaluasi komprehensif program di tengah periode",
          targetDate: new Date('2024-07-31'),
          actualDate: new Date('2024-07-30'),
          status: "completed",
          progress: 100
        },
        {
          id: 5,
          title: "Implementasi Fase 2 (Semester 2)",
          description: "Implementasi program tahap kedua dengan perbaikan",
          targetDate: new Date('2024-12-31'),
          actualDate: null,
          status: "in_progress",
          progress: 75
        }
      ],
      updates: [
        {
          id: 1,
          title: "Pencairan Bantuan Bulan Desember 2024",
          content: "Pencairan bantuan tunai bulan Desember 2024 telah diselesaikan untuk 285.000 keluarga penerima dengan total dana Rp 85.5 miliar. Tingkat kepuasan penerima mencapai 92%.",
          date: new Date('2024-12-28'),
          author: "Tim Operasional Program"
        },
        {
          id: 2,
          title: "Pelatihan Keterampilan Batch 8",
          content: "Pelatihan keterampilan batch ke-8 telah dimulai dengan 2.500 peserta dari 15 kabupaten/kota. Fokus pelatihan pada keterampilan digital marketing dan produksi kerajinan tangan.",
          date: new Date('2024-12-25'),
          author: "Divisi Pelatihan"
        },
        {
          id: 3,
          title: "Evaluasi Dampak Program",
          content: "Hasil evaluasi menunjukkan peningkatan rata-rata pendapatan keluarga penerima sebesar 35% dan peningkatan akses ke layanan kesehatan sebesar 80%.",
          date: new Date('2024-12-20'),
          author: "Tim Monitoring & Evaluasi"
        }
      ],
      risks: [
        {
          id: 1,
          title: "Keterlambatan Distribusi Bantuan",
          description: "Risiko keterlambatan penyaluran bantuan karena masalah sistem atau koordinasi",
          impact: "medium",
          probability: "low",
          mitigation: "Backup sistem dan protokol darurat telah disiapkan"
        },
        {
          id: 2,
          title: "Penurunan Partisipasi Pelatihan",
          description: "Risiko menurunnya antusiasme peserta untuk mengikuti pelatihan keterampilan",
          impact: "medium",
          probability: "medium",
          mitigation: "Peningkatan kualitas materi dan insentif partisipasi"
        }
      ],
      attachments: [
        {
          id: 1,
          name: "Proposal Program BST 2024.pdf",
          url: "/files/proposal-bst-2024.pdf",
          size: "2.5 MB",
          uploadDate: new Date('2024-01-10')
        },
        {
          id: 2,
          name: "Laporan Evaluasi Semester 1.pdf", 
          url: "/files/evaluasi-sem1-2024.pdf",
          size: "1.8 MB",
          uploadDate: new Date('2024-07-30')
        }
      ],
      mediaCount: 15,
      lastUpdated: new Date('2024-12-28'),
      createdAt: new Date('2024-01-01')
    }

    // Validate if project exists (in real implementation, check database)
    if (parseInt(projectId) > 20 || parseInt(projectId) < 1) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Project not found'
      })
    }

    return {
      success: true,
      data: project
    }
  } catch (error: any) {
    console.error('Error fetching project detail:', error)
    
    if (error.statusCode) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch project detail'
    })
  }
})
