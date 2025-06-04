import { NextResponse } from "next/server";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@repo/database";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Test basic Prisma connection
    await prisma.$queryRaw`SELECT 1`;
    
    // Test Prisma adapter initialization
    const adapter = PrismaAdapter(prisma);
    
    // Test if adapter methods exist
    const adapterMethods = {
      createUser: typeof adapter.createUser,
      getUser: typeof adapter.getUser,
      getUserByEmail: typeof adapter.getUserByEmail,
      getUserByAccount: typeof adapter.getUserByAccount,
      updateUser: typeof adapter.updateUser,
      deleteUser: typeof adapter.deleteUser,
      linkAccount: typeof adapter.linkAccount,
      unlinkAccount: typeof adapter.unlinkAccount,
      createSession: typeof adapter.createSession,
      getSessionAndUser: typeof adapter.getSessionAndUser,
      updateSession: typeof adapter.updateSession,
      deleteSession: typeof adapter.deleteSession,
      createVerificationToken: typeof adapter.createVerificationToken,
      useVerificationToken: typeof adapter.useVerificationToken,
    };
    
    // Test if we can query the users table
    const userCount = await prisma.user.count();
    
    return NextResponse.json({
      status: "success",
      prismaConnection: "working",
      adapterInitialized: true,
      adapterMethods,
      userCount,
      databaseUrl: process.env.DATABASE_URL ? "set" : "not set",
      nextAuthUrl: process.env.NEXTAUTH_URL ? "set" : "not set",
      nextAuthSecret: process.env.NEXTAUTH_SECRET ? "set" : "not set",
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 