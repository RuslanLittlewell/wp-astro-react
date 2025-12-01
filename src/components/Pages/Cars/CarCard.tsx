import React from "react";
import { Button } from "@/components/ui/button";
import { CogIcon, FuelIcon, GaugeIcon } from "lucide-react";
import { Sheet } from "@/stores/sheet";
import { GetImageResult } from "astro";

function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}

interface Car {
  acf: {
    prices: {
      one_day?: number;
    };
    transfer: boolean;
    car: {
      car_info: {
        engine?: string;
        fuel_consumption?: string;
        transmission?: string;
      };
      car_images: string[];
    }
  };
  title: {
    rendered: string;
  };
  slug: string;
}

interface Props {
  car: Car;
  cover?: GetImageResult | null;
}

export const CarCard: React.FC<Props> = ({ car, cover }) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const WrapperTag: any = isDesktop ? "a" : "div";
  const { acf } = car;
  const price = acf.prices.one_day;
  const carInfo = acf.car.car_info;
  const images = acf.car.car_images;
  const { engine, fuel_consumption, transmission } = carInfo;
  const fallbackSrc = car.acf.car.car_images?.[0];
  const isTransfer = acf.transfer
  const attrs = cover?.attributes ?? {
    width: 500,
    height: 500,
    loading: "lazy",
    decoding: "async",
  };

  const handleOpenOrder = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    Sheet.open({
      title: car.title.rendered,
      side: "right",
      car: car,
      image: images[0],
      link: `/cars/${car.slug}`,
    });
  };
  const renderContent = () => {
    return (
      <>
        <img
          src={cover?.src ?? fallbackSrc}
          alt={car.title.rendered}
          {...attrs}
          className="relative w-full h-full object-cover group-hover:scale-125 transition-all ease-in-out duration-300"
        />

        <div className="transition-padding ease-in-out duration-500 text-denim-100 absolute top-0 left-0 w-full bg-gradient-to-b from-black/70 to-transparent p-4 pb-8 group-hover:pb-40">
          <div>
            <h2 className="text-xl font-normal flex flex-col">
              {car.title.rendered}
              {price && (
                <p className="text-denim-100 font-semibold text-2xl">
                  {isTransfer ? <span className="text-denim-300">Трансфер</span> : <><span className="text-denim-300">от</span>{" "}
                  <span className="text-[28px]">{price}</span>{" "}
                  <span className="text-denim-300">BYN</span>
                  </>}
                </p>
              )}
            </h2>
          </div>
        </div>

        <div className="flex gap-3 transition-opacity ease-in-out duration-300 absolute z-1 bottom-14 right-4 opacity-0 group-hover:opacity-100 group-hover:z-10">
          <Button className="bg-denim-300 hover:bg-denim-300/80">
            <a href={`/cars/${car.slug}`}>Подробнее</a>
          </Button>
          <Button
            className="bg-denim-300 hover:bg-denim-300/80"
            onClick={handleOpenOrder}
          >
            Быстрый заказ
          </Button>
        </div>

        <div className="transition-padding font-thin ease-in-out duration-500 text-denim-100 flex justify-end gap-3 absolute bottom-0 left-0 w-full bg-gradient-to-b to-black/70 from-transparent p-4 pt-8 group-hover:pt-40">
          {engine && (
            <span className="flex gap-1 items-center">
              <GaugeIcon />
              {engine}
            </span>
          )}
          {fuel_consumption && (
            <span className="flex gap-1 items-center">
              <FuelIcon />
              {fuel_consumption}
            </span>
          )}
          {transmission && (
            <span className="flex gap-1 items-center">
              <CogIcon />
              {transmission}
            </span>
          )}
        </div>
      </>
    );
  };
  return (
       <WrapperTag
      className="relative rounded-md overflow-hidden group shadow-md block"
      {...(isDesktop && { href: `/cars/${car.slug}` })}
    >
      {renderContent()}
    </WrapperTag>
  );
};
