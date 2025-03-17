import { Navbar } from "./navbar";

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">
        <Navbar />
      </div>
      <div className="mt-16">
        <h1>Hello world!</h1>
      </div>
    </div>
  );
};

export default Home;
