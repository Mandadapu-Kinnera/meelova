import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";

const Events = () => {
  const eventTypes = [
    "Wedding Ceremonies",
    "Birthday Parties",
    "Receptions",
    "House Warming",
    "Engagement",
    "Corporate Events",
    "Anniversaries",
    "Private Parties",
    "Seminars",
    "Conferences"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container py-16">
        <h1 className="text-4xl font-bold mb-8">Event Types</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventTypes.map((event) => (
            <Card key={event} className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold">{event}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
