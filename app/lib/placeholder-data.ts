const customers = [
  {
    id: "1",
    name: "John Doe",
    email: "johndoe@example.com",
    image_url: "https://example.com/john.jpg",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "janesmith@example.com",
    image_url: "https://example.com/jane.jpg",
  },
];

const invoices = [
  {
    customer_id: customers[0].id,
    amount: 15795,
    status: "pending",
    date: "2022-12-06",
  },
  {
    customer_id: customers[1].id,
    amount: 20348,
    status: "pending",
    date: "2022-11-14",
  },
];

const revenue = [
  { month: "2022-12", revenue: 50000 },
  { month: "2022-11", revenue: 45000 },
];

const users = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
  },
  {
    id: "2",
    name: "Regular User",
    email: "user@example.com",
    password: "user123",
  },
];

export { customers, invoices, revenue, users };
