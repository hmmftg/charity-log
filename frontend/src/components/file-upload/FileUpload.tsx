import React, { useState, useRef } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid2,
  Chip,
  Avatar,
  useTheme,
  useMediaQuery,
  Alert,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import {
  CloudUpload as UploadIcon,
  Image as ImageIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  AttachFile as FileIcon,
  CheckCircle as CheckIcon,
  Error as ErrorIcon,
} from "@mui/icons-material";

interface FileUploadProps {
  onFilesUploaded?: (files: File[]) => void;
  maxFiles?: number;
  maxFileSize?: number; // in MB
  acceptedTypes?: string[];
  title?: string;
  description?: string;
}

interface UploadedFile {
  id: string;
  file: File;
  preview?: string;
  status: 'uploading' | 'success' | 'error';
  progress: number;
  error?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFilesUploaded,
  maxFiles = 5,
  maxFileSize = 10, // 10MB default
  acceptedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
  title = "Upload Medical Files",
  description = "Upload medical images, documents, or reports",
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [previewFile, setPreviewFile] = useState<UploadedFile | null>(null);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newFiles: UploadedFile[] = [];
    
    Array.from(files).forEach((file) => {
      // Validate file type
      if (!acceptedTypes.includes(file.type)) {
        newFiles.push({
          id: Math.random().toString(36).substr(2, 9),
          file,
          status: 'error',
          progress: 0,
          error: `File type ${file.type} is not supported`,
        });
        return;
      }

      // Validate file size
      if (file.size > maxFileSize * 1024 * 1024) {
        newFiles.push({
          id: Math.random().toString(36).substr(2, 9),
          file,
          status: 'error',
          progress: 0,
          error: `File size exceeds ${maxFileSize}MB limit`,
        });
        return;
      }

      // Validate max files
      if (uploadedFiles.length + newFiles.length >= maxFiles) {
        newFiles.push({
          id: Math.random().toString(36).substr(2, 9),
          file,
          status: 'error',
          progress: 0,
          error: `Maximum ${maxFiles} files allowed`,
        });
        return;
      }

      // Create preview for images
      let preview: string | undefined;
      if (file.type.startsWith('image/')) {
        preview = URL.createObjectURL(file);
      }

      newFiles.push({
        id: Math.random().toString(36).substr(2, 9),
        file,
        preview,
        status: 'uploading',
        progress: 0,
      });
    });

    setUploadedFiles(prev => [...prev, ...newFiles]);

    // Simulate upload progress
    newFiles.forEach((uploadFile) => {
      if (uploadFile.status === 'uploading') {
        simulateUpload(uploadFile.id);
      }
    });

    onFilesUploaded?.(Array.from(files));
  };

  const simulateUpload = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        setUploadedFiles(prev => 
          prev.map(file => 
            file.id === fileId 
              ? { ...file, status: 'success', progress: 100 }
              : file
          )
        );
      } else {
        setUploadedFiles(prev => 
          prev.map(file => 
            file.id === fileId 
              ? { ...file, progress }
              : file
          )
        );
      }
    }, 200);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files);
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => {
      const fileToRemove = prev.find(f => f.id === fileId);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter(f => f.id !== fileId);
    });
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <ImageIcon />;
    }
    return <FileIcon />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'success';
      case 'error': return 'error';
      case 'uploading': return 'primary';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckIcon />;
      case 'error': return <ErrorIcon />;
      case 'uploading': return <UploadIcon />;
      default: return <FileIcon />;
    }
  };

  return (
    <Box sx={{ p: isMobile ? 2 : 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
          {description}
        </Typography>
      </Box>

      {/* Upload Area */}
      <Card
        sx={{
          mb: 3,
          border: `2px dashed ${isDragOver ? theme.palette.primary.main : theme.palette.divider}`,
          backgroundColor: isDragOver ? theme.palette.primary.light + '20' : 'transparent',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <CardContent sx={{ textAlign: 'center', py: 4 }}>
          <Avatar
            sx={{
              width: 64,
              height: 64,
              bgcolor: theme.palette.primary.main,
              mx: 'auto',
              mb: 2,
            }}
          >
            <UploadIcon sx={{ fontSize: 32 }} />
          </Avatar>
          
          <Typography variant="h6" sx={{ mb: 1 }}>
            {isDragOver ? 'Drop files here' : 'Click to upload or drag and drop'}
          </Typography>
          
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 2 }}>
            Supported formats: {acceptedTypes.join(', ')}
          </Typography>
          
          <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
            Maximum {maxFiles} files, {maxFileSize}MB each
          </Typography>
        </CardContent>
      </Card>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={acceptedTypes.join(',')}
        onChange={handleFileInputChange}
        style={{ display: 'none' }}
      />

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Uploaded Files ({uploadedFiles.length})
            </Typography>
            
            <List>
              {uploadedFiles.map((uploadedFile) => (
                <ListItem key={uploadedFile.id} sx={{ px: 0 }}>
                  <Avatar sx={{ mr: 2, bgcolor: theme.palette.grey[200] }}>
                    {uploadedFile.file.type.startsWith('image/') && uploadedFile.preview ? (
                      <img
                        src={uploadedFile.preview}
                        alt="Preview"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      getFileIcon(uploadedFile.file)
                    )}
                  </Avatar>
                  
                  <ListItemText
                    primary={uploadedFile.file.name}
                    secondary={
                      <Box>
                        <Typography variant="caption" sx={{ display: 'block' }}>
                          {formatFileSize(uploadedFile.file.size)}
                        </Typography>
                        
                        {uploadedFile.status === 'uploading' && (
                          <LinearProgress
                            variant="determinate"
                            value={uploadedFile.progress}
                            sx={{ mt: 1 }}
                          />
                        )}
                        
                        {uploadedFile.error && (
                          <Alert severity="error" sx={{ mt: 1 }}>
                            {uploadedFile.error}
                          </Alert>
                        )}
                      </Box>
                    }
                  />
                  
                  <ListItemSecondaryAction>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {uploadedFile.file.type.startsWith('image/') && uploadedFile.preview && (
                        <IconButton
                          size="small"
                          onClick={() => setPreviewFile(uploadedFile)}
                        >
                          <ViewIcon />
                        </IconButton>
                      )}
                      
                      <Chip
                        icon={getStatusIcon(uploadedFile.status)}
                        label={uploadedFile.status}
                        size="small"
                        color={getStatusColor(uploadedFile.status) as any}
                      />
                      
                      <IconButton
                        size="small"
                        onClick={() => removeFile(uploadedFile.id)}
                        sx={{ color: theme.palette.error.main }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      )}

      {/* Image Preview Dialog */}
      <Dialog
        open={!!previewFile}
        onClose={() => setPreviewFile(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {previewFile?.file.name}
        </DialogTitle>
        <DialogContent>
          {previewFile?.preview && (
            <img
              src={previewFile.preview}
              alt="Preview"
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '70vh',
                objectFit: 'contain',
              }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewFile(null)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
