import type { Metadata } from "next";
import "../../public/styles/globals.scss";
import NavigationComponent from "@/utilityComponents/NavigationComponent";
import FooterComponent from "@/utilityComponents/FooterComponent";

export const metadata: Metadata = {
  title: "Chiral",
  description: "The official website for chiral company.",
  openGraph: {
    title: "Chiral",
    images: ["./public/assets/svg/logo-1.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavigationComponent />
        {children}
        <FooterComponent />
      </body>
    </html>
  );
}
