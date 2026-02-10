import Image from "next/image"
import Link from "next/link"
import NavItems from "../navItems"
import UserDropdown from "../UserDropdown"

const Header = ({ user }: { user: { id: string, name: string, email: string } }) => {
    return (
        //  Keeps the element sticky and top-0 ensures it stays at the top of the viewport
        <header className="sticky top-0 header">
            <div className="container header-wrapper">
                <Link href="/">
                    <Image src="/assets/icons/logo.svg" alt="Logo" width={140} height={90} className=" cursor-pointer" />
                </Link>
                <nav className="hidden sm:block">
                    <NavItems />
                </nav>
                <UserDropdown user={user}/>
            </div>
        </header>
    )
}

export default Header