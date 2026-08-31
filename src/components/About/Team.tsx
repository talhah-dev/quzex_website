"use client";

import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";
import Image from "next/image";

type TeamMember = {
    name: string;
    role: string;
    image: string;
}[];

const teamData: TeamMember = [
    {
        name: "Muhammad Talha",
        role: "Full Stack Developer",
        image: "https://res.cloudinary.com/deo5ex1zo/image/upload/v1772854472/talha_du0ahk.png",
    },
    {
        name: "Ammar Khalid",
        role: "CEO",
        image: "https://res.cloudinary.com/deo5ex1zo/image/upload/v1772854503/ammar_ubs1kx.png",
    },
    {
        name: "Muhammad Ali",
        role: "COO",
        image: "https://res.cloudinary.com/deo5ex1zo/image/upload/v1772853517/ali_wkaonw.png",
    },
    {
        name: "Karan",
        role: "UI/UX Designer",
        image: "https://px5rxm1szlmbgpc7.public.blob.vercel-storage.com/assets/home/Karan.jpeg",
    },
    {
        name: "Hadi",
        role: "Marketing",
        image: "https://px5rxm1szlmbgpc7.public.blob.vercel-storage.com/assets/home/Hadi.jpeg",
    },
    {
        name: "Areeba",
        role: "Marketing",
        image: "https://px5rxm1szlmbgpc7.public.blob.vercel-storage.com/assets/home/areeba.png",
    },
];

const Team = () => {
    return (
        <section>
            <div className="lg:py-20 sm:py-16 py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-16 flex flex-col items-center justify-center gap-8 md:gap-16">
                    <motion.div
                        initial={{ y: -40, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.8,
                            ease: [0.21, 0.47, 0.32, 0.98],
                        }}
                        className="max-w-xl mx-auto flex flex-col items-center justify-center text-center gap-4"
                    >
                        <Badge variant={"outline"} className="px-3 py-1 h-auto text-sm">
                            Team
                        </Badge>
                        <h2 className="text-3xl md:text-5xl font-medium text-foreground">
                            Meet the creative minds behind our success
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                        {teamData.map((value, index) => {
                            return (
                                <motion.div
                                    key={value.name}
                                    initial={{ y: 40, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.8,
                                        delay: index * 0.1,
                                        ease: [0.21, 0.47, 0.32, 0.98],
                                    }}
                                    className="group flex flex-col items-center gap-5"
                                >
                                    {/* Fixed-ratio image container — every card is identical height */}
                                    <div className="relative w-full aspect-[3/4] overflow-hidden rounded-[2rem]">
                                        <Image
                                            className="object-cover object-top transition-all duration-500 group-hover:grayscale group-hover:scale-105"
                                            src={value.image}
                                            alt={value.name}
                                            fill
                                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                        />
                                    </div>

                                    <div className="w-full flex flex-col gap-1.5 items-center justify-center">
                                        <h3 className="text-2xl font-medium text-foreground">
                                            {value.name}
                                        </h3>
                                        <p className="text-center text-sm font-normal text-muted-foreground">
                                            {value.role}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Team;
