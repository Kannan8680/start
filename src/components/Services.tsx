
import { Gamepad2, Briefcase, Home, Server } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Gamepad2,
      title: "Gaming PCs",
      description: "High-performance gaming rigs with the latest GPUs and processors for ultimate gaming experience.",
      features: ["RTX 40 Series GPUs", "Latest AMD/Intel CPUs", "RGB Lighting", "Liquid Cooling"],
      color: "from-red-500 to-pink-500"
    },
    {
      icon: Briefcase,
      title: "Workstations",
      description: "Professional workstations for content creation, 3D rendering, and heavy computational tasks.",
      features: ["Workstation GPUs", "Multi-core CPUs", "ECC Memory", "Professional Support"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Home,
      title: "Home & Office PCs",
      description: "Reliable and efficient computers for everyday tasks, work, and productivity.",
      features: ["Energy Efficient", "Quiet Operation", "Productivity Focused", "Budget Friendly"],
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Server,
      title: "Custom Builds",
      description: "Specialized builds for unique requirements including servers and specialized applications.",
      features: ["Custom Configuration", "Specialized Components", "Consultation Included", "Future Upgrades"],
      color: "from-purple-500 to-indigo-500"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From gaming beasts to professional workstations, we build PCs that exceed expectations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
              <div className={`bg-gradient-to-r ${service.color} p-6 text-white`}>
                <service.icon className="h-12 w-12 mb-4" />
                <h3 className="text-2xl font-bold">{service.title}</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
