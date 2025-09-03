# Project API Documentation

## Overview
This API provides CRUD operations for managing projects, support files, and approval status in the Astina platform.

## Base URL
`/api/project`

## Endpoints

### 1. Project Management

#### GET /api/project
Fetch projects with pagination and filtering.

**Query Parameters:**
- `page` (number, default: 1): Page number
- `limit` (number, default: 10): Items per page
- `search` (string): Search in title and description
- `instansiId` (number): Filter by institution ID
- `pelatihanId` (number): Filter by training program ID
- `status` (string): Filter by status (draft, submitted, approved, rejected)
- `isApproved` (boolean): Filter by approval status
- `sortBy` (string, default: 'createdAt'): Sort field (title, status, createdAt, updatedAt)
- `sortOrder` (string, default: 'desc'): Sort order (asc, desc)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "userId": 1,
      "instansiId": 1,
      "lemdikId": 1,
      "pelatihanId": 1,
      "title": "Project Title",
      "description": "Project description",
      "nilaiEkonomi": "1000000",
      "mainFileUrl": "https://example.com/file.pdf",
      "status": "draft",
      "isApproved": false,
      "isApprovedByLanri": false,
      "approvedAt": null,
      "approvedByLanriAt": null,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

#### POST /api/project
Create a new project.

**Request Body:**
```json
{
  "userId": 1,
  "instansiId": 1,
  "lemdikId": 1,
  "pelatihanId": 1,
  "title": "New Project Title",
  "description": "Project description",
  "nilaiEkonomi": "1000000",
  "mainFileUrl": "https://example.com/file.pdf",
  "status": "draft"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 2,
    "userId": 1,
    "instansiId": 1,
    "lemdikId": 1,
    "pelatihanId": 1,
    "title": "New Project Title",
    "description": "Project description",
    "nilaiEkonomi": "1000000",
    "mainFileUrl": "https://example.com/file.pdf",
    "status": "draft",
    "isApproved": false,
    "isApprovedByLanri": false,
    "approvedAt": null,
    "approvedByLanriAt": null,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "message": "Project created successfully"
}
```

### 2. Single Project Operations

#### GET /api/project/[id]
Fetch a single project by ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "userId": 1,
    "instansiId": 1,
    "lemdikId": 1,
    "pelatihanId": 1,
    "title": "Project Title",
    "description": "Project description",
    "nilaiEkonomi": "1000000",
    "mainFileUrl": "https://example.com/file.pdf",
    "status": "draft",
    "isApproved": false,
    "isApprovedByLanri": false,
    "approvedAt": null,
    "approvedByLanriAt": null,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### PUT /api/project/[id]
Update a project by ID.

**Request Body:**
```json
{
  "title": "Updated Project Title",
  "description": "Updated description",
  "status": "submitted"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Updated Project Title",
    "description": "Updated description",
    "status": "submitted",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "message": "Project updated successfully"
}
```

#### DELETE /api/project/[id]
Delete a project by ID.

**Response:**
```json
{
  "success": true,
  "message": "Project deleted successfully"
}
```

### 3. Support Files Management

#### GET /api/project/support?projectId=1
Fetch support files for a project.

**Query Parameters:**
- `projectId` (number, required): Project ID

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "projectId": 1,
      "fileUrl": "https://example.com/support1.pdf",
      "fileName": "Support Document 1.pdf",
      "fileType": "document",
      "uploadedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### POST /api/project/support
Add a support file to a project.

**Request Body:**
```json
{
  "projectId": 1,
  "fileUrl": "https://example.com/support2.pdf",
  "fileName": "Support Document 2.pdf",
  "fileType": "document"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 2,
    "projectId": 1,
    "fileUrl": "https://example.com/support2.pdf",
    "fileName": "Support Document 2.pdf",
    "fileType": "document",
    "uploadedAt": "2024-01-01T00:00:00.000Z"
  },
  "message": "Support file added successfully"
}
```

#### DELETE /api/project/support?id=1&projectId=1
Remove a support file.

**Query Parameters:**
- `id` (number, required): Support file ID
- `projectId` (number, required): Project ID

**Response:**
```json
{
  "success": true,
  "message": "Support file deleted successfully"
}
```

### 4. Project Approval Management

#### PUT /api/project/approval
Update project approval status.

**Request Body:**
```json
{
  "projectId": 1,
  "isApproved": true,
  "isApprovedByLanri": false,
  "status": "approved"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "isApproved": true,
    "isApprovedByLanri": false,
    "approvedAt": "2024-01-01T00:00:00.000Z",
    "approvedByLanriAt": null,
    "status": "approved",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "message": "Project approval status updated successfully"
}
```

## Error Responses

All endpoints return error responses in the following format:

```json
{
  "statusCode": 400,
  "statusMessage": "Error message describing what went wrong"
}
```

Common HTTP status codes:
- `400`: Bad Request (missing required fields, invalid data)
- `404`: Not Found (project or resource not found)
- `405`: Method Not Allowed (unsupported HTTP method)
- `500`: Internal Server Error (database or server errors)

## Usage Examples

### Frontend Integration (Nuxt 3)

```typescript
// Fetch projects with filtering
const { data: projects } = await $fetch('/api/project', {
  query: {
    page: 1,
    limit: 10,
    search: 'sustainability',
    instansiId: 1,
    status: 'approved'
  }
})

// Create a new project
const newProject = await $fetch('/api/project', {
  method: 'POST',
  body: {
    userId: 1,
    instansiId: 1,
    lemdikId: 1,
    pelatihanId: 1,
    title: 'My Project',
    description: 'Project description',
    nilaiEkonomi: '500000'
  }
})

// Update project
const updatedProject = await $fetch(`/api/project/${projectId}`, {
  method: 'PUT',
  body: {
    status: 'submitted'
  }
})

// Add support file
const supportFile = await $fetch('/api/project/support', {
  method: 'POST',
  body: {
    projectId: 1,
    fileUrl: 'https://drive.google.com/file/xyz',
    fileName: 'presentation.pptx',
    fileType: 'presentation'
  }
})

// Approve project
const approvedProject = await $fetch('/api/project/approval', {
  method: 'PUT',
  body: {
    projectId: 1,
    isApproved: true,
    status: 'approved'
  }
})
```
