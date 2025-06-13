"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useSession, signOut } from "next-auth/react"
import {
  Upload,
  Users,
  DollarSign,
  Mail,
  ImageIcon,
  Video,
  Music,
  FileText,
  Settings,
  BarChart3,
  Calendar,
  MessageSquare,
  LogOut,
  CheckCircle,
  X,
  Eye,
  Shield,
  User,
} from "lucide-react"
import Header from "../components/header"
import AdminGuard from "../components/admin-guard"

export default function AdminPage() {
  const { data: session } = useSession()
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([])
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)
  const [uploadType, setUploadType] = useState<string>("")
  const [mediaTitle, setMediaTitle] = useState("")
  const [mediaDescription, setMediaDescription] = useState("")

  const imageInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)
  const audioInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (type: string, files: FileList | null) => {
    if (files && files.length > 0) {
      setSelectedFiles(files)
      setUploadType(type)
    }
  }

  const handleMediaUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      alert("Please select files to upload")
      return
    }

    if (!mediaTitle.trim()) {
      alert("Please enter a title for the media")
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    try {
      const formData = new FormData()

      // Add all selected files
      Array.from(selectedFiles).forEach((file, index) => {
        formData.append(`files`, file)
      })

      formData.append("type", uploadType)
      formData.append("title", mediaTitle)
      formData.append("description", mediaDescription)

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      const response = await fetch("/api/admin/media/upload", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      clearInterval(progressInterval)
      setUploadProgress(100)

      if (result.success) {
        // Add uploaded files to the list
        setUploadedFiles((prev) => [...prev, ...result.files])

        // Reset form
        setSelectedFiles(null)
        setMediaTitle("")
        setMediaDescription("")
        setUploadType("")

        // Reset file inputs
        if (imageInputRef.current) imageInputRef.current.value = ""
        if (videoInputRef.current) videoInputRef.current.value = ""
        if (audioInputRef.current) audioInputRef.current.value = ""

        setTimeout(() => setUploadProgress(0), 2000)
      } else {
        alert("Upload failed: " + result.message)
      }
    } catch (error) {
      console.error("Upload error:", error)
      alert("Upload failed. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  const removeUploadedFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" })
  }

  const stats = [
    { title: "Total Donations", value: "₹24L", icon: DollarSign, change: "+12%" },
    { title: "Active Users", value: "15,847", icon: Users, change: "+8%" },
    { title: "Newsletter Subscribers", value: "45,231", icon: Mail, change: "+15%" },
    { title: "Media Items", value: `${uploadedFiles.length + 1234}`, icon: ImageIcon, change: "+5%" },
  ]

  const recentActivities = [
    { type: "donation", message: "New donation of ₹5,000 received", time: "2 minutes ago" },
    { type: "contact", message: "New contact form submission", time: "15 minutes ago" },
    { type: "subscription", message: "25 new newsletter subscriptions", time: "1 hour ago" },
    { type: "media", message: "New video uploaded to gallery", time: "2 hours ago" },
  ]

  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-50">
        <Header />

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Admin Header with User Info */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-gray-600">
                    <Shield className="h-4 w-4 mr-2 text-pink-600" />
                    <span>Authorized Admin Access</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <User className="h-4 w-4 mr-2 text-purple-600" />
                    <span className="font-medium">{session?.user?.email}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Badge className="bg-green-100 text-green-700 px-3 py-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Online
                </Badge>
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="border-red-300 text-red-700 hover:bg-red-50"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Welcome Message for Admin */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <Card className="bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="bg-pink-100 p-3 rounded-full mr-4">
                    <Shield className="h-6 w-6 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Welcome to Admin Panel</h3>
                    <p className="text-gray-600">
                      You are logged in as the authorized administrator. You have full access to manage the Voice for
                      Women Foundation website.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                        <Badge variant="secondary" className="mt-2 bg-green-100 text-green-700">
                          {stat.change}
                        </Badge>
                      </div>
                      <stat.icon className="h-8 w-8 text-pink-600" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="media" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="media">Media Upload</TabsTrigger>
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="users">Users</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                {/* Enhanced Media Management */}
                <TabsContent value="media">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Upload className="mr-2 h-5 w-5" />
                        Media Upload & Management
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* File Upload Section */}
                      <div className="grid md:grid-cols-3 gap-4">
                        <Card className="p-4 border-dashed border-2 border-pink-300 hover:border-pink-500 transition-colors">
                          <div className="text-center">
                            <ImageIcon className="h-12 w-12 text-pink-600 mx-auto mb-3" />
                            <h3 className="font-semibold mb-2">Upload Images</h3>
                            <input
                              ref={imageInputRef}
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={(e) => handleFileSelect("image", e.target.files)}
                              className="hidden"
                            />
                            <Button
                              onClick={() => imageInputRef.current?.click()}
                              className="w-full bg-pink-600 hover:bg-pink-700"
                            >
                              Choose Images
                            </Button>
                          </div>
                        </Card>

                        <Card className="p-4 border-dashed border-2 border-purple-300 hover:border-purple-500 transition-colors">
                          <div className="text-center">
                            <Video className="h-12 w-12 text-purple-600 mx-auto mb-3" />
                            <h3 className="font-semibold mb-2">Upload Videos</h3>
                            <input
                              ref={videoInputRef}
                              type="file"
                              accept="video/*"
                              multiple
                              onChange={(e) => handleFileSelect("video", e.target.files)}
                              className="hidden"
                            />
                            <Button
                              onClick={() => videoInputRef.current?.click()}
                              className="w-full bg-purple-600 hover:bg-purple-700"
                            >
                              Choose Videos
                            </Button>
                          </div>
                        </Card>

                        <Card className="p-4 border-dashed border-2 border-rose-300 hover:border-rose-500 transition-colors">
                          <div className="text-center">
                            <Music className="h-12 w-12 text-rose-600 mx-auto mb-3" />
                            <h3 className="font-semibold mb-2">Upload Audio</h3>
                            <input
                              ref={audioInputRef}
                              type="file"
                              accept="audio/*"
                              multiple
                              onChange={(e) => handleFileSelect("audio", e.target.files)}
                              className="hidden"
                            />
                            <Button
                              onClick={() => audioInputRef.current?.click()}
                              className="w-full bg-rose-600 hover:bg-rose-700"
                            >
                              Choose Audio
                            </Button>
                          </div>
                        </Card>
                      </div>

                      {/* Selected Files Preview */}
                      {selectedFiles && selectedFiles.length > 0 && (
                        <div className="space-y-4">
                          <h3 className="font-semibold">Selected Files ({selectedFiles.length})</h3>
                          <div className="grid md:grid-cols-2 gap-4">
                            {Array.from(selectedFiles).map((file, index) => (
                              <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                                <div className="mr-3">
                                  {uploadType === "image" && <ImageIcon className="h-6 w-6 text-pink-600" />}
                                  {uploadType === "video" && <Video className="h-6 w-6 text-purple-600" />}
                                  {uploadType === "audio" && <Music className="h-6 w-6 text-rose-600" />}
                                </div>
                                <div className="flex-1">
                                  <p className="font-medium text-sm">{file.name}</p>
                                  <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Media Details Form */}
                          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                            <div>
                              <Label htmlFor="media-title">Title *</Label>
                              <Input
                                id="media-title"
                                value={mediaTitle}
                                onChange={(e) => setMediaTitle(e.target.value)}
                                placeholder="Enter media title"
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="media-description">Description</Label>
                              <Textarea
                                id="media-description"
                                value={mediaDescription}
                                onChange={(e) => setMediaDescription(e.target.value)}
                                placeholder="Enter media description"
                                rows={3}
                              />
                            </div>
                            <Button
                              onClick={handleMediaUpload}
                              disabled={isUploading || !mediaTitle.trim()}
                              className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
                            >
                              {isUploading ? "Uploading..." : `Upload ${selectedFiles.length} File(s)`}
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Upload Progress */}
                      {isUploading && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Uploading files...</span>
                            <span>{uploadProgress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-pink-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${uploadProgress}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Uploaded Files List */}
                      {uploadedFiles.length > 0 && (
                        <div>
                          <h3 className="font-semibold mb-4">Recently Uploaded ({uploadedFiles.length})</h3>
                          <div className="space-y-3 max-h-60 overflow-y-auto">
                            {uploadedFiles.map((file, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-3 bg-white rounded-lg border"
                              >
                                <div className="flex items-center">
                                  <div className="mr-3">
                                    {file.type === "image" && <ImageIcon className="h-6 w-6 text-pink-600" />}
                                    {file.type === "video" && <Video className="h-6 w-6 text-purple-600" />}
                                    {file.type === "audio" && <Music className="h-6 w-6 text-rose-600" />}
                                  </div>
                                  <div>
                                    <p className="font-medium text-sm">{file.title}</p>
                                    <p className="text-xs text-gray-500">{file.filename}</p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <CheckCircle className="h-5 w-5 text-green-600" />
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => removeUploadedFile(index)}
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Content Management */}
                <TabsContent value="content">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <FileText className="mr-2 h-5 w-5" />
                        Content Management
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="page-title">Page Title</Label>
                          <Input id="page-title" placeholder="Enter page title" />
                        </div>

                        <div>
                          <Label htmlFor="page-content">Page Content</Label>
                          <Textarea id="page-content" placeholder="Enter page content..." rows={8} />
                        </div>

                        <div>
                          <Label htmlFor="meta-description">Meta Description</Label>
                          <Textarea id="meta-description" placeholder="Enter meta description for SEO..." rows={3} />
                        </div>

                        <Button className="bg-pink-600 hover:bg-pink-700">Save Content</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* User Management */}
                <TabsContent value="users">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Users className="mr-2 h-5 w-5" />
                        User Management
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { name: "Admin User", email: "wcvfw2019@gmail.com", role: "Super Admin", status: "Active" },
                          { name: "Sarah Johnson", email: "sarah@example.com", role: "Editor", status: "Active" },
                          { name: "Maria Rodriguez", email: "maria@example.com", role: "Moderator", status: "Active" },
                        ].map((user, index) => (
                          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-gray-600">{user.email}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant="secondary">{user.role}</Badge>
                              <Badge className="bg-green-100 text-green-700">{user.status}</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Settings */}
                <TabsContent value="settings">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Settings className="mr-2 h-5 w-5" />
                        Website Settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="site-name">Site Name</Label>
                          <Input id="site-name" defaultValue="Voice for Women" />
                        </div>

                        <div>
                          <Label htmlFor="site-tagline">Site Tagline</Label>
                          <Input id="site-tagline" defaultValue="Empowering Every Dream" />
                        </div>

                        <div>
                          <Label htmlFor="contact-email">Contact Email</Label>
                          <Input id="contact-email" defaultValue="wcvfw2019@gmail.com" />
                        </div>

                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" defaultValue="+91 98765 43210" />
                        </div>

                        <Button className="bg-pink-600 hover:bg-pink-700">Save Settings</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="mr-2 h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-pink-600 rounded-full mt-2" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.message}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-pink-600 hover:bg-pink-700">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Event
                  </Button>
                  <Button variant="outline" className="w-full">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Send Newsletter
                  </Button>
                  <Button variant="outline" className="w-full">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    View Analytics
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Eye className="mr-2 h-4 w-4" />
                    Preview Website
                  </Button>
                </CardContent>
              </Card>

              {/* System Status */}
              <Card>
                <CardHeader>
                  <CardTitle>System Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Website</span>
                      <Badge className="bg-green-100 text-green-700">Online</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Database</span>
                      <Badge className="bg-green-100 text-green-700">Connected</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Email Service</span>
                      <Badge className="bg-green-100 text-green-700">Active</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Payment Gateway</span>
                      <Badge className="bg-green-100 text-green-700">Operational</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AdminGuard>
  )
}
