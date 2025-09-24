import { FC, JSX } from "react";

type RequirementCardProps = {
  icon: FC<{ className?: string }>;
  title: string;
  main: string;
  sub: string;
};

export const RequirementsBlock: FC = () => {
  return (
    <>
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <RequirementCard
        icon={TrafficConeIcon}
        title="Возраст"
        main="от 23-х лет"
        sub="от 18 лет увеличенный залог, нет страховки"
      />
      <RequirementCard
        icon={CarIcon}
        title="Водительский опыт"
        main="от 3-х лет"
        sub="без стажа будет увеличенный залог"
      />
    </div>
    </>
  );
}

function RequirementCard({ icon: Icon, title, main, sub }: RequirementCardProps): JSX.Element {
  return (
    <div className="flex items-center gap-4 bg-denim-700/60 rounded-xl p-3 lg:px-6 lg:py-4 w-full shadow-lg backdrop-blur">
      <div className="bg-denim-800 rounded-full p-3 flex items-center justify-center">
        <Icon className="size-6 text-white" />
      </div>
      <div>
        <div className="text-denim-900 text-xs md:text-sm mb-0.5">{title}</div>
        <div className="text-md lg:text-lg font-semibold text-denim-200">{main}</div>
        <div className="text-denim-900 text-xs md:text-sm">{sub}</div>
      </div>
    </div>
  );
}

function TrafficConeIcon({ className = "" }: { className?: string }): JSX.Element {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M7 20h10l-1.68-5H8.68L7 20zM9.73 13h4.54l-1.36-4H11.1l-1.37 4zM14.45 7l-.9-3H10.45l-.9 3h4.9z" />
    </svg>
  );
}

function CarIcon({ className = "" }: { className?: string }): JSX.Element {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M5 11l1.5-4.5h11L19 11H5zm-1 2h16v6h-2v-2H6v2H4v-6zm3.5 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
    </svg>
  );
}