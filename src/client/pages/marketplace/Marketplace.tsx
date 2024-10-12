import { useNavigate } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MarketplaceItem = (item: any) => {
  return (
    <div className="mb-5 flex flex-col items-center justify-center gap-2">
      <div className="flex h-[120px] w-[120px] flex-col items-center justify-center">
        <img src={item.image} alt={item.name} className="h-[120px] w-[120px]" />
      </div>
      <button className="w-28 border-2 border-black bg-white text-2xl text-black">
        Buy
      </button>
    </div>
  );
};

const Marketplace = () => {
  const navigate = useNavigate();
  const marketplaceItems = [
    { name: "item1", price: 100, image: "/logo.png" },
    { name: "item2", price: 200, image: "/logo.png" },
    { name: "item3", price: 300, image: "/logo.png" },
    { name: "item3", price: 300, image: "/logo.png" },
    { name: "item3", price: 300, image: "/logo.png" },
    { name: "item3", price: 300, image: "/logo.png" },
  ];
  return (
    <div className="mx-auto flex h-[100vh] w-full max-w-screen-sm flex-col items-center pt-20">
      <div className="h-full w-full rounded-t-2xl bg-[#C48D5D] p-10 text-white">
        <div className="cursor-pointer text-xl" onClick={() => navigate("/")}>
          Back
        </div>
        <h1 className="mb-5 text-center text-3xl">Marketplace</h1>
        <div className="grid grid-cols-2 gap-4">
          {marketplaceItems.map((item) => (
            <MarketplaceItem key={item.name} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
