export async function createSafePrismaClient() {
  // Check if we're in a build environment or static generation
  const isBuilding = process.env.NODE_ENV === 'production' && 
                    (!process.env.DATABASE_URL || 
                     process.env.VERCEL_ENV === undefined ||
                     process.env.NEXT_PHASE === 'phase-production-build');
  
  if (isBuilding || typeof window !== 'undefined') {
    throw new Error("Database not available during build");
  }

  try {
    const { PrismaClient } = await import("@prisma/client");
    return new PrismaClient();
  } catch (error) {
    console.error("Failed to import Prisma client:", error);
    throw new Error("Database client not available");
  }
}

export function isBuildTime(): boolean {
  return process.env.NODE_ENV === 'production' && 
         (!process.env.DATABASE_URL || 
          process.env.VERCEL_ENV === undefined ||
          process.env.NEXT_PHASE === 'phase-production-build');
} 