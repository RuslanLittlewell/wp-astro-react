import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { FC, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

interface Props {
  images: string[];
}

export const CarSlider: FC<Props> = ({ images }) => {
  const [index, setIndex] = useState<number | null>(null);

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
          breakpoints: { 768: { padding: "5%" } },
        }}
      >
        {images.map((img, i) => (
          <SplideSlide key={i}>
            <img
              src={img}
              alt={`car-${i}`}
              className="rounded-lg shadow-lg cursor-pointer w-full h-auto object-cover"
              onClick={() => setIndex(i)}
            />
          </SplideSlide>
        ))}
      </Splide>

      <Lightbox
        open={index !== null}
        index={index ?? 0}
        close={() => setIndex(null)}
        slides={images.map((src) => ({ src }))}
        plugins={[Zoom]}
      />
    </div>
  );
};
