// Performance detection utilities
export const getPerformanceLevel = (): "low" | "medium" | "high" => {
  if (typeof window === "undefined") return "medium"

  // Check for reduced motion preference
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return "low"
  }

  // Check hardware acceleration
  const canvas = document.createElement("canvas")
  const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")

  if (!gl) return "low"

  // Check device memory (if available)
  const deviceMemory = (navigator as any).deviceMemory
  if (deviceMemory && deviceMemory < 4) return "low"

  // Check connection speed
  const connection = (navigator as any).connection
  if (
    connection &&
    connection.effectiveType &&
    (connection.effectiveType === "slow-2g" || connection.effectiveType === "2g")
  ) {
    return "low"
  }

  // Default to medium for safety
  return "medium"
}

export const shouldUseAnimations = (): boolean => {
  return getPerformanceLevel() !== "low"
}

export const getAnimationDuration = (baseDuration: number): number => {
  const level = getPerformanceLevel()
  switch (level) {
    case "low":
      return 0
    case "medium":
      return baseDuration * 1.5
    case "high":
      return baseDuration
    default:
      return baseDuration
  }
}
