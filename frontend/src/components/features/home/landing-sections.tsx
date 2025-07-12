import React from "react";
import { useTranslation } from "react-i18next";

export function UseCasesSection() {
  return (
    <section className="bg-base-secondary rounded-xl p-6 mb-6">
      <h2 className="text-xl font-bold mb-4 text-content">Use Cases</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <UseCaseCard 
          title="Software Development" 
          description="Accelerate your development process with AI-assisted coding, debugging, and testing."
        />
        <UseCaseCard 
          title="Data Analysis" 
          description="Transform raw data into actionable insights with intelligent data processing and visualization."
        />
        <UseCaseCard 
          title="Automation" 
          description="Streamline repetitive tasks and workflows with intelligent automation solutions."
        />
      </div>
    </section>
  );
}

export function AboutUsSection() {
  return (
    <section className="bg-base-secondary rounded-xl p-6 mb-6">
      <h2 className="text-xl font-bold mb-4 text-content">About Us</h2>
      <p className="text-basic mb-4">
        DeskDev.ai is a cutting-edge AI-powered development platform designed to enhance developer productivity and creativity. 
        Our mission is to make software development more accessible, efficient, and enjoyable through the power of artificial intelligence.
      </p>
      <p className="text-basic">
        Founded by a team of passionate developers and AI enthusiasts, DeskDev.ai combines state-of-the-art language models with 
        intuitive interfaces to create a seamless development experience.
      </p>
    </section>
  );
}

export function BusinessValueSection() {
  return (
    <section className="bg-base-secondary rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4 text-content">How We Help Businesses Scale</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BusinessValueCard 
          title="Increased Developer Productivity" 
          description="Reduce development time by up to 40% with AI-assisted coding and automated testing."
        />
        <BusinessValueCard 
          title="Reduced Technical Debt" 
          description="Maintain cleaner, more maintainable code with intelligent refactoring suggestions."
        />
        <BusinessValueCard 
          title="Faster Onboarding" 
          description="Help new team members get up to speed quickly with AI-guided codebase exploration."
        />
        <BusinessValueCard 
          title="Cost Efficiency" 
          description="Optimize resource allocation and reduce development costs with smart automation."
        />
      </div>
    </section>
  );
}

function UseCaseCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-base p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-2 text-content">{title}</h3>
      <p className="text-basic">{description}</p>
    </div>
  );
}

function BusinessValueCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-base p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-2 text-content">{title}</h3>
      <p className="text-basic">{description}</p>
    </div>
  );
}