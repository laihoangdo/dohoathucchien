import React, { useState, useRef, useEffect } from 'react';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  Heading,
  Quote,
  Link as LinkIcon,
  Unlink,
  Image as ImageIcon,
  Video,
  Table as TableIcon,
  AlertCircle,
  Info,
  CheckCircle2,
  Code,
  Minus,
  Maximize2,
  Minimize2,
  Eye,
  FileCode,
  Columns,
  Undo,
  Redo,
  Sparkles,
  BookOpen,
  Eraser,
  Download,
  HelpCircle,
  CheckSquare,
  Palette,
  Type
} from 'lucide-react';
import { REAL_PHOTOS } from './RealPhotosGallery';
import { SafeImage } from './SafeImage';

interface RichArticleEditorProps {
  value: string;
  onChange: (value: string) => void;
  minHeight?: string;
}

export const RichArticleEditor: React.FC<RichArticleEditorProps> = ({
  value,
  onChange,
  minHeight = '420px'
}) => {
  // Modes: 'visual' (WYSIWYG) | 'code' (HTML source) | 'split' (Code + Preview) | 'preview' (Live Preview)
  const [mode, setMode] = useState<'visual' | 'code' | 'split' | 'preview'>('visual');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Editable ref for visual mode
  const visualEditorRef = useRef<HTMLDivElement>(null);
  const isUpdatingFromProps = useRef<boolean>(false);

  // Modals for inserts
  const [activeModal, setActiveModal] = useState<'link' | 'image' | 'video' | 'table' | 'callout' | null>(null);

  // Link Form
  const [linkUrl, setLinkUrl] = useState<string>('https://');
  const [linkText, setLinkText] = useState<string>('');
  const [linkOpenNewTab, setLinkOpenNewTab] = useState<boolean>(true);

  // Image Form
  const [imageUrl, setImageUrl] = useState<string>('https://blogdaytinhoc.com/images/slider/29022024/khoa-hoc-thiet-ke-do-hoa.png');
  const [imageCaption, setImageCaption] = useState<string>('');
  const [imageAlign, setImageAlign] = useState<'center' | 'left' | 'right'>('center');

  // Video Form
  const [videoUrl, setVideoUrl] = useState<string>('https://www.youtube.com/watch?v=');

  // Table Form
  const [tableRows, setTableRows] = useState<number>(3);
  const [tableCols, setTableCols] = useState<number>(3);
  const [tableHasHeader, setTableHasHeader] = useState<boolean>(true);

  // Callout Form
  const [calloutType, setCalloutType] = useState<'info' | 'tip' | 'warning' | 'download'>('info');
  const [calloutTitle, setCalloutTitle] = useState<string>('💡 Thông tin quan trọng:');
  const [calloutContent, setCalloutContent] = useState<string>('Nhập thông tin lưu ý chi tiết cho học viên tại đây...');

  // Real photos from 20 user assets
  const sampleImages = REAL_PHOTOS.map((p) => ({
    label: p.title,
    url: p.src,
    tag: p.tag,
    filename: p.filename
  }));

  // Sync internal visual content when value changes externally
  useEffect(() => {
    if (visualEditorRef.current && !isUpdatingFromProps.current) {
      if (visualEditorRef.current.innerHTML !== value) {
        visualEditorRef.current.innerHTML = value;
      }
    }
    isUpdatingFromProps.current = false;
  }, [value]);

  // Handle input in visual mode
  const handleVisualInput = () => {
    if (visualEditorRef.current) {
      const html = visualEditorRef.current.innerHTML;
      isUpdatingFromProps.current = true;
      onChange(html);
    }
  };

  // Execute standard formatting command
  const execCmd = (command: string, arg: string | undefined = undefined) => {
    if (mode !== 'visual') {
      setMode('visual');
      setTimeout(() => {
        visualEditorRef.current?.focus();
        document.execCommand(command, false, arg);
        handleVisualInput();
      }, 50);
      return;
    }
    visualEditorRef.current?.focus();
    document.execCommand(command, false, arg);
    handleVisualInput();
  };

  // Insert HTML into current cursor position
  const insertHtml = (html: string) => {
    if (mode === 'code') {
      onChange(value + '\n' + html + '\n');
      return;
    }

    if (visualEditorRef.current) {
      visualEditorRef.current.focus();
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        const el = document.createElement('div');
        el.innerHTML = html;
        const frag = document.createDocumentFragment();
        let node;
        let lastNode;
        while ((node = el.firstChild)) {
          lastNode = frag.appendChild(node);
        }
        range.insertNode(frag);
        if (lastNode) {
          range.setStartAfter(lastNode);
          range.collapse(true);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      } else {
        visualEditorRef.current.innerHTML += html;
      }
      handleVisualInput();
    } else {
      onChange(value + '\n' + html + '\n');
    }
  };

  // Insert Heading or Block
  const formatBlock = (tag: string) => {
    execCmd('formatBlock', tag);
  };

  // Insert Link Action
  const handleInsertLink = () => {
    if (!linkUrl || linkUrl === 'https://') return;
    const targetAttr = linkOpenNewTab ? ' target="_blank" rel="noopener noreferrer"' : '';
    const textToUse = linkText.trim() || linkUrl;
    const linkHtml = `<a href="${linkUrl}"${targetAttr} class="text-blue-600 hover:underline font-semibold">${textToUse}</a>`;
    insertHtml(linkHtml);
    setActiveModal(null);
    setLinkText('');
    setLinkUrl('https://');
  };

  // Insert Image Action
  const handleInsertImage = () => {
    if (!imageUrl.trim()) return;
    let alignClass = 'text-center mx-auto';
    if (imageAlign === 'left') alignClass = 'text-left mr-auto';
    if (imageAlign === 'right') alignClass = 'text-right ml-auto';

    const imageHtml = `
<figure class="my-6 ${alignClass} max-w-2xl">
  <img src="${imageUrl}" alt="${imageCaption || 'Hình ảnh bài viết'}" class="rounded-xl shadow-md border border-slate-200 w-full object-cover" />
  ${imageCaption.trim() ? `<figcaption class="text-xs text-slate-500 mt-2 italic text-center">${imageCaption}</figcaption>` : ''}
</figure>
`;
    insertHtml(imageHtml);
    setActiveModal(null);
    setImageCaption('');
  };

  // Insert YouTube Video Action
  const handleInsertVideo = () => {
    if (!videoUrl.trim()) return;
    let videoId = '';
    const match1 = videoUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (match1 && match1[1]) {
      videoId = match1[1];
    } else {
      videoId = videoUrl.trim();
    }

    if (videoId) {
      const videoHtml = `
<div class="my-6 aspect-video rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-black">
  <iframe class="w-full h-full" src="https://www.youtube.com/embed/${videoId}" title="YouTube video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
`;
      insertHtml(videoHtml);
    }
    setActiveModal(null);
    setVideoUrl('https://www.youtube.com/watch?v=');
  };

  // Insert Table Action
  const handleInsertTable = () => {
    let tableHtml = '<div class="overflow-x-auto my-6"><table class="table-styled">';
    if (tableHasHeader) {
      tableHtml += '<thead><tr>';
      for (let c = 1; c <= tableCols; c++) {
        tableHtml += `<th>Tiêu đề cột ${c}</th>`;
      }
      tableHtml += '</tr></thead>';
    }
    tableHtml += '<tbody>';
    for (let r = 1; r <= tableRows; r++) {
      tableHtml += '<tr>';
      for (let c = 1; c <= tableCols; c++) {
        tableHtml += `<td>Dữ liệu ô (${r}, ${c})</td>`;
      }
      tableHtml += '</tr>';
    }
    tableHtml += '</tbody></table></div>';
    insertHtml(tableHtml);
    setActiveModal(null);
  };

  // Insert Callout Box
  const handleInsertCallout = () => {
    let calloutHtml = '';
    if (calloutType === 'download') {
      calloutHtml = `
<div class="callout-box download my-6">
  <h4 class="font-bold text-amber-900 mb-2">${calloutTitle || 'Tải Tài Liệu / Giáo Trình Miễn Phí'}</h4>
  <p class="text-xs text-amber-800 mb-3">${calloutContent}</p>
  <a href="#dang-ky" class="btn-sv-download">Tải Ngay File Thực Hành (.ZIP)</a>
</div>
`;
    } else {
      calloutHtml = `
<div class="callout-box ${calloutType} my-6">
  <h4 class="font-bold mb-1">${calloutTitle}</h4>
  <p>${calloutContent}</p>
</div>
`;
    }
    insertHtml(calloutHtml);
    setActiveModal(null);
  };

  // Insert Article Template
  const handleLoadTemplate = (type: 'course' | 'tutorial' | 'download') => {
    if (!confirm('Tải bản mẫu này sẽ thay thế nội dung hiện tại của bài viết. Bạn có muốn tiếp tục?')) {
      return;
    }

    let template = '';
    if (type === 'course') {
      template = `
<p class="lead">Khóa học được thiết kế chuyên biệt theo phương pháp <strong>cầm tay chỉ việc 1 kèm 1</strong>, giúp người mới bắt đầu hoặc người đi làm làm chủ hoàn toàn kỹ năng trong thời gian ngắn nhất.</p>

<h2 id="gioi-thieu">1. Mục Tiêu Và Đầu Ra Khóa Học</h2>
<p>Học viên tham gia sẽ được đào tạo trực tiếp trên các dự án thực tế của doanh nghiệp, cam kết làm được việc ngay sau khóa học:</p>
<ul>
  <li>Thành thạo toàn bộ công cụ cốt lõi và phím tắt chuyên nghiệp.</li>
  <li>Nắm vững tư duy bố cục, phối màu và quy chuẩn kỹ thuật in ấn / hiển thị.</li>
  <li>Tự tin thiết kế ấn phẩm truyền thông, bộ nhận diện thương hiệu hoàn chỉnh.</li>
</ul>

<div class="callout-box info">
  <h4>Ưu đãi đặc biệt trong tháng:</h4>
  <p>Tặng kèm trọn bộ <strong>100GB tài nguyên đồ họa bản quyền</strong> và hỗ trợ kỹ thuật trọn đời sau khi hoàn thành khóa học.</p>
</div>

<h2 id="noi-dung">2. Lộ Trình Đào Tạo Thực Chiến</h2>
<p>Chương trình đào tạo toàn diện 4 phần từ cơ bản đến nâng cao:</p>

<div class="overflow-x-auto my-6">
  <table class="table-styled">
    <thead>
      <tr>
        <th>Học phần</th>
        <th>Thời lượng</th>
        <th>Nội dung thực hành</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Phần 1: Nhập môn</strong></td>
        <td>4 buổi</td>
        <td>Làm quen giao diện, hệ màu RGB/CMYK, kích thước chuẩn ấn phẩm.</td>
      </tr>
      <tr>
        <td><strong>Phần 2: Kỹ năng nâng cao</strong></td>
        <td>8 buổi</td>
        <td>Xử lý cắt ghép, hiệu ứng ánh sáng, vector đồ họa phức tạp.</td>
      </tr>
      <tr>
        <td><strong>Phần 3: Đồ án tốt nghiệp</strong></td>
        <td>4 buổi</td>
        <td>Thiết kế trọn gói bộ nhận diện thực tế dưới sự hướng dẫn 1 kèm 1.</td>
      </tr>
    </tbody>
  </table>
</div>

<h2 id="hoc-phi">3. Lịch Học & Học Phí Linh Hoạt</h2>
<p>Lớp học mở liên tục các ca Sáng - Chiều - Tối từ Thứ 2 đến Chủ Nhật, học viên có thể linh hoạt chọn ca học phù hợp với lịch làm việc cá nhân.</p>
`;
    } else if (type === 'tutorial') {
      template = `
<p class="lead">Bài hướng dẫn chi tiết từng bước giúp bạn thực hiện kỹ thuật này một cách chính xác, nhanh chóng và chuẩn quy cách thiết kế.</p>

<h2 id="chuan-bi">1. Chuẩn Bị File Và Không Gian Làm Việc</h2>
<p>Trước khi bắt đầu, hãy đảm bảo bạn đã cài đặt phiên bản phần mềm phù hợp và tải về file dữ liệu thực hành mẫu.</p>

<h2 id="cac-buoc">2. Các Bước Thao Tác Chi Tiết</h2>
<p>Thực hiện lần lượt các bước bên dưới:</p>
<ul>
  <li><strong>Bước 1:</strong> Mở file thiết kế và thiết lập hệ màu phù hợp (RGB cho màn hình, CMYK cho in ấn).</li>
  <li><strong>Bước 2:</strong> Tạo vùng chọn chuẩn xác và tách đối tượng khỏi nền.</li>
  <li><strong>Bước 3:</strong> Điều chỉnh màu sắc và độ tương phản với lớp điều chỉnh (Adjustment Layers).</li>
  <li><strong>Bước 4:</strong> Áp dụng bộ lọc hoàn thiện và kiểm tra chi tiết phóng to 100%.</li>
</ul>

<div class="callout-box tip">
  <h4>Mẹo thực chiến:</h4>
  <p>Sử dụng phím tắt <strong>Ctrl + Shift + S</strong> để lưu phiên bản mới tránh ghi đè lên file gốc khi đang chỉnh sửa.</p>
</div>

<h2 id="xuat-file">3. Xuất File Chất Lượng Cao</h2>
<p>Tùy theo nhu cầu sử dụng, chọn định dạng xuất file tối ưu: PNG cho ảnh trong suốt, JPEG chuẩn chất lượng 100% cho mạng xã hội, hoặc PDF cho xưởng in.</p>
`;
    } else {
      template = `
<p class="lead">Tổng hợp trọn bộ giáo trình, file bài tập thực hành và tài nguyên thiết kế hoàn toàn miễn phí dành cho học viên và cộng đồng yêu thiết kế.</p>

<h2 id="noi-dung-tai-lieu">1. Nội Dung Bộ Tài Liệu</h2>
<p>Bộ tài liệu này bao gồm toàn bộ bài giảng cô đọng, phím tắt tra cứu nhanh và các file mẫu thực hành thực tế.</p>

<div class="callout-box download">
  <h4>Tải Về Trọn Bộ Giáo Trình Thực Chiến 2026</h4>
  <p>Dung lượng: ~250MB • Định dạng: PDF & File Source thực hành</p>
  <a href="#dang-ky" class="btn-sv-download">Tải Xuống Trọn Bộ Giáo Trình (.ZIP)</a>
</div>

<h2 id="huong-dan-hoc">2. Hướng Dẫn Tự Học Hiệu Quả</h2>
<p>Để đạt kết quả tốt nhất, bạn nên mở song song file giáo trình và phần mềm, vừa xem hướng dẫn vừa thực hành lại từng thao tác.</p>
`;
    }

    onChange(template.trim());
    if (visualEditorRef.current) {
      visualEditorRef.current.innerHTML = template.trim();
    }
  };

  // Word & Reading Time stats
  const stripHtml = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };
  const textContent = stripHtml(value);
  const wordsCount = textContent.trim() ? textContent.trim().split(/\s+/).length : 0;
  const charsCount = textContent.length;
  const estimatedReadTime = Math.max(1, Math.ceil(wordsCount / 180));
  const h2Count = (value.match(/<h2/gi) || []).length;
  const h3Count = (value.match(/<h3/gi) || []).length;

  return (
    <div
      className={`border border-slate-300 rounded-2xl bg-white shadow-sm flex flex-col transition-all ${
        isFullscreen ? 'fixed inset-4 z-50 shadow-2xl overflow-hidden' : 'relative'
      }`}
    >
      {/* 1. TOP HEADER & MODE CONTROLS */}
      <div className="bg-slate-100 border-b border-slate-200 px-3.5 py-2.5 flex flex-wrap items-center justify-between gap-2.5 rounded-t-2xl">
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
          <button
            type="button"
            onClick={() => {
              setMode('visual');
              setTimeout(() => {
                if (visualEditorRef.current) visualEditorRef.current.innerHTML = value;
              }, 10);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
              mode === 'visual'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
            }`}
            title="Soạn thảo trực quan kiểu Word / CMS"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Trực Quan (Visual)</span>
          </button>

          <button
            type="button"
            onClick={() => setMode('code')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
              mode === 'code'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
            }`}
            title="Soạn thảo mã nguồn HTML"
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Mã HTML (Code)</span>
          </button>

          <button
            type="button"
            onClick={() => setMode('split')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
              mode === 'split'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
            }`}
            title="Soạn thảo & Xem trước song song"
          >
            <Columns className="w-3.5 h-3.5" />
            <span>Chia Đôi (Split)</span>
          </button>

          <button
            type="button"
            onClick={() => setMode('preview')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
              mode === 'preview'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
            }`}
            title="Xem trước giao diện thực tế bài viết"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Xem Trước</span>
          </button>
        </div>

        {/* Right side controls: Templates & Fullscreen */}
        <div className="flex items-center gap-2">
          {/* Templates Dropdown */}
          <div className="relative group">
            <button
              type="button"
              className="px-2.5 py-1.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 shadow-sm flex items-center gap-1.5 transition"
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span>Chèn Bản Mẫu</span>
            </button>
            <div className="absolute right-0 top-full mt-1 w-56 bg-white border border-slate-200 rounded-xl shadow-xl py-1.5 z-30 hidden group-hover:block animate-fadeIn">
              <button
                type="button"
                onClick={() => handleLoadTemplate('course')}
                className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-600 font-semibold block"
              >
                🎓 Mẫu Giới Thiệu Khóa Học
              </button>
              <button
                type="button"
                onClick={() => handleLoadTemplate('tutorial')}
                className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-600 font-semibold block"
              >
                🛠️ Mẫu Hướng Dẫn Từng Bước
              </button>
              <button
                type="button"
                onClick={() => handleLoadTemplate('download')}
                className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-600 font-semibold block"
              >
                📥 Mẫu Tải Tài Liệu & Giáo Trình
              </button>
            </div>
          </div>

          {/* Fullscreen toggle */}
          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 bg-white hover:bg-slate-50 text-slate-600 rounded-xl border border-slate-200 shadow-sm transition"
            title={isFullscreen ? 'Thu nhỏ' : 'Toàn màn hình (Zen Focus)'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 2. RICH TOOLBAR (Always accessible for rapid formatting) */}
      <div className="bg-slate-50/90 border-b border-slate-200 p-2 flex flex-wrap items-center gap-1 text-slate-700 select-none">
        {/* Undo / Redo */}
        <div className="flex items-center bg-white rounded-lg border border-slate-200 p-0.5 shadow-xs mr-1">
          <button
            type="button"
            onClick={() => execCmd('undo')}
            className="p-1.5 hover:bg-slate-100 rounded text-slate-600"
            title="Hoàn tác (Ctrl+Z)"
          >
            <Undo className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => execCmd('redo')}
            className="p-1.5 hover:bg-slate-100 rounded text-slate-600"
            title="Làm lại (Ctrl+Y)"
          >
            <Redo className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Headings & Paragraph Selector */}
        <div className="flex items-center bg-white rounded-lg border border-slate-200 p-0.5 shadow-xs mr-1">
          <select
            onChange={(e) => {
              const val = e.target.value;
              if (val === 'lead') {
                insertHtml('<p class="lead">Nhập đoạn mở đầu nổi bật tại đây...</p>');
              } else {
                formatBlock(val);
              }
              e.target.value = '';
            }}
            defaultValue=""
            className="text-xs font-semibold py-1 px-2 bg-transparent text-slate-700 focus:outline-none cursor-pointer"
            title="Kiểu đoạn văn & Tiêu đề"
          >
            <option value="" disabled>Định dạng khối...</option>
            <option value="p">Đoạn văn thường (Paragraph)</option>
            <option value="h2">Tiêu đề lớn H2 (Mục chính)</option>
            <option value="h3">Tiêu đề vừa H3 (Mục con)</option>
            <option value="h4">Tiêu đề nhỏ H4</option>
            <option value="lead">Đoạn mở đầu nổi bật (Lead)</option>
            <option value="blockquote">Trích dẫn (Quote)</option>
          </select>
        </div>

        {/* Text Styles: Bold, Italic, Underline, Strike */}
        <div className="flex items-center bg-white rounded-lg border border-slate-200 p-0.5 shadow-xs mr-1">
          <button
            type="button"
            onClick={() => execCmd('bold')}
            className="p-1.5 hover:bg-slate-100 rounded text-slate-700 font-black"
            title="In đậm (Ctrl+B)"
          >
            <Bold className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => execCmd('italic')}
            className="p-1.5 hover:bg-slate-100 rounded text-slate-700 italic"
            title="In nghiêng (Ctrl+I)"
          >
            <Italic className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => execCmd('underline')}
            className="p-1.5 hover:bg-slate-100 rounded text-slate-700 underline"
            title="Gạch chân (Ctrl+U)"
          >
            <Underline className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => execCmd('strikeThrough')}
            className="p-1.5 hover:bg-slate-100 rounded text-slate-700 line-through"
            title="Gạch ngang chữ"
          >
            <Strikethrough className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Text Colors & Highlight */}
        <div className="flex items-center bg-white rounded-lg border border-slate-200 p-0.5 shadow-xs mr-1">
          <button
            type="button"
            onClick={() => execCmd('foreColor', '#0265ff')}
            className="p-1.5 hover:bg-slate-100 rounded text-blue-600 font-bold text-xs"
            title="Màu xanh thương hiệu"
          >
            A
          </button>
          <button
            type="button"
            onClick={() => execCmd('foreColor', '#b30000')}
            className="p-1.5 hover:bg-slate-100 rounded text-red-600 font-bold text-xs"
            title="Màu đỏ nổi bật"
          >
            A
          </button>
          <button
            type="button"
            onClick={() => execCmd('foreColor', '#10b981')}
            className="p-1.5 hover:bg-slate-100 rounded text-emerald-600 font-bold text-xs"
            title="Màu xanh lá"
          >
            A
          </button>
          <button
            type="button"
            onClick={() => execCmd('foreColor', '#0f172a')}
            className="p-1.5 hover:bg-slate-100 rounded text-slate-900 font-bold text-xs"
            title="Màu đen mặc định"
          >
            A
          </button>
          <span className="w-px h-4 bg-slate-200 mx-0.5" />
          <button
            type="button"
            onClick={() => execCmd('hiliteColor', '#fef08a')}
            className="p-1 hover:bg-slate-100 rounded text-xs bg-yellow-200 text-yellow-900 px-1.5 font-bold"
            title="Đánh dấu màu vàng (Highlight)"
          >
            Dấu
          </button>
        </div>

        {/* Alignment */}
        <div className="flex items-center bg-white rounded-lg border border-slate-200 p-0.5 shadow-xs mr-1">
          <button
            type="button"
            onClick={() => execCmd('justifyLeft')}
            className="p-1.5 hover:bg-slate-100 rounded text-slate-700"
            title="Căn trái"
          >
            <AlignLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => execCmd('justifyCenter')}
            className="p-1.5 hover:bg-slate-100 rounded text-slate-700"
            title="Căn giữa"
          >
            <AlignCenter className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => execCmd('justifyRight')}
            className="p-1.5 hover:bg-slate-100 rounded text-slate-700"
            title="Căn phải"
          >
            <AlignRight className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => execCmd('justifyFull')}
            className="p-1.5 hover:bg-slate-100 rounded text-slate-700"
            title="Căn đều 2 bên"
          >
            <AlignJustify className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Lists */}
        <div className="flex items-center bg-white rounded-lg border border-slate-200 p-0.5 shadow-xs mr-1">
          <button
            type="button"
            onClick={() => execCmd('insertUnorderedList')}
            className="p-1.5 hover:bg-slate-100 rounded text-slate-700"
            title="Danh sách gạch đầu dòng"
          >
            <List className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => execCmd('insertOrderedList')}
            className="p-1.5 hover:bg-slate-100 rounded text-slate-700"
            title="Danh sách số thứ tự"
          >
            <ListOrdered className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() =>
              insertHtml(
                '<ul class="space-y-2 my-4">\n  <li class="flex items-center gap-2"><span>✅</span> <strong>Mục 1:</strong> Đã hoàn thành thao tác</li>\n  <li class="flex items-center gap-2"><span>✅</span> <strong>Mục 2:</strong> Đã kiểm tra đầu ra</li>\n</ul>'
              )
            }
            className="p-1.5 hover:bg-slate-100 rounded text-slate-700"
            title="Chèn danh sách Checklist"
          >
            <CheckSquare className="w-3.5 h-3.5 text-emerald-600" />
          </button>
        </div>

        {/* Advanced Inserts: Link, Image, Video, Table, Callout */}
        <div className="flex items-center bg-white rounded-lg border border-slate-200 p-0.5 shadow-xs mr-1">
          <button
            type="button"
            onClick={() => setActiveModal('link')}
            className="p-1.5 hover:bg-slate-100 rounded text-blue-600"
            title="Chèn liên kết (Link)"
          >
            <LinkIcon className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => execCmd('unlink')}
            className="p-1.5 hover:bg-slate-100 rounded text-slate-400"
            title="Gỡ liên kết"
          >
            <Unlink className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setActiveModal('image')}
            className="p-1.5 hover:bg-slate-100 rounded text-indigo-600"
            title="Chèn hình ảnh có chú thích"
          >
            <ImageIcon className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setActiveModal('video')}
            className="p-1.5 hover:bg-slate-100 rounded text-red-600"
            title="Chèn Video YouTube"
          >
            <Video className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setActiveModal('table')}
            className="p-1.5 hover:bg-slate-100 rounded text-blue-700"
            title="Chèn Bảng dữ liệu (Table)"
          >
            <TableIcon className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setActiveModal('callout')}
            className="p-1.5 hover:bg-slate-100 rounded text-amber-600"
            title="Chèn Hộp Lưu Ý / Thông Báo (Callout Box)"
          >
            <AlertCircle className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Miscellaneous: Divider, Code, Clear Format */}
        <div className="flex items-center bg-white rounded-lg border border-slate-200 p-0.5 shadow-xs">
          <button
            type="button"
            onClick={() => insertHtml('<hr class="my-6 border-slate-200" />')}
            className="p-1.5 hover:bg-slate-100 rounded text-slate-600"
            title="Chèn đường kẻ ngang phân cách"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() =>
              insertHtml(
                '<pre class="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs overflow-x-auto my-4"><code>// Ví dụ mã lệnh hoặc công thức\n=VLOOKUP(A2, DanhSach, 2, FALSE)</code></pre>'
              )
            }
            className="p-1.5 hover:bg-slate-100 rounded text-slate-600"
            title="Chèn khối mã nguồn (Code block)"
          >
            <Code className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => execCmd('removeFormat')}
            className="p-1.5 hover:bg-slate-100 rounded text-slate-500"
            title="Xóa định dạng"
          >
            <Eraser className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3. EDITOR CANVAS CONTAINER */}
      <div className="flex-1 flex overflow-hidden min-h-[420px] bg-slate-50/30" style={{ minHeight }}>
        {/* MODE 1: VISUAL (WYSIWYG) */}
        {mode === 'visual' && (
          <div
            ref={visualEditorRef}
            contentEditable
            onInput={handleVisualInput}
            className="flex-1 p-6 sm:p-8 bg-white overflow-y-auto focus:outline-none prose prose-slate max-w-none text-slate-800 text-sm sm:text-base leading-relaxed article-body"
            style={{ minHeight }}
            data-placeholder="Bắt đầu soạn thảo nội dung bài viết..."
          />
        )}

        {/* MODE 2: CODE (HTML Source) */}
        {mode === 'code' && (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 p-5 font-mono text-xs leading-relaxed text-slate-800 bg-slate-900/5 focus:bg-white focus:outline-none resize-none overflow-y-auto"
            style={{ minHeight }}
            placeholder="Nhập mã HTML bài viết tại đây..."
          />
        )}

        {/* MODE 3: SPLIT (Code Left + Live Preview Right) */}
        {mode === 'split' && (
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
            <div className="flex flex-col h-full bg-slate-50">
              <div className="px-3 py-1.5 bg-slate-200 text-slate-700 text-[10px] font-bold uppercase tracking-wider">
                Mã HTML Soạn Thảo
              </div>
              <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="flex-1 p-4 font-mono text-xs leading-relaxed text-slate-800 bg-transparent focus:outline-none resize-none"
                style={{ minHeight }}
              />
            </div>
            <div className="flex flex-col h-full bg-white">
              <div className="px-3 py-1.5 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider">
                Xem Trước Thực Tế
              </div>
              <div
                className="flex-1 p-6 overflow-y-auto prose prose-slate max-w-none text-slate-800 text-sm leading-relaxed article-body"
                dangerouslySetInnerHTML={{ __html: value }}
              />
            </div>
          </div>
        )}

        {/* MODE 4: PREVIEW ONLY */}
        {mode === 'preview' && (
          <div className="flex-1 p-6 sm:p-10 bg-white overflow-y-auto max-w-4xl mx-auto w-full">
            <div className="mb-4 pb-2 border-b border-slate-100 text-xs text-slate-400 font-semibold">
              Giao diện bài viết hiển thị trên website:
            </div>
            <div
              className="prose prose-slate max-w-none text-slate-800 text-sm sm:text-base leading-relaxed article-body"
              dangerouslySetInnerHTML={{ __html: value }}
            />
          </div>
        )}
      </div>

      {/* 4. BOTTOM STATUS BAR & COUNTERS */}
      <div className="bg-slate-100 border-t border-slate-200 px-4 py-2 flex flex-wrap items-center justify-between text-xs text-slate-500 rounded-b-2xl">
        <div className="flex items-center gap-4 text-[11px]">
          <span>
            Số từ: <strong className="text-slate-700">{wordsCount}</strong>
          </span>
          <span>•</span>
          <span>
            Số ký tự: <strong className="text-slate-700">{charsCount}</strong>
          </span>
          <span>•</span>
          <span>
            Thời gian đọc: <strong className="text-slate-700">~{estimatedReadTime} phút</strong>
          </span>
          <span>•</span>
          <span className="text-blue-600 font-semibold">
            Mục lục TOC: {h2Count} H2, {h3Count} H3
          </span>
        </div>

        <div className="text-[11px] text-slate-400 font-medium">
          Chế độ: {mode === 'visual' ? 'Soạn thảo trực quan' : mode === 'code' ? 'Mã nguồn' : mode === 'split' ? 'Chia đôi' : 'Xem trước'}
        </div>
      </div>

      {/* 5. MODALS FOR INSERTING ADVANCED CONTENT */}

      {/* Modal: Insert Link */}
      {activeModal === 'link' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-slate-200">
            <h3 className="font-bold text-sm text-slate-900 mb-3 flex items-center gap-2">
              <LinkIcon className="w-4 h-4 text-blue-600" />
              <span>Chèn Liên Kết (Hyperlink)</span>
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Địa chỉ URL:</label>
                <input
                  type="text"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Chữ hiển thị (Tùy chọn):</label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="Để trống nếu lấy nguyên URL"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 focus:bg-white"
                />
              </div>
              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={linkOpenNewTab}
                  onChange={(e) => setLinkOpenNewTab(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-xs text-slate-700 font-medium">Mở liên kết trong tab mới (target="_blank")</span>
              </label>
            </div>
            <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleInsertLink}
                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow"
              >
                Chèn Liên Kết
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Insert Image */}
      {activeModal === 'image' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <h3 className="font-bold text-sm sm:text-base text-slate-900 mb-3 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-indigo-600" />
                <span>Chèn Hình Ảnh Bài Viết</span>
              </span>
              <span className="text-[11px] font-semibold bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full">
                20 ảnh có sẵn
              </span>
            </h3>

            {/* Quick Picker: 20 Real Images Grid */}
            <div className="mb-4">
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Chọn từ kho 20 hình ảnh thực tế trung tâm:
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 max-h-48 overflow-y-auto p-2 bg-slate-50 rounded-2xl border border-slate-200">
                {sampleImages.map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setImageUrl(s.url);
                      setImageCaption(s.label);
                    }}
                    className={`group relative aspect-[4/3] rounded-xl overflow-hidden border text-left transition ${
                      imageUrl === s.url
                        ? 'ring-2 ring-blue-600 border-transparent shadow'
                        : 'border-slate-200 hover:border-blue-400'
                    }`}
                    title={s.label}
                  >
                    <SafeImage
                      src={s.url}
                      alt={s.label}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black/75 p-1 text-[9px] text-white font-medium truncate">
                      {s.filename}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Upload from Computer */}
            <div className="mb-4 p-3 bg-blue-50/60 rounded-2xl border border-blue-100 flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-bold text-blue-900">Hoặc tải ảnh từ máy tính của bạn:</div>
                <div className="text-[11px] text-blue-700">Tự động chèn trực tiếp vào nội dung bài viết</div>
              </div>
              <label className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer shadow transition flex-shrink-0">
                <span>Chọn tệp ảnh</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () => {
                        setImageUrl(reader.result as string);
                        setImageCaption(file.name.replace(/\.[^/.]+$/, ''));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Đường dẫn hình ảnh (URL):</label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="/images/khoa-hoc.jpg hoặc https://..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono focus:ring-2 focus:ring-blue-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Chú thích dưới ảnh (Caption):</label>
                <input
                  type="text"
                  value={imageCaption}
                  onChange={(e) => setImageCaption(e.target.value)}
                  placeholder="Ví dụ: Lớp học thực hành 1 kèm 1 tại Đồ Họa Thực Chiến..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Căn lề hình ảnh:</label>
                <div className="flex gap-2">
                  {(['center', 'left', 'right'] as const).map((pos) => (
                    <button
                      key={pos}
                      type="button"
                      onClick={() => setImageAlign(pos)}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-xl border transition ${
                        imageAlign === pos ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      {pos === 'center' ? 'Ở Giữa' : pos === 'left' ? 'Bên Trái' : 'Bên Phải'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-5 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleInsertImage}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow"
              >
                Chèn Ảnh Vào Bài Viết
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Insert Video */}
      {activeModal === 'video' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-slate-200">
            <h3 className="font-bold text-sm text-slate-900 mb-3 flex items-center gap-2">
              <Video className="w-4 h-4 text-red-600" />
              <span>Chèn Video YouTube Nhúng (Embed)</span>
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Đường dẫn Video YouTube:
                </label>
                <input
                  type="text"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono focus:ring-2 focus:ring-blue-600 focus:bg-white"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Hỗ trợ định dạng <code>youtube.com/watch?v=...</code> hoặc <code>youtu.be/...</code>
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleInsertVideo}
                className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow"
              >
                Chèn Video
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Insert Table */}
      {activeModal === 'table' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-slate-200">
            <h3 className="font-bold text-sm text-slate-900 mb-3 flex items-center gap-2">
              <TableIcon className="w-4 h-4 text-blue-600" />
              <span>Tạo Bảng Dữ Liệu (Table)</span>
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Số Hàng (Rows):</label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={tableRows}
                  onChange={(e) => setTableRows(parseInt(e.target.value, 10) || 1)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Số Cột (Columns):</label>
                <input
                  type="number"
                  min={1}
                  max={8}
                  value={tableCols}
                  onChange={(e) => setTableCols(parseInt(e.target.value, 10) || 1)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                />
              </div>
            </div>
            <label className="flex items-center gap-2 cursor-pointer mt-3">
              <input
                type="checkbox"
                checked={tableHasHeader}
                onChange={(e) => setTableHasHeader(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="text-xs text-slate-700 font-semibold">Tạo dòng tiêu đề cột nổi bật (Header)</span>
            </label>
            <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleInsertTable}
                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow"
              >
                Tạo Bảng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Insert Callout Box */}
      {activeModal === 'callout' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 shadow-2xl border border-slate-200">
            <h3 className="font-bold text-sm text-slate-900 mb-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>Chèn Hộp Ghi Chú & Lưu Ý Nổi Bật</span>
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Loại hộp lưu ý:</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setCalloutType('info');
                      setCalloutTitle('💡 Thông tin quan trọng:');
                    }}
                    className={`p-2 rounded-xl text-xs font-bold border transition ${
                      calloutType === 'info' ? 'bg-blue-50 border-blue-500 text-blue-800' : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    Thông Tin
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCalloutType('tip');
                      setCalloutTitle('✨ Mẹo thực chiến:');
                    }}
                    className={`p-2 rounded-xl text-xs font-bold border transition ${
                      calloutType === 'tip' ? 'bg-emerald-50 border-emerald-500 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    Mẹo Hay
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCalloutType('warning');
                      setCalloutTitle('⚠️ Lưu ý cần tránh:');
                    }}
                    className={`p-2 rounded-xl text-xs font-bold border transition ${
                      calloutType === 'warning' ? 'bg-amber-50 border-amber-500 text-amber-800' : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    Cảnh Báo
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCalloutType('download');
                      setCalloutTitle('📥 Tải Xuống Tài Liệu:');
                    }}
                    className={`p-2 rounded-xl text-xs font-bold border transition ${
                      calloutType === 'download' ? 'bg-red-50 border-red-500 text-red-800' : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    Tải File
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tiêu đề hộp lưu ý:</label>
                <input
                  type="text"
                  value={calloutTitle}
                  onChange={(e) => setCalloutTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nội dung chi tiết:</label>
                <textarea
                  rows={3}
                  value={calloutContent}
                  onChange={(e) => setCalloutContent(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleInsertCallout}
                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow"
              >
                Chèn Hộp Lưu Ý
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
