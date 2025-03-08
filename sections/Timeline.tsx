import { motion } from "framer-motion";

const Timeline = ({ performanceData, selectedYear, setSelectedYear, setCurrentIndex }: { performanceData: any, selectedYear: any, setSelectedYear: any, setCurrentIndex: any }) => {
    return (
        <div className="relative w-full mb-10 overflow-x-auto">
            <div className="flex justify-center px-4">  {/* Container for scrollable content */}
                {/* Connecting Line */}
                <div className="absolute top-[47px] left-0 right-0 h-0.5 bg-gradient-to-r from-red-500/20 via-white/20 to-red-500/20" />

                {/* Active Line Indicator */}
                {selectedYear && (
                    <motion.div
                        className="absolute top-[47px] left-0 h-0.5 bg-gradient-to-r from-red-500 to-red-600"
                        initial={{ width: '0%' }}
                        animate={{
                            width: `${(performanceData.findIndex((d: any) => d.year === selectedYear)) * 120}px`
                        }}
                        transition={{ duration: 0.3 }}
                    />
                )}

                {/* Timeline Points */}
                <div className="flex gap-20 relative p-1">  {/* Fixed gap between points */}
                    {performanceData.map((data: any, index: any) => (
                        <div key={data.year} className="flex flex-col items-center">
                            {/* Year Label */}
                            <span className={`text-lg font-medium transition-colors duration-300 
                                ${selectedYear === data.year ? 'text-red-500' : 'text-black/70'}`}>
                                {data.year}
                            </span>

                            {/* Timeline Point */}
                            <motion.button
                                onClick={() => {
                                    setSelectedYear(selectedYear === data.year ? null : data.year);
                                    setCurrentIndex(0);
                                }}
                                className={`w-6 h-6 rounded-full transition-all relative hover:scale-110 active:scale-95
                                    ${selectedYear === data.year
                                        ? 'bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)]'
                                        : 'bg-neutral hover:bg-neutral-800'}`}
                            >
                                {/* Inner Ring */}
                                <span className={`absolute inset-1 rounded-full border-2 transition-colors duration-300
                                    ${selectedYear === data.year
                                        ? 'border-white/50'
                                        : 'border-white/20 group-hover:border-white/30'}`}
                                />

                                {/* Center Dot */}
                                <span className={`absolute inset-2 rounded-full transition-all duration-300
                                    ${selectedYear === data.year
                                        ? 'bg-white scale-100'
                                        : 'bg-white/50 scale-75'}`}
                                />
                            </motion.button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Timeline;
