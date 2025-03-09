import { FaFacebook, FaInstagram, FaTiktok, FaTwitter, FaEnvelope } from 'react-icons/fa';

export const Footer = () => {
    return (
        <footer id="footer" className="relative">
            {/* Fun wavy border */}
            <div className="absolute top-0 left-0 w-full overflow-hidden" style={{ transform: 'translateY(-98%)' }}>
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-20 rotate-180">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                        className="fill-[#ff3333]"></path>
                </svg>
            </div>

            <div className="bg-gradient-to-br from-[#ff3333] via-[#ff4444] to-[#ff2222] pt-16 pb-12 relative overflow-hidden">
                {/* Floating circles background */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -left-16 -top-16 w-64 h-64 rounded-full bg-white/10 blur-xl"></div>
                    <div className="absolute right-20 top-20 w-32 h-32 rounded-full bg-white/10 blur-lg"></div>
                    <div className="absolute left-1/2 bottom-10 w-48 h-48 rounded-full bg-white/10 blur-xl"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    {/* Main Content */}
                    <div className="text-center max-w-2xl mx-auto space-y-6">
                        <div className="relative inline-block">
                            <h3 className="text-4xl font-bold text-white mb-2 animate-bounce">
                                Let's Dance Together! 💃🕺
                            </h3>
                        </div>

                        <p className="text-white/90 leading-relaxed text-lg">
                            Whether you're a photographer capturing the perfect moment,
                            a performer ready to shine, or just someone who loves to move —
                            we want to create something amazing with you! ✨
                        </p>

                        <a
                            href="mailto:ehsaasdance@gmail.com"
                            className="inline-flex items-center text-xl md:text-2xl gap-2 px-8 py-4 rounded-full bg-white backdrop-blur-sm bg-opacity-20 hover:bg-opacity-30 transition-all duration-300 text-white font-medium group border border-white/30"
                        >
                            <FaEnvelope className="group-hover:rotate-12 transition-transform" />
                            ehsaasdance@gmail.com
                        </a>
                    </div>

                    {/* Social Links */}
                    <div className="mt-16 text-center">
                        <div className="inline-flex items-center justify-center p-6 rounded-full bg-white/10 backdrop-blur-sm border border-white/30">
                            {[
                                { icon: FaFacebook, label: "Facebook", hover: "hover:text-blue-400" },
                                { icon: FaInstagram, label: "Instagram", hover: "hover:text-pink-300" },
                                { icon: FaTiktok, label: "TikTok", hover: "hover:text-purple-300" },
                                { icon: FaTwitter, label: "Twitter", hover: "hover:text-blue-300" }
                            ].map((social, index) => (
                                <a
                                    key={social.label}
                                    href="#"
                                    className={`text-3xl text-white ${social.hover} transition-all transform hover:scale-125 hover:-translate-y-2 mx-6`}
                                    aria-label={social.label}
                                >
                                    <social.icon />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="mt-16">
                        <p className="text-[8px] text-white/70">
                            Built with ❤️ by <a href="https://github.com/akrypt" className="hover:text-white">Akshit</a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};