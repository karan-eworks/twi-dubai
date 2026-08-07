import { ClientChrome } from "./client-chrome";
import { Footer } from "./footer";
import { Header } from "./header";

function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex flex-1 flex-col">
      <ClientChrome />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default SiteLayout;
