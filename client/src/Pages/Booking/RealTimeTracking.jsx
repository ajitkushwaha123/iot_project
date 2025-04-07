import { CheckCircle, Clock, MapPin, Truck } from "lucide-react";

const routeCities = [
  { name: "Delhi", status: "completed", time: "9:00 AM" },
  { name: "Jaipur", status: "completed", time: "12:30 PM" },
  { name: "Udaipur", status: "current", time: "3:15 PM" },
  { name: "Ahmedabad", status: "upcoming", time: "6:00 PM" },
  { name: "Mumbai", status: "upcoming", time: "9:30 PM" },

  { name: "Jaipur", status: "completed", time: "12:30 PM" },
  { name: "Udaipur", status: "current", time: "3:15 PM" },
  { name: "Ahmedabad", status: "upcoming", time: "6:00 PM" },
  { name: "Mumbai", status: "upcoming", time: "9:30 PM" },
  { name: "Jaipur", status: "completed", time: "12:30 PM" },
  { name: "Udaipur", status: "current", time: "3:15 PM" },
  { name: "Ahmedabad", status: "upcoming", time: "6:00 PM" },
  { name: "Mumbai", status: "upcoming", time: "9:30 PM" },
];

const RealTimeTracking = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col lg:flex-row gap-6">
      {/* Map */}
      <div className="w-full lg:w-2/3 h-96 lg:h-auto rounded-xl overflow-hidden shadow-md border border-gray-700">
        <iframe
          title="Live Map"
          className="w-full h-full"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.1160986074!2d72.74109980410777!3d19.082522317882193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b63aee4e3407%3A0xe4e9a7bbd5ac5a49!2sMumbai!5e0!3m2!1sen!2sin!4v1712242442046!5m2!1sen!2sin"
          allowFullScreen
        ></iframe>
      </div>

      {/* Tracking Details */}
      <div className="w-full lg:w-1/3 bg-gray-800 rounded-xl p-6 shadow-md flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
            <Truck className="w-5 h-5" />
            Live Route Tracker
          </h2>

          {/* Route Timeline */}
          <div className="space-y-6 max-h-[90vh] overflow-y-scroll chalaja">
            {routeCities.map((city, index) => {
              let icon, bg;
              if (city.status === "completed") {
                icon = <CheckCircle className="w-5 h-5 text-white" />;
                bg = "bg-green-600";
              } else if (city.status === "current") {
                icon = <Clock className="w-5 h-5 text-white" />;
                bg = "bg-yellow-500";
              } else {
                icon = <MapPin className="w-5 h-5 text-white" />;
                bg = "bg-gray-600";
              }

              return (
                <div className="flex items-start gap-3" key={index}>
                  <div className={`rounded-full p-2 ${bg}`}>{icon}</div>
                  <div>
                    <h4 className="font-medium">{city.name}</h4>
                    <p className="text-sm text-gray-400">
                      ETA: {city.time} —{" "}
                      {city.status === "completed"
                        ? "Departed"
                        : city.status === "current"
                        ? "In Transit"
                        : "Yet to Arrive"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Agent Info */}
        <div className="mt-6 border-t border-gray-700 pt-4">
          <div className="text-sm text-gray-400 mb-1">Delivery Agent</div>
          <div className="font-medium">Amit Singh</div>
          <div className="text-sm text-gray-400">📞 +91 91234 56789</div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeTracking;
