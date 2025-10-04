import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { FC, useState } from "react";

interface Props {
  images: string[];
}

export const CarSlider: FC<Props> = ({ images }) => {
  return (
    <div className="w-full mb-10">
      <Splide
        options={{
          type: "loop",
          perPage: 1,
          focus: "center",
          gap: "1rem",
          padding: "20%",
          arrows: true,
          pagination: false,
          autoplay: false,
          speed: 600,
          breakpoints: {
            768: {
              padding: "5%",
            },
          },
        }}
        className="w-auto"
      >
        {images.map((img: string, index: number) => (
          <SplideSlide
            key={index}
            className="rounded-lg shadow-lg overflow-hidden text-center"
          >
            <ZoomImage src={img} />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

// 🔍 Компонент с zoom-эффектом
const ZoomImage: FC<{ src: string }> = ({ src }) => {
  const [backgroundPosition, setBackgroundPosition] = useState("50% 50%");
  const [isZoomed, setIsZoomed] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setBackgroundPosition(`${x}% ${y}%`);
  };

  return (
    <div
      onMouseEnter={() => setIsZoomed(true)}
      onMouseLeave={() => setIsZoomed(false)}
      onMouseMove={handleMouseMove}
      className="w-full max-h-[600px] mx-auto cursor-zoom-in"
      style={{
        backgroundImage: `url(${src})`,
        backgroundSize: isZoomed ? "200%" : "cover", // увеличиваем картинку
        backgroundPosition: backgroundPosition,
        backgroundRepeat: "no-repeat",
        transition: "background-size 0.3s ease",
        aspectRatio: "16/9", // фиксированное соотношение сторон
      }}
    />
  );
};
