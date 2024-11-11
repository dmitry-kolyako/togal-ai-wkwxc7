// src/tests/api.test.ts
// import request from 'supertest';
// import fs from 'fs';
import path from 'path';
// import app from '../server'; // Assuming `app` is exported from server.ts

// Setup test image paths
const testImagePath = path.join(__dirname, 'test-image.jpg');
const imagesDir = path.join(__dirname, '../../routers');

// beforeAll(() => {
//   // Create a test image file
//   fs.writeFileSync(testImagePath, Buffer.from('Test Image Content'));
// });
//
// afterAll(() => {
//   // Clean up test routers
//   fs.unlinkSync(testImagePath);
//   if (fs.existsSync(imagesDir)) {
//     fs.readdirSync(imagesDir).forEach((file) => fs.unlinkSync(path.join(imagesDir, file)));
//   }
// });
//
// // Test POST /imagesUploader endpoint
// describe('POST /imagesUploader', () => {
//   it('should imagesUploader an image successfully', async () => {
//     const response = await request(app)
//       .post('/upload')
//       .attach('image', testImagePath);
//
//     expect(response.status).toBe(200);
//     expect(response.body).toHaveProperty('message', 'Image uploaded successfully');
//     expect(response.body).toHaveProperty('filename');
//
//     const uploadedFile = path.join(imagesDir, response.body.filename);
//     expect(fs.existsSync(uploadedFile)).toBe(true);
//   });
//
//   it('should fail to imagesUploader a non-image file', async () => {
//     const response = await request(app)
//       .post('/upload')
//       .attach('image', path.join(__dirname, 'invalid-file.txt'));
//
//     expect(response.status).toBe(400);
//     expect(response.body).toHaveProperty('error');
//   });
// });
//
// // Test GET /image/:filename endpoint
// describe('GET /image/:filename', () => {
//   it('should retrieve an uploaded image', async () => {
//     // Upload a test image
//     const uploadResponse = await request(app)
//       .post('/upload')
//       .attach('image', testImagePath);
//
//     const filename = uploadResponse.body.filename;
//     const response = await request(app).get(`/image/${filename}`);
//
//     expect(response.status).toBe(200);
//     expect(response.headers['content-type']).toMatch(/image/);
//   });
//
//   it('should return 404 for non-existent image', async () => {
//     const response = await request(app).get('/image/nonexistent-image.jpg');
//     expect(response.status).toBe(404);
//     expect(response.body).toHaveProperty('error', 'Image not found');
//   });
// });
