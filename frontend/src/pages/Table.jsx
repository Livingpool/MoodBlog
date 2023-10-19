import Layout from "../partials/dashboard/Layout";
import Table from "../components/Table";
import { Typography } from "@material-tailwind/react";

const mockData = [
  {
    name: "Chou Chou",
    role: "Instructor",
    email: "tough-dancing-guy@gmail.com",
    num: "#1"
  },
  {
    name: "Wei Wei",
    role: "Instructor",
    email: "zero.project@gmail.com",
    num: "#12"
  },
  {
    name: "Ray Ray",
    role: "Teaching Assistant",
    email: "9578socool@gmail.com",
    num: "#44"
  },
  {
    name: "Sashimi",
    role: "Delicious Sea Food",
    email: "sashimi@gmail.com",
    num: "#51"
  },
  {
    name: "Hazukashii",
    role: "Shy Shy Boy",
    email: "hazukashii.boy@gmail.com",
    num: "#112"
  }
];

export default function TablePage() {
  return (
    <Layout>
      <div className="p-20">
      <Typography variant="h1" className="mb-6 text-3xl font-extrabold">Table Demo</Typography>
        <Table
          head={[
            {
              title: "Name",
              dataIndex: "name"
            },
            {
              title: "Role",
              dataIndex: "role"
            },
            {
              title: "Email",
              dataIndex: "email"
            },
            {
              title: "Num",
              dataIndex: "num"
            }
          ]}
          rows={mockData}
        />
      </div>
    </Layout>
  );
}
