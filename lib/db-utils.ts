import { prisma } from './prisma';

/**
 * Test database connection
 */
export async function testDatabaseConnection(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}

/**
 * Get database health status
 */
export async function getDatabaseHealth() {
  try {
    const startTime = Date.now();
    await prisma.$queryRaw`SELECT 1`;
    const responseTime = Date.now() - startTime;

    return {
      status: 'healthy',
      responseTime,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    };
  }
}

/**
 * Safely disconnect from database
 */
export async function disconnectDatabase() {
  try {
    await prisma.$disconnect();
  } catch (error) {
    console.error('Error disconnecting from database:', error);
  }
}

/**
 * Database transaction wrapper with error handling
 */
export async function withTransaction<T>(
  operation: (tx: Omit<typeof prisma, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>) => Promise<T>
): Promise<T> {
  try {
    return await prisma.$transaction(operation);
  } catch (error) {
    console.error('Transaction failed:', error);
    throw error;
  }
}

/**
 * Generic error handler for database operations
 */
export function handleDatabaseError(error: unknown): never {
  if (error instanceof Error) {
    // Prisma specific errors
    if (error.message.includes('P2002')) {
      throw new Error('Unique constraint violation');
    }
    if (error.message.includes('P2025')) {
      throw new Error('Record not found');
    }
    if (error.message.includes('P2003')) {
      throw new Error('Foreign key constraint failed');
    }
    if (error.message.includes('P1001')) {
      throw new Error('Database connection failed');
    }
    
    throw error;
  }
  
  throw new Error('Unknown database error');
}

/**
 * Retry database operation with exponential backoff
 */
export async function retryDatabaseOperation<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error');
      
      if (attempt === maxRetries - 1) {
        break;
      }
      
      const delay = baseDelay * Math.pow(2, attempt);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError!;
}