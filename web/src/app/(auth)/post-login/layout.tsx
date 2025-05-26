import { ThemeProvider } from "@/components/common/ThemeProvider";
export default function DashboardNewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
  );
}
