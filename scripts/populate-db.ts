import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";
import * as path from "path";
import "dotenv/config";

// Load usage: ts-node scripts/populate-db.ts

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Need service role for bypassing extensive policies if needed, or ANON if policies allow

if (!supabaseUrl || !supabaseKey) {
  console.error(
    "Error: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required in .env.local"
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function populateServices() {
  console.log("Populating Services...");
  // Add your services data array here or read from a JSON file
  const services = [
    {
      name: "Manicura Clásica",
      description:
        "Manicura completa con limado, cutículas, hidratación y esmaltado tradicional.",
      price: 25.0,
      duration: 45,
      category: "Manicura",
      image_url: "services/manicura-clasica.jpg",
      is_featured: true,
    },
    // ... more services
  ];

  for (const service of services) {
    const { error } = await supabase
      .from("services")
      .upsert(service, { onConflict: "name" });
    if (error) console.error(`Error inserting ${service.name}:`, error.message);
    else console.log(`Inserted: ${service.name}`);
  }
}

async function main() {
  try {
    await populateServices();
    // await populateCourses();
    // await populateBlog();
    console.log("Database population completed!");
  } catch (error) {
    console.error("Script failed:", error);
  }
}

main();
