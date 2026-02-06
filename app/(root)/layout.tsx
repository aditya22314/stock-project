import Header from "@/components/header/header"

const Layout = ({children}:{children:React.ReactNode}) => {
  return (
    <main className="min-h-screen text-gray-400">
      <Header />
      <div className="container">{children}</div>
    </main>
  )
}

export default Layout
