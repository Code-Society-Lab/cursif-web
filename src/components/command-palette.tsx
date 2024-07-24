import React from 'react';
import { useRouter } from "next/navigation";

import {
  ActionId,
  KBarAnimator,
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarSearch,
  KBarResults,
  createAction,
  useMatches,
  ActionImpl,
  useKBar,
  NO_GROUP
} from "kbar";

const searchStyle = {
  padding: "12px 16px",
  fontSize: "16px",
  width: "100%",
  boxSizing: "border-box" as React.CSSProperties["boxSizing"],
  outline: "none",
  border: "none",
  background: "var(--component-faded-background-color)",
  color: "var(--foreground-color)",
};

const animatorStyle = {
  maxWidth: "600px",
  width: "100%",
  background: "var(--component-faded-background-color)",
  color: "var(--foreground-color)",
  borderRadius: "8px",
  overflow: "hidden",
  boxShadow: "0px 6px 20px rgb(0 0 0 / 20%)",
};

const groupNameStyle = {
  padding: "8px 16px",
  fontSize: "10px",
  textTransform: "uppercase" as const,
  opacity: 0.5,
};


export default function CommandPalette({ 
  children, 
  actions = []
}: { 
  children: React.ReactNode, 
  actions?: ActionImpl[]
}) {
  const router = useRouter();

  const navigationAction = [
    {
      id: "notebooks",
      name: "My notebooks",
      subtitle: "Navigate to your notebooks dashboard",
      shortcut: ["home", "notebooks"],
      keywords: "dashboard notebooks",
      section: "Navigation",
      priority: 1,
      perform: () => router.push("/notebooks"),
    },
  ]

  const preferenceActions = [
    {
      id: "themes",
      name: "Change theme...",
      shortcut: ["light", "dark"],
      section: "Preferences",
    },
    {
      id: "lightTheme",
      name: "Light",
      section: "Preferences",
      parent: "themes",
      perform: function() {
        document.body.classList.remove("dark")
        document.body.classList.add("light")
      }
    },
    {
      id: "darkTheme",
      name: "Dark",
      section: "Preferences",
      parent: "themes",
      perform: function() {
        document.body.classList.remove("light")
        document.body.classList.add("dark")
      }
    }
  ]

  const otherActions = [
    {
      id: "links",
      name: "Links...",
      keywords: "github",
      section: "Others",
    },
    {
      id: "githubLink",
      name: "Github",
      keywords: "github",
      section: "Link",
      parent: "links",
      perform: () => window.open("https://github.com/code-society-lab/cursif-web", "_blank"),
    }
  ]

  const baseActions: ActionImpl[] = [
    actions, 
    navigationAction,
    preferenceActions, 
    otherActions
  ].flat(1)

  return (
    <KBarProvider actions={baseActions} >
      <CommandBar />

      {children}
    </KBarProvider>
  );
}

function CommandBar() {
  return (
    <KBarPortal>
      <KBarPositioner>
        <KBarAnimator style={animatorStyle}>
          <KBarSearch style={searchStyle} />
          <RenderResults />
        </KBarAnimator>
      </KBarPositioner>
    </KBarPortal>
  );
}

function RenderResults() {
  const { results, rootActionId } = useMatches();

  const ResultItem = React.forwardRef(
    (
      {
        action,
        active,
        currentRootActionId,
      }: {
        action: ActionImpl;
        active: boolean;
        currentRootActionId: ActionId;
      },
      ref: React.Ref<HTMLDivElement>
    ) => {
      const ancestors = React.useMemo(() => {
        if (!currentRootActionId) return action.ancestors;
        const index = action.ancestors.findIndex(
          (ancestor) => ancestor.id === currentRootActionId
        );
        // +1 removes the currentRootAction; e.g.
        // if we are on the "Set theme" parent action,
        // the UI should not display "Set theme… > Dark"
        // but rather just "Dark"
        return action.ancestors.slice(index + 1);
      }, [action.ancestors, currentRootActionId]);

      return (
        <div
          ref={ref}
          style={{
            padding: "12px 16px",
            background: active ? "var(--component-background-color)" : "transparent",
            borderLeft: `2px solid ${
              active ? "var(--foreground-color)" : "transparent"
            }`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
              fontSize: 14,
            }}
          >
            {action.icon && action.icon}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>
                {ancestors.length > 0 &&
                  ancestors.map((ancestor) => (
                    <React.Fragment key={ancestor.id}>
                      <span
                        style={{
                          opacity: 0.5,
                          marginRight: 8,
                        }}
                      >
                        {ancestor.name}
                      </span>
                      <span
                        style={{
                          marginRight: 8,
                        }}
                      >
                        &rsaquo;
                      </span>
                    </React.Fragment>
                  ))}
                <span>{action.name}</span>
              </div>
              {action.subtitle && (
                <span style={{ fontSize: 12 }}>{action.subtitle}</span>
              )}
            </div>
          </div>
          {action.shortcut?.length ? (
            <div
              aria-hidden
              style={{ display: "grid", gridAutoFlow: "column", gap: "4px" }}
            >
              {action.shortcut.map((sc) => (
                <kbd
                  key={sc}
                  style={{
                    padding: "4px 6px",
                    background: "rgba(0 0 0 / .1)",
                    borderRadius: "4px",
                    fontSize: 14,
                  }}
                >
                  {sc}
                </kbd>
              ))}
            </div>
          ) : null}
        </div>
      );
    }
  );

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === "string" ? (
          <div style={groupNameStyle}>{item}</div>
        ) : (
          <ResultItem
            action={item}
            active={active}
            currentRootActionId={rootActionId}
          />
        )
      }
    />
  );
}
