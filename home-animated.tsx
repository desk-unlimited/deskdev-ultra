import React from "react";
import { PrefetchPageLinks } from "react-router";
import { HomeHeader } from "#/components/features/home/home-header";
import { RepoConnector } from "#/components/features/home/repo-connector";
import { TaskSuggestions } from "#/components/features/home/tasks/task-suggestions";
import { useUserProviders } from "#/hooks/use-user-providers";
import { UseCasesSection, AboutUsSection, BusinessValueSection } from "#/components/features/home/landing-sections";
import { FadeIn } from "#/components/ui/animations";
import { motion } from "framer-motion";

<PrefetchPageLinks page="/conversations/:conversationId" />;

function HomeScreen() {
  const { providers } = useUserProviders();
  const [selectedRepoTitle, setSelectedRepoTitle] = React.useState<
    string | null
  >(null);

  const providersAreSet = providers.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      data-testid="home-screen"
      className="bg-base-secondary h-full flex flex-col rounded-xl px-[42px] pt-[42px] gap-8 overflow-y-auto"
    >
      <HomeHeader />

      <FadeIn delay={1.8}>
        <hr className="border-[#717888]" />
      </FadeIn>

      <FadeIn delay={1.9}>
        <main className="flex flex-col md:flex-row justify-between gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.0, duration: 0.6 }}
          >
            <RepoConnector
              onRepoSelection={(title) => setSelectedRepoTitle(title)}
            />
          </motion.div>
          <hr className="md:hidden border-[#717888]" />
          {providersAreSet && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.2, duration: 0.6 }}
            >
              <TaskSuggestions filterFor={selectedRepoTitle} />
            </motion.div>
          )}
        </main>
      </FadeIn>
      
      <div className="mb-12">
        <UseCasesSection />
        <AboutUsSection />
        <BusinessValueSection />
      </div>
    </motion.div>
  );
}

export default HomeScreen;