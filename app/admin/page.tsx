"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  Eye,
  Shield,
  User,
  Trash2,
  Edit,
  Search,
  Filter,
  Download,
} from "lucide-react"
import Header from "../components/header"
import AdminGuard from "../components/admin-guard"
import { useToast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function AdminPage() {
  const { data: session } = useSession()
  const { toast } = useToast()
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([])
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)
  const [uploadType, setUploadType] = useState<string>("")
  const [mediaTitle, setMediaTitle] = useState("")
  const [mediaDescription, setMediaDescription] = useState("")
  const [mediaCategory, setMediaCategory] = useState("general")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [sortOrder, setSortOrder] = useState("newest")
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [previewItem, setPreviewItem] = useState<any>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<any>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [itemToEdit, setItemToEdit] = useState<any>(null)
  const [editTitle, setEditTitle] = useState("")
  const [editDescription, setEditDescription] = useState("")
  const [editCategory, setEditCategory] = useState("")
  const [activeTab, setActiveTab] = useState("media")

  const imageInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)
  const audioInputRef = useRef<HTMLInputElement>(null)
  const documentInputRef = useRef<HTMLInputElement>(null)

  // Load existing media on component mount
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await fetch("/api/admin/media")
        const data = await response.json()
        if (data.success) {
          setUploadedFiles(data.data || [])
        }
      } catch (error) {
        console.error("Error fetching media:", error)
      }
    }

    fetchMedia()
  }, [])

  const handleFileSelect = (type: string, files: FileList | null) => {
    if (files && files.length > 0) {
      setSelectedFiles(files)
      setUploadType(type)
    }
  }

  const handleMediaUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select files to upload",
        variant: "destructive",
      })
      return
    }

    if (!mediaTitle.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a title for the media",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    try {
      const formData = new FormData()

      // Add all selected files
      Array.from(selectedFiles).forEach((file) => {
        formData.append(`files`, file)
      })

      formData.append("type", uploadType)
      formData.append("title", mediaTitle)
      formData.append("description", mediaDescription)
      formData.append("category", mediaCategory)

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 5
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
        setUploadedFiles((prev) => [...(result.files || []), ...prev])

        toast({
          title: "Upload successful",
          description: `${selectedFiles.length} file(s) uploaded successfully`,
          variant: "default",
        })

        // Reset form
        setSelectedFiles(null)
        setMediaTitle("")
        setMediaDescription("")
        setMediaCategory("general")
        setUploadType("")

        // Reset file inputs
        if (imageInputRef.current) imageInputRef.current.value = ""
        if (videoInputRef.current) videoInputRef.current.value = ""
        if (audioInputRef.current) audioInputRef.current.value = ""
        if (documentInputRef.current) documentInputRef.current.value = ""

        setTimeout(() => setUploadProgress(0), 2000)
      } else {
        toast({
          title: "Upload failed",
          description: result.message || "An error occurred during upload",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Upload error:", error)
      toast({
        title: "Upload failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleDeleteMedia = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/media/${id}`, {
        method: "DELETE",
      })

      const result = await response.json()

      if (result.success) {
        setUploadedFiles((prev) => prev.filter((file) => file.id !== id))
        toast({
          title: "Media deleted",
          description: "The media item has been deleted successfully",
          variant: "default",
        })
      } else {
        toast({
          title: "Deletion failed",
          description: result.message || "Failed to delete media item",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Delete error:", error)
      toast({
        title: "Deletion failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleteModalOpen(false)
      setItemToDelete(null)
    }
  }

  const handleUpdateMedia = async () => {
    if (!itemToEdit) return

    try {
      const response = await fetch(`/api/admin/media/${itemToEdit.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editTitle,
          description: editDescription,
          category: editCategory,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setUploadedFiles((prev) =>
          prev.map((file) =>
            file.id === itemToEdit.id
              ? { ...file, title: editTitle, description: editDescription, category: editCategory }
              : file,
          ),
        )
        toast({
          title: "Media updated",
          description: "The media item has been updated successfully",
          variant: "default",
        })
      } else {
        toast({
          title: "Update failed",
          description: result.message || "Failed to update media item",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Update error:", error)
      toast({
        title: "Update failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsEditModalOpen(false)
      setItemToEdit(null)
    }
  }

  const openPreview = (item: any) => {
    setPreviewItem(item)
    setIsPreviewOpen(true)
  }

  const openDeleteModal = (item: any) => {
    setItemToDelete(item)
    setIsDeleteModalOpen(true)
  }

  const openEditModal = (item: any) => {
    setItemToEdit(item)
    setEditTitle(item.title)
    setEditDescription(item.description || "")
    setEditCategory(item.category || "general")
    setIsEditModalOpen(true)
  }

  const filteredMedia = uploadedFiles
    .filter((file) => {
      // Filter by search query
      const matchesSearch =
        file.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        file.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        file.filename?.toLowerCase().includes(searchQuery.toLowerCase())

      // Filter by type
      const matchesType = filterType === "all" || file.type === filterType

      return matchesSearch && matchesType
    })
    .sort((a, b) => {
      // Sort by date
      if (sortOrder === "newest") {
        return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
      } else {
        return new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime()
      }
    })

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" })
  }

  const stats = [
    { title: "Total Donations", value: "₹24L", icon: DollarSign, change: "+12%" },
    { title: "Active Users", value: "15,847", icon: Users, change: "+8%" },
    { title: "Newsletter Subscribers", value: "45,231", icon: Mail, change: "+15%" },
    { title: "Media Items", value: `${uploadedFiles.length}`, icon: ImageIcon, change: "+5%" },
  ]

  const recentActivities = [
    { type: "donation", message: "New donation of ₹5,000 received", time: "2 minutes ago" },
    { type: "contact", message: "New contact form submission", time: "15 minutes ago" },
    { type: "subscription", message: "25 new newsletter subscriptions", time: "1 hour ago" },
    { type: "media", message: "New video uploaded to gallery", time: "2 hours ago" },
  ]

  const getMediaTypeIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-6 w-6 text-pink-600" />
      case "video":
        return <Video className="h-6 w-6 text-purple-600" />
      case "audio":
        return <Music className="h-6 w-6 text-rose-600" />
      case "document":
        return <FileText className="h-6 w-6 text-blue-600" />
      default:
        return <FileText className="h-6 w-6 text-gray-600" />
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + " MB"
    else return (bytes / 1073741824).toFixed(1) + " GB"
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-50">
        <Header />

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Admin Header with User Info */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
                <div className="flex flex-wrap items-center gap-4">
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
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  <div className="bg-pink-100 p-3 rounded-full">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
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
              <Tabs defaultValue="media" className="space-y-6" value={activeTab} onValueChange={setActiveTab}>
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
                      <CardDescription>
                        Upload and manage images, videos, audio files, and documents for your website
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* File Upload Section */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Card className="p-4 border-dashed border-2 border-pink-300 hover:border-pink-500 transition-colors">
                          <div className="text-center">
                            <ImageIcon className="h-10 w-10 text-pink-600 mx-auto mb-3" />
                            <h3 className="font-semibold mb-2">Images</h3>
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
                              size="sm"
                            >
                              Choose Files
                            </Button>
                          </div>
                        </Card>

                        <Card className="p-4 border-dashed border-2 border-purple-300 hover:border-purple-500 transition-colors">
                          <div className="text-center">
                            <Video className="h-10 w-10 text-purple-600 mx-auto mb-3" />
                            <h3 className="font-semibold mb-2">Videos</h3>
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
                              size="sm"
                            >
                              Choose Files
                            </Button>
                          </div>
                        </Card>

                        <Card className="p-4 border-dashed border-2 border-rose-300 hover:border-rose-500 transition-colors">
                          <div className="text-center">
                            <Music className="h-10 w-10 text-rose-600 mx-auto mb-3" />
                            <h3 className="font-semibold mb-2">Audio</h3>
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
                              size="sm"
                            >
                              Choose Files
                            </Button>
                          </div>
                        </Card>

                        <Card className="p-4 border-dashed border-2 border-blue-300 hover:border-blue-500 transition-colors">
                          <div className="text-center">
                            <FileText className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                            <h3 className="font-semibold mb-2">Documents</h3>
                            <input
                              ref={documentInputRef}
                              type="file"
                              accept=".pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx"
                              multiple
                              onChange={(e) => handleFileSelect("document", e.target.files)}
                              className="hidden"
                            />
                            <Button
                              onClick={() => documentInputRef.current?.click()}
                              className="w-full bg-blue-600 hover:bg-blue-700"
                              size="sm"
                            >
                              Choose Files
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
                                  {uploadType === "document" && <FileText className="h-6 w-6 text-blue-600" />}
                                </div>
                                <div className="flex-1 truncate">
                                  <p className="font-medium text-sm truncate">{file.name}</p>
                                  <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
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
                            <div>
                              <Label htmlFor="media-category">Category</Label>
                              <Select value={mediaCategory} onValueChange={setMediaCategory}>
                                <SelectTrigger id="media-category">
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="general">General</SelectItem>
                                  <SelectItem value="events">Events</SelectItem>
                                  <SelectItem value="programs">Programs</SelectItem>
                                  <SelectItem value="testimonials">Testimonials</SelectItem>
                                  <SelectItem value="gallery">Gallery</SelectItem>
                                </SelectContent>
                              </Select>
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
                          <Progress value={uploadProgress} className="h-2" />
                        </div>
                      )}

                      {/* Media Library */}
                      <div className="space-y-4">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                          <h3 className="text-lg font-semibold">Media Library</h3>
                          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                            <div className="relative flex-grow">
                              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <Input
                                placeholder="Search media..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-8"
                              />
                            </div>
                            <div className="flex gap-2">
                              <Select value={filterType} onValueChange={setFilterType}>
                                <SelectTrigger className="w-[110px]">
                                  <Filter className="h-4 w-4 mr-2" />
                                  <span className="truncate">
                                    {filterType === "all"
                                      ? "All Types"
                                      : filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                                  </span>
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="all">All Types</SelectItem>
                                  <SelectItem value="image">Images</SelectItem>
                                  <SelectItem value="video">Videos</SelectItem>
                                  <SelectItem value="audio">Audio</SelectItem>
                                  <SelectItem value="document">Documents</SelectItem>
                                </SelectContent>
                              </Select>
                              <Select value={sortOrder} onValueChange={setSortOrder}>
                                <SelectTrigger className="w-[110px]">
                                  <span className="truncate">{sortOrder === "newest" ? "Newest" : "Oldest"}</span>
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="newest">Newest</SelectItem>
                                  <SelectItem value="oldest">Oldest</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>

                        {filteredMedia.length === 0 ? (
                          <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                            <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                            <h3 className="text-lg font-medium text-gray-600 mb-1">No media found</h3>
                            <p className="text-gray-500">
                              {searchQuery || filterType !== "all"
                                ? "Try adjusting your search or filters"
                                : "Upload some media to get started"}
                            </p>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredMedia.map((file) => (
                              <Card key={file.id} className="overflow-hidden hover:shadow-md transition-shadow">
                                <div className="relative h-40 bg-gray-100">
                                  {file.type === "image" ? (
                                    <img
                                      src={file.url || "/placeholder.svg?height=200&width=300"}
                                      alt={file.title}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className="flex items-center justify-center h-full bg-gray-100">
                                      {getMediaTypeIcon(file.type)}
                                      <span className="ml-2 text-gray-600">{file.type}</span>
                                    </div>
                                  )}
                                  <Badge
                                    className={`absolute top-2 right-2 ${
                                      file.type === "image"
                                        ? "bg-pink-100 text-pink-700"
                                        : file.type === "video"
                                          ? "bg-purple-100 text-purple-700"
                                          : file.type === "audio"
                                            ? "bg-rose-100 text-rose-700"
                                            : "bg-blue-100 text-blue-700"
                                    }`}
                                  >
                                    {file.type}
                                  </Badge>
                                </div>
                                <CardContent className="p-4">
                                  <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-medium text-gray-800 truncate" title={file.title}>
                                      {file.title}
                                    </h4>
                                    <Badge variant="outline" className="ml-2 truncate">
                                      {file.category || "general"}
                                    </Badge>
                                  </div>
                                  <p className="text-xs text-gray-500 mb-3 truncate" title={file.filename}>
                                    {file.filename}
                                  </p>
                                  <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-500">{formatDate(file.uploadedAt)}</span>
                                    <div className="flex space-x-1">
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-8 w-8 p-0"
                                        onClick={() => openPreview(file)}
                                      >
                                        <Eye className="h-4 w-4" />
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-8 w-8 p-0"
                                        onClick={() => openEditModal(file)}
                                      >
                                        <Edit className="h-4 w-4" />
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                        onClick={() => openDeleteModal(file)}
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        )}
                      </div>
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

        {/* Media Preview Modal */}
        <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{previewItem?.title}</DialogTitle>
            </DialogHeader>
            <div className="overflow-y-auto max-h-[70vh]">
              {previewItem?.type === "image" ? (
                <img
                  src={previewItem.url || "/placeholder.svg?height=400&width=600"}
                  alt={previewItem.title}
                  className="max-w-full mx-auto max-h-[50vh] object-contain"
                />
              ) : previewItem?.type === "video" ? (
                <video
                  src={previewItem.url}
                  controls
                  className="max-w-full mx-auto max-h-[50vh]"
                  poster="/placeholder.svg?height=400&width=600"
                >
                  Your browser does not support the video tag.
                </video>
              ) : previewItem?.type === "audio" ? (
                <div className="bg-gray-100 p-6 rounded-lg text-center">
                  <Music className="h-16 w-16 text-rose-600 mx-auto mb-4" />
                  <audio src={previewItem.url} controls className="w-full">
                    Your browser does not support the audio tag.
                  </audio>
                </div>
              ) : (
                <div className="bg-gray-100 p-6 rounded-lg text-center">
                  <FileText className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                  <p className="mb-4">Document Preview</p>
                  <Button
                    as="a"
                    href={previewItem?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Document
                  </Button>
                </div>
              )}

              <div className="mt-6 space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-700">Description</h4>
                  <p className="text-gray-600">{previewItem?.description || "No description provided."}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700">File Name</h4>
                    <p className="text-gray-600 break-all">{previewItem?.filename}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700">Upload Date</h4>
                    <p className="text-gray-600">
                      {previewItem?.uploadedAt ? formatDate(previewItem.uploadedAt) : "Unknown"}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700">Category</h4>
                    <p className="text-gray-600">{previewItem?.category || "General"}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700">File Size</h4>
                    <p className="text-gray-600">{previewItem?.size ? formatFileSize(previewItem.size) : "Unknown"}</p>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter className="flex justify-between items-center">
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => openEditModal(previewItem)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => {
                    setIsPreviewOpen(false)
                    openDeleteModal(previewItem)
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
              <Button variant="default" onClick={() => setIsPreviewOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Media Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Media</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Enter media title"
                />
              </div>
              <div>
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Enter media description"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="edit-category">Category</Label>
                <Select value={editCategory} onValueChange={setEditCategory}>
                  <SelectTrigger id="edit-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="events">Events</SelectItem>
                    <SelectItem value="programs">Programs</SelectItem>
                    <SelectItem value="testimonials">Testimonials</SelectItem>
                    <SelectItem value="gallery">Gallery</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateMedia}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Modal */}
        <AlertDialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the media item.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => itemToDelete && handleDeleteMedia(itemToDelete.id)}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AdminGuard>
  )
}
