import { prisma } from './prisma';

export interface QueryMetrics {
  operation: string;
  model?: string;
  duration: number;
  success: boolean;
  error?: string;
  timestamp: Date;
}

export interface DatabaseConfig {
  enableQueryLogging: boolean;
  enablePerformanceMonitoring: boolean;
  slowQueryThreshold: number; // in milliseconds
  maxRetries: number;
  connectionTimeout: number;
}

// Default configuration
const defaultConfig: DatabaseConfig = {
  enableQueryLogging: process.env.NODE_ENV === 'development',
  enablePerformanceMonitoring: true,
  slowQueryThreshold: 1000, // 1 second
  maxRetries: 3,
  connectionTimeout: 5000 // 5 seconds
};

let config: DatabaseConfig = { ...defaultConfig };
let queryMetrics: QueryMetrics[] = [];

/**
 * Update database middleware configuration
 */
export function configureDatabaseMiddleware(newConfig: Partial<DatabaseConfig>) {
  config = { ...config, ...newConfig };
}

/**
 * Get current configuration
 */
export function getDatabaseConfig(): DatabaseConfig {
  return { ...config };
}

/**
 * Get query metrics for monitoring
 */
export function getQueryMetrics(): QueryMetrics[] {
  return [...queryMetrics];
}

/**
 * Clear query metrics (useful for testing)
 */
export function clearQueryMetrics() {
  queryMetrics = [];
}

/**
 * Log query metrics
 */
function logQueryMetrics(metrics: QueryMetrics) {
  if (config.enableQueryLogging) {
    const logLevel = metrics.success ? 'info' : 'error';
    const duration = `${metrics.duration}ms`;
    const operation = metrics.model ? `${metrics.model}.${metrics.operation}` : metrics.operation;
    
    console.log(`[DB ${logLevel.toUpperCase()}] ${operation} - ${duration}`, 
      metrics.error ? { error: metrics.error } : ''
    );
  }

  if (config.enablePerformanceMonitoring) {
    // Store metrics (in production, you might want to send to monitoring service)
    queryMetrics.push(metrics);
    
    // Keep only last 1000 metrics to prevent memory issues
    if (queryMetrics.length > 1000) {
      queryMetrics = queryMetrics.slice(-1000);
    }

    // Log slow queries
    if (metrics.duration > config.slowQueryThreshold) {
      console.warn(`[DB SLOW QUERY] ${metrics.operation} took ${metrics.duration}ms`);
    }
  }
}

/**
 * Database operation wrapper with middleware
 */
export async function withDatabaseMiddleware<T>(
  operation: string,
  model: string | undefined,
  queryFn: () => Promise<T>
): Promise<T> {
  const startTime = Date.now();
  let success = false;
  let error: string | undefined;
  let result: T;

  try {
    result = await queryFn();
    success = true;
    return result;
  } catch (err) {
    error = err instanceof Error ? err.message : 'Unknown error';
    throw err;
  } finally {
    const duration = Date.now() - startTime;
    const metrics: QueryMetrics = {
      operation,
      model,
      duration,
      success,
      error,
      timestamp: new Date()
    };

    logQueryMetrics(metrics);
  }
}

/**
 * Enhanced Prisma client with middleware
 */
export function createInstrumentedPrismaClient() {
  const client = prisma;

  // Add Prisma middleware for query logging
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  client.$use(async (params: any, next: (params: any) => Promise<any>) => {
    const start = Date.now();
    
    try {
      const result = await next(params);
      const duration = Date.now() - start;
      
      if (config.enableQueryLogging || config.enablePerformanceMonitoring) {
        const metrics: QueryMetrics = {
          operation: params.action,
          model: params.model,
          duration,
          success: true,
          timestamp: new Date()
        };
        
        logQueryMetrics(metrics);
      }
      
      return result;
    } catch (error) {
      const duration = Date.now() - start;
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      const metrics: QueryMetrics = {
        operation: params.action,
        model: params.model,
        duration,
        success: false,
        error: errorMessage,
        timestamp: new Date()
      };
      
      logQueryMetrics(metrics);
      throw error;
    }
  });

  return client;
}

/**
 * Connection health check with middleware
 */
export async function checkDatabaseHealth(): Promise<{
  status: 'healthy' | 'unhealthy';
  responseTime: number;
  error?: string;
}> {
  const startTime = Date.now();
  
  try {
    await withDatabaseMiddleware('healthCheck', undefined, async () => {
      await prisma.$queryRaw`SELECT 1`;
    });
    
    const responseTime = Date.now() - startTime;
    return {
      status: 'healthy',
      responseTime
    };
  } catch (error) {
    const responseTime = Date.now() - startTime;
    return {
      status: 'unhealthy',
      responseTime,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Get database performance statistics
 */
export function getDatabaseStats() {
  const recentMetrics = queryMetrics.filter(
    m => Date.now() - m.timestamp.getTime() < 60000 // Last minute
  );

  const successfulQueries = recentMetrics.filter(m => m.success);
  const failedQueries = recentMetrics.filter(m => !m.success);
  const slowQueries = recentMetrics.filter(m => m.duration > config.slowQueryThreshold);

  const averageResponseTime = successfulQueries.length > 0 
    ? successfulQueries.reduce((sum, m) => sum + m.duration, 0) / successfulQueries.length
    : 0;

  return {
    totalQueries: recentMetrics.length,
    successfulQueries: successfulQueries.length,
    failedQueries: failedQueries.length,
    slowQueries: slowQueries.length,
    averageResponseTime: Math.round(averageResponseTime),
    successRate: recentMetrics.length > 0 
      ? Math.round((successfulQueries.length / recentMetrics.length) * 100)
      : 100
  };
}

/**
 * Database connection pool monitoring
 */
export async function getConnectionPoolStatus() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return {
      status: 'connected',
      activeConnections: 1, // Prisma handles this internally
      timestamp: new Date()
    };
  } catch (error) {
    return {
      status: 'disconnected',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date()
    };
  }
}

/**
 * Gracefully shutdown database connections
 */
export async function shutdownDatabase() {
  try {
    await withDatabaseMiddleware('shutdown', undefined, async () => {
      await prisma.$disconnect();
    });
    
    console.log('[DB INFO] Database connections closed gracefully');
  } catch (error) {
    console.error('[DB ERROR] Error during database shutdown:', error);
    throw error;
  }
} 