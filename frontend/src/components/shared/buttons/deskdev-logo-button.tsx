import { useTranslation } from "react-i18next";
import { DeskDevLogo } from "#/assets/branding/deskdev-logo";
import { I18nKey } from "#/i18n/declaration";
import { TooltipButton } from "./tooltip-button";

export function DeskDevLogoButton() {
  const { t } = useTranslation();

  return (
    <TooltipButton
      tooltip={t(I18nKey.BRANDING$ALL_HANDS_AI)}
      ariaLabel={t(I18nKey.BRANDING$ALL_HANDS_LOGO)}
      navLinkTo="/"
    >
      <DeskDevLogo width={34} height={34} />
    </TooltipButton>
  );
}