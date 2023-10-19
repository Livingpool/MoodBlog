import Layout from "../../partials/dashboard/Layout";
import Card from "../../components/Card";
import Modal from "../../components/Modal";

export default function ModalPage() {
  return (
    <Layout>
      <div className="flex p-10">
        <Card className="flex-[1]" title="Modal" text="Note that the modal in Material Tailwind called <Dialog />">
          <Modal
            title="A Lovely Modal for you"
            text="It's a Modal that we prepared for you guys enrolled the Code-Your-Stage class! (powerd by Material Tailwind)"
            botton="Pop it up"
          />
        </Card>
        <Card className="flex-[1]" title="Small Modal" text="Size: xs">
          <Modal size="xs" />
        </Card>
        <Card className="flex-[1]" title="Full Screen Modal">
          <Modal size="xxl" />
        </Card>
      </div>
    </Layout>
  );
}
