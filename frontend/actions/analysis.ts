"use server"

import { cookies } from "next/headers"

const API_URL = process.env.BASE_API_URL

type AnalysisResult = {
  summary: string
  prediction: string
  confidence_score: number
  original_text: string
}

type ActionResult = {
  success: boolean
  data?: AnalysisResult
  message?: string
}

export async function analyzeNews(formData: { text?: string; url?: string }): Promise<ActionResult> {
  const token = (await cookies()).get("session_token")?.value

  if (!token) {
    return { success: false, message: "Anda harus login terlebih dahulu" }
  }

  try {
    const response = await fetch(`${API_URL}/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })

    const responseData = await response.json()

    if (!response.ok) {
      if (responseData.detail && Array.isArray(responseData.detail)) {
        return { success: false, message: responseData.detail[0].msg || "Input tidak valid" }
      }
      return { success: false, message: responseData.detail || "Analisis gagal" }
    }

    return { success: true, data: responseData }
  } catch (error) {
    console.error("Error saat analisis:", error)
    return { success: false, message: "Tidak dapat terhubung ke server analisis." }
  }
}
