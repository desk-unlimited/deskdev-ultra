import React from "react";
import { useLocation, useNavigate } from "react-router";
import { FaHome, FaComments, FaCog, FaPlus, FaSignOutAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { I18nKey } from "#/i18n/declaration";
import { Dock } from "#/components/ui/reactbits/dock";
import { useLogout } from "#/hooks/mutation/use-logout";
import { useCreateConversation } from "#/hooks/mutation/use-create-conversation";

export function AppDock() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { mutate: logout } = useLogout();
  const { mutate: createConversation } = useCreateConversation();
  
  const handleNewConversation = () => {
    createConversation({});
  };
  
  const handleLogout = () => {
    logout();
  };
  
  const dockItems = [
    {
      icon: <FaHome />,
      label: t(I18nKey.HEADER$HOME),
      to: "/",
      isActive: location.pathname === "/"
    },
    {
      icon: <FaComments />,
      label: t(I18nKey.HEADER$CONVERSATIONS),
      to: "/conversations",
      isActive: location.pathname.includes("/conversations")
    },
    {
      icon: <FaPlus />,
      label: t(I18nKey.HEADER$NEW_CONVERSATION),
      to: "#new-conversation",
      isActive: false
    },
    {
      icon: <FaCog />,
      label: t(I18nKey.HEADER$SETTINGS),
      to: "/settings",
      isActive: location.pathname === "/settings"
    },
    {
      icon: <FaSignOutAlt />,
      label: t(I18nKey.HEADER$LOGOUT),
      to: "#logout",
      isActive: false
    }
  ];
  
  // Handle special navigation cases
  React.useEffect(() => {
    if (location.hash === "#new-conversation") {
      handleNewConversation();
      navigate("/", { replace: true });
    } else if (location.hash === "#logout") {
      handleLogout();
      navigate("/", { replace: true });
    }
  }, [location.hash]);
  
  return (
    <Dock 
      items={dockItems}
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
    />
  );
}