import { Quote } from "lucide-react"
import Image from "next/image"

interface TestimonialCardProps {
    testimonial: {
        name: string
        role: string
        rating: number
        title: string
        testimonialText: string
        imageUrl: string
    }
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
    const { name, role, rating, title, testimonialText, imageUrl } = testimonial;

    return (
        <div className="relative w-full bg-primary rounded-md p-3 md:p-6 shadow-xl h-full flex flex-col">
            <div className="flex items-start gap-4 mb-4 md:mb-4">
                <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-white/20">
                    <Image src={imageUrl} alt={name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                    <h3 className="font-medium text-white text-sm md:text-lg">{name}</h3>
                    <p className="text-white/80 text-sm italic">{role}</p>
                    <div className="flex gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                            <svg
                                key={i}
                                className={`w-4 h-4 ${i < rating ? "text-yellow-400" : "text-gray-400"}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>
                </div>
            </div>
            <h4 className=" text-sm md:text-xl font-bold text-white mb-2 md:mb-3 uppercase tracking-wide">
                {title}
            </h4>
            <div className="relative mt-1 md:mt-2">
                <Quote className="absolute -top-0 -left-0 w-4 h-4 text-white/30" />
                <p className="text-white/90 leading-relaxed flex-1 pl-6">
                    {testimonialText}
                </p>
                <Quote className="absolute -bottom-0 -right-0 w-4 h-4 text-white/30 rotate-180" />
            </div>
        </div>
    )
}