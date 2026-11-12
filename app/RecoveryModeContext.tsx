"use client";

import { createContext, useContext } from "react";

/**
 * The server passes one recovery-mode state to all interactive public widgets.
 * No credentials, identities or request data are exposed to the browser.
 * This is NOT a remote activation mechanism or permission to change production.
 */
const RecoveryModeContext = createContext(false);

export function RecoveryModeProvider({
  active,
  children
}: {
  active: boolean;
  children: React.ReactNode;
}) {
  return <RecoveryModeContext.Provider value={active}>{children}</RecoveryModeContext.Provider>;
}

export function useRecoveryMode(): boolean {
  return useContext(RecoveryModeContext);
}
