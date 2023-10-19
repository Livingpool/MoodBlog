import Layout from "../../partials/dashboard/Layout";
import FileUpload from "../../partials/form/FileUpload";
import ImageUpload from "../../partials/form/ImageUpload";

export default function FormFile() {
  return (
    <Layout>
      <div className="p-20">
        <FileUpload />
        <br />
        <ImageUpload />
      </div>
    </Layout>
  );
}
