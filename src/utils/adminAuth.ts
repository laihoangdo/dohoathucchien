import { Article } from '../types';

const SALT = 'dhhc_salt_2026_sec#';
// SHA-256 digests with salt - Plaintext credentials are NOT exposed in source code
const EXPECTED_USER_HASH = '97b00566b12713da4241dcdf774381bbddec3303d4da715b7a94fa87f049e893';
const EXPECTED_PASS_HASH = 'f139ec53e28196ccf39810a3cf858d0497f224cd4edd3447755f5fd21ff89671';
const JWT_SECRET_KEY = 'dhhc_jwt_internal_sign_key_2026';

export const GITHUB_REPO_OWNER = 'laihoangdo';
export const GITHUB_REPO_NAME = 'dohoathucchien';
export const GITHUB_TARGET_FILE = 'src/data/siteData.ts';

// Helper: UTF-8 to Base64 in browser
export function utf8ToBase64(str: string): string {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) =>
    String.fromCharCode(parseInt(p1, 16))
  ));
}

// Helper: Base64 to UTF-8 in browser
export function base64ToUtf8(str: string): string {
  return decodeURIComponent(
    Array.prototype.map.call(atob(str), (c: string) =>
      '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    ).join('')
  );
}

// Helper: base64url encode for UTF-8 strings
export function base64UrlEncodeUtf8(str: string): string {
  return utf8ToBase64(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

// Helper: base64url decode to UTF-8 string
export function base64UrlDecodeUtf8(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return base64ToUtf8(base64);
}

// Helper: base64url encode for binary Uint8Array bytes
export function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

// Slug generator for Vietnamese text
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/([^0-9a-z-\s])/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Compute SHA-256 hash with salt using Web Crypto API
export async function hashWithSalt(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input + SALT);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

// Verify credentials without exposing plain text (handles optional whitespace trimming)
export async function verifyAdminCredentials(username: string, pass: string): Promise<boolean> {
  const cleanUser = username.trim();
  const userHash = await hashWithSalt(cleanUser);
  const passHash = await hashWithSalt(pass);
  const passHashTrimmed = await hashWithSalt(pass.trim());

  const isUserValid = userHash === EXPECTED_USER_HASH;
  const isPassValid = passHash === EXPECTED_PASS_HASH || passHashTrimmed === EXPECTED_PASS_HASH;

  return isUserValid && isPassValid;
}

// Sign HMAC-SHA256 for JWT simulation
async function signHmac(data: string, secret: string): Promise<string> {
  try {
    if (typeof crypto !== 'undefined' && crypto.subtle) {
      const encoder = new TextEncoder();
      const key = await crypto.subtle.importKey(
        'raw',
        encoder.encode(secret),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
      );
      const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
      return bytesToBase64Url(new Uint8Array(signature));
    }
  } catch (e) {
    console.warn('HMAC signing fallback:', e);
  }
  // Safe fallback signature
  let hashVal = 0;
  for (let i = 0; i < data.length; i++) {
    hashVal = ((hashVal << 5) - hashVal + data.charCodeAt(i)) | 0;
  }
  return 'fallback_' + Math.abs(hashVal).toString(36);
}

// Create JWT-like token
export async function createAdminJWT(): Promise<string> {
  const header = { alg: 'HS256', typ: 'JWT' };
  const payload = {
    sub: 'dohoathucchien',
    role: 'superadmin',
    name: 'Quản Trị Viên Đồ Họa Thực Chiến',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 7 * 24 * 3600 // 7 days
  };

  const headerB64 = base64UrlEncodeUtf8(JSON.stringify(header));
  const payloadB64 = base64UrlEncodeUtf8(JSON.stringify(payload));
  const dataToSign = `${headerB64}.${payloadB64}`;
  const signature = await signHmac(dataToSign, JWT_SECRET_KEY);

  return `${dataToSign}.${signature}`;
}

// Verify JWT token
export async function verifyAdminJWT(token: string): Promise<{ valid: boolean; payload?: any }> {
  try {
    if (!token || typeof token !== 'string') return { valid: false };
    const parts = token.split('.');
    if (parts.length !== 3) return { valid: false };

    const [headerB64, payloadB64, signature] = parts;
    const expectedSig = await signHmac(`${headerB64}.${payloadB64}`, JWT_SECRET_KEY);
    if (expectedSig !== signature) {
      return { valid: false };
    }

    const payloadStr = base64UrlDecodeUtf8(payloadB64);
    const payload = JSON.parse(payloadStr);

    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return { valid: false };
    }

    return { valid: true, payload };
  } catch {
    return { valid: false };
  }
}

// Token Storage
const TOKEN_KEY = 'dhhc_admin_jwt_session';
const GH_TOKEN_KEY = 'dhhc_gh_access_token';
const CUSTOM_ARTICLES_KEY = 'dhhc_custom_articles';
const CUSTOM_CATEGORIES_KEY = 'dhhc_custom_categories';

export function getStoredAdminToken(): string | null {
  try {
    return sessionStorage.getItem(TOKEN_KEY) || localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setStoredAdminToken(token: string): void {
  try {
    sessionStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(TOKEN_KEY, token);
  } catch {}
}

export function clearStoredAdminToken(): void {
  try {
    sessionStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_KEY);
  } catch {}
}

// GitHub Token Storage
export function getGitHubToken(): string | null {
  try {
    return localStorage.getItem(GH_TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setGitHubToken(token: string): void {
  try {
    localStorage.setItem(GH_TOKEN_KEY, token.trim());
  } catch {}
}

export function clearGitHubToken(): void {
  try {
    localStorage.removeItem(GH_TOKEN_KEY);
  } catch {}
}

// Local custom articles storage for immediate feedback in preview
export function getLocalArticles(): Article[] {
  try {
    const data = localStorage.getItem(CUSTOM_ARTICLES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveLocalArticle(article: Article): void {
  try {
    const current = getLocalArticles();
    const updated = [article, ...current.filter((a) => a.id !== article.id && a.slug !== article.slug)];
    localStorage.setItem(CUSTOM_ARTICLES_KEY, JSON.stringify(updated));
  } catch {}
}

export function deleteLocalArticle(id: string): void {
  try {
    const current = getLocalArticles();
    const updated = current.filter((a) => a.id !== id);
    localStorage.setItem(CUSTOM_ARTICLES_KEY, JSON.stringify(updated));
  } catch {}
}

// Local custom categories
export function getLocalCategories(): { id: string; name: string; slug: string; desc?: string }[] {
  try {
    const data = localStorage.getItem(CUSTOM_CATEGORIES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveLocalCategory(category: { id: string; name: string; slug: string; desc?: string }): void {
  try {
    const current = getLocalCategories();
    const updated = [...current.filter((c) => c.slug !== category.slug), category];
    localStorage.setItem(CUSTOM_CATEGORIES_KEY, JSON.stringify(updated));
  } catch {}
}

// GitHub API: Check repo write access
export async function checkGitHubRepoAccess(token: string): Promise<{
  ok: boolean;
  message: string;
  repo?: any;
  user?: any;
}> {
  if (!token) {
    return { ok: false, message: 'Chưa có GitHub Token' };
  }

  try {
    // 1. Check user
    const userRes = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json'
      }
    });

    if (!userRes.ok) {
      return {
        ok: false,
        message: `GitHub Token không hợp lệ hoặc đã hết hạn (Mã lỗi: ${userRes.status})`
      };
    }

    const user = await userRes.json();

    // 2. Check repo access
    const repoRes = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json'
        }
      }
    );

    if (!repoRes.ok) {
      if (repoRes.status === 404) {
        return {
          ok: false,
          message: `Không tìm thấy repository ${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME} hoặc token không có quyền truy cập repo.`
        };
      }
      return {
        ok: false,
        message: `Không thể kiểm tra repo (Mã lỗi: ${repoRes.status})`
      };
    }

    const repo = await repoRes.json();
    const permissions = repo.permissions || {};

    if (permissions.push === false) {
      return {
        ok: false,
        message: `Token của người dùng ${user.login} không có quyền ghi (Push/Commit) vào repository này.`,
        user,
        repo
      };
    }

    return {
      ok: true,
      message: `Đã kết nối thành công với ${repo.full_name} bởi @${user.login}`,
      user,
      repo
    };
  } catch (error: any) {
    return {
      ok: false,
      message: `Lỗi kết nối mạng: ${error?.message || 'Không thể gọi GitHub API'}`
    };
  }
}

// GitHub API: Commit new article into src/data/siteData.ts
export async function commitArticleToGitHub(
  token: string,
  article: Article
): Promise<{ ok: boolean; commitUrl?: string; sha?: string; error?: string }> {
  try {
    // 1. Fetch current file src/data/siteData.ts
    const fileUrl = `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${GITHUB_TARGET_FILE}`;
    const getRes = await fetch(fileUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json'
      }
    });

    if (!getRes.ok) {
      const err = await getRes.json().catch(() => ({}));
      return {
        ok: false,
        error: `Không thể đọc file ${GITHUB_TARGET_FILE} từ GitHub: ${err.message || getRes.statusText}`
      };
    }

    const fileData = await getRes.json();
    const currentSha = fileData.sha;
    // Decode base64 content
    const rawContent = fileData.content.replace(/\n/g, '');
    const currentText = base64ToUtf8(rawContent);

    // 2. Build the TypeScript snippet for this article
    const articleSnippet = `  {
    id: ${JSON.stringify(article.id)},
    slug: ${JSON.stringify(article.slug)},
    title: ${JSON.stringify(article.title)},
    excerpt: ${JSON.stringify(article.excerpt)},
    cat: ${JSON.stringify(article.cat)},
    catSlug: ${JSON.stringify(article.catSlug)},
    date: ${JSON.stringify(article.date)},
    author: ${JSON.stringify(article.author)},
    views: ${article.views || 100},
    commentsCount: ${article.commentsCount || 0},
    img: ${JSON.stringify(article.img)},
    tags: ${JSON.stringify(article.tags)},
    featured: ${article.featured ? 'true' : 'false'},
    toc: ${JSON.stringify(article.toc || [])},
    content: ${JSON.stringify(article.content)}
  },
`;

    // 3. Insert after `export const ARTICLES_DATA: Article[] = [\n`
    const targetMarker = 'export const ARTICLES_DATA: Article[] = [';
    const markerIndex = currentText.indexOf(targetMarker);
    if (markerIndex === -1) {
      return {
        ok: false,
        error: `Không tìm thấy mốc 'ARTICLES_DATA' trong file ${GITHUB_TARGET_FILE}`
      };
    }

    const insertPos = markerIndex + targetMarker.length;
    const newFileText =
      currentText.slice(0, insertPos) + '\n' + articleSnippet + currentText.slice(insertPos);

    // 4. Encode to UTF-8 Base64
    const newContentBase64 = utf8ToBase64(newFileText);

    // 5. Commit to GitHub via PUT
    const commitMessage = `feat(cms): thêm bài viết mới "${article.title}" [skip ci]`;
    const putRes = await fetch(fileUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: commitMessage.replace('[skip ci]', ''), // let github actions trigger and rebuild
        content: newContentBase64,
        sha: currentSha,
        branch: 'main'
      })
    });

    if (!putRes.ok) {
      const err = await putRes.json().catch(() => ({}));
      return {
        ok: false,
        error: `Lỗi khi commit lên GitHub: ${err.message || putRes.statusText}`
      };
    }

    const commitResult = await putRes.json();
    const commitSha = commitResult.commit?.sha || '';
    const commitUrl = commitResult.commit?.html_url || `https://github.com/laihoangdo/dohoathucchien/commit/${commitSha}`;

    return {
      ok: true,
      sha: commitSha,
      commitUrl
    };
  } catch (error: any) {
    return {
      ok: false,
      error: error?.message || 'Lỗi không xác định khi commit'
    };
  }
}

// GitHub API: Commit new category
export async function commitCategoryToGitHub(
  token: string,
  category: { id: string; name: string; slug: string; desc?: string }
): Promise<{ ok: boolean; commitUrl?: string; sha?: string; error?: string }> {
  try {
    const fileUrl = `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${GITHUB_TARGET_FILE}`;
    const getRes = await fetch(fileUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json'
      }
    });

    if (!getRes.ok) {
      const err = await getRes.json().catch(() => ({}));
      return {
        ok: false,
        error: `Không thể đọc file từ GitHub: ${err.message || getRes.statusText}`
      };
    }

    const fileData = await getRes.json();
    const currentSha = fileData.sha;
    const rawContent = fileData.content.replace(/\n/g, '');
    const currentText = base64ToUtf8(rawContent);

    // Insert into COURSE_TABS
    const targetMarker = 'export const COURSE_TABS = [';
    const markerIndex = currentText.indexOf(targetMarker);
    if (markerIndex === -1) {
      return { ok: false, error: 'Không tìm thấy COURSE_TABS' };
    }

    const newTabSnippet = `  { id: ${JSON.stringify(category.slug)}, name: ${JSON.stringify(category.name)} },\n`;
    const insertPos = markerIndex + targetMarker.length + 1;
    const newFileText =
      currentText.slice(0, insertPos) + newTabSnippet + currentText.slice(insertPos);

    const putRes = await fetch(fileUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: `feat(cms): thêm danh mục "${category.name}"`,
        content: utf8ToBase64(newFileText),
        sha: currentSha,
        branch: 'main'
      })
    });

    if (!putRes.ok) {
      const err = await putRes.json().catch(() => ({}));
      return { ok: false, error: err.message || putRes.statusText };
    }

    const commitResult = await putRes.json();
    return {
      ok: true,
      sha: commitResult.commit?.sha,
      commitUrl: commitResult.commit?.html_url
    };
  } catch (error: any) {
    return { ok: false, error: error?.message || 'Lỗi không xác định' };
  }
}
