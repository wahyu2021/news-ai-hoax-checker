export type AnalysisResult = {
  summary: string
  prediction: "Valid" | "Hoaks"
  confidence_score: number
  original_text: string
}
