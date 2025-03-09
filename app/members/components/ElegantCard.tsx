import { bonheurRoyale, borel, sedgwickAveDisplay, yellowtail } from "@/app/fonts";

const ElegantCard = ({ member }: { member: any }) => {
    return (
        <div className="group relative w-full transform transition-all duration-300 hover:scale-[1.01]">
            {/* Main Card Container */}
            <div className={`relative w-full bg-gradient-to-br from-stone-100 to-white rounded-xl p-0.5 shadow-lg ${sedgwickAveDisplay.className}`}>
                {/* Inner Container with border */}
                <div className="relative border border-stone-200/60 rounded-xl overflow-hidden">
                    {/* School Badge - Elegant floating label */}
                    <div className="absolute top-4 left-4 z-10">
                        <div className="px-4 py-1.5 bg-white/90 rounded-md shadow-sm backdrop-blur-sm border border-stone-200">
                            <span className="text-sm text-stone-800 font-medium tracking-wide">{member.school}</span>
                        </div>
                    </div>

                    {/* Position Badge - Subtle indicator */}
                    <div className="absolute top-4 right-4 z-10">
                        <div className="px-3 py-1.5 bg-white/90 rounded-md border border-stone-200 shadow-sm backdrop-blur-sm">
                            <span className="text-xs font-medium text-stone-600 tracking-wider uppercase">{member.position}</span>
                        </div>
                    </div>

                    {/* Image Container with subtle effects */}
                    <div className="relative aspect-[6/8]">
                        <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-[1.02]"
                            onError={(e) => {
                                const img = e.target as HTMLImageElement;
                                img.src = '/images/placeholder.jpg';
                            }}
                        />
                        {/* Elegant Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    </div>

                    {/* Name Card - Sophisticated positioning */}
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/80 to-transparent pt-12">
                        <h3 className={`text-xl md:text-2xl text-white font-light tracking-wide ${borel.className}`}>
                            {member.name}
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ElegantCard;