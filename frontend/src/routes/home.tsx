import React from "react";
import { PrefetchPageLinks } from "react-router";
import { motion } from "framer-motion";
import { FaRocket, FaCode, FaLightbulb, FaMagic, FaTools } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { I18nKey } from "#/i18n/declaration";
import { HomeHeader } from "#/components/features/home/home-header";
import { RepoConnector } from "#/components/features/home/repo-connector";
import { TaskSuggestions } from "#/components/features/home/tasks/task-suggestions";
import { useUserProviders } from "#/hooks/use-user-providers";
import { useCreateConversation } from "#/hooks/mutation/use-create-conversation";
import {
  UseCasesSection,
  AboutUsSection,
  BusinessValueSection,
} from "#/components/features/home/landing-sections";
import { FadeIn } from "#/components/ui/animations";
import { SilkBackground } from "#/components/ui/reactbits/silk-background";
import { CubesAnimation } from "#/components/ui/reactbits/cubes-animation";
import { RotatingText } from "#/components/ui/reactbits/rotating-text";
import { SplashCursor } from "#/components/ui/reactbits/splash-cursor";
import { StarBorder } from "#/components/ui/reactbits/star-border";
import { FluidGlass } from "#/components/ui/reactbits/fluid-glass";
import { CardSwap } from "#/components/ui/reactbits/card-swap";

<PrefetchPageLinks page="/conversations/:conversationId" />;

function HomeScreen() {
  const { providers } = useUserProviders();
  const { mutate: createConversation } = useCreateConversation();
  const [selectedRepoTitle, setSelectedRepoTitle] = React.useState<
    string | null
  >(null);

  const providersAreSet = providers.length > 0;
  
  const { t } = useTranslation();
  
  const featureCards = [
    {
      id: 1,
      title: t(I18nKey.HOME$FEATURE_AI_TITLE),
      description: t(I18nKey.HOME$FEATURE_AI_DESCRIPTION),
      icon: <FaRocket />,
      color: "bg-gradient-to-br from-blue-500/20 to-purple-600/20"
    },
    {
      id: 2,
      title: t(I18nKey.HOME$FEATURE_CODE_TITLE),
      description: t(I18nKey.HOME$FEATURE_CODE_DESCRIPTION),
      icon: <FaCode />,
      color: "bg-gradient-to-br from-purple-500/20 to-pink-600/20"
    },
    {
      id: 3,
      title: t(I18nKey.HOME$FEATURE_SUGGESTIONS_TITLE),
      description: t(I18nKey.HOME$FEATURE_SUGGESTIONS_DESCRIPTION),
      icon: <FaLightbulb />,
      color: "bg-gradient-to-br from-amber-500/20 to-red-600/20"
    },
    {
      id: 4,
      title: t(I18nKey.HOME$FEATURE_INTEGRATION_TITLE),
      description: t(I18nKey.HOME$FEATURE_INTEGRATION_DESCRIPTION),
      icon: <FaTools />,
      color: "bg-gradient-to-br from-emerald-500/20 to-teal-600/20"
    },
    {
      id: 5,
      title: t(I18nKey.HOME$FEATURE_EXPERIENCE_TITLE),
      description: t(I18nKey.HOME$FEATURE_EXPERIENCE_DESCRIPTION),
      icon: <FaMagic />,
      color: "bg-gradient-to-br from-indigo-500/20 to-blue-600/20"
    }
  ];

  return (
    <SplashCursor>
      <SilkBackground>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          data-testid="home-screen"
          className="min-h-screen flex flex-col px-8 pt-8 gap-8 overflow-y-auto pb-32"
        >
          {/* Hero Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 py-16">
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="mb-6"
              >
                <h1 className="text-5xl font-bold mb-4">
                  {t(I18nKey.HOME$HERO_TITLE)}{" "}
                  <span className="text-gradient bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                    {t(I18nKey.HOME$HERO_TITLE_HIGHLIGHT)}
                  </span>
                </h1>
                <RotatingText
                  baseText={t(I18nKey.HOME$HERO_SUBTITLE)}
                  words={[
                    t(I18nKey.HOME$HERO_WORD_CODING),
                    t(I18nKey.HOME$HERO_WORD_DEBUGGING),
                    t(I18nKey.HOME$HERO_WORD_REFACTORING),
                    t(I18nKey.HOME$HERO_WORD_LEARNING),
                    t(I18nKey.HOME$HERO_WORD_BUILDING)
                  ]}
                  className="text-2xl mb-6"
                />
                <p className="text-lg text-gray-300 max-w-xl">
                  {t(I18nKey.HOME$HERO_DESCRIPTION)}
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="flex gap-4"
              >
                <StarBorder>
                  <button
                    onClick={() => createConversation({})}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
                  >
                    {t(I18nKey.HOME$START_CODING_BUTTON)}
                  </button>
                </StarBorder>
                
                <button
                  className="px-8 py-3 bg-white/5 border border-white/10 rounded-lg text-white font-medium hover:bg-white/10 transition-all duration-300"
                >
                  {t(I18nKey.HOME$LEARN_MORE_BUTTON)}
                </button>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex-1 flex justify-center"
            >
              <CubesAnimation className="transform scale-125" />
            </motion.div>
          </div>
          
          {/* Feature Cards */}
          <div className="py-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-3xl font-bold text-center mb-12"
            >
              {t(I18nKey.HOME$FEATURES_TITLE)}
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.8 }}
                className="h-80"
              >
                <FluidGlass className="h-full p-6">
                  <CardSwap cards={featureCards} className="h-full" />
                </FluidGlass>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                <FluidGlass className="h-80 p-6">
                  <RepoConnector
                    onRepoSelection={(title) => setSelectedRepoTitle(title)}
                  />
                </FluidGlass>
              </motion.div>
              
              {providersAreSet && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 0.8 }}
                >
                  <FluidGlass className="h-80 p-6">
                    <TaskSuggestions filterFor={selectedRepoTitle} />
                  </FluidGlass>
                </motion.div>
              )}
            </div>
          </div>
          
          {/* Use Cases and About Sections */}
          <div className="py-12">
            <UseCasesSection />
            <AboutUsSection />
            <BusinessValueSection />
          </div>
        </motion.div>
      </SilkBackground>
    </SplashCursor>
  );
}

export default HomeScreen;
