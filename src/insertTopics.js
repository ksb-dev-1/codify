import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Replace with a valid user ID from your User table
  const userId = "66d7e1837f171c597005df3c";

  // Define the topics you want to insert
  const topics = [
    "Hoisting",
    "Closures",
    "Type Coercion",
    "OOP",
    "Variables and Scope",
    "Miscellaneous",
    "Objects",
    "this Keyword",
  ];

  // Insert each topic into the database
  for (const topicName of topics) {
    await prisma.topic.create({
      data: {
        name: topicName,
        userId: userId, // Connect the existing user
      },
    });
  }

  console.log("Topics have been inserted successfully.");
}

// Call the main function and handle errors
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
