import type { NextRequest } from "next/server"
import { getServerSession } from "next-auth"

// This is a mock database for demonstration purposes
// In a real application, you would use a database like MongoDB, PostgreSQL, etc.
const mediaItems = [
  {
    id: "1",
    filename: "leadership-summit-2024.mp4",
    originalName: "leadership-summit-2024.mp4",
    type: "video",
    title: "Women's Leadership Summit 2024",
    description: "Highlights from our annual leadership summit",
    category: "events",
    size: 157286400,
    uploadedAt: "2024-03-15T10:00:00Z",
    url: "/placeholder.svg?height=400&width=600",
    status: "published",
  },
  {
    id: "2",
    filename: "healthcare-initiative.jpg",
    originalName: "healthcare-initiative.jpg",
    type: "image",
    title: "Healthcare Mobile Clinic Launch",
    description: "Launch of our new mobile healthcare units serving rural communities",
    category: "programs",
    size: 2457600,
    uploadedAt: "2024-03-10T14:30:00Z",
    url: "/placeholder.svg?height=400&width=600",
    status: "published",
  },
  {
    id: "3",
    filename: "success-stories-ep12.mp3",
    originalName: "success-stories-ep12.mp3",
    type: "audio",
    title: "Success Stories Podcast - Episode 12",
    description: "Inspiring stories from women entrepreneurs who transformed their communities",
    category: "testimonials",
    size: 24576000,
    uploadedAt: "2024-03-08T09:15:00Z",
    url: "/placeholder.svg?height=400&width=600",
    status: "published",
  },
]

export async function GET(request: NextRequest) {
  try {
    // Check authentication and authorization
    const session = await getServerSession()
    if (!session || session.user?.email !== "wcvfw2019@gmail.com") {
      return Response.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    return Response.json({ success: true, data: mediaItems })
  } catch (error) {
    console.error("Media fetch error:", error)
    return Response.json({ success: false, message: "Failed to fetch media" }, { status: 500 })
  }
}
