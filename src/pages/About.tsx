import Navbar from "@/components/Navbar";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container py-16">
        <h1 className="text-4xl font-bold mb-8">About Meelova</h1>
        
        <div className="max-w-3xl space-y-6">
          <p className="text-lg">
            Meelova is your trusted partner in creating memorable events. We connect customers with the best event vendors in the industry, making event planning seamless and enjoyable.
          </p>
          
          <p className="text-lg">
            Whether you're planning a wedding, birthday party, corporate event, or any special celebration, Meelova helps you discover and connect with verified vendors who can bring your vision to life.
          </p>
          
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg">
              To make every moment memorable by connecting people with exceptional event services and creating experiences that last a lifetime.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
