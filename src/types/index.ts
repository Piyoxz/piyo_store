// Interface untuk Durasi dalam Paket
export interface Duration {
  lama: string; // Misalnya "1 Bulan"
  harga: number; // Harga dalam angka
}

// Interface untuk Paket
export interface Package {
  nama: string; // Nama paket, misalnya "Sharing 1p1u"
  deskripsi: string; // Deskripsi paket
  durasi: Duration[]; // Array dari durasi paket
}

// Interface untuk Produk
export interface Product {
  id: string; // ID produk
  platform: string; // Nama platform, misalnya "NETFLIX"
  logo: string; // URL gambar logo
  paket: Package[]; // Array dari paket
  note: string[]; // Catatan tambahan
}

// Interface untuk Pengguna
export interface User {
  username: string; // Nama pengguna
  password?: string; // Password (opsional, bisa undefined)
  isAdmin: boolean; // Apakah pengguna admin
}