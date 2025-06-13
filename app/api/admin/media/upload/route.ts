import type { NextRequest } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import path from "path"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll("files") as File[]
    const type = formData.get("type") as string
    const title = formData.get("title") as string
    const description = formData.get("description") as string

    if (!files || files.length === 0) {
      return Response.json({ success: false, message: "No files provided" }, { status: 400 })
    }

    const uploadedFiles = []

    // Create upload directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), "public", "uploads", type)
    await mkdir(uploadDir, { recursive: true })

    for (const file of files) {
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      // Generate unique filename
      const timestamp = Date.now()
      const filename = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`
      const filepath = path.join(uploadDir, filename)

      // Write file to local storage
      await writeFile(filepath, buffer)

      // Create file record
      const fileRecord = {
        id: `${timestamp}-${Math.random().toString(36).substr(2, 9)}`,
        filename,
        originalName: file.name,
        type,
        title,
        description,
        size: file.size,
        uploadedAt: new Date().toISOString(),
        url: `/uploads/${type}/${filename}`,
        status: "uploaded",
      }

      uploadedFiles.push(fileRecord)

      // Log upload for tracking
      console.log("File uploaded:", fileRecord)
    }

    // In a real application, you would:
    // 1. Save file metadata to database
    // 2. Process media (thumbnails, transcoding, etc.)
    // 3. Update website content automatically
    // 4. Send notifications

    return Response.json({
      success: true,
      message: `${files.length} file(s) uploaded successfully`,
      files: uploadedFiles,
    })
  } catch (error) {
    console.error("Media upload error:", error)
    return Response.json({ success: false, message: "Failed to upload media" }, { status: 500 })
  }
}
