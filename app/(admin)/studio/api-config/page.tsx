import type { Metadata } from "next";
import { ApiConfigStudioView } from "./view";

export const metadata: Metadata = {
  title: "API & Model Configuration",
  description: "Secure management of external API credentials, AES-256 encrypted secrets, and AI model parameters.",
};

export default function ApiConfigPage() {
  return <ApiConfigStudioView />;
}

