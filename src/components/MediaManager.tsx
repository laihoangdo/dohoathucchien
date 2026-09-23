import React, { useState } from 'react';
import { 
  Upload, 
  Image as ImageIcon, 
  CheckCircle, 
  AlertCircle, 
  Sparkles, 
  GitCommit, 
  Download, 
  ExternalLink,
  RefreshCw,
  FolderOpen
} from 'lucide-react';
import { REAL_PHOTOS, PhotoItem } from './RealPhotosGallery';
import { SafeImage } from './SafeImage';
import { 
  getGitHubToken, 
  GITHUB_REPO_OWNER, 
  GITHUB_REPO_NAME 
} from '../utils/adminAuth';

export const MediaManager: React.FC = () => {
  const [photos, setPhotos] = useState<PhotoItem[]>(REAL_PHOTOS);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [isPushingGitHub, setIsPushingGitHub] = useState<boolean>(false);
  const [pushResults, setPushResults] = useState<{ [filename: string]: 'success' | 'error' | 'pending' }>({});

  // Handle single file replace locally
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, photo: PhotoItem) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64Data = reader.result as string;
      try {
        localStorage.setItem(`img_cache_${photo.src}`, base64Data);
        setUploadStatus(`Đã cập nhật ảnh "${photo.filename}" vào bộ nhớ tạm của website!`);
        setTimeout(() => setUploadStatus(''), 4000);
      } catch (err) {
        alert('Bộ nhớ trình duyệt đầy, bạn có thể đẩy thẳng lên GitHub!');
      }
    };
    reader.readAsDataURL(file);
  };

  // Push single or multiple images to GitHub via REST API
  const pushImageToGitHub = async (photo: PhotoItem, base64Content: string, token: string) => {
    // Strip "data:image/jpeg;base64," prefix
    const cleanBase64 = base64Content.replace(/^data:image\/[a-z]+;base64,/, '');
    const path = `public${photo.src}`; // e.g. public/images/khoa-hoc.jpg
    const url = `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${path}`;

    // 1. Check if file already exists to get SHA
    let existingSha: string | undefined = undefined;
    try {
      const getRes = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json'
        }
      });
      if (getRes.ok) {
        const existingData = await getRes.json();
        existingSha = existingData.sha;
      }
    } catch {}

    // 2. Put file to GitHub
    const putRes = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/vnd.github.v3+json'
      },
      body: JSON.stringify({
        message: `feat: upload real image ${photo.filename} to ${path}`,
        content: cleanBase64,
        branch: 'main',
        ...(existingSha ? { sha: existingSha } : {})
      })
    });

    return putRes.ok;
  };

  // Batch upload cached images to GitHub
  const handlePushAllToGitHub = async () => {
    const token = getGitHubToken();
    if (!token) {
      alert('Vui lòng kết nối GitHub Token trong mục Cài đặt GitHub trước khi đẩy ảnh!');
      return;
    }

    setIsPushingGitHub(true);
    const newResults: { [filename: string]: 'success' | 'error' | 'pending' } = {};

    for (const photo of photos) {
      const cached = localStorage.getItem(`img_cache_${photo.src}`);
      if (cached) {
        newResults[photo.filename] = 'pending';
        setPushResults({ ...newResults });
        try {
          const ok = await pushImageToGitHub(photo, cached, token);
          newResults[photo.filename] = ok ? 'success' : 'error';
        } catch {
          newResults[photo.filename] = 'error';
        }
        setPushResults({ ...newResults });
      }
    }

    setIsPushingGitHub(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 border border-blue-800/40 shadow-sm relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            <span>Quản Lý Hình Ảnh Website (20 Mục)</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
            Danh Mục 20 Hình Ảnh Thực Tế Đồ Họa Thực Chiến
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
            Hệ thống đã tự động cấu hình các vị trí: Banner Slider, Khóa học Photoshop, Nội thất 3D, Tin học văn phòng, Bảng hiệu in ấn và ảnh phòng học thực tế. Bạn có thể chọn file trực tiếp để cập nhật ngay hoặc đồng bộ lên GitHub.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap items-center gap-3 relative z-10">
          <button
            onClick={handlePushAllToGitHub}
            disabled={isPushingGitHub}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/30 transition disabled:opacity-60"
          >
            {isPushingGitHub ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <GitCommit className="w-4 h-4" />
            )}
            <span>Đẩy Ảnh Đã Chọn Lên GitHub (public/images)</span>
          </button>
        </div>
      </div>

      {uploadStatus && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{uploadStatus}</span>
        </div>
      )}

      {/* Guide Note Box */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 sm:p-5 text-amber-900 text-xs leading-relaxed">
        <h4 className="font-bold text-amber-950 mb-1 flex items-center gap-1.5">
          <FolderOpen className="w-4 h-4 text-amber-700" />
          <span>Cách Đặt Ảnh Trong Mã Nguồn GitHub</span>
        </h4>
        <p>
          Thư mục lưu trữ chính của 20 ảnh này trong repository là: <code className="bg-amber-100 px-1.5 py-0.5 rounded font-mono font-bold">public/images/</code>.
        </p>
        <p className="mt-1">
          Khi đẩy mã nguồn lên GitHub, chỉ cần copy 20 file ảnh vào thư mục <code className="bg-amber-100 px-1.5 py-0.5 rounded font-mono">public/images/</code>, commit và push lên nhánh <code className="bg-amber-100 px-1.5 py-0.5 rounded font-mono">main</code>. Vercel sẽ tự động build và hiển thị tất cả các ảnh sắc nét ngay tức thì!
        </p>
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              {/* Thumbnail */}
              <div className="relative aspect-[4/3] bg-slate-950 overflow-hidden">
                <SafeImage
                  src={photo.src}
                  alt={photo.title}
                  badge={photo.tag}
                  className="w-full h-full object-cover"
                />

                <div className="absolute top-2 left-2 z-10">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-blue-300">
                    {photo.tag}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="p-3.5">
                <div className="text-[11px] font-mono text-blue-600 font-bold mb-0.5 truncate">
                  {photo.filename}
                </div>
                <h4 className="text-xs font-bold text-slate-800 line-clamp-1">
                  {photo.title}
                </h4>
                <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                  {photo.desc}
                </p>
              </div>
            </div>

            {/* Upload Button */}
            <div className="p-3 pt-0 border-t border-slate-100 mt-2">
              <label className="w-full text-center py-2 px-3 rounded-xl border border-slate-300 hover:border-blue-500 hover:bg-blue-50 text-slate-700 text-xs font-bold cursor-pointer flex items-center justify-center gap-1.5 transition">
                <Upload className="w-3.5 h-3.5 text-blue-600" />
                <span>Thay ảnh mới</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, photo)}
                />
              </label>

              {pushResults[photo.filename] === 'success' && (
                <div className="text-[10px] text-emerald-600 font-bold mt-1 text-center flex items-center justify-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Đã đồng bộ GitHub!
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
