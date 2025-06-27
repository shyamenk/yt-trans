import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create a test user
  const testUser = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
      usage: 0,
      usageResetAt: new Date(),
    },
  });

  console.log('✅ Created test user:', testUser.id);

  // Create a sample analysis
  const sampleAnalysis = await prisma.analysis.upsert({
    where: { id: 'sample-analysis-1' },
    update: {},
    create: {
      id: 'sample-analysis-1',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      videoId: 'dQw4w9WgXcQ',
      title: 'Sample YouTube Video',
      duration: 212,
      transcript: 'This is a sample transcript for testing purposes.',
      analysis: 'This video demonstrates the importance of never giving up.',
      keyPoints: [
        'Never gonna give you up',
        'Never gonna let you down',
        'Never gonna run around and desert you'
      ],
      actionSteps: [
        'Stay committed to your goals',
        'Support others in their journey',
        'Maintain loyalty and dedication'
      ],
      examples: [
        'Building lasting relationships',
        'Professional commitment',
        'Personal integrity'
      ],
      userId: testUser.id,
    },
  });

  console.log('✅ Created sample analysis:', sampleAnalysis.id);

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 