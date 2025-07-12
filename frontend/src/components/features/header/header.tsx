import React from "react";
import { useLocation } from "react-router";
import { useGitUser } from "#/hooks/query/use-git-user";
import { UserActions } from "../sidebar/user-actions";
import { DeskDevLogoFull } from "#/assets/branding/deskdev-logo";
import { NewProjectButton } from "#/components/shared/buttons/new-project-button";
import { SettingsButton } from "#/components/shared/buttons/settings-button";
import { ConversationPanelButton } from "#/components/shared/buttons/conversation-panel-button";
import { SettingsModal } from "#/components/shared/modals/settings/settings-modal";
import { useSettings } from "#/hooks/query/use-settings";
import { ConversationPanel } from "../conversation-panel/conversation-panel";
import { ConversationPanelWrapper } from "../conversation-panel/conversation-panel-wrapper";
import { useLogout } from "#/hooks/mutation/use-logout";
import { useConfig } from "#/hooks/query/use-config";
import { displayErrorToast } from "#/utils/custom-toast-handlers";
import { NavLink } from "react-router";

export function Header() {
  const location = useLocation();
  const user = useGitUser();
  const { data: config } = useConfig();
  const {
    data: settings,
    error: settingsError,
    isError: settingsIsError,
    isFetching: isFetchingSettings,
  } = useSettings();
  const { mutate: logout } = useLogout();

  const [settingsModalIsOpen, setSettingsModalIsOpen] = React.useState(false);

  const [conversationPanelIsOpen, setConversationPanelIsOpen] =
    React.useState(false);

  // TODO: Remove HIDE_LLM_SETTINGS check once released
  const shouldHideLlmSettings =
    config?.FEATURE_FLAGS.HIDE_LLM_SETTINGS && config?.APP_MODE === "saas";

  React.useEffect(() => {
    if (shouldHideLlmSettings) return;

    if (location.pathname === "/settings") {
      setSettingsModalIsOpen(false);
    } else if (
      !isFetchingSettings &&
      settingsIsError &&
      settingsError?.status !== 404
    ) {
      // We don't show toast errors for settings in the global error handler
      // because we have a special case for 404 errors
      displayErrorToast(
        "Something went wrong while fetching settings. Please reload the page.",
      );
    } else if (config?.APP_MODE === "oss" && settingsError?.status === 404) {
      setSettingsModalIsOpen(true);
    }
  }, [
    settingsError?.status,
    settingsError,
    isFetchingSettings,
    location.pathname,
  ]);

  return (
    <>
      <header className="h-[60px] w-full px-4 flex flex-row items-center justify-between bg-base-secondary rounded-xl mb-3">
        <div className="flex items-center">
          <NavLink to="/" className="mr-6">
            <DeskDevLogoFull />
          </NavLink>
          <div className="flex items-center gap-4">
            <NewProjectButton disabled={settings?.EMAIL_VERIFIED === false} />
            <ConversationPanelButton
              isOpen={conversationPanelIsOpen}
              onClick={() =>
                settings?.EMAIL_VERIFIED === false
                  ? null
                  : setConversationPanelIsOpen((prev) => !prev)
              }
              disabled={settings?.EMAIL_VERIFIED === false}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="mr-2">
            <SettingsButton disabled={settings?.EMAIL_VERIFIED === false} />
          </div>
          <UserActions
            user={
              user.data ? { avatar_url: user.data.avatar_url } : undefined
            }
            onLogout={logout}
            isLoading={user.isFetching}
          />
        </div>

        {conversationPanelIsOpen && (
          <ConversationPanelWrapper isOpen={conversationPanelIsOpen}>
            <ConversationPanel
              onClose={() => setConversationPanelIsOpen(false)}
            />
          </ConversationPanelWrapper>
        )}
      </header>

      {settingsModalIsOpen && (
        <SettingsModal
          settings={settings}
          onClose={() => setSettingsModalIsOpen(false)}
        />
      )}
    </>
  );
}