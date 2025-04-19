"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { User, Edit, Upload, Calendar, MessageSquare, FileText, MoreHorizontal, Trash, Eye, Clock, Heart, Share2, ChevronDown, X } from 'lucide-react'

export default function ProfilePage() {
  const [mounted, setMounted] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [profileImage, setProfileImage] = useState("/placeholder.svg?height=200&width=200&text=Profile")
  const [userName, setUserName] = useState("Dr. Sarah Johnson")
  const [userRole, setUserRole] = useState("Professor of Computer Science")
  const [userBio, setUserBio] = useState(
    "I'm a professor specializing in artificial intelligence and machine learning. I write about the latest developments in AI, ethical considerations, and the future of technology. Join me as we explore the fascinating world of intelligent systems.",
  )
  const [activeTab, setActiveTab] = useState("published")

  // Form state for edit profile dialog
  const [formName, setFormName] = useState(userName)
  const [formRole, setFormRole] = useState(userRole)
  const [formBio, setFormBio] = useState(userBio)
  const [formImage, setFormImage] = useState(profileImage)
  const [isUploading, setIsUploading] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(null)

  // Sample data for user activity
  const publishedBlogs = [
    {
      id: 1,
      title: "The Future of Artificial Intelligence in Healthcare",
      excerpt: "Exploring how AI is transforming medical diagnosis and treatment planning...",
      coverImage: "/placeholder.svg?height=200&width=300&text=AI+Healthcare",
      date: "March 15, 2023",
      readTime: "8 min read",
      likes: 124,
      comments: 32,
    },
    {
      id: 2,
      title: "Understanding Neural Networks: A Beginner's Guide",
      excerpt: "Breaking down the complex concepts of neural networks into simple terms...",
      coverImage: "/placeholder.svg?height=200&width=300&text=Neural+Networks",
      date: "February 28, 2023",
      readTime: "12 min read",
      likes: 98,
      comments: 24,
    },
    {
      id: 3,
      title: "Ethical Considerations in Machine Learning",
      excerpt: "Discussing the moral implications of automated decision-making systems...",
      coverImage: "/placeholder.svg?height=200&width=300&text=Ethics+in+ML",
      date: "January 10, 2023",
      readTime: "10 min read",
      likes: 156,
      comments: 47,
    },
    {
      id: 4,
      title: "The Role of Big Data in Modern Research",
      excerpt: "How massive datasets are changing the landscape of scientific inquiry...",
      coverImage: "/placeholder.svg?height=200&width=300&text=Big+Data",
      date: "December 5, 2022",
      readTime: "7 min read",
      likes: 87,
      comments: 19,
    },
  ]

  const drafts = [
    {
      id: 101,
      title: "Quantum Computing: The Next Frontier",
      lastEdited: "2 days ago",
      completionStatus: "70%",
    },
    {
      id: 102,
      title: "Explainable AI: Making Black Box Models Transparent",
      lastEdited: "1 week ago",
      completionStatus: "45%",
    },
    {
      id: 103,
      title: "The Intersection of AI and Cognitive Psychology",
      lastEdited: "3 weeks ago",
      completionStatus: "90%",
    },
  ]

  const userComments = [
    {
      id: 201,
      blogTitle: "The Evolution of Programming Languages",
      blogId: 42,
      comment:
        "This is a fantastic overview of how programming paradigms have shifted over time. I'd add that functional programming concepts are increasingly being incorporated into traditionally object-oriented languages.",
      date: "April 2, 2023",
      likes: 12,
    },
    {
      id: 202,
      blogTitle: "Cybersecurity Best Practices for Remote Work",
      blogId: 38,
      comment:
        "Great article! I would also recommend using a password manager to generate and store strong, unique passwords for each service.",
      date: "March 27, 2023",
      likes: 8,
    },
    {
      id: 203,
      blogTitle: "The Impact of Cloud Computing on Business Operations",
      blogId: 35,
      comment:
        "The cost analysis section is particularly insightful. Many organizations underestimate the long-term savings of cloud migration because they focus too much on the initial investment.",
      date: "March 15, 2023",
      likes: 15,
    },
  ]

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleProfileUpdate = () => {
    // In a real app, this would send data to an API
    setUserName(formName)
    setUserRole(formRole)
    setUserBio(formBio)
    setProfileImage(formImage)
    setEditDialogOpen(false)

    // Custom toast notification
    showToast("Profile updated", "Your profile information has been successfully updated.")
  }

  const handleImageUpload = (e: { target: { files: any[] } }) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsUploading(true)

      // Simulate upload delay
      setTimeout(() => {
        // In a real app, this would upload to a server and get a URL back
        // For now, we'll use a placeholder with the file name
        setFormImage(`/placeholder.svg?height=200&width=200&text=${file.name.split(".")[0]}`)
        setIsUploading(false)

        // Custom toast notification
        showToast("Image uploaded", "Your profile image has been uploaded successfully.")
      }, 1500)
    }
  }

  const handleDeleteDraft = (draftId: number) => {
    // In a real app, this would delete the draft via API
    showToast("Draft deleted", "Your draft has been permanently deleted.", true)
  }

  // Custom toast implementation
  const [toast, setToast] = useState({ visible: false, title: "", message: "", isError: false })
  
  const showToast = (title: string, message: string, isError = false) => {
    setToast({ visible: true, title, message, isError })
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }))
    }, 3000)
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-white dark:bg-[#1A1A1A] text-gray-900 dark:text-gray-100">
      {/* Profile Header */}
      <section className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            {/* Profile Image with Upload Option */}
            <div className="relative mb-6 group">
              <div className="relative h-32 w-32 md:h-40 md:w-40 rounded-full overflow-hidden border-4 border-white dark:border-gray-800">
                <Image src={profileImage || "/placeholder.svg"} alt={userName} fill className="object-cover" />
              </div>
              <label
                htmlFor="profile-upload"
                className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full cursor-pointer shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Upload className="h-4 w-4" />
                <span className="sr-only">Upload profile picture</span>
              </label>
              <input id="profile-upload" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </div>

            {/* User Name and Role */}
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{userName}</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{userRole}</p>

            {/* Profile Stats */}
            <div className="flex space-x-6 mb-6">
              <div className="flex flex-col items-center">
                <span className="font-bold text-xl">{publishedBlogs.length}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">Posts</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-bold text-xl">{drafts.length}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">Drafts</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-bold text-xl">{userComments.length}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">Comments</span>
              </div>
            </div>

            {/* Edit Profile Button */}
            <button 
              onClick={() => setEditDialogOpen(true)} 
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors"
            >
              <Edit className="h-4 w-4" />
              Edit Profile
            </button>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-8 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-bold mb-4">About Me</h2>
            <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">{userBio}</p>
          </div>
        </div>
      </section>

      {/* User Activity Tabs */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Custom Tabs */}
            <div className="flex border-b border-gray-200 dark:border-gray-700 mb-8">
              <button
                onClick={() => setActiveTab("published")}
                className={`flex items-center gap-2 px-4 py-2 font-medium ${
                  activeTab === "published"
                    ? "text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                <FileText className="h-4 w-4" />
                Published
              </button>
              <button
                onClick={() => setActiveTab("drafts")}
                className={`flex items-center gap-2 px-4 py-2 font-medium ${
                  activeTab === "drafts"
                    ? "text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                <FileText className="h-4 w-4" />
                Drafts
              </button>
              <button
                onClick={() => setActiveTab("comments")}
                className={`flex items-center gap-2 px-4 py-2 font-medium ${
                  activeTab === "comments"
                    ? "text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                <MessageSquare className="h-4 w-4" />
                Comments
              </button>
            </div>

            {/* Published Blogs Tab */}
            {activeTab === "published" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Published Blogs</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {publishedBlogs.map((blog) => (
                    <div 
                      key={blog.id} 
                      className="overflow-hidden rounded-lg border border-gray-200 dark:border-[#333333] hover:shadow-md transition-shadow bg-white dark:bg-[#0a0a0a]"
                    >
                      <div className="relative h-48 w-full">
                        <Image
                          src={blog.coverImage || "/placeholder.svg"}
                          alt={blog.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg line-clamp-2 mb-1">
                          <Link href={`/blog/${blog.id}`} className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                            {blog.title}
                          </Link>
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                          <Calendar className="h-3 w-3" />
                          {blog.date}
                          <span className="mx-1">•</span>
                          <Clock className="h-3 w-3" />
                          {blog.readTime}
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">{blog.excerpt}</p>
                        <div className="flex justify-between">
                          <div className="flex space-x-4">
                            <span className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <Heart className="h-4 w-4 mr-1" />
                              {blog.likes}
                            </span>
                            <span className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              {blog.comments}
                            </span>
                          </div>
                          <div className="flex space-x-2">
                            <Link 
                              href={`/blog/${blog.id}`}
                              className="flex items-center text-sm text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Link>
                            <button className="flex items-center text-sm text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">
                              <Share2 className="h-4 w-4 mr-1" />
                              Share
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Drafts Tab */}
            {activeTab === "drafts" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Drafts</h2>
                  <Link 
                    href="/write"
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors"
                  >
                    <FileText className="h-4 w-4" />
                    New Draft
                  </Link>
                </div>
                <div className="space-y-4">
                  {drafts.map((draft) => (
                    <div 
                      key={draft.id} 
                      className="rounded-lg border border-gray-200 dark:border-[#333333] hover:shadow-md transition-shadow bg-white dark:bg-[#0a0a0a]"
                    >
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-lg line-clamp-1">{draft.title}</h3>
                          <div className="relative">
                            <button 
                              onClick={() => setDropdownOpen(dropdownOpen === draft.id ? null : draft.id)}
                              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </button>
                            {dropdownOpen === draft.id && (
                              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-10">
                                <div className="py-1">
                                  <Link 
                                    href={`/write?draft=${draft.id}`}
                                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                  >
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                  </Link>
                                  <button 
                                    onClick={() => {
                                      handleDeleteDraft(draft.id);
                                      setDropdownOpen(null);
                                    }}
                                    className="flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                                  >
                                    <Trash className="h-4 w-4 mr-2" />
                                    Delete
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                          <Clock className="h-3 w-3" />
                          Last edited {draft.lastEdited}
                        </div>
                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Completion</span>
                            <span className="text-sm font-medium">{draft.completionStatus}</span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-purple-600 dark:bg-purple-500 rounded-full" 
                              style={{ width: draft.completionStatus }}
                            ></div>
                          </div>
                        </div>
                        <Link 
                          href={`/write?draft=${draft.id}`}
                          className="block w-full py-2 px-4 text-center border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          Continue Writing
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Comments Tab */}
            {activeTab === "comments" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Your Comments</h2>
                <div className="space-y-6">
                  {userComments.map((comment) => (
                    <div 
                      key={comment.id} 
                      className="rounded-lg border border-gray-200 dark:border-[#333333] hover:shadow-md transition-shadow bg-white dark:bg-[#0a0a0a] p-4"
                    >
                      <h3 className="text-base font-medium mb-1">
                        On:{" "}
                        <Link href={`/blog/${comment.blogId}`} className="text-purple-600 dark:text-purple-400 hover:underline">
                          {comment.blogTitle}
                        </Link>
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                        <Calendar className="h-3 w-3" />
                        {comment.date}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{comment.comment}</p>
                      <div className="flex justify-between">
                        <span className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Heart className="h-4 w-4 mr-1" />
                          {comment.likes} likes
                        </span>
                        <Link 
                          href={`/blog/${comment.blogId}#comment-${comment.id}`}
                          className="flex items-center text-sm text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Custom Edit Profile Dialog */}
      {editDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
              <div>
                <h2 className="text-xl font-bold">Edit Profile</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Make changes to your profile information here. Click save when you're done.
                </p>
              </div>
              <button 
                onClick={() => setEditDialogOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                    <Image 
                      src={formImage || "/placeholder.svg"} 
                      alt={formName} 
                      width={96} 
                      height={96} 
                      className="object-cover h-full w-full"
                    />
                  </div>
                  <label
                    htmlFor="avatar-upload"
                    className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full cursor-pointer shadow-md"
                  >
                    <Upload className="h-4 w-4" />
                    <span className="sr-only">Upload avatar</span>
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                  />
                  {isUploading && (
                    <div className="absolute inset-0 bg-white/80 dark:bg-gray-800/80 rounded-full flex items-center justify-center">
                      <svg
                        className="animate-spin h-6 w-6 text-purple-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Name
                  </label>
                  <input 
                    id="name" 
                    type="text"
                    value={formName} 
                    onChange={(e) => setFormName(e.target.value)} 
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label htmlFor="role" className="block text-sm font-medium mb-1">
                    Role
                  </label>
                  <input 
                    id="role" 
                    type="text"
                    value={formRole} 
                    onChange={(e) => setFormRole(e.target.value)} 
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium mb-1">
                    Bio
                  </label>
                  <textarea 
                    id="bio" 
                    value={formBio} 
                    onChange={(e) => setFormBio(e.target.value)} 
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 p-4 border-t border-gray-200 dark:border-gray-700">
              <button 
                onClick={() => setEditDialogOpen(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleProfileUpdate}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Toast Notification */}
      {toast.visible && (
        <div className={`fixed bottom-4 right-4 max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border ${
          toast.isError ? 'border-red-500' : 'border-green-500'
        } overflow-hidden transition-all transform translate-y-0 opacity-100 z-50`}>
          <div className="p-4">
            <div className="flex items-start">
              <div className="flex-1">
                <h3 className="font-medium">{toast.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{toast.message}</p>
              </div>
              <button 
                onClick={() => setToast(prev => ({ ...prev, visible: false }))}
                className="ml-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="h-1 bg-gray-200 dark:bg-gray-700 w-full">
            <div 
              className={`h-full ${toast.isError ? 'bg-red-500' : 'bg-green-500'} animate-shrink`}
              style={{ animationDuration: '3s' }}
            ></div>
          </div>
        </div>
      )}
    </div>
  )
}
