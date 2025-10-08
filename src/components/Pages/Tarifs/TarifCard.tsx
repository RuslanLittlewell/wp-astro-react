import { Button } from "@/components/ui/button";
import { Sheet } from "@/stores/sheet";
import { FC } from "react";

interface Car {
  acf: {
    prices: {
      one_day?: string;
      more_than_week?: string;
      almost_month: string;
      more_month: string;
    };
    car: {
      car_info: {
        engine?: string;
        fuel_consumption?: string;
        transmission?: string;
      };
      car_images: string[];
    };
  };
  title: {
    rendered: string;
  };
  slug: string;
}

interface Props {
  car: Car;
}

export const TarifCard: FC<Props> = ({ car }) => {
  const { acf } = car;
  const prices = acf.prices;
  const images = acf.car.car_images;

  const handleOpenOrder = () => {
    Sheet.open({
      title: car.title.rendered,
      side: "right",
      car: car,
      image: images[0],
      link: `/cars/${car.slug}`,
    });
  };

  return (
    <article className="bg-gray-800/90 rounded-3xl shadow-xl ring-1 p-4 md:p-6  ring-black/10 overflow-hidden">
      <p className="hidden md:block  text-white mb-2">{car.title.rendered}</p>
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        <div className="hidden md:flex md:w-[150px] flex-col">
          <img
            src={images[0]}
            alt={car.title.rendered}
            width={150}
            height={150}
            loading="lazy"
            decoding="async"
            className="relative w-full h-full object-cover"
          />
        </div>

        <div className="flex-1">
          <div className="md:hidden space-y-4">
            <div className="grid grid-cols-[30%_1fr] text-neutral-200">
              <div className="text-neutral-100 border-b border-white/20 pb-2">Автомобиль</div>
              <div className="grid grid-cols-[60px_1fr] gap-2 pl-10 items-center border-b border-white/20 pb-2">
                <img
                  src={images[0]}
                  alt={car.title.rendered}
                  width={150}
                  height={150}
                  loading="lazy"
                  decoding="async"
                  className="relative w-[60px] h-auto object-contain rounded-md"
                />
                <span className="text-md">{car.title.rendered}</span>
              </div>
              <div className="opacity-80 border-b border-white/20 pb-2">1–2 суток</div>
              <div className="text-right font-medium border-b border-white/20 pb-2">{prices.one_day} BYN</div>
              <div className="opacity-80 border-b border-white/20 pb-2">3–10 суток</div>
              <div className="text-right font-medium border-b border-white/20 pb-2">
                {prices.more_than_week} BYN
              </div>
              <div className="opacity-80 border-b border-white/20 pb-2">11–29 суток</div>
              <div className="text-right font-medium border-b border-white/20 pb-2">
                {prices.almost_month} BYN
              </div>
              <div className="opacity-80 border-b border-white/20 pb-2"> {'>'} 30 суток</div>
              <div className="text-right font-medium border-b border-white/20 pb-2">
                меньше {prices.more_month} BYN
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button className="bg-denim-300 hover:bg-denim-300/80 w-full">
                <a href={`/cars/${car.slug}`}>Подробнее</a>
              </Button>
              <Button
                className="bg-denim-300 hover:bg-denim-300/80 w-full"
                onClick={handleOpenOrder}
              >
                Быстрый заказ
              </Button>
            </div>
          </div>

          <div className="hidden md:grid grid-cols-6 items-center">
            <div className="text-neutral-200 border-b border-white/20 pb-2">
              Тариф
            </div>
            <div className="text-neutral-200 text-center border-b border-white/20 pb-2">
              1–2 суток
            </div>
            <div className="text-neutral-200 text-center border-b border-white/20 pb-2">
              3–10 суток
            </div>
            <div className="text-neutral-200 text-center border-b border-white/20 pb-2">
              11–29 суток
            </div>
            <div className="text-neutral-200 text-center border-b border-white/20 pb-2">
              30 суток и более
            </div>
            <div></div>

            <div className="text-neutral-200 border-r border-white/20 h-full flex items-center">
              Стоимость в BYN
            </div>
            <div className="text-lg font-semibold text-center text-white">
              {prices.one_day}
            </div>
            <div className="text-lg font-semibold text-center text-white">
              {prices.more_than_week}
            </div>
            <div className="text-lg font-semibold text-center text-white">
              {prices.almost_month}
            </div>
            <div className="text-lg font-semibold text-center text-white">
              меньше {prices.more_month}
            </div>

            <div className="flex items-center flex-col justify-end gap-3 pl-2">
              <Button className="bg-denim-300 hover:bg-denim-300/80 w-full">
                <a href={`/cars/${car.slug}`}>Подробнее</a>
              </Button>
              <Button
                className="bg-denim-300 hover:bg-denim-300/80 w-full"
                onClick={handleOpenOrder}
              >
                Быстрый заказ
              </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
