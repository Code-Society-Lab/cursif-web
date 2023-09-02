export default function RootLayout({ children, params }: { children: React.ReactNode }) {
  const notebook_id = params.notebook_id;

  return (
    <div className="min-w-[350px]">
      {children}
    </div>
  )
}
