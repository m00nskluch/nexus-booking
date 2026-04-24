import { db } from "./index";
import { services } from "./schema";

async function main() {
  console.log("Seeding services...");

  const data = [
    {
      name: "Suite Deluxe",
      description: "Una experiencia de lujo con vista al mar y jacuzzi privado.",
      price: 25000, // $250.00
      duration: "1 noche",
    },
    {
      name: "Habitación Doble",
      description: "Confortable habitación para dos personas con todas las comodidades.",
      price: 12000, // $120.00
      duration: "1 noche",
    },
    {
      name: "Spa & Relax",
      description: "Circuito de aguas, masajes terapéuticos y aromaterapia.",
      price: 8500, // $85.00
      duration: "3 horas",
    },
    {
      name: "Aventura en Montaña",
      description: "Tour guiado por los senderos más espectaculares de la zona.",
      price: 15000, // $150.00
      duration: "6 horas",
    },
    {
      name: "Cena Romántica",
      description: "Menú degustación de 5 pasos con maridaje de vinos premium.",
      price: 18000, // $180.00
      duration: "2 horas",
    },
  ];

  try {
    await db.insert(services).values(data);
    console.log("Seed successful!");
  } catch (error) {
    console.error("Seed failed:", error);
  } finally {
    process.exit(0);
  }
}

main();
