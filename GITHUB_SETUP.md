# GitHub Setup Guide - Learning Goals Tracker

Ikuti langkah-langkah di bawah untuk push project ke GitHub dan deploy ke Vercel.

## Step 1: Buat Repository di GitHub

1. Buka https://github.com/new
2. Masukkan nama repository: `learning-goals-tracker`
3. Pilih "Public" atau "Private" sesuai preferensi
4. **Jangan pilih** "Initialize this repository with a README" (sudah ada)
5. Klik "Create repository"

## Step 2: Setup Remote dan Push

Setelah membuat repo, copy command dari GitHub dan jalankan:

```bash
cd /path/to/learning-goals-tracker
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/learning-goals-tracker.git
git push -u origin main
```

Ganti `YOUR_USERNAME` dengan username GitHub kamu.

## Step 3: Verifikasi di GitHub

1. Buka https://github.com/YOUR_USERNAME/learning-goals-tracker
2. Pastikan semua file sudah terupload:
   - package.json ✓
   - README.md ✓
   - app/ folder ✓
   - components/ folder ✓
   - store/ folder ✓
   - lib/ folder ✓
   - Konfigurasi files ✓

## Step 4: Deploy ke Vercel

### Option A: Connect dengan GitHub (Recommended)

1. Buka https://vercel.com/new
2. Klik "Continue with GitHub" dan login
3. Authorize Vercel untuk akses GitHub
4. Cari repository `learning-goals-tracker`
5. Klik "Import"
6. Vercel auto-detect Next.js project
7. Klik "Deploy"
8. Tunggu ~2-3 menit
9. Dapat URL live app: `https://learning-goals-tracker-xxx.vercel.app`

### Option B: Deploy Manual

```bash
# Install Vercel CLI
npm i -g vercel

# Login ke Vercel
vercel login

# Deploy
vercel --prod
```

## Step 5: Setup Auto-Deploy

Setelah di-deploy ke Vercel:
- Setiap kali kamu push ke `main` branch, Vercel otomatis redeploy
- Bisa lihat deployment status di Vercel dashboard
- Preview deployments untuk pull requests

## Step 6: Local Development Setup

Untuk development dengan lebih nyaman:

```bash
# Clone repo (atau sudah di local)
git clone https://github.com/YOUR_USERNAME/learning-goals-tracker.git
cd learning-goals-tracker

# Install dependencies
npm install

# Create .env.local dari .env.example
cp .env.example .env.local

# Start dev server
npm run dev

# Buka http://localhost:3000
```

## Step 7: Workflow untuk Update

Setiap kali mau update:

```bash
# Buat feature branch (optional, tapi recommended)
git checkout -b feature/new-feature

# Buat perubahan, test dengan npm run dev

# Commit changes
git add .
git commit -m "Add: deskripsi fitur baru"

# Push ke GitHub
git push origin feature/new-feature

# Buat Pull Request di GitHub (optional)
# atau langsung merge ke main

# Merge ke main
git checkout main
git merge feature/new-feature
git push origin main

# Vercel auto-deploy! ✨
```

## Useful GitHub URLs

- Repository: `https://github.com/YOUR_USERNAME/learning-goals-tracker`
- Issues: `https://github.com/YOUR_USERNAME/learning-goals-tracker/issues`
- Pull Requests: `https://github.com/YOUR_USERNAME/learning-goals-tracker/pulls`
- Settings: `https://github.com/YOUR_USERNAME/learning-goals-tracker/settings`

## Vercel Dashboard

- Dashboard: https://vercel.com/dashboard
- Project Settings: https://vercel.com/YOUR_USERNAME/learning-goals-tracker/settings
- Deployments: https://vercel.com/YOUR_USERNAME/learning-goals-tracker/deployments

## Troubleshooting

### Error: "Authentication failed"
- Check username di git config: `git config user.name`
- Check git remote: `git remote -v`
- Regenerate GitHub token jika perlu

### Error: "Build failed on Vercel"
- Check logs di Vercel dashboard
- Run `npm run build` locally untuk test
- Common: Lupa `npm install` sebelum push

### Local changes tidak sync
```bash
git pull origin main  # Pull latest
git push origin main  # Push changes
```

## Tips & Tricks

1. **Branching Strategy**: Buat branch baru untuk setiap fitur
   ```bash
   git checkout -b feature/progress-export
   ```

2. **Commit Messages**: Gunakan format yang jelas
   ```bash
   git commit -m "Add: export progress as CSV"
   git commit -m "Fix: drag-drop bug on mobile"
   git commit -m "Docs: update README with new features"
   ```

3. **Environment Variables**: Add secrets di Vercel settings jika ada
   - Project Settings → Environment Variables
   - Add untuk production

4. **Monitor Deployments**: Subscribe ke notifications
   - Vercel dashboard → Settings → Notifications

---

Sukses! Sekarang project kamu udah live di Vercel dan ter-sync dengan GitHub. 🚀

Setiap kali push ke `main`, Vercel otomatis build dan deploy. Kalau ada error, bisa check logs di Vercel dashboard.
