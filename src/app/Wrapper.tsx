import Footer from "@/components/Global/Footer"
import Navbar from "@/components/Global/Navbar"
import WhatsAppFloating from "@/components/Global/WhatsAppFloating"

interface Props {
    children: React.ReactNode
    forceNavbarBackground?: boolean
}

export default function Wrapper({ children, forceNavbarBackground = false }: Props) {
    return (
        <div className=''>
            <Navbar forceBackground={forceNavbarBackground} />
            {children}
            <Footer />
            <WhatsAppFloating />
        </div>
    )
}
