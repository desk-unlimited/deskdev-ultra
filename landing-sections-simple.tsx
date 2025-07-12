import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { StaggerContainer, StaggerItem, FadeIn } from "#/components/ui/animations";

interface UseCaseCardProps {
  title: string;
  description: string;
  emoji: string;
  delay?: number;
}

function UseCaseCard({ title, description, emoji, delay = 0 }: UseCaseCardProps) {
  return (
    <StaggerItem>
      <motion.div 
        className="bg-base p-6 rounded-lg border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 group"
        whileHover={{ 
          scale: 1.02,
          y: -5
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="flex items-center mb-4">
          <motion.div 
            className="text-3xl mr-4 group-hover:scale-110 transition-transform"
            whileHover={{ rotate: 10 }}
          >
            {emoji}
          </motion.div>
          <h3 className="text-lg font-semibold text-content">{title}</h3>
        </div>
        <p className="text-basic leading-relaxed">{description}</p>
      </motion.div>
    </StaggerItem>
  );
}

export function UseCasesSection() {
  const { t } = useTranslation();
  
  return (
    <FadeIn delay={2.0}>
      <section className="bg-base-secondary rounded-xl p-8 mb-8 border border-gray-700">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <span className="text-3xl mr-3">✨</span>
            <h2 className="text-2xl font-bold text-content">{t("HOME$USE_CASES")}</h2>
            <span className="text-3xl ml-3">✨</span>
          </div>
          <p className="text-basic max-w-2xl mx-auto">
            Discover how DeskDev.ai transforms your development workflow with intelligent automation
          </p>
        </motion.div>
        
        <StaggerContainer delay={2.4} staggerDelay={0.2} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <UseCaseCard 
            title={t("HOME$SOFTWARE_DEVELOPMENT")}
            description={t("HOME$SOFTWARE_DEVELOPMENT_DESC")}
            emoji="💻"
          />
          <UseCaseCard 
            title={t("HOME$DATA_ANALYSIS")}
            description={t("HOME$DATA_ANALYSIS_DESC")}
            emoji="📊"
          />
          <UseCaseCard 
            title={t("HOME$AUTOMATION")}
            description={t("HOME$AUTOMATION_DESC")}
            emoji="⚡"
          />
        </StaggerContainer>
      </section>
    </FadeIn>
  );
}

export function AboutUsSection() {
  const { t } = useTranslation();
  
  return (
    <FadeIn delay={2.8}>
      <section className="bg-base-secondary rounded-xl p-8 mb-8 border border-gray-700">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.0, duration: 0.6 }}
          className="text-center mb-6"
        >
          <div className="flex items-center justify-center mb-4">
            <span className="text-3xl mr-3">🎯</span>
            <h2 className="text-2xl font-bold text-content">{t("HOME$ABOUT_US")}</h2>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 3.2, duration: 0.6 }}
          >
            <p className="text-basic mb-4 leading-relaxed">
              {t("HOME$ABOUT_US_DESC_1")}
            </p>
            <p className="text-basic leading-relaxed">
              {t("HOME$ABOUT_US_DESC_2")}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 3.4, duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative">
              <motion.div
                animate={{ 
                  rotate: 360,
                }}
                transition={{ 
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="w-32 h-32 border-4 border-blue-500/20 rounded-full flex items-center justify-center"
              >
                <motion.div
                  animate={{ 
                    rotate: -360,
                  }}
                  transition={{ 
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="text-6xl"
                >
                  🚀
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </FadeIn>
  );
}

interface BusinessValueCardProps {
  title: string;
  description: string;
  emoji: string;
  color: string;
}

function BusinessValueCard({ title, description, emoji, color }: BusinessValueCardProps) {
  return (
    <StaggerItem>
      <motion.div 
        className="bg-base p-6 rounded-lg border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-lg group"
        whileHover={{ 
          scale: 1.02,
          y: -5
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{
          boxShadow: `0 0 20px ${color}10`
        }}
      >
        <div className="flex items-center mb-4">
          <motion.div 
            className="text-3xl mr-4 group-hover:scale-110 transition-transform"
            whileHover={{ rotate: 10 }}
          >
            {emoji}
          </motion.div>
          <h3 className="text-lg font-semibold text-content">{title}</h3>
        </div>
        <p className="text-basic leading-relaxed">{description}</p>
      </motion.div>
    </StaggerItem>
  );
}

export function BusinessValueSection() {
  const { t } = useTranslation();
  
  return (
    <FadeIn delay={3.6}>
      <section className="bg-base-secondary rounded-xl p-8 border border-gray-700">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.8, duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <span className="text-3xl mr-3">📈</span>
            <h2 className="text-2xl font-bold text-content">{t("HOME$BUSINESS_VALUE")}</h2>
          </div>
          <p className="text-basic max-w-2xl mx-auto">
            Measurable impact on your business growth and development efficiency
          </p>
        </motion.div>
        
        <StaggerContainer delay={4.0} staggerDelay={0.15} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BusinessValueCard 
            title={t("HOME$INCREASED_PRODUCTIVITY")}
            description={t("HOME$INCREASED_PRODUCTIVITY_DESC")}
            emoji="📈"
            color="#10b981"
          />
          <BusinessValueCard 
            title={t("HOME$REDUCED_TECH_DEBT")}
            description={t("HOME$REDUCED_TECH_DEBT_DESC")}
            emoji="🛡️"
            color="#3b82f6"
          />
          <BusinessValueCard 
            title={t("HOME$FASTER_ONBOARDING")}
            description={t("HOME$FASTER_ONBOARDING_DESC")}
            emoji="👥"
            color="#8b5cf6"
          />
          <BusinessValueCard 
            title={t("HOME$COST_EFFICIENCY")}
            description={t("HOME$COST_EFFICIENCY_DESC")}
            emoji="💰"
            color="#f59e0b"
          />
        </StaggerContainer>
      </section>
    </FadeIn>
  );
}