import { prisma } from '../prisma';
import { handleDatabaseError, retryDatabaseOperation } from '../db-utils';

export interface UserUsageData {
  id: string;
  usage: number;
  usageResetAt: Date;
  maxUsage?: number;
}

export interface CreateUserData {
  email?: string;
  name?: string;
  image?: string;
}

export interface UpdateUserData {
  email?: string;
  name?: string;
  image?: string;
  usage?: number;
  usageResetAt?: Date;
}

/**
 * Get user by ID with optional relations
 */
export async function getUserById(
  userId: string,
  includeAnalyses = false,
  includeAccounts = false,
  includeSessions = false
) {
  try {
    return await retryDatabaseOperation(async () => {
      return await prisma.user.findUnique({
        where: { id: userId },
        include: {
          analyses: includeAnalyses ? {
            orderBy: { createdAt: 'desc' },
            take: 10
          } : false,
          accounts: includeAccounts,
          sessions: includeSessions
        }
      });
    });
  } catch (error) {
    handleDatabaseError(error);
  }
}

/**
 * Get user by email
 */
export async function getUserByEmail(email: string) {
  try {
    return await retryDatabaseOperation(async () => {
      return await prisma.user.findUnique({
        where: { email }
      });
    });
  } catch (error) {
    handleDatabaseError(error);
  }
}

/**
 * Create a new user
 */
export async function createUser(data: CreateUserData) {
  try {
    return await retryDatabaseOperation(async () => {
      return await prisma.user.create({
        data: {
          ...data,
          usage: 0,
          usageResetAt: new Date()
        }
      });
    });
  } catch (error) {
    handleDatabaseError(error);
  }
}

/**
 * Update user information
 */
export async function updateUser(userId: string, data: UpdateUserData) {
  try {
    return await retryDatabaseOperation(async () => {
      return await prisma.user.update({
        where: { id: userId },
        data: {
          ...data,
          updatedAt: new Date()
        }
      });
    });
  } catch (error) {
    handleDatabaseError(error);
  }
}

/**
 * Get user usage information
 */
export async function getUserUsage(userId: string): Promise<UserUsageData | null> {
  try {
    return await retryDatabaseOperation(async () => {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          usage: true,
          usageResetAt: true
        }
      });

      if (!user) return null;

      return {
        ...user,
        maxUsage: 2 // Default free limit from PRD
      };
    });
  } catch (error) {
    handleDatabaseError(error);
  }
}

/**
 * Increment user usage count
 */
export async function incrementUserUsage(userId: string) {
  try {
    return await retryDatabaseOperation(async () => {
      return await prisma.user.update({
        where: { id: userId },
        data: {
          usage: { increment: 1 },
          updatedAt: new Date()
        },
        select: {
          id: true,
          usage: true,
          usageResetAt: true
        }
      });
    });
  } catch (error) {
    handleDatabaseError(error);
  }
}

/**
 * Reset user usage (typically called daily/monthly)
 */
export async function resetUserUsage(userId: string) {
  try {
    return await retryDatabaseOperation(async () => {
      return await prisma.user.update({
        where: { id: userId },
        data: {
          usage: 0,
          usageResetAt: new Date(),
          updatedAt: new Date()
        },
        select: {
          id: true,
          usage: true,
          usageResetAt: true
        }
      });
    });
  } catch (error) {
    handleDatabaseError(error);
  }
}

/**
 * Check if user has remaining usage
 */
export async function checkUserUsageLimit(userId: string, maxUsage = 2): Promise<boolean> {
  try {
    return await retryDatabaseOperation(async () => {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { usage: true }
      });

      if (!user) return false;
      return user.usage < maxUsage;
    });
  } catch (error) {
    handleDatabaseError(error);
  }
}

/**
 * Get users who need usage reset (24 hours passed)
 */
export async function getUsersForUsageReset() {
  try {
    return await retryDatabaseOperation(async () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      return await prisma.user.findMany({
        where: {
          usageResetAt: {
            lt: yesterday
          },
          usage: {
            gt: 0
          }
        },
        select: {
          id: true,
          email: true,
          usage: true,
          usageResetAt: true
        }
      });
    });
  } catch (error) {
    handleDatabaseError(error);
  }
}

/**
 * Bulk reset usage for multiple users
 */
export async function bulkResetUsage(userIds: string[]) {
  try {
    return await retryDatabaseOperation(async () => {
      return await prisma.user.updateMany({
        where: {
          id: { in: userIds }
        },
        data: {
          usage: 0,
          usageResetAt: new Date(),
          updatedAt: new Date()
        }
      });
    });
  } catch (error) {
    handleDatabaseError(error);
  }
}

/**
 * Delete user and all related data
 */
export async function deleteUser(userId: string) {
  try {
    return await retryDatabaseOperation(async () => {
      // Prisma will handle cascade delete for related records
      return await prisma.user.delete({
        where: { id: userId }
      });
    });
  } catch (error) {
    handleDatabaseError(error);
  }
}

/**
 * Get user statistics
 */
export async function getUserStats(userId: string) {
  try {
    return await retryDatabaseOperation(async () => {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          analyses: {
            select: {
              id: true,
              createdAt: true,
              videoId: true,
              title: true
            },
            orderBy: { createdAt: 'desc' }
          }
        }
      });

      if (!user) return null;

      return {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          usage: user.usage,
          usageResetAt: user.usageResetAt,
          createdAt: user.createdAt
        },
        stats: {
          totalAnalyses: user.analyses.length,
          currentUsage: user.usage,
          remainingUsage: Math.max(0, 2 - user.usage),
          recentAnalyses: user.analyses.slice(0, 5)
        }
      };
    });
  } catch (error) {
    handleDatabaseError(error);
  }
} 