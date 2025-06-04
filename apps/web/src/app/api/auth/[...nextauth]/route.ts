// Temporarily using JWT-only auth to test OAuth without database adapter
import { handlers } from "@/lib/auth-jwt";

export const { GET, POST } = handlers; 