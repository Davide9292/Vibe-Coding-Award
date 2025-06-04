// Temporarily using JWT-only auth to test OAuth without database adapter
export { handlers as GET, handlers as POST } from "@/lib/auth-jwt"; 