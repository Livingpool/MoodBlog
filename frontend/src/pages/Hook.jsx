import Layout from "../partials/dashboard/Layout";
import Counter from "../partials/hook/Counter";
import Connect from "../partials/hook/Connect";

export default function Hook() {
  return (
    <Layout>
      <div className="p-10 flex flex-col justify-center items-center">
        <Counter />
        <Connect />
      </div>
    </Layout>
  );
}
