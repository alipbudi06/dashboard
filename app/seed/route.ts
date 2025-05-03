import bcrypt from "bcryptjs";
import postgres from "postgres";
import { invoices, customers, revenue, users } from "../lib/placeholder-data"; // Pastikan path-nya benar

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function seedUsers() {
  await Promise.all(
    users.map(
      (user) =>
        sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${bcrypt.hashSync(
          user.password,
          10
        )})
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );
}

async function seedCustomers() {
  await Promise.all(
    customers.map(
      (customer) =>
        sql`
        INSERT INTO customers (id, name, email, image_url)
        VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );
}

async function seedInvoices() {
  await Promise.all(
    invoices.map(
      (invoice) =>
        sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );
}

async function seedRevenue() {
  await Promise.all(
    revenue.map(
      (rev) =>
        sql`
        INSERT INTO revenue (month, revenue)
        VALUES (${rev.month}, ${rev.revenue})
        ON CONFLICT (month) DO NOTHING;
      `
    )
  );
}

export async function GET() {
  try {
    await sql.begin(async (sql) => {
      await Promise.all([
        seedUsers(),
        seedCustomers(),
        seedInvoices(),
        seedRevenue(),
      ]);
    });

    return new Response(
      JSON.stringify({ message: "Seeding completed successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during seeding:", error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      { status: 500 }
    );
  }
}
