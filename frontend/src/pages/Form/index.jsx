import Layout from "../../partials/dashboard/Layout";
import CheckoutForm from "../../partials/form/CheckoutForm";
import TailwindForm from "../../partials/form/TailwindForm";

export default function Form() {
  return (
    <Layout>
      <div className="flex p-14 items-start justify-center">
        <TailwindForm />
        <CheckoutForm />
      </div>
    </Layout>
  );
}
