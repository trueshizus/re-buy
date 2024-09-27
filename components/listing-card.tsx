import Image from "next/image";

type Listing = {
  id: number;
  created_at: string;
  name: string;
  code: string;
  description: string;
  started_at: string | null;
  completed_at: string | null;
  publisher_id: string;
  cover: string;
  buyer_id: string | null;
};

type Props = {
  listing: Listing;
};

const getCover = (cover: string) => {
  return `/assets/${cover}.png`;
};

export default function ListingCard({ listing }: Props) {
  return (
    <div className="flex flex-col h-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <Image
          className="rounded-t-lg w-full"
          src={getCover(listing.cover)}
          alt={listing.name}
          width={300}
          height={300}
        />
      </a>
      <div className="flex flex-col flex-grow p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {listing.name}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex-grow">
          {listing.description}
        </p>

        <form className="mt-auto">
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Start Auction
          </button>
        </form>
      </div>
    </div>
  );
}
