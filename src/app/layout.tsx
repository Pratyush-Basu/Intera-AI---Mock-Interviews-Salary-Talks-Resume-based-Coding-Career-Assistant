import "@/styles/globals.css";
import { cn } from "@/lib";
import { generateMetadata } from "@/utils";
import { base, heading } from "@/constants";
import { Toaster } from "@/components/ui/sonner";
import { subheading } from "@/constants/fonts";
import { ClientSessionProvider } from "@/components/providers/session-provider";

export const metadata = generateMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background text-foreground antialiased font-heading overflow-x-hidden !scrollbar-hide scroll-smooth",
          base.variable,
          heading.variable,
          subheading.variable
        )}
        suppressHydrationWarning
      >
        <ClientSessionProvider>
          <Toaster richColors theme="dark" position="top-right" />
          {children}
        </ClientSessionProvider>
      </body>
    </html>
  );
}
