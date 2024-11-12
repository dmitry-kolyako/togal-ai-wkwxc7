# Image Uploader & Editor

This application is a web-based tool that allows users to upload, view, and manipulate images with basic transformation
controls. It provides a user-friendly interface to upload images, preview them, apply transformations, and save changes.
The application uses a Node.js/Express backend for storing images and a React frontend with TypeScript for the
client-side operations.

## Table of Contents

1. [Start](#start)
    - [Prerequisites](#prerequisites)
    - [Setup](#setup)
    - [Run](#run)
    - [Usage](#usage)
2. [Features](#features)
    - [Image Upload & Display](#image-upload--display)
    - [Image Transformation](#image-transformation)
    - [Image Gallery with Selection](#image-gallery-with-selection)
    - [History View](#history-view)
    - [Confirmation Dialogs](#confirmation-dialogs)
    - [Download & Save Functionality](#download--save-functionality)
3. [Application Built](#application-built)

    - [Technology Stack](#technology-stack)
    - [Folder Structure](#folder-structure)
    - [State Management](#state-management)
    - [API Endpoints](#backend-api-endpoints)

4. [Future Enhancements](#future-enhancements)
5. [License](#license)

## Start

### Prerequisites

- **Node.js**: Ensure Node.js and npm are installed [NodeJS v22.11.0](https://nodejs.org/en/blog/release/v22.11.0)
- **TypeScript**: Installed as a dev dependency in both the client and server.
- **Git**: to pull the repo

### Setup
```bash

cd ./client 
npm install
```
- in `/client` run `npm install`


- in `/client` run `npm install`
- in `/server` run `npm install`

### Run

As application has both client and server you have to start them both

- In one terminal window go to `cd ./client` and run `npm run dev-client`, started on `http://localhost:5173`
- In a second terminal window go to `cd ./server` run `npm run dev-server`, started on `http://localhost:5000`
- Open your browser and navigate to [`http://localhost:5173`](`http://localhost:5173`)

### Usage

1. **Upload an Image**: Click the upload area or drag-and-drop a file to upload an image.
2. **Preview & Transform**: Apply transformations using the control panel to rotate, zoom, and reset the image.
3. **Save & Download**: Save transformations or download the edited image.

[top](#image-uploader--editor)

---

## Features

### **Image Upload & Display**

- Users can upload images in JPG or PNG format.
- Uploaded images are displayed on the frontend with preview support.
- Drag-and-drop functionality enhances the upload experience, with a highlighted drop area when dragging files over it.
- Images can be stored on the backend for persistence.

[top](#image-uploader--editor)

### **Image Transformation**

Users can apply transformations to the selected image, including:

![undo.svg](client/src/components/Icons/assets/undo.svg)
![redo.svg](client/src/components/Icons/assets/redo.svg)
![rotate_left.svg](client/src/components/Icons/assets/rotate_left.svg)
![rotate_right.svg](client/src/components/Icons/assets/rotate_right.svg)
![zoom_in.svg](client/src/components/Icons/assets/zoom_in.svg)
![zoom_out.svg](client/src/components/Icons/assets/zoom_out.svg)
![delete_history.svg](client/src/components/Icons/assets/delete_history.svg)

- **Undo/Redo**: Can roll back or forward through transformation history.
- **Rotate Left/Right**: Rotates the image 90 degrees counterclockwise.
- **Zoom In/Out**: Adjusts the image scale for zooming in and out.
- **Reset**: Reverts all transformations back to the original image state.

![save.svg](client/src/components/Icons/assets/save.svg)
![delete.svg](client/src/components/Icons/assets/delete.svg)
![download.svg](client/src/components/Icons/assets/download.svg)

- **Save/Delete**: Save or Delete on server.
- **Download**: You can download transformed image.

All transformations are performed on a canvas to maintain quality and flexibility.

[top](#image-uploader--editor)

### **Image Gallery with Selection**

The application includes an Image Gallery feature that loads previously saved images from the server. Users can browse
through their saved images and select an image to load it back into the editor. Upon selecting an image from the
gallery, the following actions occur:

- Load Image and History: The selected image, along with its transformation history, is reloaded into the editor. This
  allows users to resume editing from where they left off.
- Continue Editing: With the loaded image, users can continue applying transformations as if they were working with a
  new image, such as rotating, zooming, and resetting.
- History View Update: The transformation history from the previously saved image is displayed in the History View
  component, enabling users to review or revert past changes.
- This feature adds flexibility by allowing users to manage and edit images over multiple sessions, making the
  application a useful tool for longer projects.

[top](#image-uploader--editor)

### **History View**

A component displays the history of transformations applied to the image, enabling users to track or reset past changes.

You can click on the item in the list, to replay history to that particular action, setting up a pointer to the history
element.

[top](#image-uploader--editor)

### **Confirmation Dialogs**

Modal overlays with a semi-transparent background prompt users for confirmation on critical actions, such as deleting an
image.

[top](#image-uploader--editor)

### **Download & Save Functionality**

- Users can download the transformed image as a file.
- The image can also be saved to the backend, with saved images available for future retrieval.

[top](#image-uploader--editor)

---

## Application built

### Technology Stack

- **Frontend**: React with TypeScript, Styled-components for styling, and Context API for state management.
- **Backend**: Node.js, Express, and Multer for file upload and management.

[top](#image-uploader--editor)

### Folder Structure

```plaintext
project-root/
│
├── client/                  # React frontend
│   ├── src/
│   │   ├── components       # Application components
│   │   ├── config           # Magic values
│   │   ├── context          # Context and Providers
│   │   ├── entities         
│   │   ├── hooks            
│   │   ├── pages
│   │   ├── services         # API Service Instance
│   │   ├── state            # State: reducers, actions, type
│   │   ├── utils            # tool-pack
│   │   ├── App.tsx          # App Root
│   │   ├── index.css        # root styles
│   │   └── main.tsx         # App mount
│   │
│   ├── public/
│   └── tsconfig.json
│
├── server/                  # Express backend
│   ├── src/
│   │   ├── config           # Magic values
│   │   ├── controllers      # Service/endpoint controllers
│   │   ├── middleware       # API handlers
│   │   ├── routers          # API routers
│   │   ├── utils            # tool-pack
│   │   ├── server.ts        # server mount
│   │   └── storage          # saved image storage
│   │
│   └── tsconfig.json
│
├── shared/                  # Shared types and configurations
│   │   ├── config           # Magic values
│   │   ├── types            # Common types
│   │   └── utils            # Common tool-pack
│   │
│   └── tsconfig.json
│
├── .gitignore
└── README.md
```

[top](#image-uploader--editor)

### **State Management**

The application tracks transformations through a dedicated state managed in an `ImageContext`, including:

- The image gallery.
- The currently selected image.
- Transformation history.
- Application UI state.

State management is handled using React's `useReducer` for predictable state transitions and transformation tracking.

[top](#image-uploader--editor)

### Backend API Endpoints

#### **Upload Image**

`POST /upload` Accepts an image, transformed image, history and stores it on the backend.

#### **Retrieve Images**

`GET /images` Retrieves a list of uploaded image data models

#### **Retrieve Image**

`GET /image/:id` Retrieves original image

#### **Retrieve Transformed Image**

`GET /image/:id/preview` Retrieves transformed image as preview

#### **Retrieve Image Model**

`GET /image/:id/model` Retrieves image model as json

#### **Delete Image**

`DELETE /image/:id` Deletes the specified image from storage.

#### **Health check**

`GET /healthcheck` Health-check (if server is alive)

[top](#image-uploader--editor)

---

## Future Enhancements

- **Additional Transformations**: Implement draw, custom rotation and other transformation
- **User Sessions**: Add user-session/authentication management to allow users to save their image history and
  transformations.

[top](#image-uploader--editor)

## License

This project is licensed under the MIT License.

[top](#image-uploader--editor)