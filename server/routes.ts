import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCourseSchema, insertEnrollmentSchema, insertNewsletterSchema, insertTestimonialSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Course routes
  app.get('/api/courses', async (req, res) => {
    try {
      const courses = await storage.getCourses();
      res.json(courses);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch courses' });
    }
  });

  app.get('/api/courses/:id', async (req, res) => {
    try {
      const course = await storage.getCourse(parseInt(req.params.id));
      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }
      res.json(course);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch course' });
    }
  });

  app.post('/api/courses', async (req, res) => {
    try {
      const courseData = insertCourseSchema.parse(req.body);
      const course = await storage.createCourse(courseData);
      res.status(201).json(course);
    } catch (error) {
      res.status(400).json({ error: 'Invalid course data' });
    }
  });

  // Enrollment routes
  app.post('/api/enrollments', async (req, res) => {
    try {
      const enrollmentData = insertEnrollmentSchema.parse(req.body);
      const enrollment = await storage.enrollUserInCourse(enrollmentData);
      res.status(201).json(enrollment);
    } catch (error) {
      res.status(400).json({ error: 'Failed to enroll in course' });
    }
  });

  app.get('/api/users/:userId/enrollments', async (req, res) => {
    try {
      const enrollments = await storage.getUserEnrollments(parseInt(req.params.userId));
      res.json(enrollments);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch enrollments' });
    }
  });

  // Newsletter routes
  app.post('/api/newsletter/subscribe', async (req, res) => {
    try {
      const newsletterData = insertNewsletterSchema.parse(req.body);
      const subscription = await storage.subscribeToNewsletter(newsletterData);
      res.status(201).json({ message: 'Successfully subscribed to newsletter', subscription });
    } catch (error) {
      if (error instanceof Error && error.message?.includes('duplicate')) {
        return res.status(409).json({ error: 'Email already subscribed' });
      }
      res.status(400).json({ error: 'Failed to subscribe to newsletter' });
    }
  });

  app.post('/api/newsletter/unsubscribe', async (req, res) => {
    try {
      const { email } = req.body;
      const success = await storage.unsubscribeFromNewsletter(email);
      if (success) {
        res.json({ message: 'Successfully unsubscribed from newsletter' });
      } else {
        res.status(404).json({ error: 'Email not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to unsubscribe from newsletter' });
    }
  });

  // Testimonial routes
  app.get('/api/testimonials', async (req, res) => {
    try {
      const testimonials = await storage.getApprovedTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch testimonials' });
    }
  });

  app.post('/api/testimonials', async (req, res) => {
    try {
      const testimonialData = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(testimonialData);
      res.status(201).json(testimonial);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create testimonial' });
    }
  });

  // Statistics endpoint for hero section
  app.get('/api/stats', async (req, res) => {
    try {
      const courses = await storage.getCourses();
      const subscribers = await storage.getNewsletterSubscribers();
      
      res.json({
        students: 10000, // This could be calculated from enrollments
        courses: courses.length,
        instructors: 50, // This could be calculated from unique instructors
        subscribers: subscribers.length
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch statistics' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
