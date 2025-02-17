import Image from "next/image";
import Link from "next/link";

const Logo = () => {
    return (
        // <Link href="/" className="absolute top-1 left-1 md:top-8 md:left-6 group">
        <div className="relative scale-50">
            {/* Animated background */}
            <div className="absolute w-[100%] h-[100%] mt-2 -translate-x-1.5 -translate-y-1.5 rotate-45 rounded-2xl animate-neon-wave bg-neon-gradient">
            </div>

            {/* Logo container */}
            <div className="relative">
                <Image
                    src="/images/ehsaas-logo-white.png"
                    alt="Ehsaas Logo"
                    width={200}
                    height={200}
                    className="w-full h-full hover:opacity-100 z-10"
                />
            </div>
        </div>
    )
}

export default Logo;