export const metadata = {
  title: "LookingForName — Check Domain, Trademark & Social Handles",
  description: "Instantly check if your brand name is available across domains, social media, and trademarks.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
