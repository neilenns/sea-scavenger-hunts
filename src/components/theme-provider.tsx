// Migrated to https://themes.wrksz.dev/docs to deal with errors using next themes in nextjs 16
import { ThemeProvider } from "@wrksz/themes/next";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
