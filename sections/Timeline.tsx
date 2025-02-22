import { motion } from "framer-motion";

const Timeline = ({ performanceData, selectedYear, setSelectedYear, setCurrentIndex }: { performanceData: any, selectedYear: any, setSelectedYear: any, setCurrentIndex: any }) => {
    return (
        <div className="relative w-full mb-20 overflow-x-auto">
            <div className="flex justify-center px-4">  {/* Container for scrollable content */}
                {/* Connecting Line */}
                <div className="absolute top-[47px] left-0 right-0 h-0.5 bg-white/20" />

                {/* Active Line Indicator */}
                {selectedYear && (
                    <motion.div
                        className="absolute top-[47px] left-0 h-0.5 bg-red-500"
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
                            <span className="text-white/80 text-lg">
                                {data.year}
                            </span>

                            {/* Timeline Point */}
                            <motion.button
                                onClick={() => {
                                    setSelectedYear(selectedYear === data.year ? null : data.year);
                                    setCurrentIndex(0);
                                }}
                                className={`w-6 h-8 rounded-full border-2 transition-colors relative
                                ${selectedYear === data.year
                                        ? 'bg-red-500 border-red-500'
                                        : 'bg-neutral border-white/20 hover:border-white'}`}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {/* Inner Dot */}
                                <span className={`absolute inset-2 rounded-full transition-colors
                                ${selectedYear === data.year ? 'bg-white' : 'bg-transparent'}`}
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
