export const metadata = {
  title: 'GadgetPicksPK - Premium Gadgets & Reviews',
  description: 'Automated product reviews and buying recommendations.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 antialiased">
        {children}
      </body>
    </html>
  );
}
