const V1CaptainCard = ({ member }: { member: any }) => {
    return (
        <div className="relative aspect-[7/8] w-[300px] border border-transparent group">

            <img src="/images/frames/gold.png" alt="" className="absolute inset-0 w-full h-full z-10" />

            {/* Card Content */}
            <div className="relative h-full rounded-2xl overflow-hidden m-10">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent 
                                    " />
                <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 m-4 mb-6 text-white transform transition-transform 
                                    duration-200 group-hover:translate-y-[-10px]">
                    <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                    {/* <p className="text-red-200 font-semibold mb-2">{member.position}</p> */}
                    <div className="h-px w-12 bg-red-500/50 mb-3" />
                    <p className="text-sm text-gray-200">
                        {member.school}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default V1CaptainCard;