import { 
  users, 
  courses, 
  enrollments, 
  newsletters, 
  testimonials,
  type User, 
  type InsertUser,
  type Course,
  type InsertCourse,
  type Enrollment,
  type InsertEnrollment,
  type Newsletter,
  type InsertNewsletter,
  type Testimonial,
  type InsertTestimonial
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Course methods
  getCourses(): Promise<Course[]>;
  getCourse(id: number): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;
  updateCourse(id: number, course: Partial<InsertCourse>): Promise<Course | undefined>;
  
  // Enrollment methods
  enrollUserInCourse(enrollment: InsertEnrollment): Promise<Enrollment>;
  getUserEnrollments(userId: number): Promise<Enrollment[]>;
  getCourseEnrollments(courseId: number): Promise<Enrollment[]>;
  
  // Newsletter methods
  subscribeToNewsletter(newsletter: InsertNewsletter): Promise<Newsletter>;
  unsubscribeFromNewsletter(email: string): Promise<boolean>;
  getNewsletterSubscribers(): Promise<Newsletter[]>;
  
  // Testimonial methods
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  getApprovedTestimonials(): Promise<Testimonial[]>;
  approveTestimonial(id: number): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values({
        ...insertUser,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();
    return user;
  }

  // Course methods
  async getCourses(): Promise<Course[]> {
    return await db
      .select()
      .from(courses)
      .where(eq(courses.isActive, true))
      .orderBy(desc(courses.createdAt));
  }

  async getCourse(id: number): Promise<Course | undefined> {
    const [course] = await db.select().from(courses).where(eq(courses.id, id));
    return course || undefined;
  }

  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const [course] = await db
      .insert(courses)
      .values({
        ...insertCourse,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();
    return course;
  }

  async updateCourse(id: number, courseUpdate: Partial<InsertCourse>): Promise<Course | undefined> {
    const [course] = await db
      .update(courses)
      .set({
        ...courseUpdate,
        updatedAt: new Date(),
      })
      .where(eq(courses.id, id))
      .returning();
    return course || undefined;
  }

  // Enrollment methods
  async enrollUserInCourse(insertEnrollment: InsertEnrollment): Promise<Enrollment> {
    const [enrollment] = await db
      .insert(enrollments)
      .values({
        ...insertEnrollment,
        enrolledAt: new Date(),
      })
      .returning();
    return enrollment;
  }

  async getUserEnrollments(userId: number): Promise<Enrollment[]> {
    return await db
      .select()
      .from(enrollments)
      .where(eq(enrollments.userId, userId))
      .orderBy(desc(enrollments.enrolledAt));
  }

  async getCourseEnrollments(courseId: number): Promise<Enrollment[]> {
    return await db
      .select()
      .from(enrollments)
      .where(eq(enrollments.courseId, courseId))
      .orderBy(desc(enrollments.enrolledAt));
  }

  // Newsletter methods
  async subscribeToNewsletter(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    const [newsletter] = await db
      .insert(newsletters)
      .values({
        ...insertNewsletter,
        subscribedAt: new Date(),
      })
      .returning();
    return newsletter;
  }

  async unsubscribeFromNewsletter(email: string): Promise<boolean> {
    const result = await db
      .update(newsletters)
      .set({ isSubscribed: false })
      .where(eq(newsletters.email, email));
    return (result.rowCount ?? 0) > 0;
  }

  async getNewsletterSubscribers(): Promise<Newsletter[]> {
    return await db
      .select()
      .from(newsletters)
      .where(eq(newsletters.isSubscribed, true))
      .orderBy(desc(newsletters.subscribedAt));
  }

  // Testimonial methods
  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const [testimonial] = await db
      .insert(testimonials)
      .values({
        ...insertTestimonial,
        createdAt: new Date(),
      })
      .returning();
    return testimonial;
  }

  async getApprovedTestimonials(): Promise<Testimonial[]> {
    return await db
      .select()
      .from(testimonials)
      .where(eq(testimonials.isApproved, true))
      .orderBy(desc(testimonials.createdAt));
  }

  async approveTestimonial(id: number): Promise<boolean> {
    const result = await db
      .update(testimonials)
      .set({ isApproved: true })
      .where(eq(testimonials.id, id));
    return (result.rowCount ?? 0) > 0;
  }
}

export const storage = new DatabaseStorage();
