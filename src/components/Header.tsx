import { Monitor, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <style>{`
        @keyframes blueGradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animated-itb {
          background: linear-gradient(270deg, #2563eb, #3b82f6, #60a5fa, #2563eb);
          background-size: 600% 600%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: blueGradient 6s ease infinite;
          font-weight: 900;
        }
      `}</style>

      <header className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Monitor className="h-8 w-8 text-blue-500" />
              <span className="text-2xl animated-itb">ITB</span>
            </div>

            <nav className="hidden md:flex space-x-8">
              <a href="#home" className="hover:text-blue-400 transition-colors">Home</a>
              <a href="#services" className="hover:text-blue-400 transition-colors">Services</a>
              <a href="#about" className="hover:text-blue-400 transition-colors">About</a>
              <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
            </nav>

            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4">
              <div className="flex flex-col space-y-2">
                <a href="#home" className="hover:text-blue-400 transition-colors py-2">Home</a>
                <a href="#services" className="hover:text-blue-400 transition-colors py-2">Services</a>
                <a href="#about" className="hover:text-blue-400 transition-colors py-2">About</a>
                <a href="#contact" className="hover:text-blue-400 transition-colors py-2">Contact</a>
              </div>
            </nav>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
