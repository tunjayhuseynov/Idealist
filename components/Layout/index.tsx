import az from "antd/locale/az_AZ";
import { ConfigProvider } from "antd";
import Navbar from "components/Navbar/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <ConfigProvider locale={az}>
        <Navbar />
        <main>{children}</main>
      </ConfigProvider>
    </div>
  );
}
