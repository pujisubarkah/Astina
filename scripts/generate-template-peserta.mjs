import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Data contoh peserta
const data = [
  {
    NIP: '198501012010011001',
    NAMA_LENGKAP: 'Dr. Ahmad Budiman S.Sos M.Si',
    INSTANSI: 'Kementerian Dalam Negeri',
    PANGKAT_GOLONGAN: 'Pembina Tk.I (IV/b)',
    JABATAN: 'Kepala Bidang Perencanaan',
    ESELON: 'III/a',
    KET: 'Aktif'
  },
  {
    NIP: '198612152011012002',
    NAMA_LENGKAP: 'Siti Nurhaliza S.AP M.AP',
    INSTANSI: 'Pemerintah Provinsi DKI Jakarta',
    PANGKAT_GOLONGAN: 'Pembina (IV/a)',
    JABATAN: 'Kepala Seksi Monitoring',
    ESELON: 'III/b',
    KET: 'Aktif'
  },
  {
    NIP: '199003202015021001',
    NAMA_LENGKAP: 'Budi Santoso S.Kom M.Kom',
    INSTANSI: 'Kementerian Komunikasi dan Informatika',
    PANGKAT_GOLONGAN: 'Penata Tk.I (III/d)',
    JABATAN: 'Analis Kebijakan',
    ESELON: 'IV/a',
    KET: 'Aktif'
  },
  {
    NIP: '198803102012012003',
    NAMA_LENGKAP: 'Dewi Lestari S.E M.M',
    INSTANSI: 'Badan Kepegawaian Negara',
    PANGKAT_GOLONGAN: 'Pembina (IV/a)',
    JABATAN: 'Kepala Sub Bagian Kepegawaian',
    ESELON: 'III/b',
    KET: 'Cuti'
  },
  {
    NIP: '199205152017011002',
    NAMA_LENGKAP: 'Eko Prasetyo S.H M.H',
    INSTANSI: 'Kejaksaan Agung RI',
    PANGKAT_GOLONGAN: 'Penata (III/c)',
    JABATAN: 'Jaksa Muda',
    ESELON: 'IV/b',
    KET: 'Aktif'
  }
];

// Create a new workbook
const wb = XLSX.utils.book_new();

// Convert data to worksheet
const ws = XLSX.utils.json_to_sheet(data);

// Set column widths
ws['!cols'] = [
  { wch: 20 }, // NIP
  { wch: 35 }, // NAMA_LENGKAP
  { wch: 40 }, // INSTANSI
  { wch: 25 }, // PANGKAT_GOLONGAN
  { wch: 35 }, // JABATAN
  { wch: 10 }, // ESELON
  { wch: 15 }  // KET
];

// Add worksheet to workbook
XLSX.utils.book_append_sheet(wb, ws, 'Data Peserta');

// Define output path
const outputPath = path.join(__dirname, '..', 'public', 'template-peserta.xls');

// Write to file
XLSX.writeFile(wb, outputPath, { bookType: 'xls' });

console.log(`✅ Template Excel berhasil dibuat: ${outputPath}`);
