import { prisma } from '../prisma';
import { handleDatabaseError, retryDatabaseOperation, withTransaction } from '../db-utils';

export interface CreateAnalysisData {
  videoUrl: string;
  videoId: string;
  title?: string;
  duration?: number;
  transcript: string;
  analysis: string;
  keyPoints: string[];
  actionSteps: string[];
  examples: string[];
  userId?: string;
}

export interface UpdateAnalysisData {
  title?: string;
  analysis?: string;
  keyPoints?: string[];
  actionSteps?: string[];
  examples?: string[];
}

export interface AnalysisFilters {
  userId?: string;
  videoId?: string;
  search?: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
  orderBy?: 'createdAt' | 'updatedAt' | 'title';
  orderDirection?: 'asc' | 'desc';
}

/**
 * Create a new analysis
 */
export async function createAnalysis(data: CreateAnalysisData) {
  try {
    return await retryDatabaseOperation(async () => {
      return await prisma.analysis.create({
        data,
        include: {
          user: {
            select: {
              id: true,
              email: true,
              name: true
            }
          }
        }
      });
    });
  } catch (error) {
    handleDatabaseError(error);
  }
}

/**
 * Create analysis and increment user usage in a transaction
 */
export async function createAnalysisWithUsageIncrement(data: CreateAnalysisData) {
  try {
    return await withTransaction(async (tx) => {
      // Create the analysis
      const analysis = await tx.analysis.create({
        data,
        include: {
          user: {
            select: {
              id: true,
              email: true,
              name: true,
              usage: true
            }
          }
        }
      });

      // Increment user usage if userId is provided
      if (data.userId) {
        await tx.user.update({
          where: { id: data.userId },
          data: {
            usage: { increment: 1 },
            updatedAt: new Date()
          }
        });
      }

      return analysis;
    });
  } catch (error) {
    handleDatabaseError(error);
  }
}

/**
 * Get analysis by ID
 */
export async function getAnalysisById(analysisId: string, includeUser = false) {
  try {
    return await retryDatabaseOperation(async () => {
      return await prisma.analysis.findUnique({
        where: { id: analysisId },
        include: {
          user: includeUser ? {
            select: {
              id: true,
              email: true,
              name: true
            }
          } : false
        }
      });
    });
  } catch (error) {
    handleDatabaseError(error);
  }
}

/**
 * Get analysis by video ID (check if video was already analyzed)
 */
export async function getAnalysisByVideoId(videoId: string) {
  try {
    return await retryDatabaseOperation(async () => {
      return await prisma.analysis.findFirst({
        where: { videoId },
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              name: true
            }
          }
        }
      });
    });
  } catch (error) {
    handleDatabaseError(error);
  }
}

/**
 * Update analysis
 */
export async function updateAnalysis(analysisId: string, data: UpdateAnalysisData) {
  try {
    return await retryDatabaseOperation(async () => {
      return await prisma.analysis.update({
        where: { id: analysisId },
        data: {
          ...data,
          updatedAt: new Date()
        },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              name: true
            }
          }
        }
      });
    });
  } catch (error) {
    handleDatabaseError(error);
  }
}

/**
 * Delete analysis
 */
export async function deleteAnalysis(analysisId: string) {
  try {
    return await retryDatabaseOperation(async () => {
      return await prisma.analysis.delete({
        where: { id: analysisId }
      });
    });
  } catch (error) {
    handleDatabaseError(error);
  }
}

/**
 * Get user analyses with filtering and pagination
 */
export async function getUserAnalyses(filters: AnalysisFilters = {}) {
  try {
    return await retryDatabaseOperation(async () => {
      const {
        userId,
        search,
        startDate,
        endDate,
        limit = 10,
        offset = 0,
        orderBy = 'createdAt',
        orderDirection = 'desc'
      } = filters;

      const where: Record<string, unknown> = {};

      if (userId) {
        where.userId = userId;
      }

      if (search) {
        where.OR = [
          { title: { contains: search, mode: 'insensitive' } },
          { analysis: { contains: search, mode: 'insensitive' } },
          { transcript: { contains: search, mode: 'insensitive' } }
        ];
      }

      if (startDate || endDate) {
        where.createdAt = {} as Record<string, unknown>;
        if (startDate) (where.createdAt as Record<string, unknown>).gte = startDate;
        if (endDate) (where.createdAt as Record<string, unknown>).lte = endDate;
      }

      const [analyses, total] = await Promise.all([
        prisma.analysis.findMany({
          where,
          orderBy: { [orderBy]: orderDirection },
          take: limit,
          skip: offset,
          include: {
            user: {
              select: {
                id: true,
                email: true,
                name: true
              }
            }
          }
        }),
        prisma.analysis.count({ where })
      ]);

      return {
        analyses,
        pagination: {
          total,
          limit,
          offset,
          hasMore: offset + limit < total
        }
      };
    });
  } catch (error) {
    handleDatabaseError(error);
  }
}

/**
 * Get recent analyses (public feed)
 */
export async function getRecentAnalyses(limit = 10) {
  try {
    return await retryDatabaseOperation(async () => {
      return await prisma.analysis.findMany({
        where: {
          title: { not: null } // Only show analyses with titles
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
        select: {
          id: true,
          videoId: true,
          title: true,
          duration: true,
          createdAt: true,
          user: {
            select: {
              name: true
            }
          }
        }
      });
    });
  } catch (error) {
    handleDatabaseError(error);
  }
}

/**
 * Search analyses across all users
 */
export async function searchAnalyses(query: string, limit = 20) {
  try {
    return await retryDatabaseOperation(async () => {
      return await prisma.analysis.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { analysis: { contains: query, mode: 'insensitive' } }
          ]
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
        select: {
          id: true,
          videoId: true,
          title: true,
          duration: true,
          createdAt: true,
          user: {
            select: {
              name: true
            }
          }
        }
      });
    });
  } catch (error) {
    handleDatabaseError(error);
  }
}

/**
 * Get analysis statistics
 */
export async function getAnalysisStats() {
  try {
    return await retryDatabaseOperation(async () => {
      const [
        totalAnalyses,
        todayAnalyses,
        thisWeekAnalyses,
        averageDuration,
        topVideoIds
      ] = await Promise.all([
        // Total analyses count
        prisma.analysis.count(),
        
        // Today's analyses
        prisma.analysis.count({
          where: {
            createdAt: {
              gte: new Date(new Date().setHours(0, 0, 0, 0))
            }
          }
        }),
        
        // This week's analyses
        prisma.analysis.count({
          where: {
            createdAt: {
              gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
            }
          }
        }),
        
        // Average video duration
        prisma.analysis.aggregate({
          _avg: { duration: true }
        }),
        
        // Most analyzed video IDs
        prisma.analysis.groupBy({
          by: ['videoId'],
          _count: { videoId: true },
          orderBy: { _count: { videoId: 'desc' } },
          take: 5
        })
      ]);

      return {
        total: totalAnalyses,
        today: todayAnalyses,
        thisWeek: thisWeekAnalyses,
        averageDuration: averageDuration._avg.duration || 0,
        topVideoIds: (topVideoIds as { videoId: string; _count: { videoId: number } }[]).map((item) => ({
          videoId: item.videoId,
          count: item._count.videoId
        }))
      };
    });
  } catch (error) {
    handleDatabaseError(error);
  }
}

/**
 * Get user's analysis history summary
 */
export async function getUserAnalysisHistory(userId: string) {
  try {
    return await retryDatabaseOperation(async () => {
      const [analyses, stats] = await Promise.all([
        prisma.analysis.findMany({
          where: { userId },
          orderBy: { createdAt: 'desc' },
          take: 10,
          select: {
            id: true,
            videoId: true,
            title: true,
            duration: true,
            createdAt: true
          }
        }),
        
        prisma.analysis.aggregate({
          where: { userId },
          _count: { id: true },
          _avg: { duration: true },
          _sum: { duration: true }
        })
      ]);

      return {
        recentAnalyses: analyses,
        summary: {
          totalCount: stats._count.id,
          averageDuration: stats._avg.duration || 0,
          totalWatchTime: stats._sum.duration || 0
        }
      };
    });
  } catch (error) {
    handleDatabaseError(error);
  }
}

/**
 * Check if video was already analyzed by user
 */
export async function checkUserVideoAnalysis(userId: string, videoId: string) {
  try {
    return await retryDatabaseOperation(async () => {
      const analysis = await prisma.analysis.findFirst({
        where: {
          userId,
          videoId
        },
        select: {
          id: true,
          createdAt: true
        }
      });

      return analysis !== null;
    });
  } catch (error) {
    handleDatabaseError(error);
  }
}

/**
 * Bulk delete analyses (admin function)
 */
export async function bulkDeleteAnalyses(analysisIds: string[]) {
  try {
    return await retryDatabaseOperation(async () => {
      return await prisma.analysis.deleteMany({
        where: {
          id: { in: analysisIds }
        }
      });
    });
  } catch (error) {
    handleDatabaseError(error);
  }
} 