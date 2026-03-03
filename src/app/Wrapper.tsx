import Footer from "@/components/Global/Footer"
import Navbar from "@/components/Global/Navbar"

interface Props {
    children: React.ReactNode
}

export default function Wrapper({ children }: Props) {
    return (
        <div className=''>
            <Navbar />
            {children}
            <Footer />
        </div>
    )
}
