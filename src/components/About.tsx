
import { Award, Users, Clock, CheckCircle } from "lucide-react";

const About = () => {
  const stats = [
    { icon: Users, number: "0", label: "Happy Customers" },
    { icon: CheckCircle, number: "1", label: "PCs Built" },
    { icon: Award, number: "0", label: "Years Experience" },
    { icon: Clock, number: "24/7", label: "Support" }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're passionate about technology and committed to delivering the perfect PC for your needs
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <stat.icon className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Expert PC Building Services</h3>
            <p className="text-gray-600 mb-6">
              With years of experience in custom PC building, we understand that every user has unique requirements. 
              Whether you're a hardcore gamer, creative professional, or need a reliable office computer, we have the expertise to build the perfect system.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                <span>Quality components from trusted brands</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                <span>Professional assembly and testing</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                <span>Warranty on all builds</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                <span>Post-build support and maintenance</span>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-8 text-white">
            <h4 className="text-2xl font-bold mb-4">Ready to Build?</h4>
            <p className="mb-6">Get started with your custom PC build today. Our experts are ready to help you create the perfect system.</p>
            <button 
              onClick={() => window.open("https://docs.google.com/forms/d/e/1FAIpQLSdsIHL0t6ncDmUvefH5kcwqXrl8KLVsMzZPkRoVg2EnptfLqg/viewform?usp=sharing&ouid=116212659458202049109", "_blank")}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Your Build
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
