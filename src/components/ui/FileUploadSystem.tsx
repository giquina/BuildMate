'use client'

import React, { useState, useCallback, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { 
  Upload, 
  Camera, 
  FileText, 
  Image as ImageIcon, 
  File, 
  X, 
  Check, 
  AlertCircle,
  MapPin,
  Calendar,
  Tag,
  Eye,
  Download,
  Archive,
  Star,
  Share2,
  Edit3,
  Trash2,
  Filter,
  Search,
  Grid,
  List,
  SortAsc,
  SortDesc,
  MoreHorizontal,
  FolderOpen,
  CloudRain,
  Sun,
  Thermometer,
  Wind,
  Droplets,
  ShieldCheck,
  Award,
  Building,
  Hammer,
  Users,
  Clock,
  Zap
} from 'lucide-react'
import type { 
  ProjectFile, 
  FileCategory, 
  ConstructionPhase, 
  FileMetadata 
} from '@/types/project-management'

interface FileUploadSystemProps {
  projectId: string
  onFilesUploaded?: (files: ProjectFile[]) => void
  currentPhase?: ConstructionPhase
  allowedCategories?: FileCategory[]
  maxFileSize?: number // in MB
  maxFiles?: number
}

interface FileUploadProgress {
  fileId: string
  fileName: string
  progress: number
  status: 'uploading' | 'processing' | 'completed' | 'error'
  error?: string
}

interface FileFilter {
  category?: FileCategory
  phase?: ConstructionPhase
  dateRange?: {
    start: Date
    end: Date
  }
  searchTerm?: string
  uploadedBy?: string
}

const FILE_CATEGORY_CONFIG = {
  progress_photos: {
    icon: Camera,
    label: 'Progress Photos',
    color: 'bg-blue-100 text-blue-800',
    acceptedTypes: ['image/jpeg', 'image/png', 'image/webp'],
    maxSize: 50, // MB
    requiresGPS: true,
    autoTag: true
  },
  planning_documents: {
    icon: Building,
    label: 'Planning Documents',
    color: 'bg-purple-100 text-purple-800',
    acceptedTypes: ['application/pdf', 'image/jpeg', 'image/png'],
    maxSize: 100,
    requiresGPS: false,
    autoTag: false
  },
  building_control: {
    icon: ShieldCheck,
    label: 'Building Control',
    color: 'bg-green-100 text-green-800',
    acceptedTypes: ['application/pdf', 'image/jpeg', 'image/png'],
    maxSize: 50,
    requiresGPS: false,
    autoTag: false
  },
  design_documents: {
    icon: FileText,
    label: 'Design Documents',
    color: 'bg-indigo-100 text-indigo-800',
    acceptedTypes: ['application/pdf', 'image/jpeg', 'image/png', 'application/dwg'],
    maxSize: 200,
    requiresGPS: false,
    autoTag: false
  },
  certificates: {
    icon: Award,
    label: 'Certificates',
    color: 'bg-yellow-100 text-yellow-800',
    acceptedTypes: ['application/pdf', 'image/jpeg', 'image/png'],
    maxSize: 25,
    requiresGPS: false,
    autoTag: false
  },
  invoices_receipts: {
    icon: FileText,
    label: 'Invoices & Receipts',
    color: 'bg-orange-100 text-orange-800',
    acceptedTypes: ['application/pdf', 'image/jpeg', 'image/png'],
    maxSize: 25,
    requiresGPS: false,
    autoTag: true
  },
  correspondence: {
    icon: FileText,
    label: 'Correspondence',
    color: 'bg-gray-100 text-gray-800',
    acceptedTypes: ['application/pdf', 'text/plain', 'application/msword'],
    maxSize: 25,
    requiresGPS: false,
    autoTag: false
  },
  health_safety: {
    icon: ShieldCheck,
    label: 'Health & Safety',
    color: 'bg-red-100 text-red-800',
    acceptedTypes: ['application/pdf', 'image/jpeg', 'image/png'],
    maxSize: 50,
    requiresGPS: false,
    autoTag: false
  },
  specifications: {
    icon: FileText,
    label: 'Specifications',
    color: 'bg-teal-100 text-teal-800',
    acceptedTypes: ['application/pdf', 'image/jpeg', 'image/png', 'text/plain'],
    maxSize: 100,
    requiresGPS: false,
    autoTag: true
  },
  contracts: {
    icon: FileText,
    label: 'Contracts',
    color: 'bg-pink-100 text-pink-800',
    acceptedTypes: ['application/pdf'],
    maxSize: 50,
    requiresGPS: false,
    autoTag: false
  },
  other: {
    icon: File,
    label: 'Other',
    color: 'bg-gray-100 text-gray-800',
    acceptedTypes: ['*/*'],
    maxSize: 100,
    requiresGPS: false,
    autoTag: false
  }
}

const CONSTRUCTION_PHASES = [
  { value: 'pre_planning', label: 'Pre-Planning' },
  { value: 'planning_permission', label: 'Planning Permission' },
  { value: 'building_regulations', label: 'Building Regulations' },
  { value: 'pre_construction', label: 'Pre-Construction' },
  { value: 'foundations', label: 'Foundations' },
  { value: 'structure', label: 'Structure' },
  { value: 'roof', label: 'Roof' },
  { value: 'external_envelope', label: 'External Envelope' },
  { value: 'first_fix', label: 'First Fix' },
  { value: 'insulation_plastering', label: 'Insulation & Plastering' },
  { value: 'second_fix', label: 'Second Fix' },
  { value: 'internal_finishes', label: 'Internal Finishes' },
  { value: 'external_works', label: 'External Works' },
  { value: 'completion', label: 'Completion' },
  { value: 'maintenance', label: 'Maintenance' }
]

// Mock current location and weather for GPS/metadata
const getCurrentLocation = (): Promise<{ latitude: number; longitude: number; accuracy: number }> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy || 10
          })
        },
        () => {
          // Fallback to mock Surrey Hills location
          resolve({
            latitude: 51.2978,
            longitude: -0.3370,
            accuracy: 100
          })
        }
      )
    } else {
      resolve({
        latitude: 51.2978,
        longitude: -0.3370,
        accuracy: 100
      })
    }
  })
}

const getCurrentWeather = async (): Promise<any> => {
  // Mock weather data - in production this would call a weather API
  return {
    condition: 'sunny',
    temperature: 22,
    humidity: 65,
    windSpeed: 8
  }
}

export default function FileUploadSystem({
  projectId,
  onFilesUploaded,
  currentPhase = 'foundations',
  allowedCategories,
  maxFileSize = 100,
  maxFiles = 10
}: FileUploadSystemProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [uploadProgress, setUploadProgress] = useState<FileUploadProgress[]>([])
  const [selectedCategory, setSelectedCategory] = useState<FileCategory>('progress_photos')
  const [selectedPhase, setSelectedPhase] = useState<ConstructionPhase>(currentPhase)
  const [uploadedFiles, setUploadedFiles] = useState<ProjectFile[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filter, setFilter] = useState<FileFilter>({})
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'size'>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [selectedFileIds, setSelectedFileIds] = useState<string[]>([])
  const [showBulkActions, setShowBulkActions] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  const availableCategories = allowedCategories || Object.keys(FILE_CATEGORY_CONFIG) as FileCategory[]

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    handleFileSelection(files)
  }, [])

  const handleFileSelection = useCallback((files: File[]) => {
    const categoryConfig = FILE_CATEGORY_CONFIG[selectedCategory]
    const validFiles = files.filter((file) => {
      // Check file type
      if (categoryConfig.acceptedTypes[0] !== '*/*' && 
          !categoryConfig.acceptedTypes.includes(file.type)) {
        console.warn(`File ${file.name} has invalid type ${file.type}`)
        return false
      }
      
      // Check file size
      if (file.size > categoryConfig.maxSize * 1024 * 1024) {
        console.warn(`File ${file.name} exceeds max size of ${categoryConfig.maxSize}MB`)
        return false
      }
      
      return true
    })

    if (validFiles.length + selectedFiles.length > maxFiles) {
      console.warn(`Cannot select more than ${maxFiles} files`)
      return
    }

    setSelectedFiles(prev => [...prev, ...validFiles])
  }, [selectedCategory, selectedFiles.length, maxFiles])

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFileSelection(Array.from(e.target.files))
    }
  }, [handleFileSelection])

  const handleCameraCapture = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFileSelection(Array.from(e.target.files))
    }
  }, [handleFileSelection])

  const removeSelectedFile = useCallback((index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
  }, [])

  const handleUpload = useCallback(async () => {
    if (selectedFiles.length === 0) return

    setIsUploading(true)
    const categoryConfig = FILE_CATEGORY_CONFIG[selectedCategory]
    
    // Initialize progress tracking
    const progressItems: FileUploadProgress[] = selectedFiles.map((file, index) => ({
      fileId: `upload_${Date.now()}_${index}`,
      fileName: file.name,
      progress: 0,
      status: 'uploading'
    }))
    setUploadProgress(progressItems)

    const newFiles: ProjectFile[] = []

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i]
      const progressItem = progressItems[i]

      try {
        // Simulate upload progress
        const updateProgress = (progress: number) => {
          setUploadProgress(prev => 
            prev.map(item => 
              item.fileId === progressItem.fileId 
                ? { ...item, progress }
                : item
            )
          )
        }

        // Simulate upload with progress updates
        for (let progress = 0; progress <= 90; progress += 10) {
          updateProgress(progress)
          await new Promise(resolve => setTimeout(resolve, 100))
        }

        // Get metadata based on category requirements
        let metadata: FileMetadata = {
          version: 1,
          isLatestVersion: true
        }

        if (categoryConfig.requiresGPS) {
          try {
            const location = await getCurrentLocation()
            const weather = await getCurrentWeather()
            metadata.gpsLocation = location
            metadata.weather = weather
          } catch (error) {
            console.warn('Could not get location/weather data:', error)
          }
        }

        // Auto-generate tags based on category and file content
        let tags: string[] = []
        if (categoryConfig.autoTag) {
          tags = [
            selectedCategory.replace('_', ' '),
            selectedPhase.replace('_', ' '),
            new Date().toISOString().split('T')[0] // date tag
          ]

          // Add weather-based tags for progress photos
          if (selectedCategory === 'progress_photos' && metadata.weather) {
            tags.push(metadata.weather.condition)
            if (metadata.weather.temperature > 25) tags.push('hot weather')
            if (metadata.weather.temperature < 5) tags.push('cold weather')
          }
        }

        // Create ProjectFile object
        const projectFile: ProjectFile = {
          id: `file_${Date.now()}_${i}`,
          projectId,
          uploadedBy: 'current_user', // Would be actual user ID
          fileName: `${Date.now()}-${file.name}`,
          originalName: file.name,
          fileSize: file.size,
          mimeType: file.type,
          category: selectedCategory,
          phase: selectedPhase,
          description: '',
          tags,
          url: URL.createObjectURL(file), // Mock URL - would be cloud storage URL
          thumbnailUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
          isPublic: selectedCategory === 'progress_photos', // Progress photos are public by default
          metadata,
          createdAt: new Date(),
          updatedAt: new Date()
        }

        newFiles.push(projectFile)

        // Final progress update
        updateProgress(100)
        setUploadProgress(prev => 
          prev.map(item => 
            item.fileId === progressItem.fileId 
              ? { ...item, status: 'completed' }
              : item
          )
        )

      } catch (error) {
        console.error('Upload failed for file:', file.name, error)
        setUploadProgress(prev => 
          prev.map(item => 
            item.fileId === progressItem.fileId 
              ? { ...item, status: 'error', error: 'Upload failed' }
              : item
          )
        )
      }
    }

    // Add to uploaded files list
    setUploadedFiles(prev => [...prev, ...newFiles])
    
    // Clear selected files
    setSelectedFiles([])
    
    // Callback to parent
    if (onFilesUploaded) {
      onFilesUploaded(newFiles)
    }

    // Clear progress after delay
    setTimeout(() => {
      setUploadProgress([])
      setIsUploading(false)
    }, 2000)

  }, [selectedFiles, selectedCategory, selectedPhase, projectId, onFilesUploaded])

  const filteredFiles = uploadedFiles.filter(file => {
    if (filter.category && file.category !== filter.category) return false
    if (filter.phase && file.phase !== filter.phase) return false
    if (filter.searchTerm && !file.originalName.toLowerCase().includes(filter.searchTerm.toLowerCase())) return false
    if (filter.dateRange) {
      const fileDate = new Date(file.createdAt)
      if (fileDate < filter.dateRange.start || fileDate > filter.dateRange.end) return false
    }
    return true
  })

  const sortedFiles = [...filteredFiles].sort((a, b) => {
    let comparison = 0
    switch (sortBy) {
      case 'name':
        comparison = a.originalName.localeCompare(b.originalName)
        break
      case 'size':
        comparison = a.fileSize - b.fileSize
        break
      case 'date':
      default:
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        break
    }
    return sortOrder === 'asc' ? comparison : -comparison
  })

  const handleFileSelection = useCallback((fileId: string) => {
    setSelectedFileIds(prev => {
      const newSelection = prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
      setShowBulkActions(newSelection.length > 0)
      return newSelection
    })
  }, [])

  const handleBulkAction = useCallback((action: 'download' | 'archive' | 'delete') => {
    console.log(`Bulk ${action} for files:`, selectedFileIds)
    // Implement bulk actions
    setSelectedFileIds([])
    setShowBulkActions(false)
  }, [selectedFileIds])

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = (file: ProjectFile) => {
    if (file.mimeType.startsWith('image/')) return ImageIcon
    if (file.mimeType === 'application/pdf') return FileText
    return File
  }

  const categoryConfig = FILE_CATEGORY_CONFIG[selectedCategory]
  const CategoryIcon = categoryConfig.icon

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="h-5 w-5" />
            <span>Upload Files</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                File Category
              </label>
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as FileCategory)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                {availableCategories.map((category) => (
                  <option key={category} value={category}>
                    {FILE_CATEGORY_CONFIG[category].label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Construction Phase
              </label>
              <select 
                value={selectedPhase}
                onChange={(e) => setSelectedPhase(e.target.value as ConstructionPhase)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                {CONSTRUCTION_PHASES.map((phase) => (
                  <option key={phase.value} value={phase.value}>
                    {phase.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-4">
            <div className={`px-3 py-2 rounded-lg text-sm ${categoryConfig.color} inline-flex items-center space-x-2`}>
              <CategoryIcon className="h-4 w-4" />
              <span>{categoryConfig.label}</span>
              <span>•</span>
              <span>Max {categoryConfig.maxSize}MB</span>
              <span>•</span>
              <span>{categoryConfig.acceptedTypes[0] === '*/*' ? 'All files' : categoryConfig.acceptedTypes.join(', ')}</span>
            </div>
          </div>

          {/* Drag and Drop Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragOver
                ? 'border-blue-400 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="space-y-4">
              <div className="flex justify-center space-x-4">
                <Upload className="h-8 w-8 text-gray-400" />
                {selectedCategory === 'progress_photos' && (
                  <Camera className="h-8 w-8 text-blue-500" />
                )}
              </div>
              <div>
                <p className="text-lg font-medium text-gray-700">
                  Drop files here or click to select
                </p>
                <p className="text-sm text-gray-500">
                  Supports {categoryConfig.acceptedTypes[0] === '*/*' ? 'all file types' : categoryConfig.acceptedTypes.join(', ')}
                </p>
              </div>
              <div className="flex justify-center space-x-3">
                <Button 
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Select Files
                </Button>
                {selectedCategory === 'progress_photos' && (
                  <Button 
                    variant="outline"
                    onClick={() => cameraInputRef.current?.click()}
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Take Photo
                  </Button>
                )}
              </div>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={categoryConfig.acceptedTypes.join(',')}
            onChange={handleFileInputChange}
            className="hidden"
          />
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleCameraCapture}
            className="hidden"
          />

          {/* Selected Files Preview */}
          {selectedFiles.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Selected Files ({selectedFiles.length})
              </h4>
              <div className="space-y-2">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                        {file.type.startsWith('image/') ? (
                          <ImageIcon className="h-4 w-4 text-blue-600" />
                        ) : (
                          <FileText className="h-4 w-4 text-blue-600" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{file.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => removeSelectedFile(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={handleUpload}
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <Zap className="h-4 w-4 mr-2 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload {selectedFiles.length} File{selectedFiles.length !== 1 ? 's' : ''}
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Upload Progress */}
          {uploadProgress.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Upload Progress</h4>
              <div className="space-y-2">
                {uploadProgress.map((item) => (
                  <div key={item.fileId} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{item.fileName}</span>
                      <div className="flex items-center space-x-2">
                        {item.status === 'completed' && (
                          <Check className="h-4 w-4 text-green-600" />
                        )}
                        {item.status === 'error' && (
                          <AlertCircle className="h-4 w-4 text-red-600" />
                        )}
                        <span className="text-xs text-gray-500">{item.progress}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all ${
                          item.status === 'error' ? 'bg-red-500' :
                          item.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                    {item.error && (
                      <p className="text-xs text-red-600">{item.error}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* File Management Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <FolderOpen className="h-5 w-5" />
              <span>Project Files ({sortedFiles.length})</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              {showBulkActions && (
                <div className="flex items-center space-x-2 mr-4">
                  <span className="text-sm text-gray-600">
                    {selectedFileIds.length} selected
                  </span>
                  <Button variant="outline" size="sm" onClick={() => handleBulkAction('download')}>
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleBulkAction('archive')}>
                    <Archive className="h-3 w-3 mr-1" />
                    Archive
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleBulkAction('delete')}>
                    <Trash2 className="h-3 w-3 mr-1" />
                    Delete
                  </Button>
                </div>
              )}
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              >
                {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters and Search */}
          <div className="grid md:grid-cols-4 gap-4 mb-4">
            <div>
              <input
                type="text"
                placeholder="Search files..."
                value={filter.searchTerm || ''}
                onChange={(e) => setFilter(prev => ({ ...prev, searchTerm: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <select
                value={filter.category || ''}
                onChange={(e) => setFilter(prev => ({ ...prev, category: e.target.value as FileCategory || undefined }))}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">All Categories</option>
                {availableCategories.map((category) => (
                  <option key={category} value={category}>
                    {FILE_CATEGORY_CONFIG[category].label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={filter.phase || ''}
                onChange={(e) => setFilter(prev => ({ ...prev, phase: e.target.value as ConstructionPhase || undefined }))}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">All Phases</option>
                {CONSTRUCTION_PHASES.map((phase) => (
                  <option key={phase.value} value={phase.value}>
                    {phase.label}
                  </option>
                ))}
              </select>
            </div>
            <div>  
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [newSortBy, newSortOrder] = e.target.value.split('-')
                  setSortBy(newSortBy as 'date' | 'name' | 'size')
                  setSortOrder(newSortOrder as 'asc' | 'desc')
                }}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="name-asc">Name A-Z</option>
                <option value="name-desc">Name Z-A</option>
                <option value="size-desc">Largest First</option>
                <option value="size-asc">Smallest First</option>
              </select>
            </div>
          </div>

          {/* Files Display */}
          {sortedFiles.length === 0 ? (
            <div className="text-center py-8">
              <FolderOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No files found</p>
              <p className="text-sm text-gray-500">Upload files to get started</p>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-2'}>
              {sortedFiles.map((file) => {
                const FileIcon = getFileIcon(file)
                const categoryConfig = FILE_CATEGORY_CONFIG[file.category]
                const CategoryIcon = categoryConfig.icon
                const isSelected = selectedFileIds.includes(file.id)

                return viewMode === 'grid' ? (
                  <div 
                    key={file.id} 
                    className={`border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer ${
                      isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                    onClick={() => handleFileSelection(file.id)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <FileIcon className="h-5 w-5 text-gray-600" />
                        <CategoryIcon className="h-4 w-4 text-gray-500" />
                      </div>
                      <div className="flex items-center space-x-1">
                        {file.metadata.gpsLocation && (
                          <MapPin className="h-3 w-3 text-green-600" />
                        )}
                        {file.metadata.weather && (
                          <>
                            {file.metadata.weather.condition === 'sunny' && <Sun className="h-3 w-3 text-yellow-600" />}
                            {file.metadata.weather.condition === 'rainy' && <CloudRain className="h-3 w-3 text-blue-600" />}
                          </>
                        )}
                        <input 
                          type="checkbox" 
                          checked={isSelected}
                          onChange={() => handleFileSelection(file.id)}
                          className="rounded"
                        />
                      </div>
                    </div>
                    
                    {file.thumbnailUrl && (
                      <div className="mb-3">
                        <img 
                          src={file.thumbnailUrl} 
                          alt={file.originalName}
                          className="w-full h-32 object-cover rounded"
                        />
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900 text-sm truncate">
                        {file.originalName}
                      </h4>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{formatFileSize(file.fileSize)}</span>
                        <span>{file.createdAt.toLocaleDateString('en-GB')}</span>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs ${categoryConfig.color}`}>
                        {categoryConfig.label}
                      </div>
                      {file.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {file.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="px-1 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                              {tag}
                            </span>
                          ))}
                          {file.tags.length > 3 && (
                            <span className="text-xs text-gray-500">+{file.tags.length - 3} more</span>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between mt-3 pt-3 border-t">
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                      </div>
                      <Button variant="outline" size="sm">
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div 
                    key={file.id}
                    className={`flex items-center space-x-4 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer ${
                      isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                    onClick={() => handleFileSelection(file.id)}
                  >
                    <input 
                      type="checkbox" 
                      checked={isSelected}
                      onChange={() => handleFileSelection(file.id)}
                      className="rounded"
                    />
                    <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                      <FileIcon className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900">{file.originalName}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{formatFileSize(file.fileSize)}</span>
                          <span>{file.createdAt.toLocaleDateString('en-GB')}</span>
                          <div className={`px-2 py-1 rounded text-xs ${categoryConfig.color}`}>
                            {categoryConfig.label}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <CategoryIcon className="h-3 w-3" />
                          <span>{CONSTRUCTION_PHASES.find(p => p.value === file.phase)?.label}</span>
                          {file.metadata.gpsLocation && (
                            <>
                              <span>•</span>
                              <MapPin className="h-3 w-3 text-green-600" />
                              <span>GPS</span>
                            </>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}