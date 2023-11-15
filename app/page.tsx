import ECommerce from "@/components/Dashboard/E-commerce";
import SignIn from "@/components/Login/Login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TailAdmin | Next.js E-commerce Dashboard Template",
  description: "This is Home Blog page for TailAdmin Next.js",
  // other metadata
};

export default function Home() {
  return (
    <>
      <SignIn />
    </>
  );
}
