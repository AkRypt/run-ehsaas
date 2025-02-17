import Image from "next/image";
import Link from "next/link";

const Logo = () => {
    return (
        <Link href="/" className="absolute top-1 left-1 md:top-8 md:left-6 group">
            <div className="relative p-6">
                {/* Animated background */}
                <div className="absolute inset-0 w-[30vw] h-[30vw] md:w-[10vw] md:h-[10vw] ml-8 md:ml-10 mt-6 -translate-x-1.5 -translate-y-1.5 rotate-45 rounded-2xl animate-neon-wave bg-neon-gradient">
                </div>
                
                {/* Logo container */}
                <div className="relative">
                    <Image
                        src="/images/ehsaas-logo-white.png"
                        alt="Ehsaas Logo"
                        width={180}
                        height={30}
                        className="w-[120px] md:w-[180px] h-auto md:h-[30px] hover:opacity-100 transition-opacity z-10"
                    />
                </div>
            </div>
        </Link>
    )
}

export default Logo;