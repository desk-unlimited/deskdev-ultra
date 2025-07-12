import React from "react";
import { useTranslation } from "react-i18next";

function UseCaseCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-base p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-2 text-content">{title}</h3>
      <p className="text-basic">{description}</p>
    </div>
  );
}

export function UseCasesSection() {
  const { t } = useTranslation();
  
  return (
    <section className="bg-base-secondary rounded-xl p-6 mb-6">
      <h2 className="text-xl font-bold mb-4 text-content">{t("HOME$USE_CASES")}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <UseCaseCard 
          title={t("HOME$SOFTWARE_DEVELOPMENT")}
          description={t("HOME$SOFTWARE_DEVELOPMENT_DESC")}
        />
        <UseCaseCard 
          title={t("HOME$DATA_ANALYSIS")}
          description={t("HOME$DATA_ANALYSIS_DESC")}
        />
        <UseCaseCard 
          title={t("HOME$AUTOMATION")}
          description={t("HOME$AUTOMATION_DESC")}
        />
      </div>
    </section>
  );
}

export function AboutUsSection() {
  const { t } = useTranslation();
  
  return (
    <section className="bg-base-secondary rounded-xl p-6 mb-6">
      <h2 className="text-xl font-bold mb-4 text-content">{t("HOME$ABOUT_US")}</h2>
      <p className="text-basic mb-4">
        {t("HOME$ABOUT_US_DESC_1")}
      </p>
      <p className="text-basic">
        {t("HOME$ABOUT_US_DESC_2")}
      </p>
    </section>
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

export function BusinessValueSection() {
  const { t } = useTranslation();
  
  return (
    <section className="bg-base-secondary rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4 text-content">{t("HOME$BUSINESS_VALUE")}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BusinessValueCard 
          title={t("HOME$INCREASED_PRODUCTIVITY")}
          description={t("HOME$INCREASED_PRODUCTIVITY_DESC")}
        />
        <BusinessValueCard 
          title={t("HOME$REDUCED_TECH_DEBT")}
          description={t("HOME$REDUCED_TECH_DEBT_DESC")}
        />
        <BusinessValueCard 
          title={t("HOME$FASTER_ONBOARDING")}
          description={t("HOME$FASTER_ONBOARDING_DESC")}
        />
        <BusinessValueCard 
          title={t("HOME$COST_EFFICIENCY")}
          description={t("HOME$COST_EFFICIENCY_DESC")}
        />
      </div>
    </section>
  );
}