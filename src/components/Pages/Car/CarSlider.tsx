import { Splide, SplideSlide } from "@splidejs/react-splide";
import { FC, useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import splideCssUrl from "@splidejs/splide/dist/css/splide.min.css?url";
import lightboxCssUrl from "yet-another-react-lightbox/styles.css?url";

interface Props {
  images: string[];
}

export const CarSlider: FC<Props> = ({ images }) => {
  const [index, setIndex] = useState<number | null>(null);
  useEffect(() => {
    const ensureStylesheet = (href: string) => {
      if (document.head.querySelector(`link[data-dynamic-styles="${href}"]`)) {
        return;
      }
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      link.dataset.dynamicStyles = href;
      document.head.appendChild(link);
    };
    ensureStylesheet(splideCssUrl);
    ensureStylesheet(lightboxCssUrl);
  }, []);

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
              className="rounded-lg shadow-lg cursor-pointer w-full object-cover md:h-[600px]"
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
