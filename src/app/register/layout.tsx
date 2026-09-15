import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nexus Portal — Create Account",
  description: "Register a new Nexus Portal account to access your cloud workspace, collaborate with teammates, and deploy projects effortlessly.",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
