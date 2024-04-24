import axios from "axios"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import CONFIG from "./config"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAPIHeader(){
  const token = localStorage.getItem(CONFIG.token_key)

  return {
    headers: {
    Authorization: `Bearer ${token || ''}`
  }
  }
}

export function getUserDetailsToken(){
  const token = localStorage.getItem('user_token');
  if (!token) return null;

  try {
    const payload = token.split('.')[1];
    const base64 = payload.replace('-', '+').replace('_', '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const data = JSON.parse(jsonPayload);
    return {
      id: data.id,
      name: data.name,
      role: data.role,
      email: data.email
    }; // replace 'userId' with the actual property name in your token
  } catch (error) {
    console.error('Error parsing token', error);
    return null;
  }
}

export const api = axios.create({
  baseURL: CONFIG.base_url,
  headers: {
    Authorization: CONFIG.Authorization
  }
})

export const auth = axios.create({
  baseURL: CONFIG.base_url
})