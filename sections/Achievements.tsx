import { bonheurRoyale } from "@/app/fonts";
import { motion } from "framer-motion";

const Achievements = () => {
    return (
        <section className="py-14 px-8 md:p-24">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >

                <h2 className={`text-4xl md:text-5xl mb-2 ${bonheurRoyale.className}`}>
                    Achievements
                </h2>
            </motion.div>
        </section>
    )
}

export default Achievements;