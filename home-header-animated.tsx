import { useTranslation } from "react-i18next";
import { useCreateConversation } from "#/hooks/mutation/use-create-conversation";
import { useIsCreatingConversation } from "#/hooks/use-is-creating-conversation";
import { BrandButton } from "../settings/brand-button";
import { DeskDevLogoFull } from "#/assets/branding/deskdev-logo";
import { SplitText, FadeIn } from "#/components/ui/animations";
import { motion } from "framer-motion";

export function HomeHeader() {
  const {
    mutate: createConversation,
    isPending,
    isSuccess,
  } = useCreateConversation();
  const isCreatingConversationElsewhere = useIsCreatingConversation();
  const { t } = useTranslation();

  // We check for isSuccess because the app might require time to render
  // into the new conversation screen after the conversation is created.
  const isCreatingConversation =
    isPending || isSuccess || isCreatingConversationElsewhere;

  return (
    <header className="flex flex-col gap-5">
      <FadeIn delay={0.2} className="flex justify-center items-center py-2">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.3,
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
        >
          <DeskDevLogoFull width={200} height={50} className="text-2xl" />
        </motion.div>
      </FadeIn>

      <div className="flex items-center justify-between">
        <SplitText 
          text={t("HOME$LETS_START_BUILDING")} 
          className="heading"
          delay={0.6}
          staggerDelay={0.08}
        />
        <FadeIn delay={1.2} direction="left">
          <BrandButton
            testId="header-launch-button"
            variant="primary"
            type="button"
            onClick={() => createConversation({})}
            isDisabled={isCreatingConversation}
          >
            {!isCreatingConversation && t("HOME$LAUNCH_FROM_SCRATCH")}
            {isCreatingConversation && t("HOME$LOADING")}
          </BrandButton>
        </FadeIn>
      </div>

      <div className="flex items-center justify-between">
        <FadeIn delay={1.4} className="text-sm max-w-[424px]">
          <p>
            {t("HOME$OPENHANDS_DESCRIPTION")}
          </p>
        </FadeIn>
        <FadeIn delay={1.6} direction="left" className="text-sm">
          <p>
            {t("HOME$NOT_SURE_HOW_TO_START")}
          </p>
        </FadeIn>
      </div>
    </header>
  );
}