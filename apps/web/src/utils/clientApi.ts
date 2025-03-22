// clientApi.ts - Safe for client components
import axios from 'axios';

// Create a reusable axios instance
export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5123/api',
    // Add any other config you need
});

// Client-safe version of job application function
export const applyForJob = async (jobId: string, formData: any) => {
  try {
    // Convert the formData to match what your backend expects
    const apiFormData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone_number: formData.phoneNumber,
      cover_letter: formData.qualifications, // Map qualifications to cover_letter for backend compatibility
      jobId: jobId,
      resume: null // Since we no longer collect this
    };
    
    const response = await api.post('/job-applications', apiFormData);
    return response.data;
  } catch (error) {
    console.error("Error applying for job:", error);
    throw error;
  }
}; 