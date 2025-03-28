import { Link } from "react-router-dom";
// import landing from "../assets/landing.png";

export const Home = () => {
  return (
    <div className="relative z-12 border border-black overflow-hidden h-full ">
      {/* Hero Section with Background Image */}

      {/* Hero Section with Background */}
      <section className="relative min-h-[80vh] flex items-center border-b border-gray-200">
        {/* <div className="absolute inset-0 w-full h-full">
          <img
            src={landing}
            alt="background"
            className="w-full h-full object-cover opacity-75"
          />
          <div className="absolute inset-0 bg-white/20"></div>
        </div> */}
        
        <div className="relative z-10 w-full pt-32 pb-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Smart Expense Tracking <br />
                <span className="text-[#0092FB]">Made Simple</span>
              </h1>
              <p className="text-xl text-gray-800 max-w-2xl mx-auto mb-10">
                Take control of your finances with our intuitive expense tracking solution.
                Monitor, analyze, and optimize your spending in real-time.
              </p>
              <Link to="/dashboard">
                <button className="px-8 py-3 bg-[#0092FB] text-white text-lg rounded-lg hover:bg-blue-500 transition-colors cursor-pointer">
                  Start Tracking Free →
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Everything you need to manage expenses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Easy Tracking",
                description: "Record and categorize expenses with just a few clicks",
                icon: "📱"
              },
              {
                title: "Smart Analytics",
                description: "Get detailed insights about your spending patterns",
                icon: "📊"
              },
              {
                title: "Secure Storage",
                description: "Your financial data is encrypted and protected",
                icon: "🔒"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="group flex flex-col items-center text-center p-6 bg-white rounded-xl border border-gray-100 hover:border-blue-100 hover:shadow-md transition-all"
              >
                <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-3xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 border-t border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            How it works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Sign Up", description: "Create your free account" },
              { step: "2", title: "Add Expenses", description: "Record your daily spending" },
              { step: "3", title: "Categorize", description: "Organize expenses by category" },
              { step: "4", title: "Track & Save", description: "Monitor and optimize spending" }
            ].map((item, index) => (
              <div key={index} className="text-center group p-6 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="w-12 h-12 rounded-full border-2 border-[#0092FB] text-[#0092FB] flex items-center justify-center mx-auto mb-4 text-xl font-bold group-hover:bg-[#0092FB] group-hover:text-white transition-all">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Ready to take control of your finances?
            </h2>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              Join thousands of users who are already managing their expenses smarter.
            </p>
            <Link to="/dashboard">
              <button className="px-8 py-3 bg-[#0092FB] text-white rounded-lg hover:bg-blue-500 transition-colors cursor-pointer">
                Get Started Now →
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-200 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <span className="text-2xl font-bold text-[#0092FB] mb-4 block">ExpenseTracker</span>
              <p className="text-gray-600">
                Making expense management simple and efficient.
              </p>
            </div>
            <div>
              <h5 className="font-semibold text-gray-900 mb-4">Quick Links</h5>
              <ul className="space-y-2">
                <li><Link to="/dashboard" className="text-gray-600 hover:text-[#0092FB]">Dashboard</Link></li>
                <li><Link to="/reports" className="text-gray-600 hover:text-[#0092FB]">Reports</Link></li>
                <li><Link to="/settings" className="text-gray-600 hover:text-[#0092FB]">Settings</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-gray-900 mb-4">Contact</h5>
              <p className="text-gray-600">
                Email: support@expensetracker.com<br />
                Phone: (555) 123-4567
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};