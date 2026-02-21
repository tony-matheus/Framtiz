import {
  AnalyticsInput,
  DashboardOptions,
} from "@/lib/schemas/analytics-schemas"

export class AnalyticsValidation {
  static sanitizeAnalyticsInput(data: AnalyticsInput): AnalyticsInput {
    return {
      page: this.sanitizeString(data.page, 500),
      referrer: this.sanitizeString(data.referrer, 1000),
      user_agent: this.sanitizeString(data.user_agent, 500),
      country: this.sanitizeString(data.country, 10),
      device: this.sanitizeString(data.device, 20),
      from: this.sanitizeString(data.from, 100),
      metadata: this.sanitizeMetadata(data.metadata),
    }
  }

  static sanitizeDashboardOptions(options: DashboardOptions): DashboardOptions {
    return {
      time_period: this.validateTimePeriod(options.time_period),
      page: this.validateNumber(options.page, 1, 1000),
      limit: this.validateNumber(options.limit, 1, 100),
    }
  }

  private static sanitizeString(value: string, maxLength: number): string {
    if (typeof value !== "string") {
      return ""
    }

    const sanitized = value
      .replace(/[<>]/g, "")
      .replace(/javascript:/gi, "")
      .replace(/data:/gi, "")
      .trim()

    return sanitized.length > maxLength
      ? sanitized.substring(0, maxLength)
      : sanitized
  }

  private static sanitizeMetadata(
    metadata: Record<string, unknown>,
  ): Record<string, unknown> {
    if (!metadata || typeof metadata !== "object") {
      return {}
    }

    const sanitized: Record<string, unknown> = {}
    const maxKeys = 20
    const maxValueLength = 1000

    let keyCount = 0
    for (const [key, value] of Object.entries(metadata)) {
      if (keyCount >= maxKeys) break

      const sanitizedKey = this.sanitizeString(key, 50)
      if (sanitizedKey) {
        if (typeof value === "string") {
          sanitized[sanitizedKey] = this.sanitizeString(value, maxValueLength)
        } else if (typeof value === "number") {
          sanitized[sanitizedKey] = this.validateNumber(value, -999999, 999999)
        } else if (typeof value === "boolean") {
          sanitized[sanitizedKey] = value
        }
        keyCount++
      }
    }

    return sanitized
  }

  private static validateTimePeriod(period: string): "1d" | "7d" | "30d" {
    const validPeriods = ["1d", "7d", "30d"]
    return validPeriods.includes(period)
      ? (period as "1d" | "7d" | "30d")
      : "1d"
  }

  private static validateNumber(
    value: number,
    min: number,
    max: number,
  ): number {
    if (typeof value !== "number" || isNaN(value)) {
      return min
    }
    return Math.max(min, Math.min(max, Math.floor(value)))
  }

  static validateCountryCode(country: string): string {
    if (!country || typeof country !== "string") {
      return "Unknown"
    }

    const sanitized = country.toUpperCase().trim()
    if (
      sanitized.length >= 2 &&
      sanitized.length <= 3 &&
      /^[A-Z]+$/.test(sanitized)
    ) {
      return sanitized
    }

    return "Unknown"
  }

  static validateDeviceType(device: string): string {
    if (!device || typeof device !== "string") {
      return "Unknown"
    }

    const sanitized = device.toLowerCase().trim()
    const validDevices = ["desktop", "mobile", "tablet", "unknown"]

    if (validDevices.includes(sanitized)) {
      return sanitized
    }

    if (sanitized.includes("mobile") || sanitized.includes("phone")) {
      return "mobile"
    }
    if (sanitized.includes("tablet") || sanitized.includes("ipad")) {
      return "tablet"
    }
    if (sanitized.includes("desktop") || sanitized.includes("pc")) {
      return "desktop"
    }

    return "Unknown"
  }
}
