import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, phone, date, time, guests, occasion, requests } = data;

    // Resolve path to the reservations database in the project workspace root
    const csvPath = path.join(process.cwd(), "reservations.csv");

    // Create header row if the Excel CSV database doesn't exist yet
    const fileExists = fs.existsSync(csvPath);
    const header = "Name,Phone,Date,Time,Guests,Occasion,Special Requests,Created At\n";

    // Helper to safely format strings for CSV row outputs
    const escapeCsv = (val: unknown) => {
      if (val === undefined || val === null) return '""';
      const strVal = String(val);
      if (strVal.includes(",") || strVal.includes('"') || strVal.includes("\n")) {
        return `"${strVal.replace(/"/g, '""')}"`;
      }
      return strVal;
    };

    // Format new row record
    const newRow = `${escapeCsv(name)},${escapeCsv(phone)},${escapeCsv(date)},${escapeCsv(time)},${guests},${escapeCsv(occasion)},${escapeCsv(requests)},${new Date().toISOString()}\n`;

    // Append to file or create new
    if (!fileExists) {
      fs.writeFileSync(csvPath, header + newRow, "utf8");
    } else {
      fs.appendFileSync(csvPath, newRow, "utf8");
    }

    return NextResponse.json({ success: true, file: csvPath });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Failed to append reservation details to Excel CSV sheet";
    console.error("Failed to append reservation to MS Excel CSV sheet:", error);
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
