import { useDisclosure } from "@heroui/react";
import React from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { FaServer, FaExternalLinkAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { DiGit } from "react-icons/di";
import { VscCode } from "react-icons/vsc";
import { I18nKey } from "#/i18n/declaration";
import { RUNTIME_INACTIVE_STATES } from "#/types/agent-state";
import { useConversationId } from "#/hooks/use-conversation-id";
import { Controls } from "#/components/features/controls/controls";
import { clearTerminal } from "#/state/command-slice";
import { useEffectOnce } from "#/hooks/use-effect-once";
import GlobeIcon from "#/icons/globe.svg?react";
import JupyterIcon from "#/icons/jupyter.svg?react";
import TerminalIcon from "#/icons/terminal.svg?react";
import { clearJupyter } from "#/state/jupyter-slice";

import { ChatInterface } from "../components/features/chat/chat-interface";
import { WsClientProvider } from "#/context/ws-client-provider";
import { EventHandler } from "../wrapper/event-handler";
import { useConversationConfig } from "#/hooks/query/use-conversation-config";
import { Container } from "#/components/layout/container";
import {
  Orientation,
  ResizablePanel,
} from "#/components/layout/resizable-panel";
import Security from "#/components/shared/modals/security/security";
import { useActiveConversation } from "#/hooks/query/use-active-conversation";
import { ServedAppLabel } from "#/components/layout/served-app-label";
import { useSettings } from "#/hooks/query/use-settings";
import { RootState } from "#/store";
import { displayErrorToast } from "#/utils/custom-toast-handlers";
import { useDocumentTitleFromState } from "#/hooks/use-document-title-from-state";
import { transformVSCodeUrl } from "#/utils/vscode-url-helper";
import OpenHands from "#/api/open-hands";
import { TabContent } from "#/components/layout/tab-content";
import { useIsAuthed } from "#/hooks/query/use-is-authed";
import { useUserProviders } from "#/hooks/use-user-providers";
import { AuroraBackground } from "#/components/ui/reactbits/aurora-background";
import { FluidGlass } from "#/components/ui/reactbits/fluid-glass";
import { OrbLoader } from "#/components/ui/reactbits/orb-loader";

function AppContent() {
  useConversationConfig();
  const { t } = useTranslation();
  const { data: settings } = useSettings();
  const { conversationId } = useConversationId();
  const { data: conversation, isFetched, refetch } = useActiveConversation();
  const { data: isAuthed } = useIsAuthed();
  const { providers } = useUserProviders();

  const { curAgentState } = useSelector((state: RootState) => state.agent);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Set the document title to the conversation title when available
  useDocumentTitleFromState();

  const [width, setWidth] = React.useState(window.innerWidth);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (isFetched && !conversation && isAuthed) {
      displayErrorToast(
        "This conversation does not exist, or you do not have permission to access it.",
      );
      navigate("/");
    } else if (conversation?.status === "STOPPED") {
      // start the conversation if the state is stopped on initial load
      OpenHands.startConversation(conversation.conversation_id, providers).then(
        () => refetch(),
      );
    }
  }, [conversation?.conversation_id, isFetched, isAuthed, providers]);

  React.useEffect(() => {
    dispatch(clearTerminal());
    dispatch(clearJupyter());
  }, [conversationId]);

  useEffectOnce(() => {
    dispatch(clearTerminal());
    dispatch(clearJupyter());
  });

  function handleResize() {
    setWidth(window.innerWidth);
  }

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const {
    isOpen: securityModalIsOpen,
    onOpen: onSecurityModalOpen,
    onOpenChange: onSecurityModalOpenChange,
  } = useDisclosure();

  function renderMain() {
    const basePath = `/conversations/${conversationId}`;

    if (width <= 640) {
      return (
        <FluidGlass className="rounded-xl overflow-hidden w-full h-full">
          <ChatInterface />
        </FluidGlass>
      );
    }
    
    return (
      <ResizablePanel
        orientation={Orientation.HORIZONTAL}
        className="grow h-full min-h-0 min-w-0"
        initialSize={500}
        firstClassName="rounded-xl overflow-hidden"
        secondClassName="flex flex-col overflow-hidden"
        firstChild={
          <FluidGlass className="h-full">
            <ChatInterface />
          </FluidGlass>
        }
        secondChild={
          <FluidGlass className="h-full">
            <Container
              className="h-full w-full"
              labels={[
                {
                  label: "Changes",
                  to: "",
                  icon: <DiGit className="w-6 h-6" />,
                },
                {
                  label: (
                    <div className="flex items-center gap-1">
                      {t(I18nKey.VSCODE$TITLE)}
                    </div>
                  ),
                  to: "vscode",
                  icon: isLoading ? <OrbLoader size={16} color="#ffffff" /> : <VscCode className="w-5 h-5" />,
                  rightContent: !RUNTIME_INACTIVE_STATES.includes(
                    curAgentState,
                  ) ? (
                    <FaExternalLinkAlt
                      className="w-3 h-3 text-neutral-400 cursor-pointer hover:text-white transition-colors"
                      onClick={async (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (conversationId) {
                          try {
                            setIsLoading(true);
                            const data =
                              await OpenHands.getVSCodeUrl(conversationId);
                            if (data.vscode_url) {
                              const transformedUrl = transformVSCodeUrl(
                                data.vscode_url,
                              );
                              if (transformedUrl) {
                                window.open(transformedUrl, "_blank");
                              }
                            }
                            setIsLoading(false);
                          } catch (err) {
                            setIsLoading(false);
                            // Silently handle the error
                          }
                        }
                      }}
                    />
                  ) : null,
                },
                {
                  label: t(I18nKey.WORKSPACE$TERMINAL_TAB_LABEL),
                  to: "terminal",
                  icon: <TerminalIcon />,
                },
                { label: "Jupyter", to: "jupyter", icon: <JupyterIcon /> },
                {
                  label: <ServedAppLabel />,
                  to: "served",
                  icon: <FaServer />,
                },
                {
                  label: (
                    <div className="flex items-center gap-1">
                      {t(I18nKey.BROWSER$TITLE)}
                    </div>
                  ),
                  to: "browser",
                  icon: <GlobeIcon />,
                },
              ]}
              tabClassName="bg-white/5 hover:bg-white/10 transition-colors"
              activeTabClassName="bg-blue-500/80 text-white shadow-lg shadow-blue-500/20"
            >
              {/* Use both Outlet and TabContent */}
              <div className="h-full w-full">
                <TabContent conversationPath={basePath} />
              </div>
            </Container>
          </FluidGlass>
        }
      />
    );
  }

  if (!isFetched || !conversation) {
    return (
      <div className="flex items-center justify-center h-screen">
        <OrbLoader size={120} />
      </div>
    );
  }

  return (
    <AuroraBackground>
      <WsClientProvider conversationId={conversationId}>
        <EventHandler>
          <div data-testid="app-route" className="flex flex-col h-full gap-3">
            <div className="flex h-full overflow-auto">{renderMain()}</div>

            <Controls
              setSecurityOpen={onSecurityModalOpen}
              showSecurityLock={!!settings?.SECURITY_ANALYZER}
            />
            {settings && (
              <Security
                isOpen={securityModalIsOpen}
                onOpenChange={onSecurityModalOpenChange}
                securityAnalyzer={settings.SECURITY_ANALYZER}
              />
            )}
          </div>
        </EventHandler>
      </WsClientProvider>
    </AuroraBackground>
  );
}

function App() {
  return <AppContent />;
}

export default App;
