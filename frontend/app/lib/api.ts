const API_BASE =
  (typeof process !== "undefined" &&
    typeof process.env !== "undefined" &&
    (process.env.NEXT_PUBLIC_API_BASE as string)) ||
  "http://localhost:8000"

type RegisterInput = { email: string; password: string }
type LoginInput = { email: string; password: string }

export async function register(input: RegisterInput): Promise<void> {
  const res = await fetch(`${API_BASE}/api/v1/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  })
  const data = await safeJson(res)
  if (!res.ok) {
    throw new Error((data && (data.detail || data.message)) || "Terjadi kesalahan saat registrasi.")
  }
}

export async function login(input: LoginInput): Promise<string> {
  const form = new URLSearchParams()
  form.append("username", input.email)
  form.append("password", input.password)

  const res = await fetch(`${API_BASE}/api/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: form,
  })
  const data = await safeJson(res)
  if (!res.ok) {
    throw new Error((data && (data.detail || data.message)) || "Terjadi kesalahan saat login.")
  }
  const token = data?.access_token
  if (!token) throw new Error("Token tidak ditemukan dalam respons.")
  return token as string
}

export async function analyze(args: {
  token: string
  payload: { text: string | null; url: string | null }
}) {
  const res = await fetch(`${API_BASE}/api/v1/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${args.token}`,
    },
    body: JSON.stringify(args.payload),
  })
  const data = await safeJson(res)
  if (!res.ok) {
    throw new Error((data && (data.detail || data.message)) || "Gagal menganalisis berita.")
  }
  return data
}

async function safeJson(res: Response) {
  try {
    return await res.json()
  } catch {
    return null
  }
}
