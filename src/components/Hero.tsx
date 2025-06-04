import { ArrowRight, Zap } from "lucide-react";
import AnimatedShakeWheelButton from "./AnimatedShakeWheelButton";

const Hero = () => {
  const handleBuildPCClick = () => {
    window.open(
      "https://docs.google.com/forms/d/e/1FAIpQLSdsIHL0t6ncDmUvefH5kcwqXrl8KLVsMzZPkRoVg2EnptfLqg/viewform?usp=dialog",
      "_blank"
    );
  };

  return (
    <section id="home" className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Build Your Dream PC
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Custom PC builds tailored to your needs. Gaming, workstation, or office - we've got you covered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <AnimatedShakeWheelButton onClick={handleBuildPCClick}>
              <div className="flex items-center space-x-2 text-white font-semibold text-lg">
                <Zap className="h-5 w-5" />
                <span>Build PC Now</span>
                <ArrowRight className="h-5 w-5" />
              </div>
            </AnimatedShakeWheelButton>
            <a 
              href="#services" 
              className="border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
            >
              View Services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
