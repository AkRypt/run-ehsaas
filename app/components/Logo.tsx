import Image from "next/image";
import Link from "next/link";

const Logo = () => {
    return (
        <Link href="/" className="absolute top-8 left-8 z-50">
            <Image
                src="/images/ehsaas-logo-white.png"
                alt="Ehsaas Logo"
                width={180}
                height={30}
                className="hover:opacity-100 transition-opacity"
            />
        </Link>
    )
}

export default Logo;