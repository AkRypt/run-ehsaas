import { borel, sedgwickAveDisplay } from "@/app/fonts";

const V2Card = ({ member }: { member: any }) => {
    return (
        <div className="group relative w-full aspect-[2/3] transform transition-all duration-500">
            {/* Main Container */}
            <div className="relative h-full w-full overflow-hidden">
                {/* Background Image Layer */}
                <div className="absolute inset-0">
                    <img
                        src={member.image}
                        alt={member.name}
                        className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
                        onError={(e) => {
                            const img = e.target as HTMLImageElement;
                            img.src = '/images/placeholder.jpg';
                        }}
                    />
                    {/* Sophisticated Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />
                </div>

                {/* Content Wrapper */}
                <div className="relative h-full w-full p-6 flex flex-col justify-end">
                    {/* Vertical Line Decoration */}
                    <div className="absolute left-6 top-6 bottom-6 w-[1px]">
                        <div className="h-full w-full bg-gradient-to-b from-white/0 via-white/30 to-white/0" />
                    </div>

                    {/* Content Container */}
                    <div className="space-y-6">
                        {/* School Badge - Floating at top */}
                        <div className="absolute top-6 right-6">
                            <div className="px-4 py-1.5 backdrop-blur-sm bg-white/10 rounded-full border border-white/20">
                                <span className={`text-sm text-white/90 ${sedgwickAveDisplay.className}`}>
                                    {member.school}
                                </span>
                            </div>
                        </div>

                        {/* Name Section with Line Detail */}
                        <div className="space-y-1">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="h-[1px] w-8 bg-white/40" />
                                {/* <span className="text-xs tracking-[0.3em] text-white/60 uppercase">Member</span> */}
                            </div>
                            <h3 className={`text-2xl text-white ${borel.className} tracking-wide pl-12`}>
                                {member.name}
                            </h3>
                        </div>

                        {/* Position with Unique Design */}
                        <div className="relative pl-12">
                            <div className="inline-block">
                                <div className="relative">
                                    <span className="text-sm uppercase tracking-[0.2em] text-white/80 bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
                                        {member.position}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-white/10 to-transparent blur-2xl" />
                    <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent blur-2xl" />
                </div>
            </div>
        </div>
    );
};

export default V2Card;