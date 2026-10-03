"use client";

import { FormEvent, useEffect, useState } from "react";
import styles from "./login.module.css";

type SessionState = {
  enabled: boolean;
  configured: boolean;
  authenticated: boolean;
};

export default function FounderLogin() {
  const [session, setSession] = useState<SessionState | null>(null);
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("Checking Founder access…");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/api/jarvis/auth/session", { cache: "no-store", credentials: "same-origin" })
      .then(async response => {
        if (!response.ok) throw new Error("session check failed");
        return response.json() as Promise<SessionState>;
      })
      .then(value => {
        if (!active) return;
        setSession(value);
        if (value.authenticated) setMessage("Founder session is already active.");
        else if (!value.enabled) setMessage("Founder authentication is staged but not activated for production.");
        else if (!value.configured) setMessage("Founder authentication is enabled but its secure environment configuration is incomplete.");
        else setMessage("Enter the Founder password and current authenticator code.");
      })
      .catch(() => {
        if (active) setMessage("Founder authentication status is unavailable. Access remains closed.");
      });
    return () => { active = false; };
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!session?.enabled || !session.configured || busy) return;
    setBusy(true);
    setMessage("Verifying Founder credentials…");
    try {
      const response = await fetch("/api/jarvis/auth/login", {
        method: "POST",
        cache: "no-store",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, code }),
      });
      if (!response.ok) {
        setMessage(response.status === 401
          ? "Credentials were not accepted."
          : "Founder access remains closed because authentication is unavailable.");
        return;
      }
      window.location.assign("/jarvis");
    } catch {
      setMessage("Founder access remains closed because authentication could not be verified.");
    } finally {
      setBusy(false);
      setPassword("");
      setCode("");
    }
  }

  const canLogin = Boolean(session?.enabled && session.configured && !session.authenticated);

  return (
    <main className={styles.shell}>
      <section className={styles.card} aria-labelledby="founder-login-title">
        <div className={styles.brand}><span>J</span><div><strong>JARVIS</strong><small>FOUNDER ACCESS</small></div></div>
        <p className={styles.eyebrow}>MARKETECH DIGITAL · PRIVATE CONTROL SURFACE</p>
        <h1 id="founder-login-title">Founder authentication</h1>
        <p className={styles.copy}>
          This gate protects the private JARVIS portal only. It does not authenticate the public Marketech website and it does not grant Runtime, outbound, financial, deployment, or other consequence authority.
        </p>

        <div className={styles.status} data-testid="founder-auth-status">{message}</div>

        {session?.authenticated ? (
          <a className={styles.primary} href="/jarvis">Open JARVIS</a>
        ) : (
          <form onSubmit={submit} className={styles.form}>
            <label>
              <span>Founder password</span>
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={event => setPassword(event.target.value)}
                disabled={!canLogin || busy}
                required
              />
            </label>
            <label>
              <span>Authenticator code</span>
              <input
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="[0-9]{6}"
                maxLength={6}
                value={code}
                onChange={event => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
                disabled={!canLogin || busy}
                required
              />
            </label>
            <button className={styles.primary} type="submit" disabled={!canLogin || busy}>
              {busy ? "Verifying…" : "Verify Founder"}
            </button>
          </form>
        )}

        <div className={styles.boundary}>
          <strong>Security boundary</strong>
          <span>Signed HttpOnly session · SameSite Strict · short expiry · production-only activation</span>
          <span>Consequential JARVIS controls remain separately gated.</span>
        </div>
      </section>
    </main>
  );
}
