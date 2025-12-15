import Spinner from "@/app/_components/Spinner";

function Loader() {
  return (
    <div className="grid items-center justify-center">
      <Spinner />
      <p className="text-xl text-primary-200">Loading cabin data...</p>
    </div>
  );
}

export default Loader;
