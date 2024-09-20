import React from "react";
import Link from "next/link";

const CallToAction: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-800 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          <span className="block">Secure Your Digital Legacy Today</span>
          <span className="block text-indigo-200">
            Your Online Life, Your Rules
          </span>
        </h2>
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-md shadow">
            <Link
              href="/dashboard"
              className="inline-block rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
