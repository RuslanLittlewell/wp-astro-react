import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { FC } from "react";

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
        className="w-auto "
      >
        {images.map((img: string, index: number) => (
          <SplideSlide
            key={index}
            className="rounded-lg shadow-lg overflow-hidden lg:h-[50vh] text-center"
          >
              <img src={img} alt="car" className="object-cover w-full h-full mx-auto" />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};
