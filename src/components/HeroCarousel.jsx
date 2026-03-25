import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    eyebrow: "New Season",
    title: "Quiet luxury for everyday rotation.",
    copy: "Tailored silhouettes, premium textures, and a storefront that feels elevated on every screen.",
    image: "https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg",
  },
  {
    eyebrow: "Women",
    title: "Statement layers with a clean editorial finish.",
    copy: "Discover signature outerwear, neutral palettes, and the latest refined arrivals.",
    image: "https://images.pexels.com/photos/8306365/pexels-photo-8306365.jpeg",
  },
  {
    eyebrow: "Men",
    title: "Sharp essentials built for movement.",
    copy: "Minimal, modern, and easy to style across work, weekends, and everything in between.",
    image: "https://images.pexels.com/photos/5264900/pexels-photo-5264900.jpeg",
  },
];

export default function HeroCarousel() {
  const navigate = useNavigate();

  return (
    <section className="px-4 pb-8 pt-2 sm:px-6">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-white/60 shadow-[0_30px_120px_rgba(23,19,18,0.12)]">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          className="h-[72vh] min-h-105 max-h-180"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.title}>
              <div
                className="relative h-full bg-cover bg-top "
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,12,10,0.84)_0%,rgba(16,12,10,0.52)_40%,rgba(16,12,10,0.18)_100%)]" />
                <div className="relative flex h-full max-w-3xl flex-col justify-center gap-6 px-8 py-16 text-white sm:px-14">
                  <p className="text-xs uppercase tracking-[0.5em] text-amber-200">{slide.eyebrow}</p>
                  <h1 className="font-['Sora'] text-4xl font-semibold leading-tight sm:text-6xl">
                    {slide.title}
                  </h1>
                  <p className="max-w-xl text-base leading-7 text-stone-200 sm:text-lg">{slide.copy}</p>
                  <div className="flex flex-wrap gap-4">
                    <button
                      type="button"
                      onClick={() => navigate("/shop")}
                      className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-stone-950 transition hover:bg-amber-100"
                    >
                      Shop Now
                      <ArrowRight size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate("/contact")}
                      className="rounded-full border border-white/40 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
                    >
                      Explore Story
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
