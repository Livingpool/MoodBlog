import FooterWithSocialLinks from "./Footer";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <FooterWithSocialLinks />
    </div>
  );
}
