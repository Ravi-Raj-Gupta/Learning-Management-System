# 📚 Learning Management System (LMS)

A modern, full-stack **Learning Management System** built with **React**, **Node.js**, **Express**, and **MongoDB**. This platform enables educators to create and manage courses while students can explore, enroll, and track their learning progress with integrated payment processing.

---

## 🎯 Project Overview

This LMS is a complete educational platform designed to facilitate online learning. It provides educators with tools to create comprehensive courses with structured content (chapters and lectures) and enables students to discover courses, make purchases, and track their learning progress with interactive features like ratings and progress tracking.

### Key Capabilities:

- 👨‍🏫 **Educator Dashboard** - Create, manage, and publish courses
- 🎓 **Student Portal** - Browse, enroll, and learn from courses
- 💳 **Payment Integration** - Secure course purchases via Stripe
- 📊 **Progress Tracking** - Monitor learning completion
- ⭐ **Rating System** - Student reviews and course ratings
- 🔐 **Authentication** - Clerk-based secure authentication
- 📸 **Media Management** - Cloudinary integration for image/video handling

---

## 🌐 Live Demo

🚀 **Experience the LMS in action:** [https://lms-frontend-delta-inky.vercel.app/](https://lms-frontend-delta-inky.vercel.app/)

> **Test Credentials:** Use test payment details (4242 4242 4242 4242) for Stripe transactions

---

## 🛠️ Tech Stack

### **Frontend**

| Technology       | Version | Purpose                     |
| ---------------- | ------- | --------------------------- |
| React            | 19.2.0  | UI Framework                |
| React Router DOM | 7.13.1  | Client-side routing         |
| Vite             | 7.3.1   | Build tool & dev server     |
| Tailwind CSS     | 4.2.1   | Styling & responsive design |
| Clerk React      | 5.61.4  | Authentication              |
| Axios            | 1.14.0  | API client                  |
| Quill            | 2.0.3   | Rich text editor            |
| React YouTube    | 10.1.0  | Video player component      |
| React Toastify   | 11.0.5  | Toast notifications         |

### **Backend**

| Technology    | Version | Purpose                   |
| ------------- | ------- | ------------------------- |
| Node.js       | Latest  | Runtime environment       |
| Express       | 5.2.1   | Web framework             |
| MongoDB       | Latest  | NoSQL database            |
| Mongoose      | 9.3.3   | ODM for MongoDB           |
| Clerk Express | 2.0.7   | Authentication middleware |
| Stripe        | 21.0.1  | Payment processing        |
| Cloudinary    | 2.9.0   | Image/video hosting       |
| Multer        | 2.1.1   | File upload handling      |
| Nodemon       | 3.1.14  | Development auto-reload   |
| Dotenv        | 17.3.1  | Environment variables     |

---

## 📋 Features

### **For Students**

- ✅ User authentication with Clerk
- ✅ Browse all available courses
- ✅ Advanced course search and filtering
- ✅ Course details with previews and ratings
- ✅ Secure payment via Stripe
- ✅ Enroll in courses
- ✅ Track learning progress (lectures completed)
- ✅ Leave ratings and reviews
- ✅ View enrolled courses dashboard
- ✅ Resume learning from last completed lecture

### **For Educators**

- ✅ Create professional courses with rich descriptions
- ✅ Structured course content (chapters → lectures)
- ✅ Upload course thumbnails
- ✅ Set pricing and discounts
- ✅ Enable preview lectures
- ✅ Publish/unpublish courses
- ✅ View student enrollment data
- ✅ Track course analytics
- ✅ Manage course content and updates

### **Platform Features**

- ✅ Secure payment processing (Stripe integration)
- ✅ Role-based access (student/educator)
- ✅ Course ratings system
- ✅ Student-educator role assignment
- ✅ Media management via Cloudinary
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Error handling & validation
- ✅ CORS enabled for cross-origin requests

---

## 📁 Project Structure

```
Learning Management System/
├── client/                          # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Educator/           # Educator dashboard components
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── Navbar.jsx
│   │   │   │   └── Sidebar.jsx
│   │   │   └── Student/            # Student interface components
│   │   │       ├── Navbar.jsx
│   │   │       ├── Footer.jsx
│   │   │       ├── CourseCard.jsx
│   │   │       ├── SearchBar.jsx
│   │   │       ├── Hero.jsx
│   │   │       ├── Testimonial.jsx
│   │   │       └── Loading.jsx
│   │   ├── Pages/
│   │   │   ├── Educator/           # Educator pages
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── AddCourse.jsx
│   │   │   │   ├── MyCourses.jsx
│   │   │   │   └── StudentEnrolled.jsx
│   │   │   └── Student/            # Student pages
│   │   │       ├── Home.jsx
│   │   │       ├── CoursesList.jsx
│   │   │       ├── CourseDetails.jsx
│   │   │       ├── MyEnrollments.jsx
│   │   │       └── Player.jsx
│   │   ├── Context/                # React Context
│   │   │   └── AppContext.jsx      # Global state management
│   │   ├── assets/
│   │   └── App.jsx
│   ├── vite.config.js
│   ├── package.json
│   ├── tailwind.config.js
│   └── index.html
│
└── server/                          # Express Backend
    ├── controllers/
    │   ├── userController.js       # User-related operations
    │   ├── courseController.js     # Course CRUD operations
    │   ├── educatorController.js   # Educator operations
    │   └── webhooks.js            # Stripe & Clerk webhooks
    ├── routes/
    │   ├── userRoutes.js          # Student API endpoints
    │   ├── courseRoutes.js        # Course API endpoints
    │   └── educatorRoutes.js      # Educator API endpoints
    ├── models/
    │   ├── User.js               # User schema
    │   ├── Course.js             # Course schema with chapters/lectures
    │   ├── Purchase.js           # Purchase/transaction schema
    │   └── courseProgress.js     # Student progress tracking
    ├── configs/
    │   ├── mongodb.js           # MongoDB connection
    │   ├── cloudinary.js        # Cloudinary configuration
    │   └── multer.js            # File upload configuration
    ├── middlewares/
    │   └── authMiddleware.js    # Clerk authentication middleware
    ├── server.js                # Express app entry point
    ├── .env                     # Environment variables
    └── package.json
```

---

## 🚀 Installation & Setup

### **Prerequisites**

- Node.js (v16 or higher)
- MongoDB account (MongoDB Atlas)
- Clerk account (for authentication)
- Stripe account (for payment processing)
- Cloudinary account (for media management)

### **Step 1: Clone the Repository**

```bash
git clone <repository-url>
cd "Learning Management System final"
```

### **Step 2: Backend Setup**

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file with the following variables:
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
CURRENCY=USD

# Start development server
npm run dev
```

### **Step 3: Frontend Setup**

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Create .env file (if needed for API base URL)
VITE_API_URL=http://localhost:5000

# Start development server
npm run dev
```

The frontend will run at `http://localhost:5173`

---

## 🔧 How to Run

### **Development Mode**

**Terminal 1 - Backend:**

```bash
cd server
npm run dev
```

Backend runs on: `http://localhost:5000`

**Terminal 2 - Frontend:**

```bash
cd client
npm run dev
```

Frontend runs on: `http://localhost:5173`

### **Production Build**

**Frontend:**

```bash
cd client
npm run build
npm run preview
```

**Backend:**

```bash
cd server
npm start
```

---

## 📡 API Endpoints

### **User Routes** (`/api/user`)

| Method | Endpoint                  | Description               | Auth        |
| ------ | ------------------------- | ------------------------- | ----------- |
| GET    | `/data`                   | Get user profile          | ✅ Required |
| GET    | `/enrolled-courses`       | List enrolled courses     | ✅ Required |
| POST   | `/purchase`               | Create course purchase    | ✅ Required |
| POST   | `/verify-purchase`        | Verify Stripe payment     | ✅ Required |
| POST   | `/update-course-progress` | Update lecture completion | ✅ Required |
| POST   | `/get-course-progress`    | Get course progress       | ✅ Required |
| POST   | `/add-rating`             | Rate a course             | ✅ Required |

### **Course Routes** (`/api/course`)

| Method | Endpoint     | Description               | Auth      |
| ------ | ------------ | ------------------------- | --------- |
| GET    | `/all`       | Get all published courses | ❌ Public |
| GET    | `/:courseId` | Get course details        | ❌ Public |

### **Educator Routes** (`/api/educator`)

| Method | Endpoint             | Description                 | Auth        |
| ------ | -------------------- | --------------------------- | ----------- |
| GET    | `/update-role`       | Convert user to educator    | ✅ Required |
| POST   | `/add-course`        | Create new course           | ✅ Educator |
| GET    | `/courses`           | Get educator's courses      | ✅ Educator |
| GET    | `/dashboard`         | Get dashboard analytics     | ✅ Educator |
| GET    | `/enrolled-students` | Get student enrollment data | ✅ Educator |

---

## 💾 Database Schema

### **User Collection**

```javascript
{
  _id: String (Clerk ID),
  name: String,
  email: String,
  imageUrl: String,
  enrolledCourses: [ObjectId],
  createdAt: Date,
  updatedAt: Date
}
```

### **Course Collection**

```javascript
{
  _id: ObjectId,
  courseTitle: String,
  courseDescription: String,
  courseThumbnail: String (Cloudinary URL),
  coursePrice: Number,
  discount: Number (0-100),
  isPublished: Boolean,
  courseContent: [{
    chapterId: String,
    chapterTitle: String,
    chapterOrder: Number,
    chapterContent: [{
      lectureId: String,
      lectureTitle: String,
      lectureDuration: Number,
      lectureUrl: String,
      lectureOrder: Number,
      isPreviewFree: Boolean
    }]
  }],
  courseRatings: [{
    userId: String,
    rating: Number,
    review: String
  }],
  enrolledStudents: [String],
  educator: String (Clerk ID),
  createdAt: Date,
  updatedAt: Date
}
```

### **Purchase Collection**

```javascript
{
  _id: ObjectId,
  courseId: ObjectId,
  userId: String,
  amount: Number,
  status: "pending" | "completed" | "failed",
  createdAt: Date,
  updatedAt: Date
}
```

### **Course Progress Collection**

```javascript
{
  _id: ObjectId,
  userId: String,
  courseId: ObjectId,
  lectureCompleted: [String],
  completionPercentage: Number,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔐 Authentication & Security

### **Clerk Authentication**

- Email/password and social login support
- User role management (student/educator)
- Webhook-based role updates
- Secure API token verification

### **API Security**

- Authentication middleware on protected routes
- CORS configuration for trusted origins
- Environment variable protection
- Request validation and error handling

### **Payment Security**

- Stripe webhook verification
- Secure session handling
- Purchase verification before enrollment

---

## 🛠️ Key Implementations

### **1. Authentication Flow**

- Clerk handles user authentication
- Automatic user document creation in MongoDB
- Role-based access control (educator/student)

### **2. Course Management**

- Hierarchical structure: Course → Chapters → Lectures
- Support for rich text descriptions (Quill editor)
- Discount calculation system
- Free preview lectures

### **3. Payment Processing**

- Stripe integration for course purchases
- Webhook handling for payment confirmation
- Sale amount calculation with discount
- Purchase record tracking

### **4. Progress Tracking**

- Track completed lectures per student
- Calculate completion percentage
- Persistent progress storage

### **5. Media Handling**

- Cloudinary integration for image uploads
- Multer for server-side file processing
- Support for course thumbnails and lecture content

### **6. Error Handling**

- Comprehensive try-catch blocks
- User-friendly error messages
- MongoDB validation
- API response standardization

---

## 🚨 Error Fixes Implemented

### **500 Internal Server Error Resolution**

✅ Added `requireAuth()` middleware from Clerk Express  
✅ Implemented userId validation in controllers  
✅ Added proper error listeners to MongoDB connection  
✅ Fixed environment variable formatting

### **Database Connection**

✅ Implemented connection pooling  
✅ Added retry mechanism with timeout  
✅ Error event handlers for connection issues  
✅ Cloudinary configuration validation

---

## 📦 Environment Variables

Create `.env` files in both `server` and `client` directories:

### **Server `.env`**

```
PORT=5000
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net
CLERK_SECRET_KEY=sk_test_xxxxx
CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLOUDINARY_NAME=xxxxx
CLOUDINARY_API_KEY=xxxxx
CLOUDINARY_SECRET_KEY=xxxxx
STRIPE_PUBLIC_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
CLERK_WEBHOOK_SECRET=whsec_xxxxx
CURRENCY=USD
```

---

## 📊 Performance Optimizations

- ✅ Lazy loading for course content
- ✅ Image optimization via Cloudinary
- ✅ MongoDB indexing on frequently queried fields
- ✅ Client-side state management with React Context
- ✅ Vite for fast module bundling
- ✅ Tailwind CSS purging for minimal CSS

---

## 🐛 Troubleshooting

### **MongoDB Connection Fails**

- Verify MongoDB Atlas connection string
- Check IP whitelist in MongoDB Atlas
- Ensure `.env` variables are correctly set
- Check network connectivity

### **Stripe Payment Issues**

- Verify Stripe keys in `.env`
- Check webhook URL configuration
- Use Stripe test credentials for development

### **Clerk Authentication Errors**

- Verify Clerk keys in configuration
- Check Clerk webhook settings
- Clear browser cache and cookies

### **File Upload Issues**

- Verify Cloudinary credentials
- Check file size limits
- Ensure proper MIME types

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📈 Future Enhancements

- [ ] Live classes integration (WebRTC)
- [ ] Certificate generation on course completion
- [ ] Discussion forums for each course
- [ ] Email notifications for course updates
- [ ] Mobile app (React Native)
- [ ] AI-powered course recommendations
- [ ] Advanced analytics dashboard
- [ ] Peer-to-peer course marketplace
- [ ] Course content versioning
- [ ] Gamification (badges, leaderboards)

---

## 📝 License

This project is licensed under the ISC License - see the LICENSE file for details.

---

## 👨‍💻 Author

**Ravi** - Full Stack Developer

---

## 📞 Support

For support, email support@lms.com or open an issue in the repository.

---

## 🙏 Acknowledgments

- Clerk for authentication services
- Stripe for payment processing
- Cloudinary for media management
- MongoDB for database excellence
- Tailwind CSS for styling framework
- React community for amazing libraries

---

**Last Updated:** April 8, 2026  
**Version:** 1.0.0
