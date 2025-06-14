export async function POST(request: Request) {
  try {
    const formData = await request.json()

    // Forward to Java backend
    const response = await fetch("http://localhost:8080/api/volunteer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    const result = await response.json()

    if (result.success) {
      return Response.json({
        success: true,
        message: "Volunteer application submitted successfully",
        id: result.id,
      })
    } else {
      return Response.json(
        {
          success: false,
          message: result.message || "Failed to submit volunteer application",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Volunteer API error:", error)
    return Response.json(
      {
        success: false,
        message: "Failed to submit volunteer application",
      },
      { status: 500 },
    )
  }
}
