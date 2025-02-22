import { bonheurRoyale, borel, sedgwickAveDisplay, yellowtail } from "@/app/fonts";

const EBoardCard = ({ member }: { member: any }) => {
    return (
        <div className={`relative w-full bg-yellow-500 rounded-2xl p-1 backdrop-blur-sm ${sedgwickAveDisplay.className}`}>
            {/* School Badge */}
            <div className="absolute -top-4 -left-4 z-10">
                <div className="px-4 py-1.5 bg-red-500 rounded border-4 shadow-xl">
                    <span className="text-md md:text-2xl text-white">{member.school}</span>
                </div>
            </div>

            {/* Image Container */}
            <div className="relative aspect-[6/8] rounded-2xl overflow-hidden">
                <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Info Card */}
            <div className={`absolute -left-4 -right-4 -bottom- pb-1 tracking-widest`}>
                <div className="bg-red-500 rounded-full px-2 md:px-4 py-1 border-4 border-yellow-500">
                    <h3 className="text-md md:text-2xl px-1 text-white">
                        {member.name}
                    </h3>
                </div>
                <div className="absolute -bottom-6 right-0 z-10 shadow-xl">
                    <div className="px-4 md:px-8 py-1 md:py-1.5 bg-white border-black border-2 rounded-full">
                        <span className="text-xs md:text-sm font-bold text-red-500">{member.position}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EBoardCard;